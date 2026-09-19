/**
 * SyncSense AI - Multi-Crop Local Rule Engine
 * Version: 2.0.0
 * 
 * Lightweight, offline-capable rule-based evaluation engine for preliminary
 * crop condition screening across multiple major crops:
 *  - Cotton (कपास / कापूस)
 *  - Soybean (सोयाबीन)
 *  - Wheat (गेहूं / गहू)
 *  - Rice / Paddy (धान / भात)
 *  - Maize / Corn (मक्का / मका)
 * 
 * Safety notice: Rules provide preliminary heuristics only and must not be
 * treated as validated agronomic diagnoses or chemical treatment prescriptions.
 */

export const RULE_ENGINE_VERSION = '2.0.0';

export const SAFETY_DISCLAIMER = 
  'This is a preliminary rule-based assessment generated offline. Consult a qualified agricultural extension officer or agronomist before taking action.';

export const SUPPORTED_CROPS = [
  { id: 'Cotton', name: 'Cotton (कपास / कापूस)', icon: '🌱' },
  { id: 'Soybean', name: 'Soybean (सोयाबीन)', icon: '🌿' },
  { id: 'Wheat', name: 'Wheat (गेहूं / गहू)', icon: '🌾' },
  { id: 'Rice', name: 'Rice / Paddy (धान / भात)', icon: '🌾' },
  { id: 'Maize', name: 'Maize / Corn (मक्का / मका)', icon: '🌽' }
];

/**
 * Universal stress heuristics catalog organized by crop
 */
export const CROP_RULES = {
  // ==========================================
  // 1. COTTON RULES
  // ==========================================
  Cotton: [
    {
      id: 'COT-01',
      name: 'Water Deficit Stress',
      description: 'Dry or cracked soil accompanied by plant wilting indicates severe moisture stress.',
      condition: (obs) => {
        const dry = ['dry', 'cracked'].includes(obs.soilCondition?.toLowerCase());
        const wilt = ['wilting', 'drooping'].includes(obs.plantCondition?.toLowerCase());
        return dry && wilt;
      },
      triggeredEvidence: (obs) => [
        `Soil condition is '${obs.soilCondition}'`,
        `Cotton foliage showing '${obs.plantCondition}'`
      ],
      assessment: 'Possible Water Stress (Drought / Moisture Deficit)',
      category: 'Water Stress',
      recommendation: 'Check root-zone soil moisture at 20-30cm depth; provide light irrigation if feasible; avoid deep inter-cultivation.'
    },
    {
      id: 'COT-02',
      name: 'Foliar Chlorosis / Nutrient Stress',
      description: 'Yellowing or pale leaves may indicate nitrogen or micronutrient deficiency.',
      condition: (obs) => ['yellow', 'pale_green'].includes(obs.leafColor?.toLowerCase()),
      triggeredEvidence: (obs) => [`Canopy leaf color reported as '${obs.leafColor}'`],
      assessment: 'Possible Nutrient Deficiency (Nitrogen or Micronutrient) or Stress Chlorosis',
      category: 'Nutrient Stress',
      recommendation: 'Inspect whether chlorosis is in lower or upper canopy; verify fertilizer schedule and soil pH.'
    },
    {
      id: 'COT-03',
      name: 'Foliar Pathogen (Leaf Spot)',
      description: 'Lesions or spots on foliage suggest fungal (Alternaria / Cercospora) or bacterial blight.',
      condition: (obs) => ['yes', 'brown_circular', 'water_soaked'].includes(obs.leafSpots?.toLowerCase()),
      triggeredEvidence: (obs) => [`Foliar spots present: '${obs.leafSpots}'`],
      assessment: 'Possible Foliar Disease (Fungal or Bacterial Leaf Spot)',
      category: 'Foliar Disease',
      recommendation: 'Isolate affected leaf samples; observe if spots possess concentric rings; avoid overhead sprinkler watering.'
    },
    {
      id: 'COT-04',
      name: 'Waterlogging & Root Hypoxia',
      description: 'Excessive standing water paired with wilting or yellowing restricts root respiration.',
      condition: (obs) => {
        const wet = ['wet', 'waterlogged', 'flooded'].includes(obs.soilCondition?.toLowerCase());
        const stress = ['yellow', 'pale_green'].includes(obs.leafColor?.toLowerCase()) ||
                       ['wilting', 'stunted'].includes(obs.plantCondition?.toLowerCase());
        return wet && stress;
      },
      triggeredEvidence: (obs) => [
        `Soil saturated: '${obs.soilCondition}'`,
        `Plant exhibiting hypoxic stress under excess moisture`
      ],
      assessment: 'Possible Waterlogging & Root Hypoxia',
      category: 'Excess Moisture',
      recommendation: 'Open drainage furrows immediately to allow stagnant water to evacuate field.'
    },
    {
      id: 'COT-05',
      name: 'Optimal Growth Baseline',
      description: 'Balanced moisture, healthy green foliage, and upright vigorous stature.',
      condition: (obs) => {
        const moist = ['moist', 'normal'].includes(obs.soilCondition?.toLowerCase());
        const green = ['green', 'dark_green'].includes(obs.leafColor?.toLowerCase());
        const noSpots = ['no', 'none'].includes(obs.leafSpots?.toLowerCase());
        const healthy = ['healthy', 'normal'].includes(obs.plantCondition?.toLowerCase());
        return moist && green && noSpots && healthy;
      },
      triggeredEvidence: () => ['Optimal soil moisture, vibrant green foliage, no spots, and vigorous growth.'],
      assessment: 'Healthy Baseline - No Immediate Stress Detected',
      category: 'Healthy',
      recommendation: 'Continue regular field scouting and routine crop protection practices.'
    }
  ],

  // ==========================================
  // 2. SOYBEAN RULES
  // ==========================================
  Soybean: [
    {
      id: 'SOY-01',
      name: 'Pod-fill Moisture Deficit',
      description: 'Dry soil combined with wilting during soybean flowering or pod development reduces grain weight.',
      condition: (obs) => {
        const dry = ['dry', 'cracked'].includes(obs.soilCondition?.toLowerCase());
        const wilt = ['wilting', 'drooping'].includes(obs.plantCondition?.toLowerCase());
        return dry && wilt;
      },
      triggeredEvidence: (obs) => [
        `Soil condition: '${obs.soilCondition}'`,
        `Soybean plant showing '${obs.plantCondition}'`
      ],
      assessment: 'Possible Drought Stress during Critical Vegetative / Pod-fill Stage',
      category: 'Water Stress',
      recommendation: 'Apply life-saving irrigation or mulch between crop rows to preserve soil moisture.'
    },
    {
      id: 'SOY-02',
      name: 'Yellow Mosaic / Iron Deficiency Chlorosis',
      description: 'Distinct yellowing on leaves is a hallmark of Yellow Mosaic Virus or iron chlorosis in black soils.',
      condition: (obs) => ['yellow', 'pale_green'].includes(obs.leafColor?.toLowerCase()),
      triggeredEvidence: (obs) => [`Canopy showing chlorosis: '${obs.leafColor}'`],
      assessment: 'Possible Yellow Mosaic Virus (YMV) or Iron Chlorosis',
      category: 'Nutrient Stress',
      recommendation: 'Check underside of leaves for whitefly activity (YMV vector); evaluate iron sulfate foliar spray if in calcareous soil.'
    },
    {
      id: 'SOY-03',
      name: 'Soybean Rust / Frogeye Leaf Spot',
      description: 'Spots on leaves indicate fungal rust (Phakopsora pachyrhizi) or Cercospora sojina.',
      condition: (obs) => ['yes', 'brown_circular', 'water_soaked'].includes(obs.leafSpots?.toLowerCase()),
      triggeredEvidence: (obs) => [`Leaf spots reported: '${obs.leafSpots}'`],
      assessment: 'Possible Soybean Rust or Cercospora Leaf Spot',
      category: 'Foliar Disease',
      recommendation: 'Collect leaf specimens; inspect for reddish-brown pustules on lower leaf surface.'
    },
    {
      id: 'SOY-04',
      name: 'Rhizoctonia / Collar Rot (Waterlogged)',
      description: 'Waterlogged soil with wilting or yellowing causes fungal collar and root rot.',
      condition: (obs) => {
        const wet = ['wet', 'waterlogged', 'flooded'].includes(obs.soilCondition?.toLowerCase());
        const stress = ['wilting', 'stunted'].includes(obs.plantCondition?.toLowerCase());
        return wet && stress;
      },
      triggeredEvidence: (obs) => [`Saturated soil: '${obs.soilCondition}'`, `Plant condition: '${obs.plantCondition}'`],
      assessment: 'Possible Rhizoctonia Aerial Blight / Root Rot due to Standing Water',
      category: 'Excess Moisture',
      recommendation: 'Ensure fast drainage; avoid working in wet soybean fields to prevent spreading fungal mycelium.'
    },
    {
      id: 'SOY-05',
      name: 'Healthy Soybean Stand',
      description: 'Healthy green canopy with good pod formation and moist soil.',
      condition: (obs) => {
        const moist = ['moist', 'normal'].includes(obs.soilCondition?.toLowerCase());
        const green = ['green', 'dark_green'].includes(obs.leafColor?.toLowerCase());
        const noSpots = ['no', 'none'].includes(obs.leafSpots?.toLowerCase());
        return moist && green && noSpots;
      },
      triggeredEvidence: () => ['Adequate soil moisture, vigorous green foliage, no disease lesions.'],
      assessment: 'Healthy Soybean Stand - Optimal Growth',
      category: 'Healthy',
      recommendation: 'Continue regular field monitoring for pod borers (Helicoverpa/Spodoptera).'
    }
  ],

  // ==========================================
  // 3. WHEAT RULES
  // ==========================================
  Wheat: [
    {
      id: 'WHT-01',
      name: 'Crown Root Moisture Deficit',
      description: 'Dry soil during Crown Root Initiation (CRI) or tillering causes severe yield penalty.',
      condition: (obs) => {
        const dry = ['dry', 'cracked'].includes(obs.soilCondition?.toLowerCase());
        const wilt = ['wilting', 'drooping'].includes(obs.plantCondition?.toLowerCase());
        return dry && wilt;
      },
      triggeredEvidence: (obs) => [`Soil condition: '${obs.soilCondition}'`, `Wheat tillers: '${obs.plantCondition}'`],
      assessment: 'Possible Critical Stage Moisture Deficit (CRI / Tillering Stage)',
      category: 'Water Stress',
      recommendation: 'Irrigate immediately if water is accessible; critical for spikelet development.'
    },
    {
      id: 'WHT-02',
      name: 'Nitrogen Deficiency Chlorosis',
      description: 'Yellowing beginning from older leaf tips progressing along midrib suggests nitrogen shortage.',
      condition: (obs) => ['yellow', 'pale_green'].includes(obs.leafColor?.toLowerCase()),
      triggeredEvidence: (obs) => [`Leaf coloration: '${obs.leafColor}'`],
      assessment: 'Possible Nitrogen Deficiency Chlorosis',
      category: 'Nutrient Stress',
      recommendation: 'Top-dress with nitrogen fertilizer before subsequent irrigation if crop is in tillering phase.'
    },
    {
      id: 'WHT-03',
      name: 'Stripe (Yellow) Rust or Foliar Blight',
      description: 'Pustules or necrotic spots on wheat blades indicate fungal rust (Puccinia striiformis) or spot blotch.',
      condition: (obs) => ['yes', 'brown_circular', 'water_soaked'].includes(obs.leafSpots?.toLowerCase()),
      triggeredEvidence: (obs) => [`Leaf lesion symptoms: '${obs.leafSpots}'`],
      assessment: 'Suspected Stripe (Yellow) Rust or Helminthosporium Leaf Blight',
      category: 'Foliar Disease',
      recommendation: 'Check if spots form linear yellow/brown stripes; consult local extension immediately for rust advisory.'
    },
    {
      id: 'WHT-04',
      name: 'Waterlogging / Poor Aeration',
      description: 'Heavy wet soil creates yellowing and poor tillering in wheat.',
      condition: (obs) => {
        const wet = ['wet', 'waterlogged'].includes(obs.soilCondition?.toLowerCase());
        return wet && ['yellow', 'stunted'].some(s => obs.leafColor?.includes(s) || obs.plantCondition?.includes(s));
      },
      triggeredEvidence: (obs) => [`Soil saturated: '${obs.soilCondition}'`],
      assessment: 'Possible Root Asphyxiation due to Standing Water in Wheat Field',
      category: 'Excess Moisture',
      recommendation: 'Drain standing water from furrows; apply light foliar urea spray once drained.'
    },
    {
      id: 'WHT-05',
      name: 'Healthy Wheat Stand',
      description: 'Vigorous upright tillers with deep green color and moist soil.',
      condition: (obs) => {
        const moist = ['moist', 'normal'].includes(obs.soilCondition?.toLowerCase());
        const green = ['green', 'dark_green'].includes(obs.leafColor?.toLowerCase());
        const noSpots = ['no', 'none'].includes(obs.leafSpots?.toLowerCase());
        return moist && green && noSpots;
      },
      triggeredEvidence: () => ['Moist soil, dark green canopy, robust tillering.'],
      assessment: 'Healthy Wheat Stand - Good Tillering',
      category: 'Healthy',
      recommendation: 'Maintain irrigation schedule and monitor for aphid buildup during grain filling.'
    }
  ],

  // ==========================================
  // 4. RICE (PADDY) RULES
  // ==========================================
  Rice: [
    {
      id: 'RIC-01',
      name: 'Drought / Aerobic Moisture Stress',
      description: 'Cracked or dry paddy soil indicates water shortage during panicle initiation.',
      condition: (obs) => {
        const dry = ['dry', 'cracked'].includes(obs.soilCondition?.toLowerCase());
        const wilt = ['wilting', 'drooping'].includes(obs.plantCondition?.toLowerCase());
        return dry && wilt;
      },
      triggeredEvidence: (obs) => [`Paddy field: '${obs.soilCondition}'`, `Canopy: '${obs.plantCondition}'`],
      assessment: 'Possible Severe Drought Stress in Paddy',
      category: 'Water Stress',
      recommendation: 'Ensure irrigation inlet is reopened; retain 2-5cm standing water during reproductive stage.'
    },
    {
      id: 'RIC-02',
      name: 'Zinc Deficiency (Khaira) or Nitrogen Chlorosis',
      description: 'Yellowing and reddish-brown pigmentation on leaves indicates zinc deficiency (Khaira disease).',
      condition: (obs) => ['yellow', 'pale_green', 'reddish_purple'].includes(obs.leafColor?.toLowerCase()),
      triggeredEvidence: (obs) => [`Leaf discoloration: '${obs.leafColor}'`],
      assessment: 'Possible Zinc Deficiency (Khaira) or Nitrogen Chlorosis',
      category: 'Nutrient Stress',
      recommendation: 'Evaluate zinc sulfate application (0.5% ZnSO4 + 0.25% lime spray); verify urea application.'
    },
    {
      id: 'RIC-03',
      name: 'Blast or Bacterial Leaf Blight',
      description: 'Spindle-shaped or water-soaked lesions indicate Rice Blast (Magnaporthe oryzae) or BLB.',
      condition: (obs) => ['yes', 'brown_circular', 'water_soaked'].includes(obs.leafSpots?.toLowerCase()),
      triggeredEvidence: (obs) => [`Lesions on blades: '${obs.leafSpots}'`],
      assessment: 'Suspected Rice Blast or Bacterial Leaf Blight (BLB)',
      category: 'Foliar Disease',
      recommendation: 'Examine if lesions have greyish centers with dark brown borders; avoid excessive nitrogen fertilizer.'
    },
    {
      id: 'RIC-04',
      name: 'Healthy Paddy Baseline',
      description: 'Normal moist/saturated paddy soil with vibrant green tillers and no leaf lesions.',
      condition: (obs) => {
        const moist = ['moist', 'wet', 'waterlogged', 'normal'].includes(obs.soilCondition?.toLowerCase());
        const green = ['green', 'dark_green'].includes(obs.leafColor?.toLowerCase());
        const noSpots = ['no', 'none'].includes(obs.leafSpots?.toLowerCase());
        return moist && green && noSpots;
      },
      triggeredEvidence: () => ['Optimal paddy standing water, lush green tillers, no foliar lesions.'],
      assessment: 'Healthy Paddy Stand - Normal Vegetative Growth',
      category: 'Healthy',
      recommendation: 'Maintain shallow water depth (2-5cm); inspect for stem borer or brown planthopper.'
    }
  ],

  // ==========================================
  // 5. MAIZE (CORN) RULES
  // ==========================================
  Maize: [
    {
      id: 'MAZ-01',
      name: 'Moisture Deficit at Tasseling',
      description: 'Dry soil with rolling/wilting leaves reduces pollination and ear filling.',
      condition: (obs) => {
        const dry = ['dry', 'cracked'].includes(obs.soilCondition?.toLowerCase());
        const wilt = ['wilting', 'drooping'].includes(obs.plantCondition?.toLowerCase());
        return dry && wilt;
      },
      triggeredEvidence: (obs) => [`Soil condition: '${obs.soilCondition}'`, `Plant condition: '${obs.plantCondition}'`],
      assessment: 'Possible Severe Moisture Deficit at Critical Vegetative/Tasseling Stage',
      category: 'Water Stress',
      recommendation: 'Prioritize irrigation during silking and grain filling; avoid severe moisture stress.'
    },
    {
      id: 'MAZ-02',
      name: 'Nitrogen Deficiency (V-Shaped Yellowing)',
      description: 'Yellowing progressing along the central leaf vein in an inverted V pattern.',
      condition: (obs) => ['yellow', 'pale_green'].includes(obs.leafColor?.toLowerCase()),
      triggeredEvidence: (obs) => [`Leaf yellowing: '${obs.leafColor}'`],
      assessment: 'Possible Nitrogen Deficiency (Classic V-pattern Chlorosis)',
      category: 'Nutrient Stress',
      recommendation: 'Apply urea top dressing in split doses at knee-high and tasseling stages.'
    },
    {
      id: 'MAZ-03',
      name: 'Turcicum Leaf Blight / Foliar Spots',
      description: 'Long elliptical lesions or circular spots on maize leaves indicate fungal blight.',
      condition: (obs) => ['yes', 'brown_circular', 'water_soaked'].includes(obs.leafSpots?.toLowerCase()),
      triggeredEvidence: (obs) => [`Leaf spots/lesions: '${obs.leafSpots}'`],
      assessment: 'Suspected Turcicum Leaf Blight or Maydis Leaf Blight',
      category: 'Foliar Disease',
      recommendation: 'Inspect lower leaves for cigar-shaped necrotic lesions; avoid excessive plant population density.'
    },
    {
      id: 'MAZ-04',
      name: 'Waterlogging Hypoxia',
      description: 'Maize is highly sensitive to water stagnation, resulting in purpling and stunted growth.',
      condition: (obs) => {
        const wet = ['wet', 'waterlogged'].includes(obs.soilCondition?.toLowerCase());
        const stress = ['stunted', 'wilting'].includes(obs.plantCondition?.toLowerCase()) ||
                       ['yellow', 'reddish_purple'].includes(obs.leafColor?.toLowerCase());
        return wet && stress;
      },
      triggeredEvidence: (obs) => [`Waterlogged soil: '${obs.soilCondition}'`, `Stunted foliage under excess water`],
      assessment: 'Possible Root Hypoxia / Stagnation Damage in Maize',
      category: 'Excess Moisture',
      recommendation: 'Drain standing water within 24 hours; apply light foliar nitrogen once drained.'
    },
    {
      id: 'MAZ-05',
      name: 'Healthy Maize Stand',
      description: 'Vigorous dark green foliage, thick stalks, and adequate soil moisture.',
      condition: (obs) => {
        const moist = ['moist', 'normal'].includes(obs.soilCondition?.toLowerCase());
        const green = ['green', 'dark_green'].includes(obs.leafColor?.toLowerCase());
        const noSpots = ['no', 'none'].includes(obs.leafSpots?.toLowerCase());
        return moist && green && noSpots;
      },
      triggeredEvidence: () => ['Moist soil, dark green leaves, sturdy stalk growth.'],
      assessment: 'Healthy Maize Stand - Vigorous Canopy',
      category: 'Healthy',
      recommendation: 'Continue scouting for Fall Armyworm (FAW) egg masses and leaf whorl damage.'
    }
  ]
};

// Aliases for backward compatibility
export const COTTON_RULES = CROP_RULES.Cotton;

/**
 * Evaluates submitted observations against the localized rule catalog for the selected crop.
 * 
 * @param {Object} observations
 * @param {string} [observations.crop='Cotton'] - 'Cotton' | 'Soybean' | 'Wheat' | 'Rice' | 'Maize'
 * @param {string} observations.soilCondition - 'dry' | 'moist' | 'wet' | 'cracked' | 'normal'
 * @param {string} observations.leafColor - 'green' | 'yellow' | 'pale_green' | 'reddish_purple' | 'brown'
 * @param {string} observations.leafSpots - 'yes' | 'no' | 'brown_circular' | 'water_soaked'
 * @param {string} observations.plantCondition - 'healthy' | 'wilting' | 'stunted' | 'shedding_squares'
 * @param {string} [observations.additionalNotes]
 * @returns {Object} Local decision object
 */
export function evaluateObservations(observations = {}) {
  const crop = (observations.crop || 'Cotton').trim();
  // Case-insensitive matching for crop
  const cropKey = Object.keys(CROP_RULES).find(k => k.toLowerCase() === crop.toLowerCase()) || 'Cotton';

  const normalized = {
    crop: cropKey,
    soilCondition: (observations.soilCondition || '').trim(),
    leafColor: (observations.leafColor || '').trim(),
    leafSpots: (observations.leafSpots || 'no').trim(),
    plantCondition: (observations.plantCondition || '').trim(),
    additionalNotes: (observations.additionalNotes || '').trim()
  };

  const cropRuleCatalog = CROP_RULES[cropKey] || CROP_RULES.Cotton;
  const matchedRules = [];
  const allEvidence = [];
  const recommendations = [];
  const categories = new Set();

  for (const rule of cropRuleCatalog) {
    try {
      if (rule.condition(normalized)) {
        matchedRules.push(rule);
        allEvidence.push(...rule.triggeredEvidence(normalized));
        recommendations.push(rule.recommendation);
        categories.add(rule.category);
      }
    } catch (err) {
      console.warn(`[RuleEngine] Error evaluating rule ${rule.id} for crop ${cropKey}:`, err);
    }
  }

  // Handle case with no matched rules or insufficient evidence
  if (matchedRules.length === 0) {
    return {
      crop: cropKey,
      ruleVersion: RULE_ENGINE_VERSION,
      status: 'Preliminary - Insufficient Evidence',
      assessment: `Insufficient Evidence for Local ${cropKey} Pattern Matching`,
      primaryCategory: 'Indeterminate',
      matchedRuleIds: [],
      matchedRuleNames: [],
      evidence: [`No specific ${cropKey} symptom combination matched the local offline rule set.`],
      explanation: `The entered observations do not clearly match any known offline ${cropKey} stress rules. Further field scouting or cloud review is recommended.`,
      recommendation: `Re-examine the ${cropKey} field, collect clearer leaf/stem symptom details, and re-run when more observations are available.`,
      safetyDisclaimer: SAFETY_DISCLAIMER,
      createdAt: new Date().toISOString()
    };
  }

  // Handle single vs multiple matching rules
  let synthesisAssessment = '';
  let synthesisExplanation = '';

  if (matchedRules.length === 1) {
    const r = matchedRules[0];
    synthesisAssessment = r.assessment;
    synthesisExplanation = `Matched rule ${r.id} (${r.name}): ${r.description} Based on: ${allEvidence.join('; ')}.`;
  } else {
    // Composite assessment
    const ruleNames = matchedRules.map(r => r.name).join(' and ');
    const ruleIds = matchedRules.map(r => r.id).join(', ');
    synthesisAssessment = `${cropKey} Compound Condition: ${Array.from(categories).join(' + ')}`;
    synthesisExplanation = `Multiple matching ${cropKey} patterns detected (${ruleIds} - ${ruleNames}). Evidence considered: ${allEvidence.join('; ')}.`;
  }

  return {
    crop: cropKey,
    ruleVersion: RULE_ENGINE_VERSION,
    status: 'Preliminary',
    assessment: synthesisAssessment,
    primaryCategory: Array.from(categories).join(', '),
    matchedRuleIds: matchedRules.map(r => r.id),
    matchedRuleNames: matchedRules.map(r => r.name),
    evidence: allEvidence,
    explanation: synthesisExplanation,
    recommendation: recommendations.join(' '),
    safetyDisclaimer: SAFETY_DISCLAIMER,
    createdAt: new Date().toISOString()
  };
}
