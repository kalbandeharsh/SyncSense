/**
 * SyncSense AI - Local Storage (IndexedDB)
 * 
 * Provides robust offline data persistence for cases, local decisions,
 * cloud decisions, and synchronization records without data loss or blind overwrites.
 */

const DB_NAME = 'SyncSenseDB';
const DB_VERSION = 1;

let dbInstance = null;

/**
 * Initializes or opens the IndexedDB database.
 * Creates the required object stores and indexes.
 */
export function openDB() {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  return new Promise((resolve, reject) => {
    // Check IndexedDB availability (browser environment)
    if (typeof indexedDB === 'undefined') {
      console.warn('[Storage] IndexedDB not available in current environment.');
      return resolve(null);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // 1. Cases Store
      if (!db.objectStoreNames.contains('cases')) {
        const caseStore = db.createObjectStore('cases', { keyPath: 'caseId' });
        caseStore.createIndex('createdAt', 'createdAt', { unique: false });
        caseStore.createIndex('syncStatus', 'syncStatus', { unique: false });
      }

      // 2. Local Decisions Store
      if (!db.objectStoreNames.contains('local_decisions')) {
        const localStore = db.createObjectStore('local_decisions', { keyPath: 'decisionId' });
        localStore.createIndex('caseId', 'caseId', { unique: false });
      }

      // 3. Cloud Decisions Store
      if (!db.objectStoreNames.contains('cloud_decisions')) {
        const cloudStore = db.createObjectStore('cloud_decisions', { keyPath: 'decisionId' });
        cloudStore.createIndex('caseId', 'caseId', { unique: false });
      }

      // 4. Sync Records Store
      if (!db.objectStoreNames.contains('sync_records')) {
        const syncStore = db.createObjectStore('sync_records', { keyPath: 'caseId' });
        syncStore.createIndex('syncStatus', 'syncStatus', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.error('[Storage] IndexedDB error:', event.target.error);
      reject(event.target.error);
    };
  });
}

/**
 * Helper to perform an IndexedDB transaction.
 */
async function getStore(storeName, mode = 'readonly') {
  const db = await openDB();
  if (!db) return null;
  const tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
}

/**
 * Saves a new agricultural case along with its initial local rule decision and pending sync state.
 * Guaranteed atomic transaction: case, decision, and sync record are saved together.
 */
export async function saveNewCase(caseData, localDecision) {
  const db = await openDB();
  if (!db) return null;

  return new Promise((resolve, reject) => {
    const tx = db.transaction(['cases', 'local_decisions', 'sync_records'], 'readwrite');

    const initialSyncRecord = {
      caseId: caseData.caseId,
      syncStatus: 'pending',
      lastSyncAttempt: null,
      retryCount: 0,
      reconciliationStatus: 'Not Reconciled',
      conflictExplanation: null,
      errorMessage: null,
      updatedAt: new Date().toISOString()
    };

    tx.objectStore('cases').put(caseData);
    tx.objectStore('local_decisions').put(localDecision);
    tx.objectStore('sync_records').put(initialSyncRecord);

    tx.oncomplete = () => resolve({ caseData, localDecision, initialSyncRecord });
    tx.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Retrieves a single case by ID.
 */
export async function getCaseById(caseId) {
  const store = await getStore('cases', 'readonly');
  if (!store) return null;
  return new Promise((resolve, reject) => {
    const req = store.get(caseId);
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Retrieves local decision for a case.
 */
export async function getLocalDecisionByCaseId(caseId) {
  const store = await getStore('local_decisions', 'readonly');
  if (!store) return null;
  return new Promise((resolve, reject) => {
    const index = store.index('caseId');
    const req = index.get(caseId);
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Retrieves cloud decision for a case.
 */
export async function getCloudDecisionByCaseId(caseId) {
  const store = await getStore('cloud_decisions', 'readonly');
  if (!store) return null;
  return new Promise((resolve, reject) => {
    const index = store.index('caseId');
    const req = index.get(caseId);
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Retrieves sync record for a case.
 */
export async function getSyncRecordByCaseId(caseId) {
  const store = await getStore('sync_records', 'readonly');
  if (!store) return null;
  return new Promise((resolve, reject) => {
    const req = store.get(caseId);
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Saves a cloud decision without touching or overwriting the local decision.
 */
export async function saveCloudDecision(cloudDecision) {
  const store = await getStore('cloud_decisions', 'readwrite');
  if (!store) return null;
  return new Promise((resolve, reject) => {
    const req = store.put(cloudDecision);
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Updates the sync record for a case (e.g. after sync attempt and reconciliation).
 */
export async function updateSyncRecord(syncRecord) {
  const db = await openDB();
  if (!db) return null;

  return new Promise((resolve, reject) => {
    const tx = db.transaction(['sync_records', 'cases'], 'readwrite');
    const syncStore = tx.objectStore('sync_records');
    const caseStore = tx.objectStore('cases');

    syncStore.put(syncRecord);

    // Also update case.syncStatus for quick querying
    const getCaseReq = caseStore.get(syncRecord.caseId);
    getCaseReq.onsuccess = () => {
      const caseItem = getCaseReq.result;
      if (caseItem) {
        caseItem.syncStatus = syncRecord.syncStatus;
        caseStore.put(caseItem);
      }
    };

    tx.oncomplete = () => resolve(syncRecord);
    tx.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Fetches all cases together with their local decision, cloud decision, and sync status.
 */
export async function getAllCasesFull() {
  const db = await openDB();
  if (!db) return [];

  return new Promise((resolve, reject) => {
    const tx = db.transaction(['cases', 'local_decisions', 'cloud_decisions', 'sync_records'], 'readonly');
    const casesReq = tx.objectStore('cases').getAll();
    const localReq = tx.objectStore('local_decisions').getAll();
    const cloudReq = tx.objectStore('cloud_decisions').getAll();
    const syncReq = tx.objectStore('sync_records').getAll();

    tx.oncomplete = () => {
      const cases = casesReq.result || [];
      const localList = localReq.result || [];
      const cloudList = cloudReq.result || [];
      const syncList = syncReq.result || [];

      // Map by caseId
      const localMap = new Map(localList.map(l => [l.caseId, l]));
      const cloudMap = new Map(cloudList.map(c => [c.caseId, c]));
      const syncMap = new Map(syncList.map(s => [s.caseId, s]));

      const fullList = cases.map(c => ({
        ...c,
        localDecision: localMap.get(c.caseId) || null,
        cloudDecision: cloudMap.get(c.caseId) || null,
        syncRecord: syncMap.get(c.caseId) || null
      }));

      // Sort newest first
      fullList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      resolve(fullList);
    };

    tx.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Returns summary statistics for the dashboard.
 */
export async function getDashboardStats() {
  const cases = await getAllCasesFull();
  const total = cases.length;
  let pending = 0;
  let conflicts = 0;
  let synced = 0;

  for (const c of cases) {
    if (c.syncStatus !== 'synced') pending++;
    if (c.syncStatus === 'synced') synced++;
    if (c.syncRecord?.reconciliationStatus === 'Conflict Detected') conflicts++;
  }

  return { total, pending, conflicts, synced };
}
