// Layout.jsx - Page structure only (containers, rows/columns, spacing)
import React from 'react';

export const ResponsiveStyles = () => (
  <style>{`
    .metrics-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; margin-bottom: 16px; }
    .tabs-row { display: flex; gap: 6px; flex-wrap: wrap; }
    .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .overview-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 14px; }
    .config-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
    @media (max-width: 768px) {
      .metrics-grid { grid-template-columns: repeat(4, 1fr); }
      .content-grid { grid-template-columns: 1fr; }
      .overview-grid { grid-template-columns: 1fr; }
      .config-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 480px) {
      .metrics-grid { grid-template-columns: repeat(2, 1fr); }
      .config-grid { grid-template-columns: 1fr; }
    }
  `}</style>
);

export const PageContainer = ({ children }) => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(145deg, #0a0a0f 0%, #1a1a2e 40%, #0f0f1a 100%)',
    color: '#e2e8f0',
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    padding: '12px',
  }}>
    {children}
  </div>
);

export const Header = ({ left, right }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
    {left}
    {right}
  </div>
);

export const HeaderLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <div style={{
      width: '44px', height: '44px', borderRadius: '10px',
      background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ef4444 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
      boxShadow: '0 0 30px rgba(6, 182, 212, 0.25)',
    }}>🌍</div>
    <div>
      <h1 style={{
        fontSize: '20px', fontWeight: '700', margin: 0,
        background: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #ef4444)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>INTEGRATED THREAT MODEL v3.4</h1>
      <p style={{ color: '#64748b', fontSize: '9px', margin: 0, letterSpacing: '1.5px' }}>
        CLIMATE • PANDEMIC • NUCLEAR • CONFLICT • AI • UNEMPLOYMENT
      </p>
    </div>
  </div>
);

export const Panel = ({ children, style = {} }) => (
  <div style={{
    background: 'rgba(30, 41, 59, 0.5)',
    border: '1px solid rgba(71, 85, 105, 0.3)',
    borderRadius: '10px',
    padding: '16px',
    ...style,
  }}>
    {children}
  </div>
);

export const PanelTitle = ({ children, style = {} }) => (
  <h3 style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '12px', ...style }}>
    {children}
  </h3>
);

export const ConfigPanel = ({ children, show }) => {
  if (!show) return null;
  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.8)',
      border: '1px solid rgba(71, 85, 105, 0.5)',
      borderRadius: '12px', padding: '16px', marginBottom: '16px',
    }}>
      {children}
    </div>
  );
};

export const ControlsRow = ({ children }) => (
  <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
    {children}
  </div>
);

export const TabsRow = ({ children }) => (
  <div className="tabs-row" style={{ marginBottom: '16px', borderBottom: '1px solid rgba(71, 85, 105, 0.3)', paddingBottom: '8px' }}>
    {children}
  </div>
);

export const MetricsGrid = ({ children }) => (
  <div className="metrics-grid">
    {children}
  </div>
);

export const ContentGrid = ({ className = "content-grid", children }) => (
  <div className={className}>
    {children}
  </div>
);

export const Footer = () => (
  <div style={{
    marginTop: '20px', padding: '12px',
    background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px',
    fontSize: '9px', color: '#475569',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
      <div>v3.4 • Hand-tuned coefficients • Assumptions informed by Frey & Osborne (2017), McKinsey, OECD, IPCC</div>
      <div><span style={{ color: '#f59e0b' }}>⚠</span> Toggle "Model Assumptions" to compare stress-test vs baseline</div>
    </div>
    <div style={{ marginTop: '8px', textAlign: 'center', color: '#64748b' }}>
      Built through human-AI collaboration: Claude (development), ChatGPT (proofing), Grok (parameter review). 
      Coefficients loosely inspired by 1990–2023 US trends (manual review; not fitted).
    </div>
    <div style={{ marginTop: '6px', textAlign: 'center', color: '#64748b', fontStyle: 'italic' }}>
      This is a stress-testing and scenario-exploration tool. All coefficients are hand-set, not empirically fitted or calibrated. Values represent stylized proxies and relative dynamics, not forecasts. Each risk metric aggregates multiple failure modes. Uncertainty increases substantially beyond 2040.
    </div>
  </div>
);
