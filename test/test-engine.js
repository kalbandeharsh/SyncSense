import { evaluateObservations, SUPPORTED_CROPS } from '../js/rule-engine.js';
import { reconcileDecisions, RECONCILIATION_STATUS } from '../js/reconciliation.js';

console.log('--- Testing Multi-Crop Rule Engine ---');
console.log('Supported crops count:', SUPPORTED_CROPS.length);
console.assert(SUPPORTED_CROPS.length >= 5, 'Must support at least 5 major crops');

// 1. Cotton Test
const tCotton = evaluateObservations({
  crop: 'Cotton',
  soilCondition: 'dry',
  leafColor: 'yellow',
  leafSpots: 'no',
  plantCondition: 'wilting'
});
console.log('\n[Cotton Test]');
console.log('Assessment:', tCotton.assessment);
console.log('Matched Rules:', tCotton.matchedRuleIds);
console.assert(tCotton.matchedRuleIds.includes('COT-01'), 'Must match COT-01');
console.assert(tCotton.matchedRuleIds.includes('COT-02'), 'Must match COT-02');

// 2. Soybean Test
const tSoybean = evaluateObservations({
  crop: 'Soybean',
  soilCondition: 'moist',
  leafColor: 'green',
  leafSpots: 'brown_circular',
  plantCondition: 'healthy'
});
console.log('\n[Soybean Test]');
console.log('Assessment:', tSoybean.assessment);
console.log('Matched Rules:', tSoybean.matchedRuleIds);
console.assert(tSoybean.matchedRuleIds.includes('SOY-03'), 'Must match SOY-03 (Soybean Rust)');

// 3. Wheat Test
const tWheat = evaluateObservations({
  crop: 'Wheat',
  soilCondition: 'moist',
  leafColor: 'yellow',
  leafSpots: 'no',
  plantCondition: 'healthy'
});
console.log('\n[Wheat Test]');
console.log('Assessment:', tWheat.assessment);
console.log('Matched Rules:', tWheat.matchedRuleIds);
console.assert(tWheat.matchedRuleIds.includes('WHT-02'), 'Must match WHT-02 (Nitrogen chlorosis)');

// 4. Rice (Paddy) Test
const tRice = evaluateObservations({
  crop: 'Rice',
  soilCondition: 'cracked',
  leafColor: 'yellow',
  leafSpots: 'no',
  plantCondition: 'wilting'
});
console.log('\n[Rice Test]');
console.log('Assessment:', tRice.assessment);
console.log('Matched Rules:', tRice.matchedRuleIds);
console.assert(tRice.matchedRuleIds.includes('RIC-01'), 'Must match RIC-01 (Drought stress in paddy)');

// 5. Maize Test
const tMaize = evaluateObservations({
  crop: 'Maize',
  soilCondition: 'moist',
  leafColor: 'green',
  leafSpots: 'brown_circular',
  plantCondition: 'healthy'
});
console.log('\n[Maize Test]');
console.log('Assessment:', tMaize.assessment);
console.log('Matched Rules:', tMaize.matchedRuleIds);
console.assert(tMaize.matchedRuleIds.includes('MAZ-03'), 'Must match MAZ-03 (Turcicum leaf blight)');

// Reconciliation Tests
console.log('\n--- Testing Reconciliation Engine ---');

const rMatch = reconcileDecisions(
  { assessment: 'Possible Water Stress', matchedRuleIds: ['COT-01'] },
  { assessment: 'Identified Moisture Deficit and Water Stress' }
);
console.log('Reconciliation Match test status:', rMatch.status);
console.assert(rMatch.status === RECONCILIATION_STATUS.MATCH, 'Should be Match');

const rConflict = reconcileDecisions(
  { assessment: 'Possible Water Stress', matchedRuleIds: ['COT-01'] },
  { assessment: 'Foliar Disease: Alternaria fungal leaf spot' }
);
console.log('Reconciliation Conflict test status:', rConflict.status);
console.assert(rConflict.status === RECONCILIATION_STATUS.CONFLICT, 'Should be Conflict');
console.assert(rConflict.conflictAlert.includes('Conflict detected'), 'Must contain required conflict alert');

console.log('\nAll Multi-Crop Rule Engine & Reconciliation Tests Passed Cleanly!');
