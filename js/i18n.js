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
 * Translates an assessment text into the target language
 */
export function translateAssessment(assessmentText = '', lang = currentLang) {
  if (lang === 'en') return assessmentText;

  const text = assessmentText.toLowerCase();

  if (lang === 'hi') {
    if (text.includes('water stress') && text.includes('nutrient stress')) {
      return 'मिश्रित लक्षणे: पानी की कमी (सूखा) + पोषक तत्वों की कमी';
    }
    if (text.includes('water stress') || text.includes('water deficit') || text.includes('drought')) {
      return 'संभावित पानी का ताण (सूखा / नमी की कमी)';
    }
    if (text.includes('yellow mosaic')) {
      return 'संभावित पीला मोज़ेक वायरस (YMV) अथवा लौह तत्व की कमी';
    }
    if (text.includes('rust') || text.includes('stripe')) {
      return 'संभावित रतुआ (गेरुआ / रस्ट रोग)';
    }
    if (text.includes('blast') || text.includes('blight')) {
      return 'संभावित झुलसा अथवा पत्ती धब्बा रोग (ब्लास्ट / ब्लाइट)';
    }
    if (text.includes('zinc') || text.includes('khaira')) {
      return 'संभावित जिंक (जस्ता) की कमी अथवा खैरा रोग';
    }
    if (text.includes('nutrient') || text.includes('chlorosis')) {
      return 'संभावित पोषक तत्व की कमी (नाइट्रोजन / क्लोरोसिस)';
    }
    if (text.includes('foliar disease') || text.includes('leaf spot') || text.includes('alternaria') || text.includes('cercospora')) {
      return 'संभावित पर्ण रोग (अल्टरनेरिया / फफूंद जनित पत्ती धब्बा रोग)';
    }
    if (text.includes('waterlogging') || text.includes('hypoxia') || text.includes('root rot')) {
      return 'जलभराव व जड़ों में ऑक्सीजन की कमी (सड़न का खतरा)';
    }
    if (text.includes('healthy')) {
      return 'स्वस्थ फसल - कोई तात्कालिक तनाव नहीं';
    }
    if (text.includes('insufficient evidence') || text.includes('indeterminate')) {
      return 'स्थानीय नियमों हेतु अपर्याप्त साक्ष्य (अनिश्चित)';
    }
    return assessmentText;
  }

  if (lang === 'mr') {
    if (text.includes('water stress') && text.includes('nutrient stress')) {
      return 'मिश्र ताण: पाण्याचा ताण (दुष्काळ) + अन्नद्रव्यांची कमतरता';
    }
    if (text.includes('water stress') || text.includes('water deficit') || text.includes('drought')) {
      return 'संभाव्य पाण्याचा ताण (दुष्काळ / ओलाव्याची कमतरता)';
    }
    if (text.includes('yellow mosaic')) {
      return 'संभाव्य पिवळा मोझॅक विषाणू (YMV) किंवा लोहाची कमतरता';
    }
    if (text.includes('rust') || text.includes('stripe')) {
      return 'संभाव्य तांबेरा रोग (रस्ट / गेरवा)';
    }
    if (text.includes('blast') || text.includes('blight')) {
      return 'संभाव्य करपा अथवा पानावरील करपा रोग (ब्लास्ट / ब्लाइट)';
    }
    if (text.includes('zinc') || text.includes('khaira')) {
      return 'संभाव्य जस्त (झिंक) ची कमतरता किंवा खैरा रोग';
    }
    if (text.includes('nutrient') || text.includes('chlorosis')) {
      return 'संभाव्य अन्नद्रव्यांची कमतरता (नत्र / सूक्ष्म अन्नद्रव्ये)';
    }
    if (text.includes('foliar disease') || text.includes('leaf spot') || text.includes('alternaria') || text.includes('cercospora')) {
      return 'संभाव्य पानांवरील बुरशीजन्य रोग (अल्टरनेरिया / करपा ठिपके)';
    }
    if (text.includes('waterlogging') || text.includes('hypoxia') || text.includes('root rot')) {
      return 'पाणी साचल्यामुळे मुळांना हवेची कमतरता (दलदल व सडण)';
    }
    if (text.includes('healthy')) {
      return 'निरोगी पीक - कोणताही तात्काळ धोका नाही';
    }
    if (text.includes('insufficient evidence') || text.includes('indeterminate')) {
      return 'स्थानिक नियमांसाठी अपुरा पुरावा (अस्पष्ट)';
    }
    return assessmentText;
  }

  return assessmentText;
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
