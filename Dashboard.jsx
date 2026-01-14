// Dashboard.jsx - Main component that composes Layout, Controls, and Charts
import React, { useState, useMemo, useCallback } from 'react';
import { DEFAULT_CONFIG, AI_MILESTONES_BASE, THREAT_COLORS } from './constants';
import { generateSimulationData, calculateCumulative } from './simulation';
import { 
  ResponsiveStyles, PageContainer, Header, HeaderLogo, Footer,
  ControlsRow, TabsRow, MetricsGrid, ContentGrid
} from './Layout';
import {
  ConfigureButton, RiskDisplay, ConfigurationPanel,
  ScenarioSelector, YearSlider, UnemploymentIndicator,
  CumulativeDisplay, TabButtons, MetricsRow
} from './Controls';
import {
  UnemploymentTrajectoryChart, JobDisplacementChart, SectorVulnerabilityPanel,
  EmploymentBreakdownPanel, ModelMethodologyPanel, UBIEffectsPanel,
  OverviewCharts, AIDeepDiveCharts, NuclearCharts, ThreatsCharts
} from './Charts';

const threatColors = THREAT_COLORS;

export default function ThreatModelDashboardV3() {
  const [scenario, setScenario] = useState('SSP2-4.5');
  const [selectedYear, setSelectedYear] = useState(2050);
  const [activeTab, setActiveTab] = useState('overview');
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [showConfig, setShowConfig] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const data = useMemo(() => generateSimulationData(scenario, config), [scenario, config]);
  const currentYearData = useMemo(() => data.find(d => d.year === selectedYear) || data[0], [data, selectedYear]);
  
  const cumulatives = useMemo(() => ({
    pandemic: calculateCumulative(data, 'pandemicProbability'),
    nuclear: calculateCumulative(data, 'nuclearProbability'),
    ai: calculateCumulative(data, 'aiCatastrophe'),
  }), [data]);
  
  const peakUnemployment = useMemo(() => {
    const max = Math.max(...data.map(d => d.totalUnemployment));
    const peakYear = data.find(d => d.totalUnemployment === max)?.year;
    return { value: max, year: peakYear };
  }, [data]);
  
  const shiftedMilestones = useMemo(() => 
    AI_MILESTONES_BASE.map(m => ({
      ...m,
      year: m.baseYear + config.aiTimelineShift,
      reached: selectedYear >= (m.baseYear + config.aiTimelineShift)
    })),
    [config.aiTimelineShift, selectedYear]
  );

  const updateConfig = useCallback((key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const getRiskLevel = (score) => {
    if (score < 20) return { level: 'Low', color: '#10b981' };
    if (score < 40) return { level: 'Moderate', color: '#84cc16' };
    if (score < 60) return { level: 'Elevated', color: '#f59e0b' };
    if (score < 80) return { level: 'High', color: '#ef4444' };
    return { level: 'Critical', color: '#991b1b' };
  };

  const getUnemploymentLevel = (rate) => {
    if (rate < 6) return { level: 'Normal', color: '#10b981' };
    if (rate < 10) return { level: 'Elevated', color: '#84cc16' };
    if (rate < 15) return { level: 'High', color: '#f59e0b' };
    if (rate < 25) return { level: 'Crisis', color: '#ef4444' };
    return { level: 'Catastrophic', color: '#991b1b' };
  };

  const riskStatus = getRiskLevel(currentYearData.compositeRisk);
  const unemploymentStatus = getUnemploymentLevel(currentYearData.totalUnemployment);

  return (
    <PageContainer>
      <ResponsiveStyles />
      
      <Header 
        left={<HeaderLogo />}
        right={
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <ConfigureButton showConfig={showConfig} onClick={() => setShowConfig(!showConfig)} />
            <RiskDisplay riskStatus={riskStatus} selectedYear={selectedYear} compositeRisk={currentYearData.compositeRisk} />
          </div>
        }
      />

      <ConfigurationPanel config={config} updateConfig={updateConfig} showConfig={showConfig} />

      <ControlsRow>
        <ScenarioSelector scenario={scenario} setScenario={setScenario} />
        <YearSlider selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
        <UnemploymentIndicator unemploymentStatus={unemploymentStatus} totalUnemployment={currentYearData.totalUnemployment} />
        <CumulativeDisplay cumulatives={cumulatives} threatColors={threatColors} />
      </ControlsRow>

      <TabsRow>
        <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
      </TabsRow>

      <MetricsGrid>
        <MetricsRow currentYearData={currentYearData} threatColors={threatColors} />
      </MetricsGrid>

      {activeTab === 'economic' && (
        <ContentGrid>
          <UnemploymentTrajectoryChart data={data} peakUnemployment={peakUnemployment} />
          <JobDisplacementChart data={data} />
          <SectorVulnerabilityPanel 
            currentYearData={currentYearData} 
            selectedYear={selectedYear} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
          <EmploymentBreakdownPanel currentYearData={currentYearData} selectedYear={selectedYear} />
          <ModelMethodologyPanel />
          <UBIEffectsPanel config={config} currentYearData={currentYearData} selectedYear={selectedYear} />
        </ContentGrid>
      )}

      {activeTab === 'overview' && (
        <ContentGrid className="overview-grid">
          <OverviewCharts 
            data={data} 
            currentYearData={currentYearData} 
            selectedYear={selectedYear} 
            threatColors={threatColors} 
          />
        </ContentGrid>
      )}

      {activeTab === 'ai-deep-dive' && (
        <ContentGrid>
          <AIDeepDiveCharts data={data} shiftedMilestones={shiftedMilestones} config={config} />
        </ContentGrid>
      )}

      {activeTab === 'nuclear' && (
        <ContentGrid>
          <NuclearCharts data={data} />
        </ContentGrid>
      )}

      {activeTab === 'threats' && (
        <ContentGrid>
          <ThreatsCharts cumulatives={cumulatives} threatColors={threatColors} />
        </ContentGrid>
      )}

      <Footer />
    </PageContainer>
  );
}
