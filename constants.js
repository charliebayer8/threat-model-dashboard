// constants.js - Model configuration and data constants
// v3.4 - Coefficients loosely inspired by 1990-2023 US trends (manual review; not fitted)

export const DEFAULT_CONFIG = {
  weightClimate: 0.15,
  weightConflict: 0.15,
  weightPandemic: 0.20,
  weightNuclear: 0.15,
  weightAI: 0.20,
  weightTipping: 0.10,
  weightCascade: 0.05,
  aiTimelineShift: 0,
  aiOptimism: 0.5,
  automationSpeed: 0.5,
  ubiEnabled: false,
  ubiStartYear: 2035,
  ubiGenerosity: 0.5,
  modelMode: 'stress',
  resilienceAdaptation: 0,
  resilienceSubstitution: 0,
  resilienceTailDampening: 0,
  shockNuclearWar: false,
  shockNuclearYear: 2035,
  shockAIStall: false,
  shockAIStallYear: 2030,
};

export const MODE_PRESETS = {
  stress: { resilienceAdaptation: 0, resilienceSubstitution: 0, resilienceTailDampening: 0 },
  baseline: { resilienceAdaptation: 0.5, resilienceSubstitution: 0.4, resilienceTailDampening: 0.5 },
};

export const AI_MILESTONES_BASE = [
  { name: 'Expert Coding', baseYear: 2029, risk: 'Medium', jobImpact: 0.03 },
  { name: 'PhD Research', baseYear: 2033, risk: 'Medium', jobImpact: 0.02 },
  { name: 'Cyber Offense', baseYear: 2034, risk: 'High', jobImpact: 0.01 },
  { name: 'Social Engineering', baseYear: 2035, risk: 'High', jobImpact: 0.04 },
  { name: 'Advanced Pathogen Modeling', baseYear: 2040, risk: 'Critical', jobImpact: 0.01 },
  { name: 'Autonomous Research', baseYear: 2042, risk: 'High', jobImpact: 0.05 },
  { name: 'Recursive Improvement', baseYear: 2055, risk: 'Critical', jobImpact: 0.08 },
  { name: 'Superhuman Strategy', baseYear: 2060, risk: 'Existential', jobImpact: 0.10 },
];

export const JOB_CATEGORIES = [
  { name: 'Clerical/Admin', currentPct: 13, vulnerability: 0.85, peakYear: 2032 },
  { name: 'Manufacturing', currentPct: 8, vulnerability: 0.70, peakYear: 2035 },
  { name: 'Retail/Sales', currentPct: 10, vulnerability: 0.75, peakYear: 2033 },
  { name: 'Transportation', currentPct: 6, vulnerability: 0.80, peakYear: 2038 },
  { name: 'Food Service', currentPct: 9, vulnerability: 0.65, peakYear: 2040 },
  { name: 'Customer Service', currentPct: 5, vulnerability: 0.90, peakYear: 2030 },
  { name: 'Finance/Accounting', currentPct: 6, vulnerability: 0.60, peakYear: 2035 },
  { name: 'Legal Services', currentPct: 2, vulnerability: 0.45, peakYear: 2038 },
  { name: 'Healthcare Support', currentPct: 7, vulnerability: 0.35, peakYear: 2045 },
  { name: 'Creative/Media', currentPct: 3, vulnerability: 0.40, peakYear: 2034 },
  { name: 'Software/Tech', currentPct: 4, vulnerability: 0.30, peakYear: 2040 },
  { name: 'Education', currentPct: 6, vulnerability: 0.30, peakYear: 2045 },
  { name: 'Skilled Trades', currentPct: 8, vulnerability: 0.25, peakYear: 2050 },
  { name: 'Healthcare Prof', currentPct: 5, vulnerability: 0.20, peakYear: 2055 },
  { name: 'Management', currentPct: 8, vulnerability: 0.35, peakYear: 2048 },
];

export const THREAT_COLORS = {
  climate: '#ef4444',
  pandemic: '#8b5cf6',
  conflict: '#f59e0b',
  nuclear: '#ec4899',
  ai: '#06b6d4',
  unemployment: '#f97316',
};

export const SCENARIOS = {
  'SSP1-2.6': { tempBase: 1.45, tempRate: 0.012, riskMult: 0.7 },
  'SSP2-4.5': { tempBase: 1.45, tempRate: 0.022, riskMult: 1.0 },
  'SSP3-7.0': { tempBase: 1.45, tempRate: 0.032, riskMult: 1.3 },
  'SSP5-8.5': { tempBase: 1.45, tempRate: 0.045, riskMult: 1.6 },
};
