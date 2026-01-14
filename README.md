# Integrated Threat Model v3.4

An interactive dashboard for exploring how global catastrophic risks compound and interact — and how much depends on human adaptation.

**Disclaimer:** This is a stress-testing and scenario-exploration tool. All coefficients are hand-set, loosely inspired by published research and historical trends, and are not empirically fitted, backtested, or calibrated. Values represent stylized proxies and relative dynamics, not forecasts or measured probabilities.

## What This Is

This is a **stress-testing tool**, not a prediction engine.

It models how five major threat categories interact over a 50-year horizon:
- 🌡️ **Climate** — temperature rise, water stress, food insecurity
- 🦠 **Pandemic** — outbreak probability, AI-amplified biorisks
- ☢️ **Nuclear** — conflict escalation, nuclear winter effects
- ⚔️ **Conflict** — resource competition, political instability
- 🤖 **AI** — capability milestones, misuse risk, alignment failure

Plus economic consequences:
- 💼 **Unemployment** — AI-driven job displacement by sector
- 💰 **UBI intervention** — with modeled tradeoffs (labor exit, inflation, dependency)

## What This Is NOT

- ❌ A forecast or prediction
- ❌ Peer-reviewed research
- ❌ A basis for policy decisions without expert consultation
- ❌ A complete model of reality

The numbers are **illustrative**. They show *relative dynamics* and *sensitivity to assumptions* — not precise probabilities.

## Known Limitations

- **Aggregated metrics**: Each risk category (nuclear, AI, pandemic, etc.) combines multiple distinct failure modes into a single proxy number for simplicity.
- **Uncertainty grows over time**: The model shows clean lines, but real uncertainty bands would widen substantially beyond 2040. Treat later years as increasingly speculative.
- **Hand-set coefficients**: All coupling relationships are plausible intuitions informed by research, not statistically fitted parameters.

This is a thinking tool, not a decision-making system.

## The Key Insight

The **Systemic Stress** score in the top right is a composite pressure indicator — not a probability of any specific event. It shows how much strain the global system is under based on all threat categories combined.

Toggle between **Stress Test** and **Baseline** mode in the Model Assumptions panel.

| Mode | Assumption | Typical Output |
|------|------------|----------------|
| Stress Test | Everything compounds, no adaptation | High stress (~60-80%) |
| Baseline | Humans adapt at historical rates | Moderate stress (~10-20%) |

**The gap between these modes is the point.**

It represents how much of our future depends on choices we haven't made yet — whether governments act, markets adapt, people retrain, and institutions hold.

## Model Assumptions (Plain English)

When you adjust the resilience sliders, here's what they mean:

| Slider | What It Means |
|--------|---------------|
| "We adjust over time" | Governments eventually pass laws, companies pivot, people learn new skills |
| "New jobs replace old jobs" | When old industries die, new ones absorb displaced workers |
| "Not everything goes wrong at once" | Tail risks don't all materialize simultaneously |

Setting these to 0% = worst-case stress test.  
Setting these to 50% = rough historical baseline.  
Setting these higher = optimistic about human coordination.

## Shock Scenarios

You can inject specific events to see how the system responds:

- ☢️ **Nuclear War** — Triggers nuclear winter (cooling), food system collapse, economic shock. Models 15-20 year recovery.
- 🤖 **AI Stall** — AI progress freezes at a chosen year. AI risk decreases, but displacement also stops.

## Assumptions Informed By

This model was loosely inspired by published research:

- **Job displacement**: Frey & Osborne (2017), McKinsey Global Institute, OECD Employment Outlook
- **Climate scenarios**: IPCC SSP pathways (SSP1-2.6 through SSP5-8.5)
- **Nuclear winter**: Robock et al. (2007), Xia et al. (2022)
- **AI timelines**: Metaculus aggregates, expert surveys (Grace et al.)
- **Cascade dynamics**: Original synthesis based on systems risk literature

**Method disclosure:** Parameters were iteratively tuned using external analysis of 1990–2023 US employment data (BLS/FRED and literature) for directional consistency; no automated backtesting or fitting is performed in the code. Values represent plausible stylized relationships, not empirically measured parameters.

## How to Use This Responsibly

### Do:
- ✅ Use it to explore "what if" scenarios
- ✅ Toggle assumptions to understand what's driving outcomes
- ✅ Share it with context about what it is
- ✅ Use it to start conversations about systemic risk
- ✅ Critique it, improve it, fork it

### Don't:
- ❌ Screenshot a number without explaining the assumptions
- ❌ Cite it as evidence for policy claims
- ❌ Present it as a scientific forecast
- ❌ Panic (or cause panic)

## Installation

This is a React component. To run it:

```bash
# If you have a React project
npm install recharts
# Copy ThreatModelDashboard.jsx into your components
# Import and render it
```

Or paste it into an online React playground like CodeSandbox.

## No Private Data

This model contains:
- No personal information
- No proprietary data
- No API keys or secrets
- Only synthetic projections based on published parameters

## License

To be determined by the author.

## Credits

Developed through iterative collaboration between a human operator and three AI assistants:
- **Claude** — primary architecture, code generation, synthesis
- **ChatGPT** — proofing, credibility review, conceptual refinement  
- **Grok** — external historical data analysis (1990–2023) and manual parameter tuning

The goal was never to predict the future. It was to build a tool that makes visible *how much the future depends on what we choose to do*.

---

**Questions or improvements?** Open an issue or fork it.

**Remember:** The gap between Stress Test and Baseline mode is not a bug. It's the whole point.
