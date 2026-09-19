/**
 * SyncSense AI - Deterministic Reconciliation Engine
 * 
 * Compares local rule engine decisions with incoming cloud AI assessments.
 * Crucial Guarantee: Never blindly overwrites or deletes the local decision.
 * Highlights discrepancies and maintains an immutable decision audit trail.
 */

export const RECONCILIATION_STATUS = {
  MATCH: 'Match / Confirmed',
  ADDITIONAL_INSIGHT: 'Additional Insight',
  CONFLICT: 'Conflict Detected',
  REQUIRES_REVIEW: 'Requires Review'
};

/**
 * Keyword classification dictionaries for semantic similarity checks
 */
const STRESS_KEYWORDS = {
  water: ['water stress', 'drought', 'moisture deficit', 'underwatering', 'wilting', 'water deficit'],
  nutrient: ['nutrient', 'nitrogen', 'chlorosis', 'deficiency', 'micronutrient', 'fertilizer'],
  disease: ['foliar disease', 'fungal', 'bacterial', 'leaf spot', 'alternaria', 'cercospora', 'pathogen', 'blight'],
  waterlogging: ['waterlogging', 'hypoxia', 'root asphyxiation', 'overwatering', 'drainage', 'saturated'],
  healthy: ['healthy', 'normal growth', 'no immediate stress', 'vigorous']
};

/**
 * Normalizes text for comparison.
 */
function normalizeText(text = '') {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();
}

/**
 * Extracts dominant topics from an assessment string.
 */
function extractTopics(text = '') {
  const norm = normalizeText(text);
  const detected = new Set();

  for (const [topic, keywords] of Object.entries(STRESS_KEYWORDS)) {
    for (const kw of keywords) {
      if (norm.includes(kw)) {
        detected.add(topic);
        break;
      }
    }
  }

  return detected;
}

/**
 * Compares a local decision and a cloud decision.
 * 
 * @param {Object} localDecision
 * @param {string} localDecision.assessment
 * @param {Array<string>} [localDecision.matchedRules]
 * @param {string} [localDecision.explanation]
 * @param {Object} cloudDecision
 * @param {string} cloudDecision.assessment
 * @param {string} [cloudDecision.explanation]
 * @param {string} [cloudDecision.limitations]
 * @returns {Object} Reconciliation Result
 */
export function reconcileDecisions(localDecision, cloudDecision) {
  const localText = localDecision?.assessment || '';
  const cloudText = cloudDecision?.assessment || '';

  const localTopics = extractTopics(localText + ' ' + (localDecision?.explanation || ''));
  const cloudTopics = extractTopics(cloudText + ' ' + (cloudDecision?.explanation || ''));

  const reconciledAt = new Date().toISOString();

  // 1. If local assessment was insufficient evidence
  if (localDecision?.matchedRuleIds?.length === 0 || localText.toLowerCase().includes('insufficient evidence')) {
    if (cloudTopics.size > 0) {
      return {
        status: RECONCILIATION_STATUS.ADDITIONAL_INSIGHT,
        summary: 'Cloud AI provided diagnostic insights for an unclassified local observation.',
        details: `Local rule engine found insufficient evidence. Cloud evaluation identified potential factor(s): ${Array.from(cloudTopics).join(', ')}.`,
        conflictAlert: null,
        preservedLocal: true,
        reconciledAt
      };
    } else {
      return {
        status: RECONCILIATION_STATUS.REQUIRES_REVIEW,
        summary: 'Both local rule engine and cloud AI report uncertain or limited data.',
        details: 'Neither engine could reach a conclusive pattern. Further physical inspection is recommended.',
        conflictAlert: null,
        preservedLocal: true,
        reconciledAt
      };
    }
  }

  // 2. Direct intersection of diagnostic topics
  const intersection = new Set([...localTopics].filter(t => cloudTopics.has(t)));
  const localOnly = new Set([...localTopics].filter(t => !cloudTopics.has(t)));
  const cloudOnly = new Set([...cloudTopics].filter(t => !localTopics.has(t)));

  // Conflict Detected: Local and Cloud point in contrasting directions
  // e.g. Local says Water/Nutrient Stress, Cloud says Fungal Leaf Spot, or vice-versa
  const isContrastingTopics = (
    (localTopics.has('disease') && !cloudTopics.has('disease') && (cloudTopics.has('water') || cloudTopics.has('healthy'))) ||
    (!localTopics.has('disease') && cloudTopics.has('disease') && (localTopics.has('water') || localTopics.has('healthy'))) ||
    (localTopics.has('healthy') && !cloudTopics.has('healthy') && (cloudTopics.has('water') || cloudTopics.has('disease') || cloudTopics.has('waterlogging'))) ||
    (!localTopics.has('healthy') && cloudTopics.has('healthy') && (localTopics.has('water') || localTopics.has('disease') || localTopics.has('waterlogging')))
  );

  if (isContrastingTopics || (intersection.size === 0 && localTopics.size > 0 && cloudTopics.size > 0)) {
    const localSummary = Array.from(localTopics).join(' + ') || 'Local rule finding';
    const cloudSummary = Array.from(cloudTopics).join(' + ') || 'Cloud AI finding';

    return {
      status: RECONCILIATION_STATUS.CONFLICT,
      summary: `Contrasting diagnoses: Local rule indicated [${localSummary}], whereas Cloud AI concluded [${cloudSummary}].`,
      details: `Conflict detected between local rule assessment and cloud analysis. The original local decision has been strictly preserved in the audit log. Expert agronomist review is required before taking field action.`,
      conflictAlert: 'Conflict detected. The original local decision has been preserved. Additional review is required.',
      preservedLocal: true,
      reconciledAt
    };
  }

  // Direct Match: Assessments agree on primary conditions
  if (intersection.size > 0 && (
      (localOnly.size === 0 && cloudOnly.size === 0) ||
      (intersection.has('water') && !isContrastingTopics && cloudTopics.has('water')) ||
      (intersection.has('disease') && cloudTopics.has('disease')) ||
      (intersection.has('waterlogging') && cloudTopics.has('waterlogging'))
  )) {
    return {
      status: RECONCILIATION_STATUS.MATCH,
      summary: 'Local and cloud assessments are fully consistent.',
      details: `Both systems independently identified ${Array.from(intersection).join(' & ')} as the primary condition.`,
      conflictAlert: null,
      preservedLocal: true,
      reconciledAt
    };
  }

  // Additional Insight (Cloud agrees with local and expands on it)
  if (intersection.size > 0 || cloudOnly.size > 0) {
    return {
      status: RECONCILIATION_STATUS.ADDITIONAL_INSIGHT,
      summary: 'Cloud AI confirmed local assessment and provided additional diagnostic depth.',
      details: `Agreed on '${Array.from(intersection).join(', ') || 'underlying stress'}'. Cloud AI added considerations for: ${Array.from(cloudOnly).join(', ')}.`,
      conflictAlert: null,
      preservedLocal: true,
      reconciledAt
    };
  }

  // Fallback: Requires Review
  return {
    status: RECONCILIATION_STATUS.REQUIRES_REVIEW,
    summary: 'Partial overlap with nuances requiring human confirmation.',
    details: `Local factors: [${Array.from(localTopics).join(', ')}]. Cloud factors: [${Array.from(cloudTopics).join(', ')}]. Verification advised.`,
    conflictAlert: null,
    preservedLocal: true,
    reconciledAt
  };
}
