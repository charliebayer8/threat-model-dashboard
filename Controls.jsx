// Controls.jsx - All sliders, toggles, dropdowns, buttons
import React from 'react';
import { MODE_PRESETS } from './constants';

export const ConfigureButton = ({ showConfig, onClick }) => (
  <button onClick={onClick} style={{
    background: showConfig ? 'rgba(139, 92, 246, 0.2)' : 'rgba(30, 41, 59, 0.7)',
    border: '1px solid rgba(139, 92, 246, 0.4)',
    borderRadius: '8px', padding: '8px 14px',
    color: '#e2e8f0', fontSize: '11px', cursor: 'pointer',
  }}>
    ⚙️ Configure
  </button>
);

export const RiskDisplay = ({ riskStatus, selectedYear, compositeRisk }) => (
  <div style={{
    background: `linear-gradient(135deg, ${riskStatus.color}22, ${riskStatus.color}11)`,
    border: `1px solid ${riskStatus.color}44`,
    borderRadius: '10px', padding: '8px 14px', textAlign: 'right',
  }}>
    <div style={{ fontSize: '8px', color: '#94a3b8', letterSpacing: '1px' }}>SYSTEMIC STRESS {selectedYear}</div>
    <div style={{ fontSize: '24px', fontWeight: '700', color: riskStatus.color }}>{compositeRisk}%</div>
  </div>
);

export const ConfigurationPanel = ({ config, updateConfig, showConfig }) => {
  if (!showConfig) return null;
  
  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.8)',
      border: '1px solid rgba(71, 85, 105, 0.5)',
      borderRadius: '12px', padding: '16px', marginBottom: '16px',
    }}>
      <h3 style={{ fontSize: '11px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '12px' }}>
        ⚙️ MODEL CONFIGURATION
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
        {[
          { key: 'weightAI', label: 'AI Weight', max: 0.4 },
          { key: 'weightNuclear', label: 'Nuclear Weight', max: 0.3 },
          { key: 'weightPandemic', label: 'Pandemic Weight', max: 0.4 },
          { key: 'weightClimate', label: 'Climate Weight', max: 0.3 },
          { key: 'weightConflict', label: 'Conflict Weight', max: 0.3 },
        ].map(({ key, label, max }) => (
          <div key={key}>
            <label style={{ fontSize: '10px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
              {label}: <span style={{ color: '#8b5cf6' }}>{(config[key] * 100).toFixed(0)}%</span>
            </label>
            <input type="range" min={0} max={max} step={0.05} value={config[key]}
              onChange={(e) => updateConfig(key, parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: '#8b5cf6' }}
            />
          </div>
        ))}
        <div>
          <label style={{ fontSize: '10px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
            AI Timeline Shift: <span style={{ color: '#06b6d4' }}>{config.aiTimelineShift > 0 ? '+' : ''}{config.aiTimelineShift} years</span>
          </label>
          <input type="range" min={-10} max={20} step={1} value={config.aiTimelineShift}
            onChange={(e) => updateConfig('aiTimelineShift', parseInt(e.target.value))}
            style={{ width: '100%', accentColor: '#06b6d4' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '10px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
            AI Optimism: <span style={{ color: '#10b981' }}>{(config.aiOptimism * 100).toFixed(0)}%</span>
          </label>
          <input type="range" min={0.2} max={0.8} step={0.1} value={config.aiOptimism}
            onChange={(e) => updateConfig('aiOptimism', parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#10b981' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '10px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
            Automation Speed: <span style={{ color: '#f97316' }}>{config.automationSpeed < 0.4 ? 'Slow' : config.automationSpeed > 0.6 ? 'Rapid' : 'Medium'}</span>
          </label>
          <input type="range" min={0.2} max={0.8} step={0.1} value={config.automationSpeed}
            onChange={(e) => updateConfig('automationSpeed', parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#f97316' }}
          />
        </div>
      </div>
      
      {/* UBI Intervention Panel */}
      <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
          <label style={{ fontSize: '11px', color: '#eab308', fontWeight: '600' }}>
            💰 UBI INTERVENTION
          </label>
          <button 
            onClick={() => updateConfig('ubiEnabled', !config.ubiEnabled)}
            style={{
              background: config.ubiEnabled ? 'rgba(234, 179, 8, 0.3)' : 'rgba(30, 41, 59, 0.7)',
              border: config.ubiEnabled ? '1px solid #eab308' : '1px solid #475569',
              borderRadius: '4px', padding: '4px 10px',
              color: config.ubiEnabled ? '#eab308' : '#94a3b8',
              fontSize: '10px', cursor: 'pointer', fontWeight: '600',
            }}
          >
            {config.ubiEnabled ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>
        {config.ubiEnabled && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '10px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                Start Year: <span style={{ color: '#eab308' }}>{config.ubiStartYear}</span>
              </label>
              <input type="range" min={2028} max={2050} step={1} value={config.ubiStartYear}
                onChange={(e) => updateConfig('ubiStartYear', parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#eab308' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '10px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                Generosity: <span style={{ color: '#eab308' }}>{config.ubiGenerosity < 0.4 ? 'Minimal' : config.ubiGenerosity > 0.6 ? 'Full Income' : 'Moderate'}</span>
              </label>
              <input type="range" min={0.2} max={0.9} step={0.1} value={config.ubiGenerosity}
                onChange={(e) => updateConfig('ubiGenerosity', parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#eab308' }}
              />
            </div>
          </div>
        )}
        <div style={{ fontSize: '9px', color: '#64748b', marginTop: '8px' }}>
          ⚠️ UBI reduces measured unemployment but introduces: labor exit, skill atrophy, inflation, fiscal strain, dependency
        </div>
      </div>

      {/* MODEL ASSUMPTIONS - Resilience Panel */}
      <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <label style={{ fontSize: '11px', color: '#10b981', fontWeight: '600' }}>
            🎚️ MODEL ASSUMPTIONS
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[
              { mode: 'stress', label: 'Stress Test', desc: 'What if everything compounds?' },
              { mode: 'baseline', label: 'Baseline', desc: 'Historical adaptation rates apply' },
              { mode: 'custom', label: 'Custom', desc: 'Set your own assumptions' },
            ].map(({ mode, label }) => (
              <button 
                key={mode}
                onClick={() => {
                  updateConfig('modelMode', mode);
                  if (mode !== 'custom') {
                    const preset = MODE_PRESETS[mode];
                    Object.keys(preset).forEach(k => updateConfig(k, preset[k]));
                  }
                }}
                style={{
                  background: config.modelMode === mode ? 'rgba(16, 185, 129, 0.3)' : 'rgba(30, 41, 59, 0.7)',
                  border: config.modelMode === mode ? '1px solid #10b981' : '1px solid #475569',
                  borderRadius: '4px', padding: '4px 10px',
                  color: config.modelMode === mode ? '#10b981' : '#94a3b8',
                  fontSize: '10px', cursor: 'pointer', fontWeight: '600',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '10px', padding: '8px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '4px' }}>
          {config.modelMode === 'stress' && '⚡ Stress Test: No human adaptation assumed. Shows worst-case compounding.'}
          {config.modelMode === 'baseline' && '📊 Baseline: Assumes humans adapt at historical rates. More moderate outcomes.'}
          {config.modelMode === 'custom' && '🔧 Custom: Set your own assumptions about human resilience below.'}
        </div>

        {(config.modelMode === 'custom' || config.modelMode === 'baseline') && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '10px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                "We adjust over time": <span style={{ color: '#10b981' }}>{(config.resilienceAdaptation * 100).toFixed(0)}%</span>
              </label>
              <input type="range" min={0} max={0.8} step={0.1} value={config.resilienceAdaptation}
                onChange={(e) => { updateConfig('resilienceAdaptation', parseFloat(e.target.value)); updateConfig('modelMode', 'custom'); }}
                style={{ width: '100%', accentColor: '#10b981' }}
              />
              <div style={{ fontSize: '8px', color: '#475569' }}>Governments act, companies pivot, people retrain</div>
            </div>
            <div>
              <label style={{ fontSize: '10px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                "New jobs replace old jobs": <span style={{ color: '#10b981' }}>{(config.resilienceSubstitution * 100).toFixed(0)}%</span>
              </label>
              <input type="range" min={0} max={0.8} step={0.1} value={config.resilienceSubstitution}
                onChange={(e) => { updateConfig('resilienceSubstitution', parseFloat(e.target.value)); updateConfig('modelMode', 'custom'); }}
                style={{ width: '100%', accentColor: '#10b981' }}
              />
              <div style={{ fontSize: '8px', color: '#475569' }}>New industries absorb displaced workers</div>
            </div>
            <div>
              <label style={{ fontSize: '10px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                "Not everything goes wrong at once": <span style={{ color: '#10b981' }}>{(config.resilienceTailDampening * 100).toFixed(0)}%</span>
              </label>
              <input type="range" min={0} max={0.8} step={0.1} value={config.resilienceTailDampening}
                onChange={(e) => { updateConfig('resilienceTailDampening', parseFloat(e.target.value)); updateConfig('modelMode', 'custom'); }}
                style={{ width: '100%', accentColor: '#10b981' }}
              />
              <div style={{ fontSize: '8px', color: '#475569' }}>Tail risks don't all materialize simultaneously</div>
            </div>
          </div>
        )}
      </div>

      {/* SHOCK SCENARIOS */}
      <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px' }}>
        <label style={{ fontSize: '11px', color: '#ef4444', fontWeight: '600', display: 'block', marginBottom: '12px' }}>
          💥 SHOCK SCENARIOS
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
          {/* Nuclear War Shock */}
          <div style={{ padding: '10px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px' }}>☢️</span>
              <span style={{ fontSize: '11px', color: '#e2e8f0', fontWeight: '500' }}>Nuclear War</span>
              <button 
                onClick={() => updateConfig('shockNuclearWar', !config.shockNuclearWar)}
                style={{
                  marginLeft: 'auto',
                  background: config.shockNuclearWar ? 'rgba(239, 68, 68, 0.3)' : 'rgba(30, 41, 59, 0.7)',
                  border: config.shockNuclearWar ? '1px solid #ef4444' : '1px solid #475569',
                  borderRadius: '4px', padding: '2px 8px',
                  color: config.shockNuclearWar ? '#ef4444' : '#94a3b8',
                  fontSize: '9px', cursor: 'pointer',
                }}
              >
                {config.shockNuclearWar ? 'ON' : 'OFF'}
              </button>
            </div>
            {config.shockNuclearWar && (
              <div>
                <label style={{ fontSize: '9px', color: '#64748b' }}>
                  Year: <span style={{ color: '#ef4444' }}>{config.shockNuclearYear}</span>
                </label>
                <input type="range" min={2026} max={2060} step={1} value={config.shockNuclearYear}
                  onChange={(e) => updateConfig('shockNuclearYear', parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#ef4444' }}
                />
                <div style={{ fontSize: '8px', color: '#475569' }}>Nuclear winter, food collapse, economic shock</div>
              </div>
            )}
          </div>

          {/* AI Stall Shock */}
          <div style={{ padding: '10px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px' }}>🤖</span>
              <span style={{ fontSize: '11px', color: '#e2e8f0', fontWeight: '500' }}>AI Progress Stalls</span>
              <button 
                onClick={() => updateConfig('shockAIStall', !config.shockAIStall)}
                style={{
                  marginLeft: 'auto',
                  background: config.shockAIStall ? 'rgba(6, 182, 212, 0.3)' : 'rgba(30, 41, 59, 0.7)',
                  border: config.shockAIStall ? '1px solid #06b6d4' : '1px solid #475569',
                  borderRadius: '4px', padding: '2px 8px',
                  color: config.shockAIStall ? '#06b6d4' : '#94a3b8',
                  fontSize: '9px', cursor: 'pointer',
                }}
              >
                {config.shockAIStall ? 'ON' : 'OFF'}
              </button>
            </div>
            {config.shockAIStall && (
              <div>
                <label style={{ fontSize: '9px', color: '#64748b' }}>
                  Stall Year: <span style={{ color: '#06b6d4' }}>{config.shockAIStallYear}</span>
                </label>
                <input type="range" min={2026} max={2050} step={1} value={config.shockAIStallYear}
                  onChange={(e) => updateConfig('shockAIStallYear', parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#06b6d4' }}
                />
                <div style={{ fontSize: '8px', color: '#475569' }}>No new milestones, AI risk decreases, displacement freezes</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ScenarioSelector = ({ scenario, setScenario }) => (
  <div style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(71, 85, 105, 0.4)', borderRadius: '8px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
    <label style={{ fontSize: '9px', color: '#94a3b8' }}>SCENARIO</label>
    <select value={scenario} onChange={(e) => setScenario(e.target.value)} style={{
      background: '#0f172a', border: '1px solid #334155', borderRadius: '4px',
      color: '#e2e8f0', padding: '4px 8px', fontSize: '11px',
    }}>
      <option value="SSP1-2.6">SSP1-2.6 (Best)</option>
      <option value="SSP2-4.5">SSP2-4.5 (Middle)</option>
      <option value="SSP3-7.0">SSP3-7.0 (High)</option>
      <option value="SSP5-8.5">SSP5-8.5 (Worst)</option>
    </select>
  </div>
);

export const YearSlider = ({ selectedYear, setSelectedYear }) => (
  <div style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(71, 85, 105, 0.4)', borderRadius: '8px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
    <label style={{ fontSize: '9px', color: '#94a3b8' }}>YEAR</label>
    <input type="range" min={2025} max={2075} value={selectedYear}
      onChange={(e) => setSelectedYear(Number(e.target.value))}
      style={{ width: '100px', accentColor: '#8b5cf6' }}
    />
    <span style={{ fontSize: '14px', fontWeight: '600', color: '#8b5cf6' }}>{selectedYear}</span>
  </div>
);

export const UnemploymentIndicator = ({ unemploymentStatus, totalUnemployment }) => (
  <div style={{ 
    background: `linear-gradient(135deg, ${unemploymentStatus.color}15, ${unemploymentStatus.color}05)`,
    border: `1px solid ${unemploymentStatus.color}33`,
    borderRadius: '8px', padding: '6px 12px',
  }}>
    <div style={{ fontSize: '8px', color: '#64748b' }}>UNEMPLOYMENT</div>
    <div style={{ fontSize: '16px', fontWeight: '700', color: unemploymentStatus.color }}>
      {totalUnemployment}%
    </div>
  </div>
);

export const CumulativeDisplay = ({ cumulatives, threatColors }) => (
  <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
    {[
      { label: 'Pandemic', value: cumulatives.pandemic, color: threatColors.pandemic },
      { label: 'Nuclear', value: cumulatives.nuclear, color: threatColors.nuclear },
      { label: 'AI', value: cumulatives.ai, color: threatColors.ai },
    ].map(({ label, value, color }) => (
      <div key={label} style={{ textAlign: 'center', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '6px', padding: '6px 10px' }}>
        <div style={{ fontSize: '8px', color: '#64748b' }}>50yr {label}</div>
        <div style={{ fontSize: '13px', fontWeight: '600', color }}>{(value * 100).toFixed(0)}%</div>
      </div>
    ))}
  </div>
);

export const TabButtons = ({ activeTab, setActiveTab }) => {
  const tabColors = {
    'overview': '#8b5cf6',
    'economic': '#f97316', 
    'threats': '#ef4444',
    'ai-deep-dive': '#06b6d4',
    'nuclear': '#ec4899'
  };
  return (
  <>
    {['overview', 'economic', 'threats', 'ai-deep-dive', 'nuclear'].map(tab => {
      const color = tabColors[tab];
      return (
      <button key={tab} onClick={() => setActiveTab(tab)} style={{
        background: activeTab === tab ? `${color}22` : 'transparent',
        border: activeTab === tab ? `1px solid ${color}88` : '1px solid transparent',
        borderRadius: '6px', color: activeTab === tab ? color : '#64748b',
        padding: '6px 12px', fontSize: '10px', fontWeight: '600', cursor: 'pointer', textTransform: 'uppercase',
      }}>
        {tab.replace('-', ' ')}
      </button>
    )})}
  </>
);};

export const MetricsRow = ({ currentYearData, threatColors }) => (
  <>
    {[
      { label: 'TEMP', value: `+${currentYearData.temperature}°C`, color: threatColors.climate },
      { label: 'PANDEMIC', value: `${currentYearData.pandemicProbability}%/yr`, color: threatColors.pandemic },
      { label: 'NUCLEAR', value: `${currentYearData.nuclearProbability}%/yr`, color: threatColors.nuclear },
      { label: 'CONFLICT', value: `${currentYearData.conflictProbability}%/yr`, color: threatColors.conflict },
      { label: 'AI RISK', value: `${currentYearData.aiCatastrophe}%/yr`, color: threatColors.ai },
      { label: 'UNEMPLOYMENT', value: `${currentYearData.totalUnemployment}%`, color: threatColors.unemployment },
      { label: 'AI AMP', value: `${currentYearData.aiAmplification}x`, color: '#10b981' },
    ].map((m, i) => (
      <div key={i} style={{
        background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(71, 85, 105, 0.3)',
        borderRadius: '8px', padding: '10px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: m.color }} />
        <div style={{ fontSize: '8px', color: '#64748b', letterSpacing: '1px' }}>{m.label}</div>
        <div style={{ fontSize: '18px', fontWeight: '700', color: m.color }}>{m.value}</div>
      </div>
    ))}
  </>
);
