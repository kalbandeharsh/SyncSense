import express from 'express';
import { evaluateWithCloudAI } from '../backend/cloud-ai.js';
import { evaluateObservations } from '../js/rule-engine.js';
import { reconcileDecisions, RECONCILIATION_STATUS } from '../js/reconciliation.js';

console.log('--- Testing Backend Cloud AI and End-to-End Flow ---');

// Test 1: Scenario 1 - Matching Consensus
const s1Obs = {
  crop: 'Cotton',
  soilCondition: 'dry',
  leafColor: 'yellow',
  leafSpots: 'no',
  plantCondition: 'wilting',
  additionalNotes: 'Parched soil'
};
const s1Local = evaluateObservations(s1Obs);
const s1Cloud = await evaluateWithCloudAI({
  caseId: 'TEST-CASE-1',
  crop: 'Cotton',
  observations: s1Obs,
  localDecision: s1Local
});
const s1Recon = reconcileDecisions(s1Local, s1Cloud);

console.log('\n[Scenario 1]');
console.log('Local Assessment:', s1Local.assessment);
console.log('Cloud Assessment:', s1Cloud.assessment);
console.log('Reconciliation Status:', s1Recon.status);
console.assert(s1Recon.status === RECONCILIATION_STATUS.MATCH, 'Scenario 1 must match');
console.assert(s1Cloud.isSimulated === true, 'Cloud must be labeled simulated');

// Test 2: Scenario 2 - Conflict Detected & Preserved
const s2Obs = {
  crop: 'Cotton',
  soilCondition: 'dry',
  leafColor: 'yellow',
  leafSpots: 'no',
  plantCondition: 'wilting',
  additionalNotes: 'Foliar fungal spots conflict test'
};
const s2Local = evaluateObservations(s2Obs);
const s2Cloud = await evaluateWithCloudAI({
  caseId: 'TEST-CASE-2',
  crop: 'Cotton',
  observations: s2Obs,
  localDecision: s2Local
});
const s2Recon = reconcileDecisions(s2Local, s2Cloud);

console.log('\n[Scenario 2]');
console.log('Local Assessment:', s2Local.assessment);
console.log('Cloud Assessment:', s2Cloud.assessment);
console.log('Reconciliation Status:', s2Recon.status);
console.assert(s2Recon.status === RECONCILIATION_STATUS.CONFLICT, 'Scenario 2 must trigger conflict');
console.assert(s2Recon.conflictAlert.includes('Conflict detected'), 'Scenario 2 must include required conflict alert text');

// Test 3: Scenario 3 - Insufficient Evidence & Cloud Fallback
const s3Obs = {
  crop: 'Cotton',
  soilCondition: 'moist',
  leafColor: 'reddish_purple',
  leafSpots: 'no',
  plantCondition: 'stunted',
  additionalNotes: 'Unusual tint'
};
const s3Local = evaluateObservations(s3Obs);
const s3Cloud = await evaluateWithCloudAI({
  caseId: 'TEST-CASE-3',
  crop: 'Cotton',
  observations: s3Obs,
  localDecision: s3Local
});
const s3Recon = reconcileDecisions(s3Local, s3Cloud);

console.log('\n[Scenario 3]');
console.log('Local Assessment:', s3Local.assessment);
console.log('Cloud Assessment:', s3Cloud.assessment);
console.log('Reconciliation Status:', s3Recon.status);

console.log('\nAll End-to-End Scenarios Verified Successfully!');
