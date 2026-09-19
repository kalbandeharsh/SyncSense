/**
 * SyncSense AI - Cloud AI Review Service
 * 
 * Provides cloud-tier agronomic evaluation for cotton observations.
 * Supports:
 *  1. Intelligent Mock Mode (Default) - Deterministic, reliable, zero-latency for hackathon demos.
 *  2. Live Gemini Cloud AI Mode - Enabled when GEMINI_API_KEY is present in environment.
 * 
 * Notice: All mock responses are explicitly flagged with `isSimulated: true`.
 */

import dotenv from 'dotenv';
dotenv.config();

/**
 * Evaluates an agricultural case using Cloud AI (or simulated mock AI).
 * 
 * @param {Object} caseData
 * @param {string} caseData.caseId
 * @param {string} caseData.crop
 * @param {Object} caseData.observations
 * @param {Object} [caseData.localDecision]
 * @returns {Promise<Object>} Cloud decision object
 */
export async function evaluateWithCloudAI(caseData) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim().length > 0) {
    try {
      return await evaluateWithGemini(caseData, apiKey);
    } catch (geminiErr) {
      console.warn('[CloudAI] Gemini API failed or timed out. Falling back to robust Mock AI:', geminiErr.message);
      return evaluateWithMockAI(caseData);
    }
  }

  return evaluateWithMockAI(caseData);
}

/**
 * Intelligent Mock AI Engine
 * Produces structured agronomic assessments with predictable demo behaviors.
 */
export function evaluateWithMockAI(caseData) {
  const crop = caseData.crop || 'Cotton';
  const obs = caseData.observations || {};
  const localDecision = caseData.localDecision || {};
  const notes = (obs.additionalNotes || '').toLowerCase();
  const soil = (obs.soilCondition || '').toLowerCase();
  const leafColor = (obs.leafColor || '').toLowerCase();
  const leafSpots = (obs.leafSpots || '').toLowerCase();
  const plant = (obs.plantCondition || '').toLowerCase();

  const decisionId = `CLOUD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const reviewedAt = new Date().toISOString();

  // Crop-specific disease mappings
  const cropDiseases = {
    Cotton: 'Alternaria Fungal Leaf Spot (Alternaria macrospora)',
    Soybean: 'Soybean Rust (Phakopsora pachyrhizi) / Frogeye Leaf Spot',
    Wheat: 'Stripe (Yellow) Rust (Puccinia striiformis) / Helminthosporium Blight',
    Rice: 'Rice Blast (Magnaporthe oryzae) / Bacterial Leaf Blight',
    Maize: 'Turcicum Leaf Blight (Exserohilum turcicum)'
  };
  const specificDisease = cropDiseases[crop] || 'Foliar Fungal Pathogen';

  // SCENARIO 2 TRIGGER: Intentional Conflict Demo
  const isConflictDemo = notes.includes('conflict') || 
    (leafSpots !== 'no' && leafSpots !== 'none' && (soil === 'dry' || plant === 'wilting') && notes.includes('fungal'));

  if (isConflictDemo) {
    return {
      decisionId,
      caseId: caseData.caseId,
      crop,
      source: 'cloud',
      assessment: `Foliar Disease: High Probability ${crop} ${specificDisease}`,
      explanation: `Cloud model multi-spectral analysis indicates characteristic lesion patterns indicative of ${crop} ${specificDisease}, superseding moisture deficit as the primary yield-limiting factor.`,
      observationsConsidered: [
        `${crop} foliar spot morphology: '${obs.leafSpots}'`,
        `Canopy symptom progression in notes: '${obs.additionalNotes || 'N/A'}'`
      ],
      limitations: 'Simulated assessment without laboratory spore microscopy. High humidity microclimate may accelerate progression.',
      isSimulated: true,
      modelName: 'SyncSense-Cloud-Mock-v2',
      reviewedAt
    };
  }

  // SCENARIO 3: Insufficient evidence
  const isInsufficient = (!soil && !leafColor && !plant) || 
    (localDecision.matchedRuleIds && localDecision.matchedRuleIds.length === 0);

  if (isInsufficient) {
    return {
      decisionId,
      caseId: caseData.caseId,
      crop,
      source: 'cloud',
      assessment: `Indeterminate / Sub-threshold ${crop} Observation Data`,
      explanation: `The submitted observations lack definitive symptom markers for ${crop} diagnostic models. Cloud spectral indices require leaf underside inspection and canopy counts.`,
      observationsConsidered: Object.entries(obs).map(([k, v]) => `${k}: ${v}`),
      limitations: 'Simulated review based on incomplete input vectors. Minimum required: soil moisture + canopy leaf coloration.',
      isSimulated: true,
      modelName: 'SyncSense-Cloud-Mock-v2',
      reviewedAt
    };
  }

  // SCENARIO 1: Moisture Deficit / Water Stress Alignment
  if (['dry', 'cracked'].includes(soil) && ['wilting', 'drooping'].includes(plant)) {
    return {
      decisionId,
      caseId: caseData.caseId,
      crop,
      source: 'cloud',
      assessment: `Confirmed ${crop} Water Deficit Stress with Induced Chlorosis`,
      explanation: `Cloud weather cross-referencing and vegetative moisture index correlate dry soil condition with severe daytime wilting in ${crop}. Crop canopy is experiencing transpiration deficit and secondary nutrient uptake slowdown.`,
      observationsConsidered: [
        `Soil dryness indicator: '${obs.soilCondition}'`,
        `Vegetative turgidity loss: '${obs.plantCondition}'`,
        `Canopy discoloration: '${obs.leafColor || 'normal'}'`
      ],
      limitations: `Simulated cloud analysis for ${crop}. Root compaction and nematode damage can mimic water deficit symptoms.`,
      isSimulated: true,
      modelName: 'SyncSense-Cloud-Mock-v2',
      reviewedAt
    };
  }

  // FOLIAR SPOTS / DISEASE
  if (['yes', 'brown_circular', 'water_soaked'].includes(leafSpots)) {
    return {
      decisionId,
      caseId: caseData.caseId,
      crop,
      source: 'cloud',
      assessment: `Suspected ${crop} Foliar Pathogen (${specificDisease})`,
      explanation: `Necrotic lesion distribution on ${crop} foliage suggests airborne fungal spore proliferation. Foliar symptoms correlate with humid canopy microclimate.`,
      observationsConsidered: [
        `Spot condition: '${obs.leafSpots}'`,
        `Leaf color: '${obs.leafColor}'`
      ],
      limitations: 'Simulated evaluation. Pathogen isolation test recommended before applying fungicidal sprays.',
      isSimulated: true,
      modelName: 'SyncSense-Cloud-Mock-v2',
      reviewedAt
    };
  }

  // WATERLOGGING
  if (['wet', 'waterlogged', 'flooded'].includes(soil)) {
    return {
      decisionId,
      caseId: caseData.caseId,
      crop,
      source: 'cloud',
      assessment: `Anaerobic Root Stress / Excessive Soil Saturation in ${crop}`,
      explanation: `Prolonged saturation restricts ${crop} root respiration, leading to poor nutrient translocation and chlorotic leaves.`,
      observationsConsidered: [
        `Saturated soil condition: '${obs.soilCondition}'`,
        `Plant condition: '${obs.plantCondition}'`
      ],
      limitations: 'Simulated evaluation. Secondary Pythium/Rhizoctonia root rot potential should be evaluated in standing water.',
      isSimulated: true,
      modelName: 'SyncSense-Cloud-Mock-v2',
      reviewedAt
    };
  }

  // HEALTHY
  if (['green', 'dark_green'].includes(leafColor) && ['healthy', 'normal'].includes(plant)) {
    return {
      decisionId,
      caseId: caseData.caseId,
      crop,
      source: 'cloud',
      assessment: `Healthy ${crop} Vegetative Baseline Confirmed`,
      explanation: `Observations reflect balanced nitrogen balance and adequate soil moisture reserves with no visible pathogenic distress in ${crop}.`,
      observationsConsidered: [
        `Vigorous foliage: '${obs.plantCondition}'`,
        `Optimum leaf color: '${obs.leafColor}'`
      ],
      limitations: `Simulated evaluation. Continue regular scouting during ${crop} flowering and reproductive phase.`,
      isSimulated: true,
      modelName: 'SyncSense-Cloud-Mock-v2',
      reviewedAt
    };
  }

  // GENERAL ADDITIONAL INSIGHT
  return {
    decisionId,
    caseId: caseData.caseId,
    crop,
    source: 'cloud',
    assessment: `${crop} Agronomic Diagnostic Insight: Secondary Micronutrient Imbalance`,
    explanation: `Subtle discoloration reported in ${crop} suggests possible magnesium, zinc, or potassium translocation issues in addition to local rule indications.`,
    observationsConsidered: Object.entries(obs).map(([k, v]) => `${k}: ${v}`),
    limitations: 'Simulated evaluation. Soil tissue test needed for precise ppm quantification.',
    isSimulated: true,
    modelName: 'SyncSense-Cloud-Mock-v2',
    reviewedAt
  };
}

/**
 * Optional Live Gemini API call
 */
async function evaluateWithGemini(caseData, apiKey) {
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const prompt = `You are an expert agricultural AI specialist analyzing a cotton crop report from rural India.
Given the following observation data:
${JSON.stringify(caseData.observations, null, 2)}
Local Offline Rule Engine Assessment: ${JSON.stringify(caseData.localDecision?.assessment || 'None')}

Provide a structured JSON response (no markdown blocks, valid JSON only) with this exact schema:
{
  "assessment": "concise diagnosis heading",
  "explanation": "2-3 sentences explaining the agronomic rationale",
  "observationsConsidered": ["observation 1", "observation 2"],
  "limitations": "limitations of remote AI assessment without physical sampling"
}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API returned status ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  const parsed = JSON.parse(rawText);

  return {
    decisionId: `CLOUD-GEMINI-${Date.now()}`,
    caseId: caseData.caseId,
    source: 'cloud',
    assessment: parsed.assessment || 'Gemini Cloud Assessment',
    explanation: parsed.explanation || 'Analyzed with Google Gemini Cloud AI.',
    observationsConsidered: parsed.observationsConsidered || [],
    limitations: parsed.limitations || 'Preliminary AI model evaluation.',
    isSimulated: false,
    modelName: model,
    reviewedAt: new Date().toISOString()
  };
}
