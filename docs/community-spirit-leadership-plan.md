# Community Spirit / CACP Leadership Plan

Updated: 2026-07-01

Status: living plan. Update this file whenever the project direction, partner strategy, technical scope, or founder decision changes.

## Working Position

Community Spirit is not a smart-community dashboard.

Community Spirit is:

```text
community life RPG
+ physical-AI social layer
+ first reference implementation for CACP
```

CACP, Community AI Collaboration Protocol, is the long-term protocol direction:

```text
MCP connects models to tools and resources.
A2A connects agents to agents.
CACP connects people, places, operators, AI agents, and future robots through community task contracts.
```

The project should grow as two mutually reinforcing layers:

- **Community Spirit product layer**: a runnable community-world demo, resident experience, World Ops console, workflow exports, and future pilot surface.
- **CACP protocol layer**: object model, schemas, examples, validators, governance docs, extension registry, package shape, and future independent protocol project.

The current public repository must stay `fictional_or_synthetic_only`. Real pilots are a future phase and require consent, operator approval, privacy review, audit logging, human supervision, user approval, and partner alignment.

## Current Baseline

As of 2026-07-01, the remote repository is updated to:

```text
a887c08 feat: harden CACP protocol capsule
```

Current verified state:

- Devpost World Product Day submission is already public and should remain the external narrative anchor.
- GitHub `main` and `origin/main` are synchronized.
- `npm.cmd run check` passes.
- CACP validates 7 full synthetic protocol chains.
- `public-notice` now spans AI proposal, elder-friendly helper coordination, resident-facing property operation notice, notice update, and notice-failure incident review.
- CACP has schemas, examples, validators, manifest, portable extraction dry-run, extension governance, pilot readiness, and visible reference UI.

Important boundary:

- Do not treat the public demo as a real deployment.
- Do not connect real residents, real access systems, cameras, payments, robot logs, or private property data without explicit approval and pilot governance.
- Do not collapse the project back into a generic property dashboard.

## My Operating Role

When acting as project lead, core full-stack engineer, and technical director, I should optimize for four outcomes at once:

1. **Founder-level clarity**: keep the product thesis sharp enough that every feature reinforces the physical-AI social layer direction.
2. **Engineering leverage**: make the repository increasingly self-validating, documented, reproducible, and understandable to outside reviewers.
3. **Protocol credibility**: grow CACP like a serious open protocol, not like an app appendix.
4. **Pilot readiness**: move toward real-world validation without pretending synthetic examples are production approval.

Practical behavior:

- Before concrete development work, state what I will do and why that step comes first.
- Prefer small, validated increments over large speculative rewrites.
- Preserve existing assets and uncommitted user work.
- Keep `npm.cmd run check` as the default release gate.
- Avoid irreversible actions, real integrations, external submissions, and pushes unless you explicitly approve them.

## Strategic Thesis

The long-term opportunity is not "property management software with AI."

The sharper thesis:

```text
When physical AI enters daily spaces, the missing layer is not only perception,
control, or agent tooling. The missing layer is the social task contract:
intent, place, permission, notice, privacy, fallback, evidence, handoff,
trust, and pilot readiness before action happens.
```

Community Spirit proves the thesis through an approachable product metaphor:

- residents experience the community as quests, pulses, routes, rewards, and belonging;
- operators experience the same world as workflows, risk review, notices, evidence, and handoff;
- AI agents and future robots receive bounded task contracts instead of raw commands;
- CACP makes those boundaries explicit and machine-checkable.

## Product North Star

Build the first credible reference implementation for physical-AI community collaboration:

```text
A community world where people, operators, AI agents, and future robots can
coordinate around real places through explicit, auditable, human-governed task contracts.
```

The product should feel like:

- a community life RPG for residents;
- a World Ops console for operators;
- a protocol reference implementation for developers;
- a governance and pilot-readiness layer for future partners.

## Technical North Star

CACP should become:

```text
a portable, validator-backed protocol capsule that can eventually stand in its
own repository as community-ai-collaboration-protocol.
```

Before extraction, it should have:

- stable object names;
- clear lifecycle semantics;
- enough examples across actor types;
- robust validators and diagnostics;
- extension governance;
- versioning and compatibility rules;
- a CLI/package shape;
- docs that make sense without Devpost context;
- Community Spirit as the first reference implementation, not the only place the protocol can exist.

## Near-Term Plan

### Next 1-3 Days

Goal: turn the current post-Devpost CACP work into a clean, reviewable project surface.

Recommended order:

1. **Post-push repository audit**
   - Check GitHub rendering, README first screen, Pages deployment, CI status, and large asset behavior.
   - Why first: remote is now updated, so the next risk is public presentation quality rather than local correctness.

2. **README and reviewer path tightening**
   - Make sure the first 30 seconds tell reviewers:
     - what Community Spirit is;
     - what CACP is;
     - where to try the demo;
     - what is synthetic-only;
     - why this is not a dashboard.
   - Why: new visitors will not read the whole repo before judging the idea.

3. **CACP v0.2/v0.3 status cleanup**
   - Update roadmap language now that CACP has 5 full chains and public-notice has a third scenario.
   - Why: docs should reflect the state after `a887c08`, not the older "at least three chains" milestone.

4. **Public-notice decision memo**
   - Decide whether public-notice stays extension-only, becomes "core candidate", or gets a draft core field proposal.
   - Why: it is currently the strongest signal that CACP has a real reusable concept.

5. **Issue/backlog shape**
   - Create GitHub-ready issue themes or local backlog sections for protocol, product UI, pilot, and ecosystem.
   - Why: the project needs a maintainable execution rhythm after the hackathon sprint.

### Next 1-2 Weeks

Goal: move from impressive prototype to coherent open-source/protocol project.

Workstreams:

- **Protocol hardening**
  - Add one more property-operation or operator workflow scenario that stresses notice updates, pause, cancellation, or incident review.
  - Add validator checks only when semantics stabilize.
  - Improve validator output so a contributor understands how to fix failures quickly.

- **Reference UI clarity**
  - Make the CACP evidence chain easier to scan.
  - Surface pilot-readiness gates as a product concept, not just JSON.
  - Ensure mobile and desktop views remain clean after the protocol data grew.

- **Repository presentation**
  - Tighten README, `docs/cacp-spec-v0.1.md`, and `docs/cacp-release-roadmap.md`.
  - Consider a short "Start here" doc for judges, contributors, and pilot partners.
  - Keep Devpost links, live demo, video, GitHub, and synthetic boundary easy to find.

- **Asset hygiene**
  - Review large committed media and UI assets.
  - Decide whether future media should move to releases, Git LFS, or remain in repo.
  - Avoid another push-protection incident by not committing third-party page dumps with transient tokens or signed URLs.

- **Pilot narrative**
  - Draft a partner-facing one-pager:
    - what a synthetic demo proves;
    - what a real pilot would require;
    - what data is not needed;
    - what CACP logs and does not log.

Exit criteria:

- `npm.cmd run check` passes.
- README and docs match the 5-chain CACP state.
- A new visitor can understand the protocol in under 5 minutes.
- A potential pilot partner can understand the safety boundary without a call.

## Mid-Term Plan

### 1-2 Months

Goal: make Community Spirit credible as both product prototype and protocol reference implementation.

Product:

- Improve the resident journey from pulse to route to check-in to benefit to retention.
- Make World Ops less like a static demo and more like an operations cockpit:
  - active tasks;
  - notices;
  - approvals;
  - evidence;
  - handoffs;
  - readiness gates.
- Add a small number of high-quality scenarios rather than expanding data volume blindly.
- Keep the experience playful, but keep operator surfaces practical and dense.

Protocol:

- Move CACP toward v0.3 package shape:
  - clearer CLI contract;
  - exportable schemas;
  - stable example corpus;
  - extension registry discipline;
  - better docs for contributors.
- Add scenario coverage across:
  - resident social;
  - elder/helper;
  - operator notice;
  - AI proposal;
  - robot assist;
  - incident review;
  - human handoff.
- Decide which extension concepts deserve core proposals:
  - public-notice is first candidate;
  - light-social and elder-friendly remain watch-list;
  - robot-assist and incident-review stay extension until more examples exist.

Engineering:

- Keep validators as the center of quality.
- Add snapshot-style or fixture-based checks if UI-data mapping becomes fragile.
- Consider a small generated index for CACP examples so UI and docs do not drift.
- Avoid backend work until there is a clear pilot or API need.

Go-to-market / validation:

- Turn Devpost into credibility, not the whole identity.
- Prepare a concise demo route for:
  - open-source reviewers;
  - property/community operators;
  - physical-AI/robotics people;
  - AI protocol/tooling people.
- Start collecting structured feedback from real humans without using real resident data.

Exit criteria:

- CACP v0.3 is internally coherent.
- Community Spirit demo clearly shows CACP as a product layer.
- At least one external person can understand the project without live explanation.
- Pilot requirements are documented enough to discuss with a partner.

### 3-6 Months

Goal: prepare for either a serious pilot or an independent CACP extraction.

Product:

- Build a pilot-candidate Community Spirit surface:
  - configurable synthetic community;
  - role-specific views;
  - task contract viewer;
  - workflow export;
  - notice and approval flow;
  - audit-friendly evidence summaries.
- Keep real integrations behind explicit decision gates.
- Add a mock API only when it clarifies future integration boundaries.

Protocol:

- Decide whether to extract `community-ai-collaboration-protocol`.
- If yes, prepare:
  - standalone README;
  - schemas package;
  - validator CLI;
  - examples;
  - compatibility policy;
  - contribution/security docs.
- If no, keep CACP inside Community Spirit but make the capsule more portable.

Pilot:

- Identify 1-3 pilot archetypes:
  - residential community operator;
  - campus/community space operator;
  - robotics/service provider needing human-governed task boundaries.
- Define a safe pilot with no sensitive integrations first:
  - synthetic import;
  - manual operator review;
  - no raw camera;
  - no access control;
  - no payment;
  - no autonomous robot action.

Exit criteria:

- A pilot partner can review the governance checklist and understand what is required.
- The protocol can validate an external example without being deeply coupled to the demo.
- The project has a credible path to either open-source protocol adoption or partner validation.

## Long-Term Plan

### 6-18 Months

Goal: turn CACP into a recognized protocol direction and Community Spirit into the first serious reference product.

Long-term product ambition:

- Community Spirit becomes the "social operating layer" for physical-AI-ready communities.
- Communities can define quests, tasks, notices, approvals, feedback, and handoffs around real places.
- Operators can validate whether a task is demo-only, pilot-candidate, or pilot-ready.
- AI agents and future robots can receive bounded task contracts rather than ambiguous work orders.

Long-term protocol ambition:

- CACP becomes independently understandable outside Community Spirit.
- Developers can run:

```powershell
cacp validate
```

against actor cards, task contracts, transitions, evidence, workflow bundles, and pilot-readiness checklists.

Possible future surfaces:

- `community-ai-collaboration-protocol` repository;
- schema package;
- validator CLI;
- example corpus;
- reference UI components;
- pilot-readiness templates;
- partner implementation guide.

Long-term validation ambition:

- At least one real-world pilot discussion grounded in consent and safety.
- At least one non-Community-Spirit example contract authored by another person or partner.
- Clear separation between:
  - protocol;
  - product;
  - demo;
  - pilot;
  - future robot integration.

Do not rush to production claims. The right target is not "we control robots." The right target is:

```text
we define the trust, permission, notice, and evidence layer before AI or robots act in shared community spaces.
```

## Milestone Model

### M0: Submitted Prototype

Status: done.

Evidence:

- Devpost submission;
- live demo;
- GitHub repo;
- demo video;
- synthetic data policy.

### M1: CACP Protocol Capsule

Status: current, mostly achieved.

Evidence:

- spec;
- schemas;
- examples;
- validators;
- manifest;
- workflow bundles;
- pilot readiness;
- extension governance;
- 7 full chains.

Next improvement:

- update roadmap/status docs to reflect the latest 5-chain state.

### M2: Reviewer-Ready Protocol Project

Target:

- a new visitor can understand and run the project quickly;
- docs are internally consistent;
- public-notice decision path is clear;
- repo avoids accidental large or sensitive artifacts.

### M3: Pilot-Candidate Reference Implementation

Target:

- real-pilot checklist is concrete;
- product UI demonstrates notice, approval, evidence, and handoff workflows;
- no real sensitive system is connected yet;
- partner conversation can start.

### M4: Extractable CACP

Target:

- protocol can stand alone;
- schemas and validators can run outside the app;
- independent repo decision becomes reasonable.

### M5: Real Pilot Preparation

Target:

- partner identified;
- data boundary agreed;
- consent and notice language drafted;
- human operator responsibility defined;
- security/privacy review complete;
- user explicitly approves any real-world connection.

## Decision Gates

Use these gates before major moves.

### Extract CACP Into Separate Repo

Do this only if:

- CACP docs are self-contained;
- validators are portable;
- examples cover all major actor families;
- Community Spirit can link to CACP rather than define it inline;
- there is enough external interest or maintenance benefit to justify split complexity.

Do not do this merely because the idea sounds bigger as a standalone repo.

### Add Real Data

Do this only if:

- you explicitly approve;
- the partner/community approves;
- the data is minimal;
- consent or lawful notice is clear;
- retention and deletion rules are written;
- access controls and audit logs exist.

### Add Backend/API

Do this only if:

- the frontend-only demo blocks a real validation need;
- the API contract clarifies CACP rather than adding generic app infrastructure;
- validation and test strategy are defined.

### Add AI API

Do this only if:

- the synthetic/demo use case needs live generation;
- prompts, logging, privacy, and fallback are clear;
- the AI cannot bypass operator review or resident notice.

### Add Robot/IoT Integration

Do this only if:

- it is a sandbox or approved partner pilot;
- no autonomous action happens without human approval;
- no raw camera/sensor payload enters the public demo;
- manual stop, incident review, and audit evidence are defined.

## Backlog Themes

### Protocol

- Update CACP release roadmap after 5-chain milestone.
- Decide public-notice core-candidate path.
- Add notice-update or pause/resume scenario.
- Improve validator diagnostics.
- Generate a CACP example index.
- Draft CLI package boundaries.

### Product UI

- Make CACP evidence and pilot readiness easier to read.
- Improve World Ops workflow density.
- Make resident experience feel less like a form and more like a living community world.
- Keep mobile layout polished.
- Add a simple "why this task is allowed" explanation.

### Engineering

- Keep `npm.cmd run check` fast and meaningful.
- Avoid committing third-party page dumps with signed URLs or tokens.
- Consider asset storage policy for videos and large design assets.
- Keep data model small but expressive.
- Add tests only where behavior risk grows.

### Documentation

- Create a "Start here" page for different audiences.
- Keep README top section crisp.
- Maintain this leadership plan.
- Maintain CACP changelog and release checklist.
- Keep synthetic-only policy visible.

### Pilot / Business

- Draft partner one-pager.
- Define safe pilot archetypes.
- Write operator interview questions.
- Identify what proof is needed before real pilots:
  - trust;
  - retention;
  - notice comprehension;
  - operator workload;
  - safety handoff.

## Current Recommended Next Step

The next best work item is:

```text
README and CACP spec clarity audit
```

Why:

- the post-push audit, roadmap/status cleanup, and Pages entrypoint cleanup are complete;
- the README now gives new visitors a faster path to the live demo, CACP spec, leadership plan, and synthetic-data boundary;
- the public-notice decision memo keeps the extension as a core candidate without freezing schema too early;
- the notice-update scenario now tests superseding an inaccurate public notice before scheduling review continues;
- the notice-failure incident-review scenario now tests whether notice semantics survive a running task whose active notice becomes inaccurate;
- the timing model review keeps public-notice as extension-backed evidence for v0.3 and identifies a conservative validator baseline;
- incident-review is now documented as a draft general extension rather than a robot-only extension;
- aggregate validator diagnostics now print stage labels, focused commands, and troubleshooting pointers.

Concrete next actions:

1. Audit README and `docs/cacp-spec-v0.1.md` for the current 7-chain / v0.3 package-shaped protocol state.
2. Make sure a new reader can understand Community Spirit, CACP, synthetic-only scope, and the validator path without Devpost context.
3. Keep changes editorial and protocol-positioning focused; avoid new scenarios or schema fields.
4. Keep all examples synthetic-only and avoid real resident/property integrations.
5. Re-run `npm.cmd run check` before any commit or push.

## Progress Reporting Format

When you ask "what is the current progress?" I should answer in this structure:

```text
Current state:
- ...

What changed since last checkpoint:
- ...

Risks / open decisions:
- ...

Recommended next move:
- ...

Why this next:
- ...
```

When you ask "what should we do next?" I should answer in this structure:

```text
Best next step:
- ...

Reason:
- ...

Scope:
- ...

Validation:
- ...

What I will not touch:
- ...
```

## Update Rule

This file should be updated when:

- you make a strategic decision;
- the project reaches a milestone;
- a real partner or pilot direction appears;
- CACP moves closer to or away from independent extraction;
- a major technical boundary changes;
- the recommended next step changes.

This file should not be treated as frozen strategy. It is the project operating map.
