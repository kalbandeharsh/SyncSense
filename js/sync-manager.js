/**
 * SyncSense AI - Synchronization Manager
 * 
 * Manages network state detection (with active health pings), pending sync queues,
 * idempotency protection, cloud evaluation ingest, and reconciliation updates.
 */

import { 
  getAllCasesFull, 
  getCaseById,
  saveCloudDecision, 
  updateSyncRecord 
} from './storage.js';
import { reconcileDecisions } from './reconciliation.js';

class SyncManager {
  constructor() {
    this.isOnline = typeof navigator !== 'undefined' ? navigator.onLine : false;
    this.isBackendReachable = false;
    this.isSyncing = false;
    this.listeners = new Set();
    this.pingInterval = null;
  }

  /**
   * Initializes listeners for network changes and starts periodic health check.
   */
  init() {
    if (typeof window === 'undefined') return;

    window.addEventListener('online', () => this.handleNetworkStateChange());
    window.addEventListener('offline', () => this.handleNetworkStateChange());

    // Initial check
    this.checkHealth();

    // Check health every 12 seconds
    this.pingInterval = setInterval(() => this.checkHealth(), 12000);
  }

  /**
   * Subscribes a listener callback to connection and sync state changes.
   */
  subscribe(callback) {
    this.listeners.add(callback);
    // Initial emit
    callback(this.getStatus());
    return () => this.listeners.delete(callback);
  }

  notify() {
    const status = this.getStatus();
    for (const cb of this.listeners) {
      try {
        cb(status);
      } catch (err) {
        console.error('[SyncManager] Listener error:', err);
      }
    }
  }

  getStatus() {
    return {
      isOnline: this.isOnline,
      isBackendReachable: this.isBackendReachable,
      isSyncing: this.isSyncing,
      networkLabel: !this.isOnline 
        ? 'Offline' 
        : (this.isBackendReachable ? 'Online (Connected)' : 'Online (Server Unreachable)')
    };
  }

  /**
   * Performs an active HTTP ping to verify real backend availability.
   */
  async checkHealth() {
    this.isOnline = typeof navigator !== 'undefined' ? navigator.onLine : false;

    if (!this.isOnline) {
      this.isBackendReachable = false;
      this.notify();
      return false;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch('/health', {
        method: 'GET',
        headers: { 'Cache-Control': 'no-cache' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const wasReachable = this.isBackendReachable;
      this.isBackendReachable = res.ok;

      if (!wasReachable && this.isBackendReachable) {
        console.log('[SyncManager] Backend reconnected. Initiating automatic sync...');
        this.triggerSync();
      }
    } catch (err) {
      this.isBackendReachable = false;
    }

    this.notify();
    return this.isBackendReachable;
  }

  async handleNetworkStateChange() {
    console.log(`[SyncManager] Network status changed. onLine=${navigator.onLine}`);
    await this.checkHealth();
  }

  /**
   * Synchronizes all pending offline cases with the cloud backend.
   * Preserves local decisions, fetches cloud assessment, and runs reconciliation.
   */
  async triggerSync() {
    if (this.isSyncing) return { success: false, message: 'Sync already in progress' };

    const reachable = await this.checkHealth();
    if (!reachable) {
      return { 
        success: false, 
        message: 'Cannot sync: Backend server is currently unreachable. Cases remain safely stored locally.' 
      };
    }

    this.isSyncing = true;
    this.notify();

    try {
      const allCases = await getAllCasesFull();
      const pendingCases = allCases.filter(c => c.syncStatus !== 'synced');

      if (pendingCases.length === 0) {
        this.isSyncing = false;
        this.notify();
        return { success: true, count: 0, message: 'All cases are already synchronized.' };
      }

      console.log(`[SyncManager] Starting sync for ${pendingCases.length} pending/unsynced cases...`);

      let syncedCount = 0;
      let errorCount = 0;

      for (const item of pendingCases) {
        try {
          const payload = {
            caseId: item.caseId,
            crop: item.crop,
            observations: item.observations,
            localDecision: item.localDecision,
            createdAt: item.createdAt
          };

          const response = await fetch('/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            throw new Error(`Server returned HTTP ${response.status}`);
          }

          const result = await response.json();
          const cloudDecision = result.cloudDecision;

          // 1. Save cloud decision safely in its own store (LOCAL DECISION IS NEVER OVERWRITTEN)
          await saveCloudDecision(cloudDecision);

          // 2. Perform reconciliation comparison
          const reconciliation = reconcileDecisions(item.localDecision, cloudDecision);

          // 3. Update sync record
          const updatedSyncRecord = {
            caseId: item.caseId,
            syncStatus: 'synced',
            lastSyncAttempt: new Date().toISOString(),
            retryCount: (item.syncRecord?.retryCount || 0) + 1,
            reconciliationStatus: reconciliation.status,
            reconciliationSummary: reconciliation.summary,
            reconciliationDetails: reconciliation.details,
            conflictAlert: reconciliation.conflictAlert,
            errorMessage: null,
            updatedAt: new Date().toISOString()
          };

          await updateSyncRecord(updatedSyncRecord);
          syncedCount++;
        } catch (itemErr) {
          console.error(`[SyncManager] Failed to sync case ${item.caseId}:`, itemErr);
          errorCount++;

          const failedSyncRecord = {
            caseId: item.caseId,
            syncStatus: 'failed',
            lastSyncAttempt: new Date().toISOString(),
            retryCount: (item.syncRecord?.retryCount || 0) + 1,
            reconciliationStatus: item.syncRecord?.reconciliationStatus || 'Sync Failed',
            errorMessage: itemErr.message || 'Network sync error',
            updatedAt: new Date().toISOString()
          };
          await updateSyncRecord(failedSyncRecord);
        }
      }

      this.isSyncing = false;
      this.notify();

      return {
        success: true,
        count: syncedCount,
        errorCount,
        message: `Synchronization complete. Synced: ${syncedCount}, Failed: ${errorCount}`
      };
    } catch (err) {
      console.error('[SyncManager] Critical error during batch sync:', err);
      this.isSyncing = false;
      this.notify();
      return { success: false, message: err.message };
    }
  }

  /**
   * Synchronizes a single specific case by its caseId (e.g. on Retry Sync click)
   */
  async syncSingleCase(caseId) {
    const isOnline = await this.checkServerConnectivity();
    if (!isOnline) {
      return {
        success: false,
        message: 'Cannot sync: Backend server is currently unreachable. Case remains safely stored locally.'
      };
    }

    const item = await getCaseById(caseId);
    if (!item) {
      return { success: false, message: 'Case not found in local storage.' };
    }

    this.isSyncing = true;
    this.notify();

    try {
      const payload = {
        caseId: item.caseId,
        crop: item.crop,
        observations: item.observations,
        localDecision: item.localDecision,
        createdAt: item.createdAt
      };

      const response = await fetch('/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const result = await response.json();
      const cloudDecision = result.cloudDecision;

      // 1. Save cloud decision safely in its own store
      await saveCloudDecision(cloudDecision);

      // 2. Perform reconciliation comparison
      const reconciliation = reconcileDecisions(item.localDecision, cloudDecision);

      // 3. Update sync record
      const updatedSyncRecord = {
        caseId: item.caseId,
        syncStatus: 'synced',
        lastSyncAttempt: new Date().toISOString(),
        retryCount: (item.syncRecord?.retryCount || 0) + 1,
        reconciliationStatus: reconciliation.status,
        reconciliationSummary: reconciliation.summary,
        reconciliationDetails: reconciliation.details,
        conflictAlert: reconciliation.conflictAlert,
        errorMessage: null,
        updatedAt: new Date().toISOString()
      };

      await updateSyncRecord(updatedSyncRecord);

      this.isSyncing = false;
      this.notify();

      return {
        success: true,
        message: `Case ${caseId} successfully synced and reconciled with Cloud AI!`
      };
    } catch (err) {
      console.error(`[SyncManager] Failed to sync single case ${caseId}:`, err);
      const failedSyncRecord = {
        caseId: item.caseId,
        syncStatus: 'failed',
        lastSyncAttempt: new Date().toISOString(),
        retryCount: (item.syncRecord?.retryCount || 0) + 1,
        reconciliationStatus: item.syncRecord?.reconciliationStatus || 'Sync Failed',
        errorMessage: err.message || 'Network sync error',
        updatedAt: new Date().toISOString()
      };
      await updateSyncRecord(failedSyncRecord);

      this.isSyncing = false;
      this.notify();

      return {
        success: false,
        message: `Sync failed for case ${caseId}: ${err.message}`
      };
    }
  }
}

export const syncManager = new SyncManager();
