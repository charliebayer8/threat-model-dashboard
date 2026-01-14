// simulation.js - Core simulation and calculation functions
import { AI_MILESTONES_BASE, JOB_CATEGORIES, SCENARIOS } from './constants';

// Calculate job displacement for a category in a given year
const calculateCategoryDisplacement = (category, year, config, milestonesReached) => {
  const yearsFromPeak = year - category.peakYear;
  
  // S-curve adoption: slow start, rapid middle, plateau
  const adoptionProgress = 1 / (1 + Math.exp(-0.15 * (yearsFromPeak) * (0.5 + config.automationSpeed)));
  
  // Milestone acceleration
  const milestoneBoost = 1 + milestonesReached * 0.08;
  
  // Base displacement rate
  const baseDisplacement = category.vulnerability * adoptionProgress * milestoneBoost;
  
  // Job creation offset (30-60% range per review)
  const jobCreationOffset = 0.35 + config.aiOptimism * 0.25;
  
  // Net displacement
  const netDisplacement = Math.max(0, baseDisplacement * (1 - jobCreationOffset));
  
  return {
    category: category.name,
    grossDisplacement: baseDisplacement * category.currentPct,
    netDisplacement: netDisplacement * category.currentPct,
    newJobsCreated: baseDisplacement * jobCreationOffset * category.currentPct,
  };
};

// Generate simulation data with unemployment
export const generateSimulationData = (scenario, config) => {
  const params = SCENARIOS[scenario];
  const data = [];
  
  const shiftedMilestones = AI_MILESTONES_BASE.map(m => ({
    ...m,
    year: m.baseYear + config.aiTimelineShift
  }));
  
  for (let year = 2025; year <= 2075; year++) {
    const yearsFromStart = year - 2025;
    const temp = params.tempBase + params.tempRate * yearsFromStart + Math.sin(yearsFromStart * 0.3) * 0.08;
    
    const waterStress = Math.min(0.85, 0.15 + (temp - 1.45) * 0.18);
    const foodInsecurity = Math.min(0.80, 0.12 + (temp - 1.45) * 0.15);
    const conflictProb = Math.min(0.20, (0.025 + (temp - 1.0) * 0.02) * params.riskMult);
    
    // Pandemic
    const pandemicBase = 0.03 + yearsFromStart * 0.0008;
    const pandemicClimate = pandemicBase * (1 + (temp - 1.45) * 0.2);
    
    // Nuclear risk
    const nuclearBase = 0.005 + yearsFromStart * 0.0002;
    const nuclearTension = 0.4 + conflictProb * 0.5;
    const nuclearProb = nuclearBase * (1 + nuclearTension);
    
    // AI risk (milestone-driven)
    const aiStalled = config.shockAIStall && year >= config.shockAIStallYear;
    const effectiveMilestonesReached = aiStalled 
      ? shiftedMilestones.filter(m => config.shockAIStallYear >= m.year).length 
      : shiftedMilestones.filter(m => year >= m.year).length;
    const milestonesReached = effectiveMilestonesReached;
    
    const aiMisuse = Math.min(0.30, 0.01 + milestonesReached * 0.025 + (aiStalled ? 0 : yearsFromStart * 0.002));
    const aiAlignment = milestonesReached >= 6 ? Math.min(0.12, (milestonesReached - 5) * 0.025) : 0;
    let aiCatastrophe = Math.min(0.35, (aiMisuse + aiAlignment) * (1 - config.aiOptimism * 0.3));
    
    if (aiStalled) {
      const yearsStalled = year - config.shockAIStallYear;
      aiCatastrophe = aiCatastrophe * Math.max(0.2, 1 - yearsStalled * 0.05);
    }
    
    const aiAmplification = aiStalled 
      ? 1 + shiftedMilestones.filter(m => config.shockAIStallYear >= m.year).length * 0.12
      : 1 + milestonesReached * 0.12;
    
    let amplifiedPandemic = Math.min(0.25, pandemicClimate * aiAmplification);
    let amplifiedConflict = Math.min(0.25, conflictProb * (1 + milestonesReached * 0.08));
    let amplifiedNuclear = Math.min(0.10, nuclearProb * (1 + milestonesReached * 0.05));
    
    // Nuclear war shock
    const nuclearWarOccurred = config.shockNuclearWar && year >= config.shockNuclearYear;
    const yearsAfterNuclearWar = nuclearWarOccurred ? year - config.shockNuclearYear : 0;
    
    let nuclearWinterEffect = 0;
    let nuclearFoodShock = 0;
    let nuclearEconomicShock = 0;
    
    if (nuclearWarOccurred) {
      nuclearWinterEffect = yearsAfterNuclearWar <= 3 
        ? -2.5 * (yearsAfterNuclearWar / 3)
        : -2.5 * Math.max(0, 1 - (yearsAfterNuclearWar - 3) / 17);
      
      nuclearFoodShock = yearsAfterNuclearWar <= 1 
        ? 0.6 
        : 0.6 * Math.max(0, 1 - (yearsAfterNuclearWar - 1) / 15);
      
      nuclearEconomicShock = yearsAfterNuclearWar <= 1
        ? 0.4
        : 0.4 * Math.max(0.2, 1 - (yearsAfterNuclearWar - 1) / 20);
      
      amplifiedNuclear = amplifiedNuclear * 0.1;
    }
    
    const tippingRisk = Math.min(1, (temp + nuclearWinterEffect - 1.5) * 0.4);
    const climateRisk = Math.min(1, (temp - 1.0) / 3.0);
    
    // AI unemployment calculation
    const categoryDisplacements = JOB_CATEGORIES.map(cat => 
      calculateCategoryDisplacement(cat, year, config, milestonesReached)
    );
    
    const baselineUnemployment = 4;
    
    let grossAIDisplacement = categoryDisplacements.reduce((sum, c) => sum + c.grossDisplacement, 0);
    if (aiStalled) {
      const stallYearDisplacement = JOB_CATEGORIES.reduce((sum, cat) => {
        const yearsFromPeak = config.shockAIStallYear - cat.peakYear;
        const adoptionAtStall = 1 / (1 + Math.exp(-0.15 * yearsFromPeak * (0.5 + config.automationSpeed)));
        const stallMilestones = AI_MILESTONES_BASE.filter(m => config.shockAIStallYear >= (m.baseYear + config.aiTimelineShift)).length;
        const milestoneBoostAtStall = 1 + stallMilestones * 0.08;
        const baseDisp = cat.vulnerability * adoptionAtStall * milestoneBoostAtStall;
        return sum + baseDisp * cat.currentPct;
      }, 0);
      grossAIDisplacement = stallYearDisplacement;
    }
    
    let newAIJobs = categoryDisplacements.reduce((sum, c) => sum + c.newJobsCreated, 0);
    
    // Resilience factors
    const substitutionBoost = 1 + config.resilienceSubstitution * 0.8;
    const productivityBoost = 1 + (milestonesReached * 0.03) + (config.automationSpeed * 0.15);
    newAIJobs = newAIJobs * substitutionBoost * productivityBoost;
    
    const adaptationReduction = config.resilienceAdaptation * 0.3;
    const transitionFriction = Math.max(0.1, (0.25 + (1 - config.aiOptimism) * 0.15) - adaptationReduction);
    
    let netAIUnemployment = Math.max(0, (grossAIDisplacement - newAIJobs) * transitionFriction);
    
    let climateUnemployment = waterStress * 2 + foodInsecurity * 1.5;
    let conflictUnemployment = amplifiedConflict * 8;
    
    if (nuclearWarOccurred) {
      conflictUnemployment += nuclearEconomicShock * 30;
      climateUnemployment += nuclearFoodShock * 10;
    }
    
    // UBI effects
    const ubiActive = config.ubiEnabled && year >= config.ubiStartYear;
    const ubiYearsActive = ubiActive ? year - config.ubiStartYear : 0;
    
    const ubiUnemploymentReduction = ubiActive ? 
      (netAIUnemployment * 0.4 * config.ubiGenerosity * Math.min(1, ubiYearsActive / 5)) : 0;
    
    const laborParticipationDrop = ubiActive ?
      (5 + config.ubiGenerosity * 12) * Math.min(1, ubiYearsActive / 8) : 0;
    
    const skillAtrophyRate = ubiActive ?
      (0.03 + config.ubiGenerosity * 0.07) * ubiYearsActive : 0;
    
    const ubiInflation = ubiActive ?
      (2 + config.ubiGenerosity * 8) * Math.min(1.5, ubiYearsActive / 10) : 0;
    
    const ubiFiscalCost = ubiActive ?
      (8 + config.ubiGenerosity * 16) * (1 + ubiInflation * 0.02) : 0;
    
    const ubiDebtRisk = ubiActive && ubiFiscalCost > 15 ?
      (ubiFiscalCost - 15) * 0.03 : 0;
    
    const ubiDependency = ubiActive ?
      Math.min(40, laborParticipationDrop * 0.8 + ubiYearsActive * config.ubiGenerosity * 2) : 0;
    
    const ubiPoliticalCapture = ubiActive && ubiDependency > 15 ?
      Math.min(1, (ubiDependency - 15) / 25) : 0;
    
    const rawUnemployment = baselineUnemployment + netAIUnemployment + climateUnemployment + conflictUnemployment;
    const measuredUnemployment = Math.max(3, rawUnemployment - ubiUnemploymentReduction);
    const realUnemployment = rawUnemployment + (skillAtrophyRate * 3);
    
    const structuralUnemployment = Math.min(measuredUnemployment * 0.7, netAIUnemployment * 0.8) + (skillAtrophyRate * 2);
    const frictionalUnemployment = measuredUnemployment - structuralUnemployment;
    
    const jobsAtHighRisk = categoryDisplacements
      .filter(c => c.grossDisplacement > c.netDisplacement * 0.3)
      .reduce((sum, c) => sum + c.grossDisplacement, 0);
    
    // Cascade amplifier
    let cascadeAmp = 1 + 
      0.3 * Math.max(0, temp - 1.5) +
      0.2 * amplifiedConflict +
      0.15 * (aiCatastrophe > 0.1 ? aiCatastrophe : 0) +
      0.1 * (realUnemployment > 15 ? (realUnemployment - 15) / 20 : 0) +
      ubiDebtRisk +
      (ubiPoliticalCapture * 0.1);
    
    if (nuclearWarOccurred && yearsAfterNuclearWar <= 10) {
      cascadeAmp += 0.5 * Math.max(0, 1 - yearsAfterNuclearWar / 10);
    }
    
    cascadeAmp = 1 + (cascadeAmp - 1) * (1 - config.resilienceTailDampening * 0.5);
    
    // Composite risk
    let compositeRisk = (
      config.weightClimate * climateRisk +
      config.weightConflict * amplifiedConflict * 4 +
      config.weightPandemic * amplifiedPandemic * 4 +
      config.weightNuclear * amplifiedNuclear * 10 +
      config.weightAI * aiCatastrophe +
      config.weightTipping * tippingRisk +
      config.weightCascade * (cascadeAmp - 1)
    ) * cascadeAmp;
    
    const adaptationOverTime = config.resilienceAdaptation * 0.02 * yearsFromStart;
    compositeRisk = compositeRisk * Math.max(0.3, 1 - adaptationOverTime);
    compositeRisk = Math.min(1.0, compositeRisk);
    
    data.push({
      year,
      temperature: Number((temp + nuclearWinterEffect).toFixed(2)),
      waterStress: Number(((waterStress + nuclearFoodShock * 0.3) * 100).toFixed(1)),
      foodInsecurity: Number(((foodInsecurity + nuclearFoodShock) * 100).toFixed(1)),
      conflictProbability: Number((amplifiedConflict * 100).toFixed(2)),
      pandemicProbability: Number((amplifiedPandemic * 100).toFixed(2)),
      nuclearProbability: Number((amplifiedNuclear * 100).toFixed(3)),
      aiCatastrophe: Number((aiCatastrophe * 100).toFixed(2)),
      aiMilestones: milestonesReached,
      aiAmplification: Number(aiAmplification.toFixed(2)),
      compositeRisk: Number((compositeRisk * 100).toFixed(1)),
      totalUnemployment: Number(measuredUnemployment.toFixed(1)),
      realUnemployment: Number(realUnemployment.toFixed(1)),
      aiUnemployment: Number(netAIUnemployment.toFixed(1)),
      structuralUnemployment: Number(structuralUnemployment.toFixed(1)),
      frictionalUnemployment: Number(frictionalUnemployment.toFixed(1)),
      grossDisplacement: Number(grossAIDisplacement.toFixed(1)),
      newJobsCreated: Number(newAIJobs.toFixed(1)),
      jobsAtHighRisk: Number(jobsAtHighRisk.toFixed(1)),
      categoryDisplacements,
      ubiActive,
      laborParticipationDrop: Number(laborParticipationDrop.toFixed(1)),
      skillAtrophyRate: Number((skillAtrophyRate * 100).toFixed(1)),
      ubiInflation: Number(ubiInflation.toFixed(1)),
      ubiFiscalCost: Number(ubiFiscalCost.toFixed(1)),
      ubiDependency: Number(ubiDependency.toFixed(1)),
      ubiPoliticalCapture: Number((ubiPoliticalCapture * 100).toFixed(0)),
      nuclearWarOccurred,
      nuclearWinterEffect: Number(nuclearWinterEffect.toFixed(2)),
      aiStalled,
      resilienceActive: config.resilienceAdaptation > 0 || config.resilienceSubstitution > 0 || config.resilienceTailDampening > 0,
      riskBreakdown: { climate: climateRisk, conflict: amplifiedConflict, pandemic: amplifiedPandemic, nuclear: amplifiedNuclear, ai: aiCatastrophe }
    });
  }
  return data;
};

export const calculateCumulative = (data, key) => {
  let cumulative = 0;
  data.forEach(d => {
    const annual = d[key] / 100;
    cumulative = 1 - (1 - cumulative) * (1 - annual);
  });
  return cumulative;
};
