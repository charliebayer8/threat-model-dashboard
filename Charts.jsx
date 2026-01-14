// Charts.jsx - All chart JSX blocks
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell, Legend, PieChart, Pie, ComposedChart } from 'recharts';

const tooltipStyle = { background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', fontSize: '10px' };

export const UnemploymentTrajectoryChart = ({ data, peakUnemployment }) => (
  <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(71, 85, 105, 0.3)', borderRadius: '10px', padding: '16px' }}>
    <h3 style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '12px' }}>
      💼 AI-DRIVEN UNEMPLOYMENT TRAJECTORY
    </h3>
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="unemployGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="year" stroke="#64748b" fontSize={9} />
        <YAxis stroke="#64748b" fontSize={9} domain={[0, 35]} tickFormatter={v => `${v}%`} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="totalUnemployment" stroke="#f97316" fill="url(#unemployGrad)" name="Total Unemployment" />
        <Line type="monotone" dataKey="aiUnemployment" stroke="#06b6d4" strokeWidth={2} dot={false} name="AI-Caused" />
      </AreaChart>
    </ResponsiveContainer>
    <div style={{ marginTop: '8px', fontSize: '10px', color: '#64748b' }}>
      Peak unemployment: <span style={{ color: '#f97316', fontWeight: '600' }}>{peakUnemployment.value.toFixed(1)}%</span> in {peakUnemployment.year}
    </div>
  </div>
);

export const JobDisplacementChart = ({ data }) => (
  <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(71, 85, 105, 0.3)', borderRadius: '10px', padding: '16px' }}>
    <h3 style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '12px' }}>
      📊 JOB DISPLACEMENT vs CREATION
    </h3>
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="year" stroke="#64748b" fontSize={9} />
        <YAxis stroke="#64748b" fontSize={9} tickFormatter={v => `${v}%`} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: '10px' }} />
        <Bar dataKey="grossDisplacement" fill="#ef4444" name="Jobs Displaced" opacity={0.7} />
        <Bar dataKey="newJobsCreated" fill="#10b981" name="New AI Jobs" opacity={0.7} />
        <Line type="monotone" dataKey="aiUnemployment" stroke="#f97316" strokeWidth={2} name="Net AI Unemploy" />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

export const SectorVulnerabilityPanel = ({ currentYearData, selectedYear, selectedCategory, setSelectedCategory }) => (
  <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(71, 85, 105, 0.3)', borderRadius: '10px', padding: '16px' }}>
    <h3 style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '12px' }}>
      🎯 SECTOR VULNERABILITY ({selectedYear}) {selectedCategory && <span style={{ color: '#f97316' }}>— {selectedCategory}</span>}
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '220px', overflowY: 'auto' }}>
      {[...currentYearData.categoryDisplacements]
        .sort((a, b) => b.netDisplacement - a.netDisplacement)
        .map((cat, i) => {
          const vulnPct = (cat.netDisplacement / cat.grossDisplacement * 100) || 0;
          const color = vulnPct > 60 ? '#ef4444' : vulnPct > 30 ? '#f59e0b' : '#10b981';
          const isSelected = selectedCategory === cat.category;
          return (
            <div key={i} onClick={() => setSelectedCategory(isSelected ? null : cat.category)} style={{
              background: isSelected ? 'rgba(249, 115, 22, 0.2)' : 'rgba(15, 23, 42, 0.5)', 
              borderRadius: '6px', padding: '8px 10px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderLeft: `3px solid ${isSelected ? '#f97316' : color}`,
              cursor: 'pointer',
              border: isSelected ? '1px solid rgba(249, 115, 22, 0.5)' : '1px solid transparent',
            }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '500', color: '#e2e8f0' }}>{cat.category}</div>
                <div style={{ fontSize: '9px', color: '#64748b' }}>
                  {cat.grossDisplacement.toFixed(1)}% displaced → {cat.netDisplacement.toFixed(1)}% net
                </div>
              </div>
              <div style={{ fontSize: '12px', fontWeight: '600', color }}>{cat.netDisplacement.toFixed(1)}%</div>
            </div>
          );
        })}
    </div>
    {selectedCategory && (() => {
      const cat = currentYearData.categoryDisplacements.find(c => c.category === selectedCategory);
      if (!cat) return null;
      return (
        <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '6px', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#f97316', marginBottom: '6px' }}>{cat.category} Details</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '10px' }}>
            <div><span style={{ color: '#64748b' }}>Gross Displacement:</span> <span style={{ color: '#ef4444' }}>{cat.grossDisplacement.toFixed(2)}%</span></div>
            <div><span style={{ color: '#64748b' }}>Net Displacement:</span> <span style={{ color: '#f97316' }}>{cat.netDisplacement.toFixed(2)}%</span></div>
            <div><span style={{ color: '#64748b' }}>New Jobs Created:</span> <span style={{ color: '#10b981' }}>{cat.newJobsCreated.toFixed(2)}%</span></div>
            <div><span style={{ color: '#64748b' }}>Absorption Rate:</span> <span style={{ color: '#06b6d4' }}>{((cat.newJobsCreated / cat.grossDisplacement) * 100).toFixed(1)}%</span></div>
          </div>
        </div>
      );
    })()}
  </div>
);

export const EmploymentBreakdownPanel = ({ currentYearData, selectedYear }) => (
  <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(71, 85, 105, 0.3)', borderRadius: '10px', padding: '16px' }}>
    <h3 style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '12px' }}>
      📈 EMPLOYMENT BREAKDOWN ({selectedYear})
    </h3>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      {[
        { label: 'Total Unemployment', value: `${currentYearData.totalUnemployment}%`, color: '#f97316', desc: 'All causes combined' },
        { label: 'AI-Caused', value: `${currentYearData.aiUnemployment}%`, color: '#06b6d4', desc: 'Net job loss from AI' },
        { label: 'Jobs Displaced', value: `${currentYearData.grossDisplacement}%`, color: '#ef4444', desc: 'Gross automation' },
        { label: 'New AI Jobs', value: `${currentYearData.newJobsCreated}%`, color: '#10b981', desc: 'Jobs created by AI economy' },
        { label: 'Structural', value: `${currentYearData.structuralUnemployment}%`, color: '#8b5cf6', desc: 'Long-term mismatch' },
        { label: 'High Risk Jobs', value: `${currentYearData.jobsAtHighRisk}%`, color: '#ec4899', desc: 'Could be displaced soon' },
      ].map((stat, i) => (
        <div key={i} style={{
          background: 'rgba(15, 23, 42, 0.5)', borderRadius: '8px', padding: '10px',
          borderTop: `2px solid ${stat.color}`,
        }}>
          <div style={{ fontSize: '9px', color: '#64748b' }}>{stat.label}</div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
          <div style={{ fontSize: '8px', color: '#475569' }}>{stat.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

export const ModelMethodologyPanel = () => (
  <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(71, 85, 105, 0.3)', borderRadius: '10px', padding: '16px', gridColumn: '1 / -1' }}>
    <h3 style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '8px' }}>📋 MODEL METHODOLOGY</h3>
    <div style={{ fontSize: '11px', color: '#e2e8f0', lineHeight: '1.6' }}>
      <p style={{ margin: '0 0 8px 0' }}>
        <strong>AI Unemployment Model</strong> uses S-curve adoption rates per job category, modulated by:
      </p>
      <ul style={{ margin: '0', paddingLeft: '20px', color: '#94a3b8' }}>
        <li><strong>Vulnerability scores</strong> (0-1) based on task routineness, physical requirements, and cognitive complexity</li>
        <li><strong>AI milestone acceleration</strong> — each capability milestone increases displacement rate</li>
        <li><strong>Job creation offset</strong> (35-60%) — new roles created by AI economy (AI trainers, prompt engineers, etc.)</li>
        <li><strong>Transition friction</strong> (25-40%) — workers who struggle to retrain, contributing to structural unemployment</li>
      </ul>
      <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '10px' }}>
        Assumptions informed by Frey & Osborne (2017), OECD Employment Outlook, McKinsey Global Institute. 
        Values are hand-set to be plausible; not directly estimated from these papers.
      </p>
    </div>
  </div>
);

export const UBIEffectsPanel = ({ config, currentYearData, selectedYear }) => {
  if (!config.ubiEnabled) return null;
  
  return (
    <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: '10px', padding: '16px', gridColumn: '1 / -1' }}>
      <h3 style={{ fontSize: '10px', color: '#eab308', letterSpacing: '1px', marginBottom: '12px' }}>
        💰 UBI INTERVENTION EFFECTS ({selectedYear}) {!currentYearData.ubiActive && <span style={{ color: '#64748b' }}>— starts {config.ubiStartYear}</span>}
      </h3>
      {currentYearData.ubiActive ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
          {[
            { label: 'Measured Unemployment', value: `${currentYearData.totalUnemployment}%`, color: '#10b981', desc: 'Official rate (reduced)' },
            { label: 'Real Non-Participation', value: `${currentYearData.realUnemployment}%`, color: '#ef4444', desc: 'True economic exclusion' },
            { label: 'Labor Force Exit', value: `${currentYearData.laborParticipationDrop}%`, color: '#f97316', desc: 'Left workforce entirely' },
            { label: 'Skill Atrophy', value: `${currentYearData.skillAtrophyRate}%`, color: '#8b5cf6', desc: 'Annual skill degradation' },
            { label: 'Inflation Impact', value: `+${currentYearData.ubiInflation}%`, color: '#ec4899', desc: 'Basic goods price rise' },
            { label: 'Fiscal Cost', value: `${currentYearData.ubiFiscalCost}% GDP`, color: '#ef4444', desc: 'Government spending' },
            { label: 'Dependency Rate', value: `${currentYearData.ubiDependency}%`, color: '#f59e0b', desc: 'Population on UBI >2yr' },
            { label: 'Political Capture', value: `${currentYearData.ubiPoliticalCapture}%`, color: '#991b1b', desc: 'Policy lock-in risk' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(15, 23, 42, 0.5)', borderRadius: '8px', padding: '10px',
              borderTop: `2px solid ${stat.color}`,
            }}>
              <div style={{ fontSize: '9px', color: '#64748b' }}>{stat.label}</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '8px', color: '#475569' }}>{stat.desc}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', padding: '20px' }}>
          UBI intervention scheduled for {config.ubiStartYear}. Select a year ≥{config.ubiStartYear} to see effects.
        </div>
      )}
      {currentYearData.ubiActive && (
        <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <div style={{ fontSize: '10px', color: '#ef4444', fontWeight: '600', marginBottom: '4px' }}>⚠️ TRADEOFF ANALYSIS</div>
          <div style={{ fontSize: '10px', color: '#94a3b8', lineHeight: '1.5' }}>
            UBI reduces measured unemployment by <span style={{ color: '#10b981' }}>{(currentYearData.realUnemployment - currentYearData.totalUnemployment).toFixed(1)}%</span> but 
            increases real non-participation. Fiscal cost of <span style={{ color: '#ef4444' }}>{currentYearData.ubiFiscalCost}% GDP</span> 
            {currentYearData.ubiFiscalCost > 15 && <span style={{ color: '#991b1b' }}> exceeds sustainability threshold (15%)</span>}.
            {currentYearData.ubiDependency > 20 && <span> Dependency rate of {currentYearData.ubiDependency}% creates political lock-in risk.</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export const OverviewCharts = ({ data, currentYearData, selectedYear, threatColors }) => [
  <div key="trajectories" style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(71, 85, 105, 0.3)', borderRadius: '10px', padding: '16px' }}>
    <h3 style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '12px' }}>ALL THREAT TRAJECTORIES</h3>
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="year" stroke="#64748b" fontSize={9} />
        <YAxis stroke="#64748b" fontSize={9} domain={[0, 40]} tickFormatter={v => `${v}%`} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: '10px' }} />
        <Line type="monotone" dataKey="pandemicProbability" stroke={threatColors.pandemic} strokeWidth={2} dot={false} name="Pandemic" />
        <Line type="monotone" dataKey="nuclearProbability" stroke={threatColors.nuclear} strokeWidth={2} dot={false} name="Nuclear" />
        <Line type="monotone" dataKey="aiCatastrophe" stroke={threatColors.ai} strokeWidth={2} dot={false} name="AI Risk" />
        <Line type="monotone" dataKey="conflictProbability" stroke={threatColors.conflict} strokeWidth={2} dot={false} name="Conflict" />
        <Line type="monotone" dataKey="totalUnemployment" stroke={threatColors.unemployment} strokeWidth={2} dot={false} name="Unemployment" />
      </LineChart>
    </ResponsiveContainer>
  </div>,

  <div key="composition" style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(71, 85, 105, 0.3)', borderRadius: '10px', padding: '16px' }}>
    <h3 style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '12px' }}>RISK COMPOSITION ({selectedYear})</h3>
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={[
            { name: 'Climate', value: currentYearData.riskBreakdown.climate * 100, fill: threatColors.climate },
            { name: 'Pandemic', value: currentYearData.riskBreakdown.pandemic * 100, fill: threatColors.pandemic },
            { name: 'Nuclear', value: currentYearData.riskBreakdown.nuclear * 100, fill: threatColors.nuclear },
            { name: 'Conflict', value: currentYearData.riskBreakdown.conflict * 100, fill: threatColors.conflict },
            { name: 'AI', value: currentYearData.riskBreakdown.ai * 100, fill: threatColors.ai },
          ]}
          cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value"
        />
        <Tooltip formatter={(v) => `${v.toFixed(1)}%`} />
      </PieChart>
    </ResponsiveContainer>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '6px' }}>
      {Object.entries(threatColors).filter(([k]) => k !== 'unemployment').map(([name, color]) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: color }} />
          <span style={{ fontSize: '9px', color: '#94a3b8', textTransform: 'capitalize' }}>{name}</span>
        </div>
      ))}
    </div>
  </div>
];

export const AIDeepDiveCharts = ({ data, shiftedMilestones, config }) => [
  <div key="ai-risk" style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(71, 85, 105, 0.3)', borderRadius: '10px', padding: '16px' }}>
    <h3 style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '12px' }}>AI RISK TRAJECTORY</h3>
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="year" stroke="#64748b" fontSize={9} />
        <YAxis stroke="#64748b" fontSize={9} domain={[0, 40]} tickFormatter={v => `${v}%`} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="aiCatastrophe" stroke="#06b6d4" fill="url(#aiGrad)" name="AI Catastrophe" />
      </AreaChart>
    </ResponsiveContainer>
  </div>,

  <div key="milestones" style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(71, 85, 105, 0.3)', borderRadius: '10px', padding: '16px' }}>
    <h3 style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '12px' }}>
      CAPABILITY MILESTONES {config.aiTimelineShift !== 0 && <span style={{ color: '#06b6d4' }}>(shifted {config.aiTimelineShift > 0 ? '+' : ''}{config.aiTimelineShift}yr)</span>}
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {shiftedMilestones.map((m, i) => {
        const riskColor = m.risk === 'Critical' || m.risk === 'Existential' ? '#ef4444' : m.risk === 'High' ? '#f59e0b' : '#10b981';
        return (
          <div key={i} style={{
            background: m.reached ? 'rgba(6, 182, 212, 0.15)' : 'rgba(15, 23, 42, 0.5)',
            borderRadius: '6px', padding: '8px 10px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            border: m.reached ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: m.reached ? '#e2e8f0' : '#64748b' }}>
                {m.reached ? '✓ ' : ''}{m.name}
              </div>
              <div style={{ fontSize: '9px', color: '#475569' }}>~{m.year} • Job impact: {(m.jobImpact * 100).toFixed(0)}%</div>
            </div>
            <div style={{ fontSize: '8px', padding: '2px 6px', borderRadius: '4px', background: `${riskColor}22`, color: riskColor, fontWeight: '600' }}>
              {m.risk}
            </div>
          </div>
        );
      })}
    </div>
  </div>,

  <div key="amplification" style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(71, 85, 105, 0.3)', borderRadius: '10px', padding: '16px', gridColumn: '1 / -1' }}>
    <h3 style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '12px' }}>AI AMPLIFICATION OF OTHER THREATS</h3>
    <ResponsiveContainer width="100%" height={160}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="year" stroke="#64748b" fontSize={9} />
        <YAxis stroke="#64748b" fontSize={9} domain={[1, 2.5]} tickFormatter={v => `${v}x`} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="aiAmplification" stroke="#10b981" strokeWidth={2} dot={false} name="Risk Multiplier" />
      </LineChart>
    </ResponsiveContainer>
  </div>
];

export const NuclearCharts = ({ data }) => [
  <div key="nuclear-risk" style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(71, 85, 105, 0.3)', borderRadius: '10px', padding: '16px' }}>
    <h3 style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '12px' }}>☢️ NUCLEAR RISK</h3>
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="nuclearGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="year" stroke="#64748b" fontSize={9} />
        <YAxis stroke="#64748b" fontSize={9} domain={[0, 'auto']} tickFormatter={v => `${v}%`} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="nuclearProbability" stroke="#ec4899" fill="url(#nuclearGrad)" name="Nuclear Use (annual)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>,

  <div key="nuclear-scenarios" style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(71, 85, 105, 0.3)', borderRadius: '10px', padding: '16px' }}>
    <h3 style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '12px' }}>NUCLEAR SCENARIOS</h3>
    {[
      { name: 'Regional Exchange', prob: '~0.3%/yr', deaths: '50M + 250M famine', cooling: '-1.5°C' },
      { name: 'Limited Use', prob: '~0.1%/yr', deaths: '5M + 20M famine', cooling: '-0.3°C' },
      { name: 'Strategic Exchange', prob: '~0.01%/yr', deaths: '500M + 5B famine', cooling: '-10°C' },
    ].map((s, i) => (
      <div key={i} style={{
        background: 'rgba(15, 23, 42, 0.5)', borderRadius: '6px', padding: '10px', marginBottom: '8px',
        borderLeft: '3px solid #ec4899',
      }}>
        <div style={{ fontSize: '11px', fontWeight: '600', color: '#e2e8f0' }}>{s.name}</div>
        <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
          {s.prob} • {s.deaths} • {s.cooling}
        </div>
      </div>
    ))}
  </div>
];

export const ThreatsCharts = ({ cumulatives, threatColors }) => [
  <div key="cumulative" style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(71, 85, 105, 0.3)', borderRadius: '10px', padding: '16px' }}>
    <h3 style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '12px' }}>50-YEAR CUMULATIVE RISK</h3>
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={[
        { threat: 'Pandemic', cumulative: cumulatives.pandemic * 100 },
        { threat: 'AI', cumulative: cumulatives.ai * 100 },
        { threat: 'Nuclear', cumulative: cumulatives.nuclear * 100 },
      ]} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis type="number" stroke="#64748b" fontSize={9} domain={[0, 100]} tickFormatter={v => `${v}%`} />
        <YAxis type="category" dataKey="threat" stroke="#64748b" fontSize={10} width={60} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="cumulative" radius={[0, 4, 4, 0]}>
          <Cell fill={threatColors.pandemic} />
          <Cell fill={threatColors.ai} />
          <Cell fill={threatColors.nuclear} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>,

  <div key="unemployment-new" style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(71, 85, 105, 0.3)', borderRadius: '10px', padding: '16px' }}>
    <h3 style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '12px' }}>v3.1 NEW: UNEMPLOYMENT</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {[
        { change: 'AI Job Displacement Model', desc: '15 job categories with vulnerability scores', color: '#f97316' },
        { change: 'S-Curve Adoption', desc: 'Realistic automation rollout timing', color: '#06b6d4' },
        { change: 'Job Creation Offset', desc: '35-60% new AI economy jobs', color: '#10b981' },
        { change: 'Transition Friction', desc: 'Structural unemployment from retraining gaps', color: '#8b5cf6' },
        { change: 'Cascade Effect', desc: 'High unemployment increases instability', color: '#ef4444' },
      ].map((c, i) => (
        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: c.color, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '11px', fontWeight: '600', color: '#e2e8f0' }}>{c.change}</div>
            <div style={{ fontSize: '9px', color: '#64748b' }}>{c.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
];
