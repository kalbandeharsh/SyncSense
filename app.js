/**
 * SyncSense AI - Main Application Controller
 * 
 * Orchestrates screen routing, form processing, local rule engine execution,
 * IndexedDB persistence, Service Worker lifecycle, and intelligence reconciliation views.
 */

import { evaluateObservations } from './js/rule-engine.js';
import { 
  saveNewCase, 
  getAllCasesFull, 
  getDashboardStats, 
  getCaseById, 
  getLocalDecisionByCaseId, 
  getCloudDecisionByCaseId,
  getSyncRecordByCaseId
} from './js/storage.js';
import { syncManager } from './js/sync-manager.js';
import { RECONCILIATION_STATUS } from './js/reconciliation.js';
import { 
  initI18n, 
  getCurrentLanguage, 
  setLanguage, 
  t, 
  translateAssessment, 
  translateExplanation,
  translateRecommendation,
  translateEvidence,
  translateRuleName,
  translateSummary,
  speakText, 
  stopSpeaking, 
  isSpeaking 
} from './js/i18n.js';

// State container
const AppState = {
  currentView: 'screen-dashboard',
  currentCaseDraft: null,
  currentEvaluation: null,
  activeFilter: 'all',
  selectedCaseId: null
};

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
  initI18n();
  initMultilingual();
  initTTSHandlers();
  initServiceWorker();
  initNavigation();
  initFormHandlers();
  initDemoScenarios();
  initSyncManager();
  await refreshDashboard();
});

/**
 * Initializes language toggle buttons and applies initial translations
 */
function initMultilingual() {
  const lang = getCurrentLanguage();
  document.documentElement.lang = lang;

  // Set active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.addEventListener('click', (e) => {
      const selected = e.currentTarget.dataset.lang;
      if (!selected) return;

      setLanguage(selected);
      document.documentElement.lang = selected;

      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');

      applyLanguageToDOM(selected);

      // Re-render active screen contents if needed
      if (AppState.currentView === 'screen-assessment' && AppState.currentEvaluation) {
        displayLocalAssessment(AppState.currentCaseDraft?.observations, AppState.currentEvaluation);
      } else if (AppState.currentView === 'screen-cases') {
        loadCasesList();
      } else if (AppState.currentView === 'screen-reconciliation' && AppState.selectedCaseId) {
        openReconciliationView(AppState.selectedCaseId);
      }

      const langNames = { en: 'English', hi: 'हिंदी', mr: 'मराठी' };
      showToast(`Language set to ${langNames[selected] || selected}`, 'info');
    });
  });

  applyLanguageToDOM(lang);
}

/**
 * Dynamically translates all UI elements and form controls
 */
function applyLanguageToDOM(lang = getCurrentLanguage()) {
  // Brand & Header
  const brandSub = document.querySelector('.brand-subtitle');
  if (brandSub) brandSub.textContent = t('brandSubtitle');
  const syncBtnLabel = document.querySelector('.sync-btn-label');
  if (syncBtnLabel) syncBtnLabel.textContent = t('syncNow');

  // Dashboard Header
  const dashH2 = document.querySelector('#screen-dashboard .view-header h2');
  if (dashH2) dashH2.textContent = t('dashTitle');
  const dashP = document.querySelector('#screen-dashboard .section-desc');
  if (dashP) dashP.textContent = t('dashSubtitle');

  const btnDashNew = document.getElementById('btn-dash-new-case');
  if (btnDashNew) btnDashNew.innerHTML = `<span class="btn-icon">➕</span> ${t('btnNewObservation')}`;
  const btnDashView = document.getElementById('btn-dash-view-cases');
  if (btnDashView) {
    const count = document.getElementById('dash-btn-count')?.textContent || '0';
    btnDashView.innerHTML = `<span class="btn-icon">📋</span> ${t('btnViewCases')} (<span id="dash-btn-count">${count}</span>)`;
  }

  // Dashboard Stat Card Labels
  const statLabels = document.querySelectorAll('.stat-data .stat-label');
  if (statLabels.length >= 4) {
    statLabels[0].textContent = t('statTotalCases');
    statLabels[1].textContent = t('statPendingSync');
    statLabels[2].textContent = t('statConflictsPreserved');
    statLabels[3].textContent = t('statFullyReconciled');
  }

  // Innovation Callout
  const calloutText = document.querySelector('.callout-text');
  if (calloutText) {
    calloutText.innerHTML = `<strong>${t('edgeTitle')}</strong> ${t('edgeDesc')}`;
  }

  // Demo Panel
  const panelH3 = document.querySelector('.panel-header h3');
  if (panelH3) panelH3.textContent = t('demoTitle');
  const panelBadge = document.querySelector('.panel-badge');
  if (panelBadge) panelBadge.textContent = t('demoBadge');
  const panelSub = document.querySelector('.panel-sub');
  if (panelSub) panelSub.textContent = t('demoDesc');

  // Demo Buttons
  const d1Title = document.querySelector('#demo-scenario-1 .demo-btn-title');
  if (d1Title) d1Title.textContent = t('scenario1Title');
  const d1Desc = document.querySelector('#demo-scenario-1 .demo-btn-desc');
  if (d1Desc) d1Desc.textContent = t('scenario1Desc');

  const d2Title = document.querySelector('#demo-scenario-2 .demo-btn-title');
  if (d2Title) d2Title.textContent = t('scenario2Title');
  const d2Desc = document.querySelector('#demo-scenario-2 .demo-btn-desc');
  if (d2Desc) d2Desc.textContent = t('scenario2Desc');

  const d3Title = document.querySelector('#demo-scenario-3 .demo-btn-title');
  if (d3Title) d3Title.textContent = t('scenario3Title');
  const d3Desc = document.querySelector('#demo-scenario-3 .demo-btn-desc');
  if (d3Desc) d3Desc.textContent = t('scenario3Desc');

  // Offline Checklist
  const infoH3 = document.querySelector('.info-card h3');
  if (infoH3) infoH3.textContent = t('offlineTitle');
  const infoLis = document.querySelectorAll('.info-checklist li');
  if (infoLis.length >= 4) {
    infoLis[0].innerHTML = `<strong>${t('offlineRule').split(':')[0]}:</strong> ${t('offlineRule').split(':')[1] || ''}`;
    infoLis[1].innerHTML = `<strong>${t('offlineDB').split(':')[0]}:</strong> ${t('offlineDB').split(':')[1] || ''}`;
    infoLis[2].innerHTML = `<strong>${t('offlineSW').split(':')[0]}:</strong> ${t('offlineSW').split(':')[1] || ''}`;
    infoLis[3].innerHTML = `<strong>${t('offlineSync').split(':')[0]}:</strong> ${t('offlineSync').split(':')[1] || ''}`;
  }

  // Form Screen
  const formBack = document.getElementById('btn-form-back-dash');
  if (formBack) formBack.textContent = t('backToDashboard');
  const formH2 = document.querySelector('#screen-form .view-header h2');
  if (formH2) formH2.textContent = t('formTitle');
  const formSub = document.querySelector('#screen-form .section-desc');
  if (formSub) formSub.textContent = t('formSubtitle');
  const offBadge = document.querySelector('.badge-offline-ready');
  if (offBadge) offBadge.textContent = t('offlineReadyBadge');

  // Form Labels
  const labels = document.querySelectorAll('#observation-form .form-label');
  if (labels.length >= 6) {
    labels[0].textContent = t('labelCrop');
    labels[1].textContent = t('labelSoil');
    labels[2].textContent = t('labelLeafColor');
    labels[3].textContent = t('labelLeafSpots');
    labels[4].textContent = t('labelPlantCondition');
    labels[5].textContent = t('labelNotes');
  }

  // Form Select Options
  const selCrop = document.getElementById('input-crop');
  if (selCrop) {
    const currentVal = selCrop.value || 'Cotton';
    selCrop.innerHTML = `
      <option value="Cotton"${currentVal === 'Cotton' ? ' selected' : ''}>${t('cropOptionCotton')}</option>
      <option value="Soybean"${currentVal === 'Soybean' ? ' selected' : ''}>${t('cropOptionSoybean')}</option>
      <option value="Wheat"${currentVal === 'Wheat' ? ' selected' : ''}>${t('cropOptionWheat')}</option>
      <option value="Rice"${currentVal === 'Rice' ? ' selected' : ''}>${t('cropOptionRice')}</option>
      <option value="Maize"${currentVal === 'Maize' ? ' selected' : ''}>${t('cropOptionMaize')}</option>
    `;
  }
  const cropHint = document.querySelector('.field-hint');
  if (cropHint) cropHint.textContent = t('cropHint');

  const selSoil = document.getElementById('input-soil');
  if (selSoil && selSoil.options.length >= 6) {
    selSoil.options[0].textContent = t('soilSelectDefault');
    selSoil.options[1].textContent = t('soilDry');
    selSoil.options[2].textContent = t('soilCracked');
    selSoil.options[3].textContent = t('soilMoist');
    selSoil.options[4].textContent = t('soilWet');
    selSoil.options[5].textContent = t('soilWaterlogged');
  }

  const selLeaf = document.getElementById('input-leaf-color');
  if (selLeaf && selLeaf.options.length >= 7) {
    selLeaf.options[0].textContent = t('leafSelectDefault');
    selLeaf.options[1].textContent = t('leafGreen');
    selLeaf.options[2].textContent = t('leafDarkGreen');
    selLeaf.options[3].textContent = t('leafYellow');
    selLeaf.options[4].textContent = t('leafPaleGreen');
    selLeaf.options[5].textContent = t('leafPurple');
    selLeaf.options[6].textContent = t('leafBrown');
  }

  const selSpots = document.getElementById('input-leaf-spots');
  if (selSpots && selSpots.options.length >= 4) {
    selSpots.options[0].textContent = t('spotsNone');
    selSpots.options[1].textContent = t('spotsBrownCircular');
    selSpots.options[2].textContent = t('spotsWaterSoaked');
    selSpots.options[3].textContent = t('spotsGeneral');
  }

  const selPlant = document.getElementById('input-plant-condition');
  if (selPlant && selPlant.options.length >= 5) {
    selPlant.options[0].textContent = t('plantSelectDefault');
    selPlant.options[1].textContent = t('plantHealthy');
    selPlant.options[2].textContent = t('plantWilting');
    selPlant.options[3].textContent = t('plantStunted');
    selPlant.options[4].textContent = t('plantShedding');
  }

  const notesInput = document.getElementById('input-notes');
  if (notesInput) notesInput.placeholder = t('notesPlaceholder');

  const btnClear = document.getElementById('btn-clear-form');
  if (btnClear) btnClear.textContent = t('btnClearForm');
  const btnRun = document.getElementById('btn-run-assessment');
  if (btnRun) btnRun.innerHTML = `<span class="btn-icon">⚡</span> ${t('btnRunAssessment')}`;

  // Local Assessment Screen
  const assessH2 = document.querySelector('#screen-assessment .view-header h2');
  if (assessH2) assessH2.textContent = t('assessTitle');
  const assessBack = document.getElementById('btn-assess-back-form');
  if (assessBack) assessBack.textContent = `← ${t('formTitle')}`;
  const assessLabel = document.querySelector('.assessment-label');
  if (assessLabel) assessLabel.textContent = t('labelPreliminaryFinding');

  const subtitles = document.querySelectorAll('#screen-assessment .section-subtitle, #screen-assessment .meta-title');
  if (subtitles.length >= 3) {
    subtitles[0].textContent = t('titleExplanation');
    subtitles[1].textContent = t('titleMatchedRules');
    subtitles[2].textContent = t('titleEvidence');
  }

  const recBoxH4 = document.querySelector('#res-rec-box h4');
  if (recBoxH4) recBoxH4.textContent = t('titleFieldAction');

  const discStrong = document.querySelector('.disclaimer-text strong');
  if (discStrong) discStrong.textContent = t('safetyNoticeTitle');
  const discSpan = document.getElementById('res-disclaimer-text');
  if (discSpan) discSpan.textContent = t('safetyNoticeText');

  const btnAssessNew = document.getElementById('btn-assess-new');
  if (btnAssessNew) btnAssessNew.textContent = t('btnNewObservationAssess');
  const btnSave = document.getElementById('btn-save-case');
  if (btnSave && !btnSave.disabled) btnSave.innerHTML = `<span class="btn-icon">💾</span> ${t('btnSaveCase')}`;
  const ttsLabel = document.getElementById('tts-label');
  if (ttsLabel && !isSpeaking()) ttsLabel.textContent = t('btnListenVoice');

  // Cases Explorer Screen
  const casesH2 = document.querySelector('#screen-cases .view-header h2');
  if (casesH2) casesH2.textContent = t('casesTitle');
  const casesSub = document.querySelector('#screen-cases .section-desc');
  if (casesSub) casesSub.textContent = t('casesSubtitle');
  const casesBack = document.getElementById('btn-cases-back-dash');
  if (casesBack) casesBack.textContent = t('backToDashboard');

  // Update tabs
  const tabBtns = document.querySelectorAll('.filter-tabs .tab-btn');
  if (tabBtns.length >= 4) {
    const cAll = document.getElementById('filter-count-all')?.textContent || '0';
    const cPen = document.getElementById('filter-count-pending')?.textContent || '0';
    const cSyn = document.getElementById('filter-count-synced')?.textContent || '0';
    const cCon = document.getElementById('filter-count-conflicts')?.textContent || '0';

    tabBtns[0].innerHTML = `${t('filterAll')} (<span id="filter-count-all">${cAll}</span>)`;
    tabBtns[1].innerHTML = `${t('filterPending')} (<span id="filter-count-pending">${cPen}</span>)`;
    tabBtns[2].innerHTML = `${t('filterSynced')} (<span id="filter-count-synced">${cSyn}</span>)`;
    tabBtns[3].innerHTML = `${t('filterConflicts')} (<span id="filter-count-conflicts">${cCon}</span>)`;
  }

  // Reconciliation View
  const reconH2 = document.querySelector('#screen-reconciliation .view-header h2');
  if (reconH2) reconH2.textContent = t('reconTitle');
  const reconSub = document.querySelector('#screen-reconciliation .section-desc');
  if (reconSub) reconSub.textContent = t('reconSubtitle');
  const reconBack = document.getElementById('btn-recon-back-cases');
  if (reconBack) reconBack.textContent = t('btnBackCases');
  const reconTTS = document.getElementById('recon-tts-label');
  if (reconTTS && !isSpeaking()) reconTTS.textContent = t('reconVoiceGuide');

  const cardTitles = document.querySelectorAll('.decision-title');
  if (cardTitles.length >= 2) {
    cardTitles[0].textContent = t('localDecisionTitle');
    cardTitles[1].textContent = t('cloudDecisionTitle');
  }

  const cardTags = document.querySelectorAll('.decision-source-tag');
  if (cardTags.length >= 2) {
    cardTags[0].textContent = t('tagLocalRuleEngine');
    cardTags[1].textContent = t('tagCloudAI');
  }

  const badgesPreserved = document.querySelectorAll('.badge-preserved');
  badgesPreserved.forEach(b => {
    b.textContent = t('badgePreserved');
  });

  const fieldLabels = document.querySelectorAll('#screen-reconciliation .field-label');
  if (fieldLabels.length >= 7) {
    fieldLabels[0].textContent = t('reconAssessmentLabel');
    fieldLabels[1].textContent = t('reconMatchedRulesLabel');
    fieldLabels[2].textContent = t('reconEvidenceLabel');
    fieldLabels[3].textContent = t('reconReasoningLabel');
    fieldLabels[4].textContent = t('reconAssessmentLabel');
    fieldLabels[5].textContent = t('reconEvidenceLabel');
    fieldLabels[6].textContent = t('reconCloudReasoningLabel');
    if (fieldLabels[7]) fieldLabels[7].textContent = t('reconLimitationsLabel');
  }

  const auditH4 = document.querySelector('.audit-header h4');
  if (auditH4) auditH4.textContent = t('auditTrailTitle');
  const auditBadge = document.querySelector('.audit-header .badge');
  if (auditBadge) auditBadge.textContent = t('reconAuditBadge');
  const auditDesc = document.querySelector('.audit-desc');
  if (auditDesc) auditDesc.textContent = t('auditTrailDesc');

  // Update network status UI to reflect new language
  updateNetworkStatusUI(syncManager.getStatus());
}

/**
 * Sets up Voice (Speech Synthesis / Google TTS) handlers for reading assessments and summaries aloud
 */
function initTTSHandlers() {
  const btnAssessTTS = document.getElementById('btn-assess-tts');
  const ttsLabel = document.getElementById('tts-label');
  const ttsIcon = document.getElementById('tts-icon');

  btnAssessTTS?.addEventListener('click', () => {
    if (isSpeaking()) {
      stopSpeaking();
      btnAssessTTS.classList.remove('tts-playing');
      if (ttsLabel) ttsLabel.textContent = t('btnListenVoice');
      if (ttsIcon) ttsIcon.textContent = '🔊';
      return;
    }

    const lang = getCurrentLanguage();
    const heading = document.getElementById('res-assessment-text')?.textContent || '';
    const explanation = document.getElementById('res-explanation-text')?.textContent || '';
    const recommendation = document.getElementById('res-recommendation-text')?.textContent || '';
    const safety = document.getElementById('res-disclaimer-text')?.textContent || '';

    let textToRead = '';
    if (lang === 'hi') {
      textToRead = `सिंकसेंस स्थानीय मूल्यांकन: ${heading}। कारण: ${explanation}। खेत कार्य सलाह: ${recommendation}। सुरक्षा सूचना: ${safety}।`;
    } else if (lang === 'mr') {
      textToRead = `सिंकसेन्स स्थानिक निष्कर्ष: ${heading}। कारणे: ${explanation}। शेतातील कृती सल्ला: ${recommendation}। सुरक्षा सूचना: ${safety}।`;
    } else {
      textToRead = `SyncSense Local Assessment: ${heading}. Reasoning: ${explanation}. Suggested Action: ${recommendation}. Safety notice: ${safety}.`;
    }

    btnAssessTTS.classList.add('tts-playing');
    if (ttsLabel) ttsLabel.textContent = t('btnStopVoice');
    if (ttsIcon) ttsIcon.textContent = '⏹️';

    speakText(textToRead, lang, () => {
      btnAssessTTS.classList.remove('tts-playing');
      if (ttsLabel) ttsLabel.textContent = t('btnListenVoice');
      if (ttsIcon) ttsIcon.textContent = '🔊';
    });
  });

  // Reconciliation Screen TTS Button
  const btnReconTTS = document.getElementById('btn-recon-tts');
  const reconTTSLabel = document.getElementById('recon-tts-label');
  const reconTTSIcon = document.getElementById('recon-tts-icon');

  btnReconTTS?.addEventListener('click', () => {
    if (isSpeaking()) {
      stopSpeaking();
      btnReconTTS.classList.remove('tts-playing');
      if (reconTTSLabel) reconTTSLabel.textContent = t('reconVoiceGuide');
      if (reconTTSIcon) reconTTSIcon.textContent = '🔊';
      return;
    }

    const lang = getCurrentLanguage();
    const bannerTitle = document.getElementById('recon-banner-title')?.textContent || '';
    const bannerDesc = document.getElementById('recon-banner-desc')?.textContent || '';
    const localAss = document.getElementById('recon-local-assessment')?.textContent || '';
    const cloudAss = document.getElementById('recon-cloud-assessment')?.textContent || '';

    let textToRead = '';
    if (lang === 'hi') {
      textToRead = `तुलना स्थिति: ${bannerTitle}। विवरण: ${bannerDesc}। स्थानीय नियम का निर्णय: ${localAss}। क्लाउड AI का निर्णय: ${cloudAss}।`;
    } else if (lang === 'mr') {
      textToRead = `तुलना स्थिती: ${bannerTitle}। माहिती: ${bannerDesc}। स्थानिक नियमांचा निर्णय: ${localAss}। क्लाउड AI चा निर्णय: ${cloudAss}।`;
    } else {
      textToRead = `Reconciliation Status: ${bannerTitle}. Details: ${bannerDesc}. Local Decision: ${localAss}. Cloud Decision: ${cloudAss}.`;
    }

    btnReconTTS.classList.add('tts-playing');
    if (reconTTSLabel) reconTTSLabel.textContent = t('reconStopVoice');
    if (reconTTSIcon) reconTTSIcon.textContent = '⏹️';

    speakText(textToRead, lang, () => {
      btnReconTTS.classList.remove('tts-playing');
      if (reconTTSLabel) reconTTSLabel.textContent = t('reconVoiceGuide');
      if (reconTTSIcon) reconTTSIcon.textContent = '🔊';
    });
  });
}

/**
 * Registers Service Worker for offline shell caching
 */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('[App] Service Worker registered with scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[App] Service Worker registration failed:', err);
        });
    });
  }
}

/**
 * Subscribes to network and sync state updates
 */
function initSyncManager() {
  syncManager.init();

  syncManager.subscribe((status) => {
    updateNetworkStatusUI(status);
  });

  // Header Sync Button
  const btnHeaderSync = document.getElementById('btn-header-sync');
  if (btnHeaderSync) {
    btnHeaderSync.addEventListener('click', async () => {
      showToast('Initiating cloud synchronization...', 'info');
      const result = await syncManager.triggerSync();
      showToast(result.message, result.success ? 'success' : 'error');
      await refreshDashboard();
      if (AppState.currentView === 'screen-cases') {
        await loadCasesList();
      }
      if (AppState.currentView === 'screen-reconciliation' && AppState.selectedCaseId) {
        await openReconciliationView(AppState.selectedCaseId);
      }
    });
  }

  // Cases Screen Sync Button
  const btnCasesSync = document.getElementById('btn-cases-sync');
  if (btnCasesSync) {
    btnCasesSync.addEventListener('click', async () => {
      showToast('Syncing pending cases...', 'info');
      const result = await syncManager.triggerSync();
      showToast(result.message, result.success ? 'success' : 'error');
      await refreshDashboard();
      await loadCasesList();
    });
  }
}

/**
 * Updates navbar connectivity badge
 */
function updateNetworkStatusUI(status) {
  const badge = document.getElementById('network-status-badge');
  const dot = badge?.querySelector('.status-dot');
  const text = document.getElementById('network-status-text');
  const syncBtn = document.getElementById('btn-header-sync');

  if (!badge || !text || !dot) return;

  dot.className = 'status-dot';

  if (status.isSyncing) {
    dot.classList.add('syncing');
    text.textContent = t('networkSyncing');
    if (syncBtn) syncBtn.disabled = true;
  } else if (!status.isOnline) {
    dot.classList.add('offline');
    text.textContent = t('networkOffline');
    if (syncBtn) syncBtn.disabled = true;
  } else if (status.isBackendReachable) {
    dot.classList.add('online');
    text.textContent = t('networkOnline');
    if (syncBtn) syncBtn.disabled = false;
  } else {
    dot.classList.add('offline');
    text.textContent = t('networkUnreachable');
    if (syncBtn) syncBtn.disabled = false;
  }
}

// ============================================================
// SCREEN ROUTING & NAVIGATION
// ============================================================
function showScreen(screenId) {
  document.querySelectorAll('.screen-view').forEach(view => {
    view.classList.remove('active');
  });

  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    AppState.currentView = screenId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function initNavigation() {
  // Brand click -> Home
  document.getElementById('brand-home-btn')?.addEventListener('click', async () => {
    showScreen('screen-dashboard');
    await refreshDashboard();
  });

  // Dashboard buttons
  document.getElementById('btn-dash-new-case')?.addEventListener('click', () => {
    showScreen('screen-form');
  });

  document.getElementById('btn-dash-view-cases')?.addEventListener('click', async () => {
    showScreen('screen-cases');
    await loadCasesList();
  });

  // Form back button
  document.getElementById('btn-form-back-dash')?.addEventListener('click', () => {
    showScreen('screen-dashboard');
  });

  // Assessment screen buttons
  document.getElementById('btn-assess-back-form')?.addEventListener('click', () => {
    showScreen('screen-form');
  });

  document.getElementById('btn-assess-new')?.addEventListener('click', () => {
    resetObservationForm();
    showScreen('screen-form');
  });

  // Cases screen buttons
  document.getElementById('btn-cases-back-dash')?.addEventListener('click', async () => {
    showScreen('screen-dashboard');
    await refreshDashboard();
  });

  document.getElementById('btn-cases-new')?.addEventListener('click', () => {
    resetObservationForm();
    showScreen('screen-form');
  });

  document.getElementById('btn-empty-new-case')?.addEventListener('click', () => {
    resetObservationForm();
    showScreen('screen-form');
  });

  // Reconciliation back button
  document.getElementById('btn-recon-back-cases')?.addEventListener('click', async () => {
    showScreen('screen-cases');
    await loadCasesList();
  });

  // Filter tabs on Cases screen
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      AppState.activeFilter = e.target.dataset.filter || 'all';
      await loadCasesList();
    });
  });
}

// ============================================================
// SCREEN 1: DASHBOARD REFRESH
// ============================================================
async function refreshDashboard() {
  try {
    const stats = await getDashboardStats();

    document.getElementById('stat-total').textContent = stats.total;
    document.getElementById('stat-pending').textContent = stats.pending;
    document.getElementById('stat-conflicts').textContent = stats.conflicts;
    document.getElementById('stat-synced').textContent = stats.synced;
    document.getElementById('dash-btn-count').textContent = stats.total;
  } catch (err) {
    console.error('[App] Error refreshing dashboard stats:', err);
  }
}

// ============================================================
// SCREEN 2: OBSERVATION FORM & LOCAL EVALUATION
// ============================================================
function resetObservationForm() {
  const form = document.getElementById('observation-form');
  if (form) form.reset();
  AppState.currentCaseDraft = null;
  AppState.currentEvaluation = null;
}

function initFormHandlers() {
  const form = document.getElementById('observation-form');
  const btnClear = document.getElementById('btn-clear-form');
  const btnSave = document.getElementById('btn-save-case');

  btnClear?.addEventListener('click', () => {
    resetObservationForm();
    showToast('Observation form cleared', 'info');
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const crop = document.getElementById('input-crop')?.value || 'Cotton';
    const soilCondition = document.getElementById('input-soil')?.value;
    const leafColor = document.getElementById('input-leaf-color')?.value;
    const leafSpots = document.getElementById('input-leaf-spots')?.value;
    const plantCondition = document.getElementById('input-plant-condition')?.value;
    const additionalNotes = document.getElementById('input-notes')?.value;

    if (!soilCondition && !leafColor && !plantCondition) {
      showToast('Please select at least one primary field condition to run assessment.', 'error');
      return;
    }

    const observations = {
      crop,
      soilCondition,
      leafColor,
      leafSpots,
      plantCondition,
      additionalNotes
    };

    // Run Local Rule Engine completely offline
    const evaluation = evaluateObservations(observations);

    AppState.currentCaseDraft = {
      crop,
      observations,
      createdAt: new Date().toISOString()
    };
    AppState.currentEvaluation = evaluation;

    // Render results on Screen 3
    displayLocalAssessment(observations, evaluation);
    showScreen('screen-assessment');
  });

  // Save Case Button
  btnSave?.addEventListener('click', async () => {
    if (!AppState.currentCaseDraft || !AppState.currentEvaluation) {
      showToast('No active assessment to save.', 'error');
      return;
    }

    btnSave.disabled = true;
    btnSave.textContent = 'Saving locally...';

    try {
      const caseId = `CASE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const decisionId = `DEC-LOC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      const caseData = {
        caseId,
        crop: AppState.currentCaseDraft.crop,
        observations: AppState.currentCaseDraft.observations,
        createdAt: AppState.currentCaseDraft.createdAt,
        syncStatus: 'pending'
      };

      const localDecision = {
        decisionId,
        caseId,
        source: 'local',
        ruleVersion: AppState.currentEvaluation.ruleVersion,
        assessment: AppState.currentEvaluation.assessment,
        primaryCategory: AppState.currentEvaluation.primaryCategory,
        matchedRuleIds: AppState.currentEvaluation.matchedRuleIds,
        matchedRuleNames: AppState.currentEvaluation.matchedRuleNames,
        evidence: AppState.currentEvaluation.evidence,
        explanation: AppState.currentEvaluation.explanation,
        recommendation: AppState.currentEvaluation.recommendation,
        createdAt: new Date().toISOString()
      };

      await saveNewCase(caseData, localDecision);

      showToast(`Case ${caseId} saved locally to device storage!`, 'success');
      await refreshDashboard();

      // Reset button
      btnSave.disabled = false;
      btnSave.innerHTML = `<span class="btn-icon">💾</span> ${t('btnSavedCase')}`;

      // Prompt user or offer direct navigation to Cases
      setTimeout(() => {
        showScreen('screen-cases');
        loadCasesList();
      }, 700);

      // Attempt background sync if connected
      if (syncManager.getStatus().isBackendReachable) {
        syncManager.triggerSync().then(res => {
          if (res.count > 0) {
            showToast(`Auto-sync reconciled case with cloud AI!`, 'success');
            refreshDashboard();
            if (AppState.currentView === 'screen-cases') loadCasesList();
          }
        });
      }
    } catch (err) {
      console.error('[App] Failed to save case:', err);
      showToast('Error saving case to local storage: ' + err.message, 'error');
      btnSave.disabled = false;
      btnSave.innerHTML = `<span class="btn-icon">💾</span> ${t('btnSaveCase')}`;
    }
  });
}

// ============================================================
// SCREEN 3: LOCAL ASSESSMENT DISPLAY
// ============================================================
function displayLocalAssessment(observations, evaluation) {
  const lang = getCurrentLanguage();
  document.getElementById('res-rule-version').textContent = evaluation.ruleVersion;
  document.getElementById('res-footer-version').textContent = evaluation.ruleVersion;
  document.getElementById('res-assessment-text').textContent = translateAssessment(evaluation.assessment, lang);
  document.getElementById('res-explanation-text').textContent = translateExplanation(evaluation.explanation, lang);
  document.getElementById('res-recommendation-text').textContent = translateRecommendation(evaluation.recommendation, lang);
  document.getElementById('res-disclaimer-text').textContent = t('safetyNoticeText');
  document.getElementById('res-timestamp').textContent = new Date().toLocaleTimeString();

  const ttsLabel = document.getElementById('tts-label');
  if (ttsLabel && !isSpeaking()) ttsLabel.textContent = t('btnListenVoice');

  const statusBadge = document.getElementById('res-status-badge');
  statusBadge.textContent = evaluation.status;
  statusBadge.className = evaluation.matchedRuleIds.length > 0 ? 'badge badge-local' : 'badge badge-pending';

  // Matched Rules Tags
  const rulesContainer = document.getElementById('res-matched-rules');
  rulesContainer.innerHTML = '';
  if (evaluation.matchedRuleIds.length === 0) {
    rulesContainer.innerHTML = `<span class="badge badge-neutral">${t('noRulesMatched')}</span>`;
  } else {
    evaluation.matchedRuleIds.forEach((id, idx) => {
      const tag = document.createElement('span');
      tag.className = 'rule-tag';
      const translatedName = translateRuleName(evaluation.matchedRuleNames[idx] || '', lang);
      tag.textContent = `${id}: ${translatedName}`;
      rulesContainer.appendChild(tag);
    });
  }

  // Evidence List
  const evidenceList = document.getElementById('res-evidence-list');
  evidenceList.innerHTML = '';
  evaluation.evidence.forEach(item => {
    const li = document.createElement('li');
    li.textContent = translateEvidence(item, lang);
    evidenceList.appendChild(li);
  });

  // Reset Save button state
  const btnSave = document.getElementById('btn-save-case');
  if (btnSave) {
    btnSave.disabled = false;
    btnSave.innerHTML = `<span class="btn-icon">💾</span> Save to Local Cases`;
  }
}

// ============================================================
// SCREEN 4: CASES DASHBOARD DISPLAY
// ============================================================
async function loadCasesList() {
  const container = document.getElementById('cases-container');
  const emptyState = document.getElementById('cases-empty-state');
  if (!container) return;

  const allCases = await getAllCasesFull();

  // Update filter counters
  const total = allCases.length;
  const pending = allCases.filter(c => c.syncStatus !== 'synced').length;
  const synced = allCases.filter(c => c.syncStatus === 'synced').length;
  const conflicts = allCases.filter(c => c.syncRecord?.reconciliationStatus === RECONCILIATION_STATUS.CONFLICT).length;

  document.getElementById('filter-count-all').textContent = total;
  document.getElementById('filter-count-pending').textContent = pending;
  document.getElementById('filter-count-synced').textContent = synced;
  document.getElementById('filter-count-conflicts').textContent = conflicts;

  // Apply current filter
  let filtered = allCases;
  if (AppState.activeFilter === 'pending') {
    filtered = allCases.filter(c => c.syncStatus !== 'synced');
  } else if (AppState.activeFilter === 'synced') {
    filtered = allCases.filter(c => c.syncStatus === 'synced');
  } else if (AppState.activeFilter === 'conflicts') {
    filtered = allCases.filter(c => c.syncRecord?.reconciliationStatus === RECONCILIATION_STATUS.CONFLICT);
  }

  container.innerHTML = '';

  if (filtered.length === 0) {
    emptyState?.classList.remove('hidden');
    return;
  } else {
    emptyState?.classList.add('hidden');
  }

  filtered.forEach(c => {
    const card = document.createElement('div');
    card.className = 'case-card';

    // Status Badges
    const isPending = c.syncStatus === 'pending';
    const isSynced = c.syncStatus === 'synced';
    const isFailed = c.syncStatus === 'failed';
    const reconStatus = c.syncRecord?.reconciliationStatus || (isFailed ? 'Sync Failed' : 'Not Reconciled');

    let reconBadgeClass = 'badge-neutral';
    if (isSynced) {
      if (reconStatus === RECONCILIATION_STATUS.MATCH) reconBadgeClass = 'badge-match';
      else if (reconStatus === RECONCILIATION_STATUS.INSIGHT) reconBadgeClass = 'badge-insight';
      else if (reconStatus === RECONCILIATION_STATUS.CONFLICT) reconBadgeClass = 'badge-conflict';
    }

    const cropIcons = { Cotton: '🌱', Soybean: '🌿', Wheat: '🌾', Rice: '🌾', Maize: '🌽' };
    const cropIcon = cropIcons[c.crop] || '🌱';
    const currentLang = getCurrentLanguage();
    const localAss = translateAssessment(c.localDecision?.assessment || 'Pending', currentLang);
    const cloudAss = c.cloudDecision ? translateAssessment(c.cloudDecision.assessment, currentLang) : (isPending ? t('statusPendingSync') : (isFailed ? 'Sync Attempt Failed (Retry)' : 'Not available'));

    card.innerHTML = `
      <div class="case-card-header">
        <div>
          <h3 class="case-crop-title">${cropIcon} ${escapeHTML(c.crop)}</h3>
          <span class="case-id-sub">${escapeHTML(c.caseId)}</span>
        </div>
        <span class="badge ${isPending ? 'badge-pending' : (isSynced ? 'badge-synced' : 'badge-conflict')}">
          ${isPending ? t('badgePendingSync') : (isSynced ? t('badgeSynced') : (t('badgeSyncFailed') || '⚠️ Sync Failed'))}
        </span>
      </div>

      <div class="case-body">
        <div class="case-assessment-row">
          <span class="case-assessment-label">${t('tagLocalRuleEngine')}:</span>
          <div class="case-assessment-val">${escapeHTML(localAss)}</div>
        </div>

        <div class="case-assessment-row">
          <span class="case-assessment-label">${t('tagCloudAI')}:</span>
          <div class="case-assessment-val" style="color: ${c.cloudDecision ? '#0369a1' : '#64748b'}">
            ${escapeHTML(cloudAss)}
          </div>
        </div>

        <div class="case-badges-row">
          <span class="badge ${reconBadgeClass}">${escapeHTML(reconStatus)}</span>
          <span class="badge badge-preserved">${t('badgeLocalPreserved')}</span>
        </div>
      </div>

      <div class="case-card-footer">
        <span>${new Date(c.createdAt).toLocaleDateString()} ${new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <div style="display: flex; gap: 8px;">
          ${!isSynced ? `<button class="btn btn-outline btn-sm btn-retry-case-sync" data-case-id="${c.caseId}" title="Retry cloud synchronization">🔄 ${t('btnRetrySync') || 'Retry Sync'}</button>` : ''}
          <button class="btn btn-outline btn-sm btn-view-recon" data-case-id="${c.caseId}">
            ${t('viewReconciliation')}
          </button>
        </div>
      </div>
    `;

    card.querySelector('.btn-view-recon')?.addEventListener('click', () => {
      openReconciliationView(c.caseId);
    });

    card.querySelector('.btn-retry-case-sync')?.addEventListener('click', async (e) => {
      e.stopPropagation();
      showToast('Retrying synchronization with Cloud AI...', 'info');
      const res = await syncManager.syncSingleCase(c.caseId);
      showToast(res.message, res.success ? 'success' : 'error');
      await loadCasesList();
      await refreshDashboard();
    });

    container.appendChild(card);
  });
}

// ============================================================
// SCREEN 5: RECONCILIATION VIEW CONTROLLER
// ============================================================
async function openReconciliationView(caseId) {
  AppState.selectedCaseId = caseId;

  const caseItem = await getCaseById(caseId);
  const localDecision = await getLocalDecisionByCaseId(caseId);
  const cloudDecision = await getCloudDecisionByCaseId(caseId);
  const syncRecord = await getSyncRecordByCaseId(caseId);

  if (!caseItem) {
    showToast('Case not found', 'error');
    return;
  }

  const currentLang = getCurrentLanguage();

  document.getElementById('recon-case-id-badge').textContent = caseId;

  // Local Decision Card
  document.getElementById('recon-local-assessment').textContent = translateAssessment(localDecision?.assessment || 'No assessment', currentLang);
  document.getElementById('recon-local-explanation').textContent = translateExplanation(localDecision?.explanation || 'No explanation recorded.', currentLang);
  document.getElementById('recon-local-version').textContent = `v${localDecision?.ruleVersion || '1.0.0'}`;
  document.getElementById('recon-local-timestamp').textContent = localDecision ? new Date(localDecision.createdAt).toLocaleString() : '-';

  // Local Rules
  const localRulesContainer = document.getElementById('recon-local-rules');
  localRulesContainer.innerHTML = '';
  if (localDecision?.matchedRuleIds?.length > 0) {
    localDecision.matchedRuleIds.forEach((id, i) => {
      const tag = document.createElement('span');
      tag.className = 'rule-tag';
      const ruleName = translateRuleName(localDecision.matchedRuleNames?.[i] || '', currentLang);
      tag.textContent = `${id} ${ruleName}`;
      localRulesContainer.appendChild(tag);
    });
  } else {
    localRulesContainer.innerHTML = `<span class="badge badge-neutral">${t('noRulesMatched')}</span>`;
  }

  // Local Evidence
  const localEvidenceList = document.getElementById('recon-local-evidence');
  localEvidenceList.innerHTML = '';
  (localDecision?.evidence || []).forEach(ev => {
    const li = document.createElement('li');
    li.textContent = translateEvidence(ev, currentLang);
    localEvidenceList.appendChild(li);
  });

  // Cloud Decision Card
  const banner = document.getElementById('recon-status-banner');
  const bannerIcon = document.getElementById('recon-banner-icon');
  const bannerTitle = document.getElementById('recon-banner-title');
  const bannerDesc = document.getElementById('recon-banner-desc');
  const conflictAlert = document.getElementById('recon-conflict-alert');
  const cloudModelBadge = document.getElementById('recon-cloud-model-badge');

  if (cloudDecision) {
    document.getElementById('recon-cloud-assessment').textContent = translateAssessment(cloudDecision.assessment, currentLang);
    document.getElementById('recon-cloud-explanation').textContent = translateExplanation(cloudDecision.explanation, currentLang);
    document.getElementById('recon-cloud-limitations').textContent = translateExplanation(cloudDecision.limitations || 'No specific limitations noted.', currentLang);
    document.getElementById('recon-cloud-timestamp').textContent = new Date(cloudDecision.reviewedAt).toLocaleString();

    cloudModelBadge.textContent = cloudDecision.isSimulated ? (currentLang === 'mr' ? 'सिम्युलेटेड AI' : (currentLang === 'hi' ? 'सिम्युलेटेड AI' : 'Simulated AI')) : (cloudDecision.modelName || 'Live Cloud AI');
    cloudModelBadge.className = cloudDecision.isSimulated ? 'badge badge-pending' : 'badge badge-synced';

    // Cloud observations considered
    const cloudEvidenceList = document.getElementById('recon-cloud-evidence');
    cloudEvidenceList.innerHTML = '';
    (cloudDecision.observationsConsidered || []).forEach(ev => {
      const li = document.createElement('li');
      li.textContent = translateEvidence(ev, currentLang);
      cloudEvidenceList.appendChild(li);
    });

    // Configure status banner based on reconciliation status
    const reconStatus = syncRecord?.reconciliationStatus || RECONCILIATION_STATUS.MATCH;
    banner.className = 'recon-status-banner';

    if (reconStatus === RECONCILIATION_STATUS.MATCH) {
      banner.classList.add('banner-match');
      bannerIcon.textContent = '✅';
      bannerTitle.textContent = t('statusMatch');
      bannerDesc.textContent = translateSummary(syncRecord?.reconciliationSummary || 'Local and cloud assessments are fully consistent.', currentLang);
      conflictAlert.classList.add('hidden');
    } else if (reconStatus === RECONCILIATION_STATUS.ADDITIONAL_INSIGHT) {
      banner.classList.add('banner-insight');
      bannerIcon.textContent = '💡';
      bannerTitle.textContent = t('statusInsight');
      bannerDesc.textContent = translateSummary(syncRecord?.reconciliationSummary || 'Cloud AI added diagnostic context without conflicting with local decision.', currentLang);
      conflictAlert.classList.add('hidden');
    } else if (reconStatus === RECONCILIATION_STATUS.CONFLICT) {
      banner.classList.add('banner-conflict');
      bannerIcon.textContent = '⚠️';
      bannerTitle.textContent = t('statusConflict');
      bannerDesc.textContent = translateSummary(syncRecord?.reconciliationSummary || 'Substantial discrepancy identified between local and cloud diagnoses.', currentLang);
      conflictAlert.innerHTML = `<strong>${t('conflictNoticeTitle')}</strong> ${t('conflictNoticeText')}`;
      conflictAlert.classList.remove('hidden');
    } else {
      banner.classList.add('banner-review');
      bannerIcon.textContent = '🔍';
      bannerTitle.textContent = t('statusRequiresReview');
      bannerDesc.textContent = translateSummary(syncRecord?.reconciliationSummary || 'Further agronomic inspection recommended.', currentLang);
      conflictAlert.classList.add('hidden');
    }
  } else {
    // Cloud Decision Pending
    document.getElementById('recon-cloud-assessment').textContent = t('statusPendingSync');
    document.getElementById('recon-cloud-explanation').textContent = currentLang === 'mr' ? 'हे प्रकरण क्लाउड AI ला पाठवण्यासाठी सिंक करणे बाकी आहे.' : (currentLang === 'hi' ? 'यह मामला क्लाउड AI सिंक की प्रतीक्षा में है।' : 'This case is currently stored offline. Connect to internet and sync to receive cloud agronomic analysis.');
    document.getElementById('recon-cloud-limitations').textContent = currentLang === 'mr' ? 'सिंक झाल्यावर माहिती उपलब्ध होईल.' : (currentLang === 'hi' ? 'सिंक होने के बाद जानकारी उपलब्ध होगी।' : 'Pending sync.');
    document.getElementById('recon-cloud-timestamp').textContent = currentLang === 'mr' ? 'प्रतीक्षेत' : (currentLang === 'hi' ? 'प्रतीक्षारत' : 'Pending');
    cloudModelBadge.textContent = t('badgePendingSync');
    cloudModelBadge.className = 'badge badge-pending';

    document.getElementById('recon-cloud-evidence').innerHTML = `<li>${currentLang === 'mr' ? 'निरीक्षणे स्थानिकरित्या IndexedDB मध्ये सुरक्षित आहेत' : (currentLang === 'hi' ? 'अवलोकन स्थानीय रूप से IndexedDB में सुरक्षित हैं' : 'Observations stored locally in IndexedDB')}</li>`;

    banner.className = 'recon-status-banner banner-review';
    bannerIcon.textContent = '⏳';
    bannerTitle.textContent = t('statusPendingSync');
    bannerDesc.textContent = currentLang === 'mr' ? 'स्थानिक निर्णय सुरक्षित आहे. क्लाउड AI विश्लेषणासाठी फोन इंटरनेटशी जोडून सिंक करा.' : (currentLang === 'hi' ? 'स्थानीय निर्णय सुरक्षित है। क्लाउड AI विश्लेषण के लिए नेटवर्क में आकर सिंक करें।' : 'The local decision is safely preserved. Connect to internet and click "Sync Now" to trigger cloud AI review and reconciliation.');
    conflictAlert.classList.add('hidden');
  }

  // Audit details box
  const auditBox = document.getElementById('recon-audit-details');
  auditBox.textContent = JSON.stringify({
    caseId,
    crop: caseItem.crop,
    observations: caseItem.observations,
    localDecision: {
      assessment: localDecision?.assessment,
      ruleVersion: localDecision?.ruleVersion,
      matchedRules: localDecision?.matchedRuleIds,
      preserved: true
    },
    cloudDecision: cloudDecision ? {
      assessment: cloudDecision.assessment,
      model: cloudDecision.modelName,
      isSimulated: cloudDecision.isSimulated
    } : 'PENDING_SYNC',
    reconciliation: caseItem.syncRecord?.reconciliationStatus || 'Not Reconciled'
  }, null, 2);

  showScreen('screen-reconciliation');
}

// ============================================================
// DEMO SCENARIOS PRE-LOADERS (MULTI-CROP)
// ============================================================
function initDemoScenarios() {
  // Scenario 1: Cotton - Matching Consensus
  document.getElementById('demo-scenario-1')?.addEventListener('click', () => {
    resetObservationForm();
    document.getElementById('input-crop').value = 'Cotton';
    document.getElementById('input-soil').value = 'dry';
    document.getElementById('input-leaf-color').value = 'yellow';
    document.getElementById('input-leaf-spots').value = 'no';
    document.getElementById('input-plant-condition').value = 'wilting';
    document.getElementById('input-notes').value = 'Cotton soil dry at 20cm root zone. Leaves drooping in afternoon heat.';
    showScreen('screen-form');
    showToast('Loaded Scenario 1: Cotton Moisture Deficit (Matching Consensus)', 'info');
  });

  // Scenario 2: Soybean - Conflict & Preservation
  document.getElementById('demo-scenario-2')?.addEventListener('click', () => {
    resetObservationForm();
    document.getElementById('input-crop').value = 'Soybean';
    document.getElementById('input-soil').value = 'dry';
    document.getElementById('input-leaf-color').value = 'yellow';
    document.getElementById('input-leaf-spots').value = 'no';
    document.getElementById('input-plant-condition').value = 'wilting';
    document.getElementById('input-notes').value = 'Soybean wilting during pod-fill despite watering. Foliar rust pathogen conflict suspected.';
    showScreen('screen-form');
    showToast('Loaded Scenario 2: Soybean Rust & Conflict Preservation Demo', 'info');
  });

  // Scenario 3: Wheat - Insufficient Evidence
  document.getElementById('demo-scenario-3')?.addEventListener('click', () => {
    resetObservationForm();
    document.getElementById('input-crop').value = 'Wheat';
    document.getElementById('input-soil').value = 'moist';
    document.getElementById('input-leaf-color').value = 'reddish_purple';
    document.getElementById('input-leaf-spots').value = 'no';
    document.getElementById('input-plant-condition').value = 'stunted';
    document.getElementById('input-notes').value = 'Wheat tillers showing unusual purplish tint along leaf blade margins.';
    showScreen('screen-form');
    showToast('Loaded Scenario 3: Wheat Fallback (Insufficient Evidence)', 'info');
  });
}

// ============================================================
// HELPER UTILITIES
// ============================================================
function escapeHTML(str = '') {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icon = type === 'success' ? '✅' : (type === 'error' ? '❌' : 'ℹ️');
  toast.innerHTML = `<span>${icon}</span> <span>${escapeHTML(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 200ms ease';
    setTimeout(() => toast.remove(), 200);
  }, 4000);
}
