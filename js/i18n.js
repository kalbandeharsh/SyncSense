/**
 * SyncSense AI - Multilingual (English, Hindi, Marathi) & TTS Service
 * 
 * Provides complete offline translations and speech synthesis (Text-to-Speech)
 * for rural cotton farmers in English, Hindi (हिंदी), and Marathi (मराठी).
 */

export const SUPPORTED_LANGUAGES = {
  en: { code: 'en', label: 'English', voiceLang: 'en-IN' },
  hi: { code: 'hi', label: 'हिंदी (Hindi)', voiceLang: 'hi-IN' },
  mr: { code: 'mr', label: 'मराठी (Marathi)', voiceLang: 'mr-IN' }
};

export const TRANSLATIONS = {
  en: {
    // Brand & Header
    brandTitle: 'SyncSense AI',
    brandSubtitle: 'Offline-First Agri Intelligence • Multi-Crop Support',
    networkOnline: 'Online (Server Connected)',
    networkOffline: 'Offline (Local Rules Active)',
    networkUnreachable: 'Online (Server Unreachable)',
    networkSyncing: 'Syncing Intelligence...',
    syncNow: 'Sync Now',

    // Dashboard
    dashTitle: 'Agricultural Decision Center',
    dashSubtitle: 'Reliable diagnostic screening for low-connectivity rural farms across multiple crops.',
    btnNewObservation: 'New Observation',
    btnViewCases: 'View Cases',
    statTotalCases: 'Total Saved Cases',
    statPendingSync: 'Pending Cloud Sync',
    statConflictsPreserved: 'Conflicts Preserved',
    statFullyReconciled: 'Fully Reconciled',
    edgeTitle: 'The SyncSense Edge:',
    edgeDesc: 'Unlike typical sync tools, SyncSense does not overwrite local human or rule-based assessments with cloud AI. It synchronizes intelligence while preserving local decision history and highlighting conflicts for human review.',
    demoTitle: '⚡ Quick Hackathon Demo Scenarios',
    demoBadge: '1-Click Test Scenarios',
    demoDesc: 'Pre-populate realistic field observations to test instant offline evaluation and reconciliation across crops:',
    scenario1Title: 'Scenario 1: Cotton Water Deficit (Consensus)',
    scenario1Desc: 'Cotton: Dry soil + Wilting → Water stress (Local & Cloud agree)',
    scenario2Title: 'Scenario 2: Soybean Rust / Conflict Preservation',
    scenario2Desc: 'Soybean: Foliar symptoms with moisture stress → Detects conflict & preserves local',
    scenario3Title: 'Scenario 3: Wheat Fallback / Insufficient Evidence',
    scenario3Desc: 'Wheat: Incomplete markers → Triggers fallback & cloud insight',
    offlineTitle: '🛡️ Offline Capabilities Active',
    offlineRule: 'Local Rule Engine: Pure client-side JavaScript execution (Zero network dependency)',
    offlineDB: 'IndexedDB Persistence: Complete local storage of cases and decision audits',
    offlineSW: 'Service Worker Cache: Application loads instantly even in airplane mode',
    offlineSync: 'Idempotent Sync: Deduplication and conflict preservation upon reconnection',

    // Observation Form
    formTitle: 'Field Observation Entry',
    formSubtitle: 'Record crop conditions. This form works completely offline without internet.',
    offlineReadyBadge: '⚡ 100% Offline Ready',
    backToDashboard: '← Back to Dashboard',
    labelCrop: 'Crop Name',
    cropOptionCotton: '🌱 Cotton (कपास / कापूस)',
    cropOptionSoybean: '🌿 Soybean (सोयाबीन)',
    cropOptionWheat: '🌾 Wheat (गेहूं / गहू)',
    cropOptionRice: '🌾 Rice / Paddy (धान / भात)',
    cropOptionMaize: '🌽 Maize / Corn (मक्का / मका)',
    cropHint: 'Supports Cotton, Soybean, Wheat, Rice, and Maize diagnostic models.',
    labelSoil: 'Soil Condition',
    soilSelectDefault: '-- Select Soil Condition --',
    soilDry: 'Dry / Parched (Moisture deficit)',
    soilCracked: 'Deeply Cracked (Severe drought)',
    soilMoist: 'Moist / Adequate moisture',
    soilWet: 'Wet / Saturated',
    soilWaterlogged: 'Waterlogged / Standing water',
    labelLeafColor: 'Canopy Leaf Color',
    leafSelectDefault: '-- Select Leaf Color --',
    leafGreen: 'Healthy Green',
    leafDarkGreen: 'Dark Green',
    leafYellow: 'Yellowing / Pale Chlorotic',
    leafPaleGreen: 'Pale Green',
    leafPurple: 'Reddish / Purple',
    leafBrown: 'Brown / Scorched',
    labelLeafSpots: 'Leaf Spots or Lesions',
    spotsNone: 'No Visible Spots',
    spotsBrownCircular: 'Brown Circular Spots (Concentric rings)',
    spotsWaterSoaked: 'Water-soaked Dark Lesions',
    spotsGeneral: 'General Spots / Necrotic Patches',
    labelPlantCondition: 'General Plant Condition',
    plantSelectDefault: '-- Select Plant Condition --',
    plantHealthy: 'Healthy & Upright',
    plantWilting: 'Wilting / Drooping foliage',
    plantStunted: 'Stunted / Retarded Growth',
    plantShedding: 'Shedding Squares / Bolls',
    labelNotes: 'Additional Observations & Field Notes',
    notesPlaceholder: 'e.g., Lower leaves showing yellowing since last 4 days.',
    btnClearForm: 'Clear Form',
    btnRunAssessment: 'Run Local Assessment',

    // Local Assessment
    assessTitle: 'Preliminary Local Assessment',
    assessSubtitle: 'Evaluated instantly on-device using local rule engine',
    badgeLocalEngine: 'Local Rule Engine',
    labelPreliminaryFinding: 'Preliminary Finding',
    titleExplanation: 'Explanation & Agronomic Reasoning',
    titleMatchedRules: 'Matched Rules',
    titleEvidence: 'Observations Considered (Evidence)',
    titleFieldAction: 'Suggested Field Action (Heuristic)',
    safetyNoticeTitle: 'Safety Notice:',
    safetyNoticeText: 'This is a preliminary rule-based assessment. Consult a qualified agricultural expert before taking action.',
    btnSaveCase: 'Save to Local Cases',
    btnNewObservationAssess: 'New Observation',
    btnListenVoice: '🔊 Listen (Voice Guide)',
    btnStopVoice: '⏹️ Stop Audio',

    // Cases Explorer
    casesTitle: 'Saved Cases Explorer',
    casesSubtitle: 'Locally preserved farm records with synchronized cloud audit history.',
    filterAll: 'All Cases',
    filterPending: 'Pending Sync',
    filterSynced: 'Synced & Reconciled',
    filterConflicts: 'Conflicts',
    badgePendingSync: '⏳ Pending Sync',
    badgeSynced: '✅ Synced',
    badgeSyncFailed: '⚠️ Sync Failed',
    badgeLocalPreserved: 'Local Preserved',
    viewReconciliation: 'View Reconciliation →',
    btnRetrySync: 'Retry Sync',
    noCasesFound: 'No saved cases found',
    noCasesDesc: 'Record your first cotton field observation to test local evaluation and synchronization.',

    // Reconciliation View
    reconTitle: 'Intelligence Reconciliation',
    reconSubtitle: 'Comparing offline local rule heuristics with cloud agricultural AI reasoning.',
    btnBackCases: '← Back to Cases Explorer',
    statusMatch: 'Match / Confirmed',
    statusInsight: 'Additional Insight',
    statusConflict: 'Conflict Detected',
    statusRequiresReview: 'Requires Review',
    statusPendingSync: 'Pending Cloud Synchronization',
    conflictNoticeTitle: 'Critical Conflict Notice:',
    conflictNoticeText: 'Conflict detected. The original local decision has been preserved. Additional review is required.',
    localDecisionTitle: 'Local Decision',
    cloudDecisionTitle: 'Cloud Decision',
    tagLocalRuleEngine: 'Local Rule Engine',
    tagCloudAI: 'Cloud Agricultural AI',
    titleAssessment: 'Assessment',
    titleReasoning: 'Full Reasoning / Agronomic Depth',
    titleLimitations: 'Limitations & Caveats',
    reconAssessmentLabel: 'Assessment',
    reconMatchedRulesLabel: 'Matched Rules',
    reconEvidenceLabel: 'Evidence Considered',
    reconReasoningLabel: 'Full Reasoning',
    reconCloudReasoningLabel: 'Explanation & Agronomic Depth',
    reconLimitationsLabel: 'Limitations & Caveats',
    reconAuditBadge: 'Immutable History',
    reconVoiceGuide: 'Voice Guide',
    reconStopVoice: 'Stop Audio',
    badgePreserved: 'Preserved',
    btnSavedCase: 'Saved to Local Cases',
    noRulesMatched: 'No rules triggered (Insufficient evidence)',
    auditTrailTitle: '📜 Decision Preservation Audit Trail',
    auditTrailDesc: 'SyncSense ensures zero loss of offline agency. Even when cloud AI recommends an alternate diagnosis or points out additional factors, the farmer\'s initial local assessment is retained permanently for field accountability.'
  },

  hi: {
    // Brand & Header
    brandTitle: 'सिंकसेंस AI',
    brandSubtitle: 'ऑफ़लाइन कृषि आसूचना • बहु-फसल सहायता',
    networkOnline: 'ऑनलाइन (सर्वर जुड़ा हुआ है)',
    networkOffline: 'ऑफ़लाइन (स्थानीय नियम सक्रिय)',
    networkUnreachable: 'ऑनलाइन (सर्वर अनुपलब्ध)',
    networkSyncing: 'आसूचना सिंक हो रही है...',
    syncNow: 'अभी सिंक करें',

    // Dashboard
    dashTitle: 'कृषि निर्णय केंद्र',
    dashSubtitle: 'कपास, सोयाबीन, गेहूं, धान व मक्का के लिए विश्वसनीय ऑफ़लाइन जांच प्रणाली।',
    btnNewObservation: 'नई जांच दर्ज करें',
    btnViewCases: 'दर्ज मामले देखें',
    statTotalCases: 'कुल सहेजे गए मामले',
    statPendingSync: 'क्लाउड सिंक बाकी',
    statConflictsPreserved: 'सुरक्षित मतभेद',
    statFullyReconciled: 'पूर्णतया सत्यापित',
    edgeTitle: 'सिंकसेंस की मुख्य नवीनता:',
    edgeDesc: 'अन्य सिंक टूल्स के विपरीत, सिंकसेंस स्थानीय किसान या नियम-आधारित निर्णयों को क्लाउड AI से नहीं मिटाता। यह निर्णय इतिहास को सुरक्षित रखते हुए स्थानीय व क्लाउड बुद्धिमत्ता का समन्वय करता है।',
    demoTitle: '⚡ त्वरित हैकाथॉन डेमो परिदृश्य',
    demoBadge: '1-क्लिक टेस्ट परिदृश्य',
    demoDesc: 'विभिन्न फसलों पर त्वरित ऑफ़लाइन जांच और क्लाउड मिलान का परीक्षण करने के लिए डेमो परिदृश्य चुनें:',
    scenario1Title: 'परिदृश्य 1: कपास - पानी की कमी (सहमति)',
    scenario1Desc: 'कपास: सूखी मिट्टी + मुरझाना → पानी का ताण (लोकल और क्लाउड सहमत)',
    scenario2Title: 'परिदृश्य 2: सोयाबीन - फफूंद व मतभेद सुरक्षा',
    scenario2Desc: 'सोयाबीन: पत्ती धब्बे व ताण → मतभेद पहचानकर लोकल निर्णय सुरक्षित रखता है',
    scenario3Title: 'परिदृश्य 3: गेहूं / धान - अपर्याप्त साक्ष्य',
    scenario3Desc: 'गेहूं: अस्पष्ट लक्षण → अतिरिक्त क्लाउड अंतर्दृष्टि प्रदान करता है',
    offlineTitle: '🛡️ सक्रिय ऑफ़लाइन क्षमताएं',
    offlineRule: 'स्थानीय नियम इंजन: बिना किसी नेटवर्क के पूर्णतया ऑन-डिवाइस कार्य करता है',
    offlineDB: 'IndexedDB स्टोरेज: मामलों और निर्णयों का संपूर्ण स्थानीय सुरक्षित रिकॉर्ड',
    offlineSW: 'सर्विस वर्कर कैश: एयरप्लेन मोड में भी ऐप तुरंत लोड होता है',
    offlineSync: 'सुरक्षित सिंक: नेटवर्क आने पर डुप्लीकेट रोके और मतभेद सुरक्षित रखे',

    // Observation Form
    formTitle: 'खेत निरीक्षण प्रविष्टि',
    formSubtitle: 'फसल की स्थिति दर्ज करें। यह फॉर्म बिना इंटरनेट के 100% ऑफ़लाइन काम करता है।',
    offlineReadyBadge: '⚡ 100% ऑफ़लाइन तैयार',
    backToDashboard: '← डैशबोर्ड पर वापस जाएं',
    labelCrop: 'फसल का नाम',
    cropOptionCotton: '🌱 कपास (कॉटन / Cotton)',
    cropOptionSoybean: '🌿 सोयाबीन (Soybean)',
    cropOptionWheat: '🌾 गेहूं (Wheat)',
    cropOptionRice: '🌾 धान / चावल (Paddy / Rice)',
    cropOptionMaize: '🌽 मक्का (Corn / Maize)',
    cropHint: 'कपास, सोयाबीन, गेहूं, धान एवं मक्का के लिए नियम मॉडल उपलब्ध हैं।',
    labelSoil: 'मिट्टी की स्थिति',
    soilSelectDefault: '-- मिट्टी की स्थिति चुनें --',
    soilDry: 'सूखी / पानी की कमी',
    soilCracked: 'गहरी दरारें (गंभीर सूखा)',
    soilMoist: 'नम / पर्याप्त नमी',
    soilWet: 'गीली / अत्यधिक नमी',
    soilWaterlogged: 'जलभराव / खड़ा पानी',
    labelLeafColor: 'पत्तियों का रंग',
    leafSelectDefault: '-- पत्तियों का रंग चुनें --',
    leafGreen: 'स्वस्थ हरा',
    leafDarkGreen: 'गहरा हरा',
    leafYellow: 'पीलापन / फीका पीला',
    leafPaleGreen: 'हल्का हरा',
    leafPurple: 'बैंगनी / लालिमा युक्त',
    leafBrown: 'भूरा / झुलसा हुआ',
    labelLeafSpots: 'पत्तियों पर धब्बे या छाले',
    spotsNone: 'कोई धब्बे नहीं (साफ)',
    spotsBrownCircular: 'गोल भूरे छल्लेदार धब्बे',
    spotsWaterSoaked: 'गीले, काले फैले हुए धब्बे',
    spotsGeneral: 'सामान्य धब्बे / सूखे चकत्ते',
    labelPlantCondition: 'पौधे की सामान्य स्थिति',
    plantSelectDefault: '-- पौधे की स्थिति चुनें --',
    plantHealthy: 'स्वस्थ और मजबूत',
    plantWilting: 'मुरझाया हुआ / लटकती पत्तियां',
    plantStunted: 'रुका हुआ / बौना विकास',
    plantShedding: 'फूल / गूलर (बोंड) झड़ना',
    labelNotes: 'अतिरिक्त अवलोकन व खेत की टिप्पणी',
    notesPlaceholder: 'उदा. पिछले 4 दिनों से नीचे की पत्तियां पीली पड़ रही हैं।',
    btnClearForm: 'फॉर्म खाली करें',
    btnRunAssessment: 'स्थानीय जांच शुरू करें',

    // Local Assessment
    assessTitle: 'प्रारंभिक स्थानीय मूल्यांकन',
    assessSubtitle: 'स्थानीय नियम इंजन द्वारा तुरंत डिवाइस पर मूल्यांकित',
    badgeLocalEngine: 'स्थानीय नियम इंजन',
    labelPreliminaryFinding: 'प्रारंभिक निष्कर्ष',
    titleExplanation: 'स्पष्टीकरण एवं कृषि वैज्ञानिक कारण',
    titleMatchedRules: 'लागू हुए नियम',
    titleEvidence: 'विचार किए गए लक्षण (साक्ष्य)',
    titleFieldAction: 'सुझाया गया खेत कार्य (परामर्श)',
    safetyNoticeTitle: 'सुरक्षा सूचना:',
    safetyNoticeText: 'यह एक प्रारंभिक नियम-आधारित मूल्यांकन है। कोई भी दवा या उपचार करने से पहले कृषि विशेषज्ञ से सलाह अवश्य लें।',
    btnSaveCase: 'स्थानीय मेमोरी में सहेजें',
    btnNewObservationAssess: 'नया निरीक्षण दर्ज करें',
    btnListenVoice: '🔊 बोलकर सुनाएं (आवाज गाइड)',
    btnStopVoice: '⏹️ आवाज बंद करें',

    // Cases Explorer
    casesTitle: 'सहेजे गए मामलों की सूची',
    casesSubtitle: 'क्लाउड ऑडिट इतिहास के साथ स्थानीय रूप से सुरक्षित रिकॉर्ड।',
    filterAll: 'सभी मामले',
    filterPending: 'सिंक बाकी',
    filterSynced: 'सिंक व सत्यापित',
    filterConflicts: 'मतभेद दर्ज',
    viewReconciliation: 'तुलना व विवरण देखें →',
    badgePendingSync: '⏳ सिंक बाकी',
    badgeSynced: '✅ सिंक संपन्न',
    badgeSyncFailed: '⚠️ सिंक विफल',
    badgeLocalPreserved: 'लोकल सुरक्षित',
    btnRetrySync: 'पुनः सिंक करें',
    noCasesFound: 'कोई सहेजा गया मामला नहीं मिला',
    noCasesDesc: 'स्थानीय मूल्यांकन और सिंक का परीक्षण करने के लिए कपास का पहला अवलोकन दर्ज करें।',

    // Reconciliation View
    reconTitle: 'आसूचना समन्वय एवं तुलना',
    reconSubtitle: 'ऑफ़लाइन स्थानीय नियमों और क्लाउड AI वैज्ञानिक तर्क की तुलना।',
    btnBackCases: '← मामलों की सूची पर वापस जाएं',
    statusMatch: 'सहमति / सत्यापित',
    statusInsight: 'अतिरिक्त अंतर्दृष्टि',
    statusConflict: 'मतभेद पाया गया',
    statusRequiresReview: 'पुनरावलोकन आवश्यक',
    statusPendingSync: 'क्लाउड सिंक की प्रतीक्षा',
    conflictNoticeTitle: 'महत्वपूर्ण मतभेद सूचना:',
    conflictNoticeText: 'मतभेद पाया गया। मूल स्थानीय निर्णय को सुरक्षित रखा गया है। अंतिम निर्णय हेतु कृषि विशेषज्ञ समीक्षा आवश्यक है।',
    localDecisionTitle: 'स्थानीय नियम का निर्णय',
    cloudDecisionTitle: 'क्लाउड AI का निर्णय',
    tagLocalRuleEngine: 'स्थानीय नियम इंजन',
    tagCloudAI: 'क्लाउड कृषि AI',
    titleAssessment: 'मूल्यांकन',
    titleReasoning: 'विस्तृत कारण व विश्लेषण',
    titleLimitations: 'सीमाएं व सावधानियां',
    reconAssessmentLabel: 'मूल्यांकन',
    reconMatchedRulesLabel: 'लागू हुए नियम',
    reconEvidenceLabel: 'विचार किए गए साक्ष्य',
    reconReasoningLabel: 'विस्तृत कारण',
    reconCloudReasoningLabel: 'स्पष्टीकरण एवं वैज्ञानिक गहराई',
    reconLimitationsLabel: 'सीमाएं व सावधानियां',
    reconAuditBadge: 'अपरिवर्तनीय इतिहास',
    reconVoiceGuide: 'आवाज गाइड',
    reconStopVoice: 'आवाज बंद करें',
    badgePreserved: 'सुरक्षित',
    btnSavedCase: 'फोन में सहेजा गया',
    noRulesMatched: 'कोई नियम लागू नहीं हुआ (अपर्याप्त साक्ष्य)',
    auditTrailTitle: '📜 निर्णय संरक्षण ऑडिट ट्रेल',
    auditTrailDesc: 'सिंकसेंस ऑफ़लाइन स्वायत्तता की सुरक्षा करता है। भले ही क्लाउड AI कोई अलग राय दे, किसान का मूल निर्णय कभी मिटाया नहीं जाता।'
  },

  mr: {
    // Brand & Header
    brandTitle: 'सिंकसेन्स AI',
    brandSubtitle: 'ऑफलाइन कृषी बुद्धिमत्ता • बहु-पीक समर्थन',
    networkOnline: 'ऑनलाइन (सर्व्हर जोडलेला आहे)',
    networkOffline: 'ऑफलाइन (स्थानिक नियम सक्रिय)',
    networkUnreachable: 'ऑनलाइन (सर्व्हर उपलब्ध नाही)',
    networkSyncing: 'माहिती सिंक होत आहे...',
    syncNow: 'आता सिंक करा',

    // Dashboard
    dashTitle: 'कृषी निर्णय केंद्र',
    dashSubtitle: 'कापूस, सोयाबीन, गहू, भात आणि मका पिकांसाठी विश्वासार्ह ऑफलाइन तपासणी प्रणाली.',
    btnNewObservation: 'नवीन पाहणी नोंदवा',
    btnViewCases: 'नोंदवलेली प्रकरणे पहा',
    statTotalCases: 'एकूण जतन प्रकरणे',
    statPendingSync: 'क्लाउड सिंक बाकी',
    statConflictsPreserved: 'संरक्षित मतभेद',
    statFullyReconciled: 'पूर्णपणे जुळलेले',
    edgeTitle: 'सिंकसेन्सचे प्रमुख वैशिष्ट्य:',
    edgeDesc: 'इतर टूल्सप्रमाणे सिंकसेन्स स्थानिक शेतकऱ्याचा किंवा नियमांचा निर्णय क्लाउड AI च्या माहितीने पुसून टाकत नाही. ते स्थानिक निर्णयाचा इतिहास सुरक्षित ठेवून दोन्ही बुद्धिमत्तांचा मेळ घालते.',
    demoTitle: '⚡ जलद हॅकाथॉन डेमो पर्याय',
    demoBadge: '१-क्लिक चाचणी पर्याय',
    demoDesc: 'विविध पिकांवर ऑफलाइन तपासणी आणि पडताळणी पाहण्यासाठी खालीलपैकी डेमो निवडा:',
    scenario1Title: 'पर्याय १: कापूस - पाण्याचा ताण (एकमत)',
    scenario1Desc: 'कापूस: कोरडी माती + कोमेजणे → पाण्याचा ताण (स्थानिक व क्लाउड एकमत)',
    scenario2Title: 'पर्याय २: सोयाबीन - तांबेरा व मतभेद संरक्षण',
    scenario2Desc: 'सोयाबीन: पानांवरील ठिपके + ताण → मतभेद ओळखून स्थानिक निर्णय सुरक्षित ठेवतो',
    scenario3Title: 'पर्याय ३: गहू / भात - अपुरा पुरावा',
    scenario3Desc: 'गहू: अस्पष्ट लक्षणे → अतिरिक्त क्लाउड सल्ला देतो',
    offlineTitle: '🛡️ सक्रिय ऑफलाइन वैशिष्ट्ये',
    offlineRule: 'स्थानिक नियम इंजिन: इंटरनेटशिवाय थेट फोनवर १००% चालते',
    offlineDB: 'IndexedDB साठा: सर्व नोंदी आणि निर्णयांचा कायमस्वरूपी स्थानिक साठा',
    offlineSW: 'सर्व्हिस वर्कर कॅश: विमान मोडमध्येही ॲप्लिकेशन त्वरित सुरू होते',
    offlineSync: 'सुरक्षित सिंक: नेटवर्क आल्यावर दुबार नोंद टाळून मतभेद सुरक्षित ठेवते',

    // Observation Form
    formTitle: 'शेत पाहणी नोंदणी',
    formSubtitle: 'पिकाची स्थिती नोंदवा. हा फॉर्म इंटरनेट नसताना १००% ऑफलाइन काम करतो.',
    offlineReadyBadge: '⚡ १००% ऑफलाइन तयार',
    backToDashboard: '← मुख्य पृष्ठावर परत जा',
    labelCrop: 'पिकाचे नाव',
    cropOptionCotton: '🌱 कापूस (कपाशी / Cotton)',
    cropOptionSoybean: '🌿 सोयाबीन (Soybean)',
    cropOptionWheat: '🌾 गहू (Wheat)',
    cropOptionRice: '🌾 भात / तांदूळ (Paddy / Rice)',
    cropOptionMaize: '🌽 मका (Corn / Maize)',
    cropHint: 'कापूस, सोयाबीन, गहू, भात आणि मका पिकांच्या तपासणीचे नियम उपलब्ध आहेत.',
    labelSoil: 'जमिनीची / मातीची स्थिती',
    soilSelectDefault: '-- जमिनीची स्थिती निवडा --',
    soilDry: 'कोरडी / पाण्याचा ताण',
    soilCracked: 'भेगा पडलेली (तीव्र दुष्काळ)',
    soilMoist: 'ओलावा असलेली / योग्य ओलावा',
    soilWet: 'ओलीचिंब / जास्त ओलावा',
    soilWaterlogged: 'पाणी साचलेली / दलदल',
    labelLeafColor: 'पानांचा रंग',
    leafSelectDefault: '-- पानांचा रंग निवडा --',
    leafGreen: 'निरोगी हिरवा',
    leafDarkGreen: 'गडद हिरवा',
    leafYellow: 'पिवळसर / फिकट पिवळा',
    leafPaleGreen: 'फिकट हिरवा',
    leafPurple: 'जांभळट / तांबूस',
    leafBrown: 'तपकिरी / करपलेला',
    labelLeafSpots: 'पानांवर डाग किंवा ठिपके',
    spotsNone: 'कोणतेही डाग नाहीत (स्वच्छ)',
    spotsBrownCircular: 'तपकिरी गोल कडांचे ठिपके',
    spotsWaterSoaked: 'पाणथळ काळपट डाग',
    spotsGeneral: 'साधारण डाग / करपा',
    labelPlantCondition: 'झाडाची एकंदर स्थिती',
    plantSelectDefault: '-- झाडाची स्थिती निवडा --',
    plantHealthy: 'सशक्त व ताठ',
    plantWilting: 'सुकायला लागलेले / मान टाकलेले',
    plantStunted: 'खुरटलेली वाढ',
    plantShedding: 'पात्या / बोंडे गळणे',
    labelNotes: 'इतर निरीक्षणे व शेतातील नोंदी',
    notesPlaceholder: 'उदा. खालची पाने गेल्या ४ दिवसांपासून पिवळी पडत आहेत.',
    btnClearForm: 'फॉर्म साफ करा',
    btnRunAssessment: 'स्थानिक तपासणी करा',

    // Local Assessment
    assessTitle: 'प्राथमिक स्थानिक निष्कर्ष',
    assessSubtitle: 'स्थानिक नियम इंजिनद्वारे फोनवर त्वरित तपासणी पूर्ण',
    badgeLocalEngine: 'स्थानिक नियम इंजिन',
    labelPreliminaryFinding: 'प्राथमिक निष्कर्ष',
    titleExplanation: 'स्पष्टीकरण व कृषी कारणे',
    titleMatchedRules: 'लागू झालेले नियम',
    titleEvidence: 'तपासलेली लक्षणे (पुरावे)',
    titleFieldAction: 'शेतात करावयाची कृती (सल्ला)',
    safetyNoticeTitle: 'सुरक्षा सूचना:',
    safetyNoticeText: 'हा प्राथमिक नियमांवर आधारित अंदाज आहे. कोणतीही फवारणी किंवा खत देण्यापूर्वी कृषी तज्ज्ञांचा सल्ला नक्की घ्या.',
    btnSaveCase: 'फोनमध्ये जतन करा',
    btnNewObservationAssess: 'नवीन पाहणी नोंदवा',
    btnListenVoice: '🔊 आवाज ऐका (व्हॉईस गाइड)',
    btnStopVoice: '⏹️ आवाज बंद करा',

    // Cases Explorer
    casesTitle: 'नोंदवलेली शेत प्रकरणे',
    casesSubtitle: 'क्लाउड पडताळणीसह फोनमध्ये सुरक्षित जतन केलेल्या नोंदी.',
    filterAll: 'सर्व प्रकरणे',
    filterPending: 'सिंक बाकी',
    filterSynced: 'सिंक व जुळलेले',
    filterConflicts: 'मतभेद असलेले',
    viewReconciliation: 'तुलना व तपशील पहा →',
    badgePendingSync: '⏳ सिंक बाकी',
    badgeSynced: '✅ सिंक पूर्ण',
    badgeSyncFailed: '⚠️ सिंक अयशस्वी',
    badgeLocalPreserved: 'स्थानिक निर्णय सुरक्षित',
    btnRetrySync: 'पुन्हा सिंक करा',
    noCasesFound: 'कोणतीही नोंद सापडली नाही',
    noCasesDesc: 'स्थानिक तपासणी व सिंक पाहण्यासाठी कपाशी पिकाची पहिली नोंद करा.',

    // Reconciliation View
    reconTitle: 'बुद्धिमत्ता ताळमेळ व तुलना',
    reconSubtitle: 'ऑफलाइन स्थानिक नियम आणि ऑनलाइन क्लाउड AI सल्ल्याची समोरासमोर तुलना.',
    btnBackCases: '← प्रकरणांच्या यादीकडे परत जा',
    statusMatch: 'एकमत / जुळलेला सल्ला',
    statusInsight: 'अतिरिक्त मार्गदर्शन',
    statusConflict: 'मतभेद आढळला',
    statusRequiresReview: 'पुनरावलोकन आवश्यक',
    statusPendingSync: 'क्लाउड सिंकची प्रतीक्षा',
    conflictNoticeTitle: 'महत्त्वाची मतभेद सूचना:',
    conflictNoticeText: 'मतभेद आढळला आहे. शेतकऱ्याचा मूळ स्थानिक निर्णय सुरक्षित ठेवण्यात आला आहे. योग्य कृतीसाठी तज्ज्ञांचे मार्गदर्शन आवश्यक आहे.',
    localDecisionTitle: 'स्थानिक नियमांचा निर्णय',
    cloudDecisionTitle: 'क्लाउड AI चा निर्णय',
    tagLocalRuleEngine: 'स्थानिक नियम इंजिन',
    tagCloudAI: 'क्लाउड कृषी AI',
    titleAssessment: 'तपासणी निष्कर्ष',
    titleReasoning: 'सविस्तर कारणे व विश्लेषण',
    titleLimitations: 'मर्यादा व दक्षता',
    reconAssessmentLabel: 'तपासणी निष्कर्ष',
    reconMatchedRulesLabel: 'लागू झालेले नियम',
    reconEvidenceLabel: 'तपासलेली लक्षणे (पुरावे)',
    reconReasoningLabel: 'सविस्तर कारणे',
    reconCloudReasoningLabel: 'स्पष्टीकरण व कृषी वैज्ञानिक माहिती',
    reconLimitationsLabel: 'मर्यादा व दक्षता',
    reconAuditBadge: 'कायमस्वरूपी नोंद',
    reconVoiceGuide: 'व्हॉईस गाइड',
    reconStopVoice: 'आवाज बंद करा',
    badgePreserved: 'सुरक्षित',
    btnSavedCase: 'फोनमध्ये जतन केले',
    noRulesMatched: 'कोणताही नियम लागू झाला नाही (अपुरा पुरावा)',
    auditTrailTitle: '📜 निर्णय संरक्षण इतिहास (ऑडिट ट्रेल)',
    auditTrailDesc: 'सिंकसेन्स शेतकऱ्याच्या स्थानिक अधिकारांचे रक्षण करते. क्लाउड AI ने वेगळा सल्ला दिला तरी मूळ स्थानिक निर्णय नष्ट केला जात नाही.'
  }
};

let currentLang = 'en';
let activeUtterance = null;

/**
 * Initializes language preference from localStorage or navigator
 */
export function initI18n() {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('syncsense_lang') : null;
  if (saved && SUPPORTED_LANGUAGES[saved]) {
    currentLang = saved;
  } else if (typeof navigator !== 'undefined' && navigator.language) {
    const nav = navigator.language.toLowerCase();
    if (nav.startsWith('mr')) currentLang = 'mr';
    else if (nav.startsWith('hi')) currentLang = 'hi';
    else currentLang = 'en';
  }
  return currentLang;
}

export function getCurrentLanguage() {
  return currentLang;
}

export function setLanguage(lang) {
  if (SUPPORTED_LANGUAGES[lang]) {
    currentLang = lang;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('syncsense_lang', lang);
    }
  }
  return currentLang;
}

/**
 * Translates a key
 */
export function t(key) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  return dict[key] || TRANSLATIONS.en[key] || key;
}

/**
 * Translates an assessment text into the target language (Local & Cloud AI)
 */
export function translateAssessment(assessmentText = '', lang = currentLang) {
  if (lang === 'en' || !assessmentText) return assessmentText;

  const text = assessmentText.toLowerCase();

  if (lang === 'mr') {
    if (text.includes('confirmed') && (text.includes('water') || text.includes('deficit') || text.includes('drought'))) {
      return 'निश्चित पाण्याचा ताण (कोरडी माती व दिवसाचे कोमेजणे)';
    }
    if (text.includes('water stress') && text.includes('nutrient stress')) {
      return 'मिश्र ताण: पाण्याचा ताण (दुष्काळ) + अन्नद्रव्यांची कमतरता';
    }
    if (text.includes('water stress') || text.includes('water deficit') || text.includes('drought') || text.includes('moisture deficit')) {
      return 'संभाव्य पाण्याचा ताण (दुष्काळ / ओलाव्याची कमतरता)';
    }
    if (text.includes('yellow mosaic')) {
      return 'संभाव्य पिवळा मोझॅक विषाणू (YMV) किंवा लोहाची कमतरता';
    }
    if (text.includes('soybean rust')) {
      return 'संभाव्य सोयाबीन तांबेरा (रस्ट) रोग किंवा पानावरील ठिपके';
    }
    if (text.includes('stripe') || text.includes('rust')) {
      return 'संभाव्य तांबेरा रोग (रस्ट / गेरवा)';
    }
    if (text.includes('blast') || text.includes('blight')) {
      return 'संभाव्य करपा अथवा पानावरील करपा रोग (ब्लास्ट / ब्लाइट)';
    }
    if (text.includes('zinc') || text.includes('khaira')) {
      return 'संभाव्य जस्त (झिंक) ची कमतरता किंवा खैरा रोग';
    }
    if (text.includes('nutrient') || text.includes('chlorosis') || text.includes('nitrogen')) {
      return 'संभाव्य अन्नद्रव्यांची कमतरता (नत्र / सूक्ष्म अन्नद्रव्ये / क्लोरोसिस)';
    }
    if (text.includes('foliar disease') || text.includes('foliar pathogen') || text.includes('leaf spot') || text.includes('alternaria') || text.includes('cercospora')) {
      return 'संभाव्य पानांवरील बुरशीजन्य रोग (अल्टरनेरिया / करपा ठिपके)';
    }
    if (text.includes('rhizoctonia') || text.includes('collar rot')) {
      return 'संभाव्य रायझोक्टोनिया / खोडकूज व पानांचा करपा (पाणथळ जमीन)';
    }
    if (text.includes('waterlogging') || text.includes('hypoxia') || text.includes('root rot') || text.includes('asphyxiation') || text.includes('stagnation')) {
      return 'पाणी साचल्यामुळे मुळांना हवेची कमतरता (दलदल व सडण)';
    }
    if (text.includes('healthy')) {
      return 'निरोगी पीक - कोणताही तात्काळ धोका नाही (उत्तम वाढ)';
    }
    if (text.includes('insufficient evidence') || text.includes('indeterminate') || text.includes('sub-threshold')) {
      return 'स्थानिक नियमांसाठी अपुरा पुरावा (अस्पष्ट पाहणी माहिती)';
    }
    return assessmentText;
  }

  if (lang === 'hi') {
    if (text.includes('confirmed') && (text.includes('water') || text.includes('deficit') || text.includes('drought'))) {
      return 'पुष्टीकृत पानी का ताण (सूखी मिट्टी व मुरझाने की स्थिति)';
    }
    if (text.includes('water stress') && text.includes('nutrient stress')) {
      return 'मिश्रित लक्षण: पानी की कमी (सूखा) + पोषक तत्वों की कमी';
    }
    if (text.includes('water stress') || text.includes('water deficit') || text.includes('drought') || text.includes('moisture deficit')) {
      return 'संभावित पानी का ताण (सूखा / नमी की कमी)';
    }
    if (text.includes('yellow mosaic')) {
      return 'संभावित पीला मोज़ेक वायरस (YMV) अथवा लौह तत्व की कमी';
    }
    if (text.includes('soybean rust')) {
      return 'संभावित सोयाबीन रतुआ (रस्ट) अथवा पत्ती धब्बा रोग';
    }
    if (text.includes('stripe') || text.includes('rust')) {
      return 'संभावित रतुआ (गेरुआ / रस्ट रोग)';
    }
    if (text.includes('blast') || text.includes('blight')) {
      return 'संभावित झुलसा अथवा पत्ती धब्बा रोग (ब्लास्ट / ब्लाइट)';
    }
    if (text.includes('zinc') || text.includes('khaira')) {
      return 'संभावित जिंक (जस्ता) की कमी अथवा खैरा रोग';
    }
    if (text.includes('nutrient') || text.includes('chlorosis') || text.includes('nitrogen')) {
      return 'संभावित पोषक तत्व की कमी (नाइट्रोजन / क्लोरोसिस)';
    }
    if (text.includes('foliar disease') || text.includes('foliar pathogen') || text.includes('leaf spot') || text.includes('alternaria') || text.includes('cercospora')) {
      return 'संभावित पर्ण रोग (अल्टरनेरिया / फफूंद जनित पत्ती धब्बा रोग)';
    }
    if (text.includes('rhizoctonia') || text.includes('collar rot')) {
      return 'संभावित राइजोक्टोनिया / जड़ सड़न रोग (जलभराव के कारण)';
    }
    if (text.includes('waterlogging') || text.includes('hypoxia') || text.includes('root rot') || text.includes('asphyxiation') || text.includes('stagnation')) {
      return 'जलभराव व जड़ों में ऑक्सीजन की कमी (सड़न का खतरा)';
    }
    if (text.includes('healthy')) {
      return 'स्वस्थ फसल - कोई तात्कालिक तनाव नहीं (सामान्य वृद्धि)';
    }
    if (text.includes('insufficient evidence') || text.includes('indeterminate') || text.includes('sub-threshold')) {
      return 'स्थानीय नियमों हेतु अपर्याप्त साक्ष्य (अनिश्चित आंकड़े)';
    }
    return assessmentText;
  }

  return assessmentText;
}

/**
 * Translates agronomic explanations and limitations into Hindi or Marathi
 */
export function translateExplanation(explanationText = '', lang = currentLang) {
  if (lang === 'en' || !explanationText) return explanationText;
  const t = explanationText.toLowerCase();

  if (lang === 'mr') {
    // Cloud AI Explanations
    if (t.includes('multi-spectral analysis') || t.includes('superseding moisture deficit') || t.includes('characteristic lesion')) {
      return 'क्लाउड मॉडेलच्या विश्लेषणात पानांवरील ठिपक्यांची लक्षणे स्पष्टपणे बुरशीजन्य रोगाची (करपा/तांबेरा) असल्याचे दर्शवतात, ज्यामुळे पाण्याचा ताण नसून हा मुख्य रोग असल्याचे स्पष्ट होते.';
    }
    if (t.includes('weather cross-referencing') || t.includes('transpiration deficit') || t.includes('severe daytime wilting')) {
      return 'हवामान माहिती आणि ओलावा निर्देशांकानुसार कोरडी माती व दिवसाची पाने सुकणे यामुळे पिकाला तीव्र पाण्याचा ताण बसत आहे. बाष्पीभवनाचा ताण व अन्नद्रव्ये शोषण्यात अडथळा येत आहे.';
    }
    if (t.includes('lack definitive symptom markers') || t.includes('spectral indices require')) {
      return 'नोंदवलेल्या लक्षणांवरून पिकाच्या स्थितीचा निश्चित निष्कर्ष काढण्यासाठी माहिती अपुरी आहे. अधिक तपासणी आवश्यक आहे.';
    }
    if (t.includes('airborne fungal spore') || t.includes('necrotic lesion distribution')) {
      return 'पानांवरील जळकट ठिपक्यांची रचना हवेतून पसरणाऱ्या बुरशीच्या प्रादुर्भावाचे संकेत देते. दमट हवामानामुळे रोगाचा प्रादुर्भाव वाढू शकतो.';
    }

    // Cloud Limitations
    if (t.includes('laboratory spore microscopy') || t.includes('high humidity microclimate')) {
      return 'प्रयोगशाळा सूक्ष्मदर्शक चाचणीशिवाय संगणकीय अंदाज. हवेतील जास्त आर्द्रतेमुळे रोगाचा प्रसार जलद होऊ शकतो.';
    }
    if (t.includes('root compaction and nematode') || t.includes('can mimic water deficit')) {
      return 'सिम्युलेटेड क्लाउड विश्लेषण. मुळांची समस्या, जमीन घट्ट होणे किंवा सूत्रकृमींमुळेही अशीच लक्षणे दिसू शकतात.';
    }
    if (t.includes('incomplete input vectors') || t.includes('minimum required')) {
      return 'अपूर्ण माहितीवर आधारित पुनरावलोकन. मातीतील ओलावा व पानांचा रंग तपासणे आवश्यक आहे.';
    }
    if (t.includes('pathogen isolation test recommended')) {
      return 'बुरशीनाशक फवारणी करण्यापूर्वी कृषी तज्ज्ञांकडून नमुने तपासून घेणे योग्य ठरेल.';
    }

    // Local Rule Explanations
    if (t.includes('multiple adverse stress') || (t.includes('moisture deficit') && t.includes('chlorosis'))) {
      return 'एकाधिक ताण एकाच वेळी दिसून येत आहेत: कोरडी माती व कोमेजल्यामुळे पाण्याचा तीव्र ताण, तसेच पिवळेपणामुळे अन्नद्रव्यांची कमतरता आढळली आहे.';
    }
    if (t.includes('moisture deficit') || t.includes('dry or cracked') || t.includes('drought') || t.includes('wilting')) {
      return 'मातीत ओलावा कमी असल्यामुळे आणि पाने सुकल्यामुळे पिकाला पाण्याचा तीव्र ताण बसत आहे.';
    }
    if (t.includes('yellow mosaic') || t.includes('iron chlorosis') || t.includes('chlorosis') || t.includes('yellowing')) {
      return 'पाने पिवळी पडल्यामुळे नत्र किंवा सूक्ष्म अन्नद्रव्यांची (लोह/झिंक) कमतरता किंवा पिवळा मोझॅक असू शकतो.';
    }
    if (t.includes('rust') || t.includes('pustules') || t.includes('stripe')) {
      return 'पानांवर तांबूस ठिपके किंवा बुरशीजन्य बीजाणू आढळल्यामुळे तांबेरा रोगाची शक्यता आहे.';
    }
    if (t.includes('blast') || t.includes('blight') || t.includes('lesions') || t.includes('leaf spot') || t.includes('alternaria')) {
      return 'पानांवरील डाग किंवा करपलेली लक्षणे बुरशीजन्य करपा किंवा पानांवरील ठिपके रोगाचे संकेत देतात.';
    }
    if (t.includes('waterlogging') || t.includes('stagnant') || t.includes('hypoxia') || t.includes('root rot') || t.includes('standing water')) {
      return 'जमिनीत अतिरिक्त पाणी साचल्यामुळे मुळांना प्राणवायू (ऑक्सिजन) मिळत नसून सडण्याची शक्यता आहे.';
    }
    if (t.includes('healthy') || t.includes('adequate') || t.includes('vigorous')) {
      return 'पिकाची स्थिती समाधानकारक असून कोणतीही तीव्र रोगाची लक्षणे आढळलेली नाहीत.';
    }
    if (t.includes('insufficient') || t.includes('limited') || t.includes('indeterminate')) {
      return 'नोंदवलेली माहिती कमी असल्यामुळे निश्चित निष्कर्ष काढता येत नाही. अधिक तपासणी आवश्यक आहे.';
    }
    return explanationText;
  }

  if (lang === 'hi') {
    // Cloud AI Explanations
    if (t.includes('multi-spectral analysis') || t.includes('superseding moisture deficit') || t.includes('characteristic lesion')) {
      return 'क्लाउड मॉडल के विश्लेषण अनुसार पत्तियों के धब्बे फफूंद जनित रोग का संकेत देते हैं, जो पानी की कमी से अधिक गंभीर कारक है।';
    }
    if (t.includes('weather cross-referencing') || t.includes('transpiration deficit') || t.includes('severe daytime wilting')) {
      return 'मौसम डेटा और फसल नमी सूचकांक सूखी मिट्टी व मुरझाने को पानी की भारी कमी से जोड़ते हैं। पत्तियों में वाष्पोत्सर्जन तनाव है।';
    }
    if (t.includes('lack definitive symptom markers') || t.includes('spectral indices require')) {
      return 'दर्ज लक्षणों में निश्चित निष्कर्ष के लिए पर्याप्त आंकड़े नहीं हैं। अतिरिक्त जांच आवश्यक है।';
    }
    if (t.includes('airborne fungal spore') || t.includes('necrotic lesion distribution')) {
      return 'पत्तियों पर धब्बों का फैलाव हवा से फैलने वाले फफूंद जनित बीजाणुओं का संकेत देता है। नमीयुक्त वातावरण इसे बढ़ा सकता है।';
    }

    // Cloud Limitations
    if (t.includes('laboratory spore microscopy') || t.includes('high humidity microclimate')) {
      return 'बिना प्रयोगशाला जांच के सिम्युलेटेड मूल्यांकन। अधिक आर्द्रता रोग को बढ़ा सकती है।';
    }
    if (t.includes('root compaction and nematode') || t.includes('can mimic water deficit')) {
      return 'सिम्युलेटेड विश्लेषण। जड़ संपीड़न या नेमाटोड भी पानी की कमी जैसे लक्षण उत्पन्न कर सकते हैं।';
    }
    if (t.includes('incomplete input vectors') || t.includes('minimum required')) {
      return 'अधूरे इनपुट पर आधारित विश्लेषण। मिट्टी की नमी और पत्ती का रंग जांचना आवश्यक है।';
    }
    if (t.includes('pathogen isolation test recommended')) {
      return 'फफूंदनाशक छिड़काव से पहले रोगज़नक़ पहचान परीक्षण की सलाह दी जाती है।';
    }

    // Local Rule Explanations
    if (t.includes('multiple adverse stress') || (t.includes('moisture deficit') && t.includes('chlorosis'))) {
      return 'एक साथ कई तनाव लक्षण दिखाई दे रहे हैं: सूखी मिट्टी व मुरझाने से पानी की कमी, साथ ही पीलापन होने से पोषक तत्वों का अभाव है।';
    }
    if (t.includes('moisture deficit') || t.includes('dry or cracked') || t.includes('drought') || t.includes('wilting')) {
      return 'मिट्टी में नमी की भारी कमी और पत्तियों के मुरझाने से फसल में पानी का गंभीर तनाव है।';
    }
    if (t.includes('yellow mosaic') || t.includes('iron chlorosis') || t.includes('chlorosis') || t.includes('yellowing')) {
      return 'पत्तियों के पीलेपन से नाइट्रोजन अथवा सूक्ष्म पोषक तत्वों (लौह/जिंक) की कमी या पीला मोज़ेक हो सकता है।';
    }
    if (t.includes('rust') || t.includes('pustules') || t.includes('stripe')) {
      return 'पत्तियों पर लाल-भूरे धब्बे या फफूंद के लक्षण रतुआ (रस्ट) रोग का संकेत देते हैं।';
    }
    if (t.includes('blast') || t.includes('blight') || t.includes('lesions') || t.includes('leaf spot') || t.includes('alternaria')) {
      return 'पत्तियों पर धब्बे और झुलसा रोग के लक्षण फफूंद जनित ब्लास्ट अथवा पत्ती धब्बा रोग की ओर संकेत करते हैं।';
    }
    if (t.includes('waterlogging') || t.includes('stagnant') || t.includes('hypoxia') || t.includes('root rot') || t.includes('standing water')) {
      return 'खेत में पानी जमा होने से जड़ों को ऑक्सीजन नहीं मिल रही और सड़न का खतरा है।';
    }
    if (t.includes('healthy') || t.includes('adequate') || t.includes('vigorous')) {
      return 'फसल की सामान्य स्थिति अच्छी है और कोई गंभीर तनाव नहीं देखा गया।';
    }
    if (t.includes('insufficient') || t.includes('limited') || t.includes('indeterminate')) {
      return 'उपलब्ध आंकड़े अपर्याप्त होने के कारण सटीक निर्णय के लिए अतिरिक्त अवलोकन की आवश्यकता है।';
    }
    return explanationText;
  }

  return explanationText;
}

/**
 * Translates actionable agronomic recommendations into Marathi or Hindi
 */
export function translateRecommendation(recText = '', lang = currentLang) {
  if (lang === 'en' || !recText) return recText;
  const t = recText.toLowerCase();

  if (lang === 'mr') {
    const adviceList = [];
    if (t.includes('irrigation') || t.includes('soil moisture') || t.includes('water') || t.includes('drought') || t.includes('moisture')) {
      adviceList.push('मुळांच्या भागात २०-३० सेंमी खोलीवर मातीतील ओलावा तपासा; शक्य असल्यास हलके पाणी द्या किंवा आच्छादन करा.');
    }
    if (t.includes('fertilizer') || t.includes('chlorosis') || t.includes('urea') || t.includes('nitrogen') || t.includes('zinc')) {
      adviceList.push('खतांचे नियोजन तपासा; शिफारशीनुसार सूक्ष्म अन्नद्रव्ये किंवा युरियाची योग्य मात्रा द्या.');
    }
    if (t.includes('drainage') || t.includes('drain') || t.includes('waterlogging')) {
      adviceList.push('तातडीने शेतातील साचलेले पाणी बाहेर काढण्यासाठी पाट/चर काढा.');
    }
    if (t.includes('isolate') || t.includes('spots') || t.includes('specimens') || t.includes('blight') || t.includes('rust') || t.includes('fungal') || t.includes('whitefly')) {
      adviceList.push('बाधित पानांचे नमुने तपासा; बुरशीचा प्रसार रोखण्यासाठी कृषी तज्ज्ञांचा सल्ला घेऊन शिफारशीत बुरशीनाशक फवारणी करा.');
    }
    if (t.includes('scouting') || t.includes('monitoring') || t.includes('regular')) {
      adviceList.push('किडी व रोगांच्या प्रादुर्भावासाठी नियमित शेताची पाहणी चालू ठेवा.');
    }
    if (t.includes('re-examine') || t.includes('collect clearer') || t.includes('insufficient')) {
      adviceList.push('शेताची पुन्हा बारकाईने पाहणी करा व अधिक स्पष्ट लक्षणे नोंदवून पुन्हा तपासा.');
    }
    if (adviceList.length > 0) return adviceList.join(' ');
    return 'शेतातील ओलावा व पानांची स्थिती तपासून योग्य कृषी सल्लागाराचे मार्गदर्शन घ्यावे.';
  }

  if (lang === 'hi') {
    const adviceList = [];
    if (t.includes('irrigation') || t.includes('soil moisture') || t.includes('water') || t.includes('drought') || t.includes('moisture')) {
      adviceList.push('जड़ क्षेत्र में 20-30 सेमी गहराई पर नमी जांचें; संभव हो तो हल्का पानी दें या मल्चिंग करें।');
    }
    if (t.includes('fertilizer') || t.includes('chlorosis') || t.includes('urea') || t.includes('nitrogen') || t.includes('zinc')) {
      adviceList.push('उर्वरक प्रबंधन की जांच करें; आवश्यकतानुसार यूरिया या सूक्ष्म पोषक तत्वों का छिड़काव करें।');
    }
    if (t.includes('drainage') || t.includes('drain') || t.includes('waterlogging')) {
      adviceList.push('खेत से जमा पानी निकालने के लिए तुरंत जलनिकासी नालियां बनाएं।');
    }
    if (t.includes('isolate') || t.includes('spots') || t.includes('specimens') || t.includes('blight') || t.includes('rust') || t.includes('fungal') || t.includes('whitefly')) {
      adviceList.push('प्रभावित पत्तियों की जांच करें; विशेषज्ञ सलाह अनुसार अनुशंसित फफूंदनाशक का प्रयोग करें।');
    }
    if (t.includes('scouting') || t.includes('monitoring') || t.includes('regular')) {
      adviceList.push('कीट-रोग की रोकथाम हेतु नियमित रूप से खेत का निरीक्षण जारी रखें।');
    }
    if (t.includes('re-examine') || t.includes('collect clearer') || t.includes('insufficient')) {
      adviceList.push('खेत का दोबारा मुआयना करें और अधिक स्पष्ट लक्षणों के साथ पुनः जांचें।');
    }
    if (adviceList.length > 0) return adviceList.join(' ');
    return 'खेत की नमी और पत्तियों की स्थिति देखकर स्थानीय कृषि विशेषज्ञ से सलाह लें।';
  }

  return recText;
}

/**
 * Translates evidence items into Marathi or Hindi
 */
export function translateEvidence(evidenceItem = '', lang = currentLang) {
  if (lang === 'en' || !evidenceItem) return evidenceItem;
  const t = evidenceItem.toLowerCase();

  if (lang === 'mr') {
    if (t.includes('soil') && t.includes('dry')) return 'मातीची स्थिती: कोरडी / ओलावा कमी';
    if (t.includes('soil') && t.includes('cracked')) return 'मातीची स्थिती: भेगा पडलेली / दुष्काळ';
    if (t.includes('soil') && t.includes('moist')) return 'मातीची स्थिती: पुरेशा ओलाव्याची';
    if (t.includes('soil') && t.includes('wet')) return 'मातीची स्थिती: ओली / पाणथळ';
    if (t.includes('soil') && (t.includes('waterlogged') || t.includes('saturated'))) return 'मातीची स्थिती: पाणी साचलेली / दलदल';
    if ((t.includes('foliage') || t.includes('plant') || t.includes('tillers') || t.includes('canopy')) && (t.includes('wilting') || t.includes('drooping'))) return 'झाडाची पाने कोमेजलेली / मान टाकलेली';
    if (t.includes('plant') && t.includes('healthy')) return 'झाडाची स्थिती निरोगी व ताठ';
    if (t.includes('stunted')) return 'पिकाची खुरटलेली वाढ';
    if (t.includes('leaf color') && (t.includes('yellow') || t.includes('chlorosis'))) return 'पानांचा रंग पिवळसर / फिकट पडलेला';
    if (t.includes('leaf color') && t.includes('green')) return 'पानांचा रंग नैसर्गिक हिरवा';
    if (t.includes('spot') && (t.includes('brown') || t.includes('circular'))) return 'पानांवर गोलाकार तपकिरी ठिपके';
    if (t.includes('spot') && t.includes('water_soaked')) return 'पानांवर काळपट जळकट डाग';
    if (t.includes('spot') && (t.includes('no') || t.includes('none'))) return 'पानांवर कोणतेही ठिपके नाहीत';
    if (t.includes('optimal') || t.includes('lush green')) return 'योग्य ओलावा, निरोगी हिरवी पाने, कोणताही रोग नाही';
    if (t.includes('hypoxic stress')) return 'अतिरिक्त पाण्यामुळे मुळांना हवेचा तुटवडा';
    return evidenceItem;
  }

  if (lang === 'hi') {
    if (t.includes('soil') && t.includes('dry')) return 'मिट्टी की स्थिति: सूखी / नमी की कमी';
    if (t.includes('soil') && t.includes('cracked')) return 'मिट्टी की स्थिति: दरारें युक्त / सूखा';
    if (t.includes('soil') && t.includes('moist')) return 'मिट्टी की स्थिति: पर्याप्त नमी युक्त';
    if (t.includes('soil') && t.includes('wet')) return 'मिट्टी की स्थिति: अत्यधिक गीली';
    if (t.includes('soil') && (t.includes('waterlogged') || t.includes('saturated'))) return 'मिट्टी की स्थिति: जलभराव युक्त';
    if ((t.includes('foliage') || t.includes('plant') || t.includes('tillers') || t.includes('canopy')) && (t.includes('wilting') || t.includes('drooping'))) return 'पौधे की पत्तियां मुरझाई हुई';
    if (t.includes('plant') && t.includes('healthy')) return 'पौधे की स्थिति स्वस्थ व सीधी';
    if (t.includes('stunted')) return 'पौधे का रुका हुआ विकास';
    if (t.includes('leaf color') && (t.includes('yellow') || t.includes('chlorosis'))) return 'पत्तियों का रंग पीला / फीका';
    if (t.includes('leaf color') && t.includes('green')) return 'पत्तियों का रंग सामान्य हरा';
    if (t.includes('spot') && (t.includes('brown') || t.includes('circular'))) return 'पत्तियों पर भूरे गोल धब्बे';
    if (t.includes('spot') && t.includes('water_soaked')) return 'पत्तियों पर गहरे गीले धब्बे';
    if (t.includes('spot') && (t.includes('no') || t.includes('none'))) return 'पत्तियों पर कोई धब्बे नहीं';
    if (t.includes('optimal') || t.includes('lush green')) return 'पर्याप्त नमी, स्वस्थ हरी पत्तियां, कोई रोग नहीं';
    if (t.includes('hypoxic stress')) return 'अत्यधिक नमी से जड़ों में ऑक्सीजन की कमी';
    return evidenceItem;
  }

  return evidenceItem;
}

/**
 * Translates rule names into Marathi or Hindi
 */
export function translateRuleName(ruleName = '', lang = currentLang) {
  if (lang === 'en' || !ruleName) return ruleName;
  const t = ruleName.toLowerCase();

  if (lang === 'mr') {
    if (t.includes('water deficit') || t.includes('drought') || t.includes('water stress') || t.includes('moisture deficit')) return 'पाण्याचा ताण / ओलावा कमतरता नियम';
    if (t.includes('chlorosis') || t.includes('nutrient') || t.includes('nitrogen')) return 'पोषकद्रव्य कमतरता / पिवळेपणा नियम';
    if (t.includes('pathogen') || t.includes('leaf spot')) return 'पानावरील बुरशी / करपा नियम';
    if (t.includes('rust')) return 'तांबेरा रोग नियम';
    if (t.includes('hypoxia') || t.includes('waterlogging') || t.includes('rhizoctonia')) return 'पाणी साचणे / दलदल नियम';
    if (t.includes('mosaic')) return 'पिवळा मोझॅक विषाणू नियम';
    if (t.includes('blast') || t.includes('blight')) return 'ब्लास्ट / करपा रोग नियम';
    if (t.includes('optimal') || t.includes('healthy')) return 'निरोगी पीक वाढ नियम';
    return ruleName;
  }

  if (lang === 'hi') {
    if (t.includes('water deficit') || t.includes('drought') || t.includes('water stress') || t.includes('moisture deficit')) return 'पानी की कमी / सूखा तनाव नियम';
    if (t.includes('chlorosis') || t.includes('nutrient') || t.includes('nitrogen')) return 'पोषक तत्व अभाव / पीलापन नियम';
    if (t.includes('pathogen') || t.includes('leaf spot')) return 'पत्ती धब्बा / फफूंद नियम';
    if (t.includes('rust')) return 'रतुआ (रस्ट) रोग नियम';
    if (t.includes('hypoxia') || t.includes('waterlogging') || t.includes('rhizoctonia')) return 'जलभराव / ऑक्सीजन कमी नियम';
    if (t.includes('mosaic')) return 'पीला मोज़ेक वायरस नियम';
    if (t.includes('blast') || t.includes('blight')) return 'ब्लास्ट / झुलसा रोग नियम';
    if (t.includes('optimal') || t.includes('healthy')) return 'स्वस्थ फसल वृद्धि नियम';
    return ruleName;
  }

  return ruleName;
}

/**
 * Translates reconciliation summaries into Marathi or Hindi
 */
export function translateSummary(summaryText = '', lang = currentLang) {
  if (lang === 'en' || !summaryText) return summaryText;
  const t = summaryText.toLowerCase();

  if (lang === 'mr') {
    if (t.includes('fully consistent') || (t.includes('local and cloud') && t.includes('consistent'))) {
      return 'स्थानिक नियम आणि क्लाउड AI यांचे निष्कर्ष पूर्णपणे जुळणारे व सुसंगत आहेत.';
    }
    if (t.includes('contrasting') || t.includes('conflict') || t.includes('discrepancy')) {
      return 'स्थानिक नियम आणि क्लाउड AI यांच्या निष्कर्षात मतभेद आढळला आहे. शेतकऱ्याचा स्थानिक निर्णय सुरक्षित ठेवण्यात आला आहे.';
    }
    if (t.includes('additional diagnostic depth') || t.includes('confirmed local assessment')) {
      return 'क्लाउड AI ने स्थानिक निष्कर्षाची पुष्टी केली असून अतिरिक्त सखोल कृषी मार्गदर्शन पुरवले आहे.';
    }
    if (t.includes('diagnostic insights for an unclassified') || t.includes('unclassified')) {
      return 'स्थानिक नियमांत स्पष्ट न झालेल्या लक्षणांसाठी क्लाउड AI ने उपयुक्त कृषी मार्गदर्शन दिले आहे.';
    }
    if (t.includes('uncertain or limited') || t.includes('neither engine')) {
      return 'स्थानिक नियम आणि क्लाउड AI दोन्हीकडे माहिती मर्यादित असल्याने अंतिम निष्कर्षासाठी शेतात फेरतपासणी आवश्यक आहे.';
    }
    if (t.includes('further agronomic inspection') || t.includes('partial overlap')) {
      return 'स्थानिक आणि क्लाउड निष्कर्षांमध्ये अंशतः समानता असून तज्ज्ञांचे मार्गदर्शन शिफारशीत आहे.';
    }
    return summaryText;
  }

  if (lang === 'hi') {
    if (t.includes('fully consistent') || (t.includes('local and cloud') && t.includes('consistent'))) {
      return 'स्थानीय नियम और क्लाउड AI के निष्कर्ष पूरी तरह सुसंगत व एक समान हैं।';
    }
    if (t.includes('contrasting') || t.includes('conflict') || t.includes('discrepancy')) {
      return 'स्थानीय नियम और क्लाउड AI के बीच मतभेद दर्ज किया गया है। स्थानीय निर्णय सुरक्षित है।';
    }
    if (t.includes('additional diagnostic depth') || t.includes('confirmed local assessment')) {
      return 'क्लाउड AI ने स्थानीय निष्कर्ष की पुष्टि की और अतिरिक्त वैज्ञानिक विश्लेषण प्रदान किया।';
    }
    if (t.includes('diagnostic insights for an unclassified') || t.includes('unclassified')) {
      return 'अस्पष्ट स्थानीय अवलोकन के लिए क्लाउड AI ने नैदानिक अंतर्दृष्टि प्रदान की।';
    }
    if (t.includes('uncertain or limited') || t.includes('neither engine')) {
      return 'स्थानीय नियम और क्लाउड AI दोनों के पास सीमित डेटा होने से अतिरिक्त निरीक्षण आवश्यक है।';
    }
    if (t.includes('further agronomic inspection') || t.includes('partial overlap')) {
      return 'आंशिक समानता है और अंतिम निर्णय हेतु कृषि विशेषज्ञ की पुष्टि अनुशंसित है।';
    }
    return summaryText;
  }

  return summaryText;
}

/**
 * Text-to-Speech (Google / Native Web Speech API)
 * Speaks agricultural guidance clearly in English, Hindi, or Marathi
 */
export function speakText(textToSpeak, lang = currentLang, onEndCallback = null) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('[TTS] Speech Synthesis is not supported in this browser.');
    return false;
  }

  // Stop any currently speaking audio
  stopSpeaking();

  if (!textToSpeak || textToSpeak.trim().length === 0) return false;

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  activeUtterance = utterance;

  const langConfig = SUPPORTED_LANGUAGES[lang] || SUPPORTED_LANGUAGES.en;
  utterance.lang = langConfig.voiceLang;
  utterance.rate = 0.92; // Slightly slower pace for optimal rural comprehension
  utterance.pitch = 1.0;

  // Find suitable Google or native Indian voice
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => 
    v.lang.toLowerCase().replace('_', '-') === langConfig.voiceLang.toLowerCase() ||
    (lang === 'hi' && v.lang.toLowerCase().startsWith('hi')) ||
    (lang === 'mr' && v.lang.toLowerCase().startsWith('mr')) ||
    (lang === 'en' && (v.lang === 'en-IN' || v.name.includes('India')))
  );

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onend = () => {
    activeUtterance = null;
    if (onEndCallback) onEndCallback();
  };

  utterance.onerror = (e) => {
    console.warn('[TTS] Speech error:', e);
    activeUtterance = null;
    if (onEndCallback) onEndCallback();
  };

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  }
}

export function isSpeaking() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking;
}
