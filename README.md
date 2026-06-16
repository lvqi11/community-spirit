# Community Spirit / 社区精灵：未来社区 RPG 引擎

Community Spirit is a community life RPG and physical-AI social layer grounded in real spatial operations.

社区精灵不是传统智慧社区后台，而是把真实社区变成一个可探索、可接任务、可运营、可连接未来机器人的生活 RPG 世界。

This is not a dashboard for managing communities. It is an operating grammar for future communities: a shared task language that lets residents, property operators, AI agents, and future service robots understand the same physical space.

The long-term goal is to prepare the interaction layer before physical AI enters daily life. Community Spirit turns lightweight, low-pressure community participation into spatial quests so young residents, families, elders, operators, and future robots can coordinate around real places without requiring heavy social networking or real personal data.

As world models and embodied AI improve, Community Spirit's role is not to replace robot perception, planning, simulation, or control. Its role is the social operating layer before physical AI acts in daily community life: intent, permissions, light social modes, operator approval, privacy boundaries, task contracts, feedback, trust, and retention.

The current prototype uses spatial data as the foundation: POIs become places, routes become paths, activities become quests, property workflows become world operations, and robot patrols become reality-layer tasks.

```text
Pulse -> Route -> Check-in -> Benefit -> Retention -> World Ops -> Task Contract -> Robot-ready Export
```

The project does not build robot control. It defines the social task contract before AI or robots act in real communities.

## Protocol Direction

Community Spirit is incubating **CACP: Community AI Collaboration Protocol**.

```text
MCP connects models to tools and resources.
A2A connects agents to agents.
CACP connects people, places, operators, AI agents, and robots through community task contracts.
```

Current protocol assets:

- `docs/protocol-design.md`
- `docs/community-task-contract.md`
- `schemas/community-task-contract.schema.json`
- `examples/contracts/`
- `scripts/validate-contracts.mjs`

The React demo now includes a Task Contract View for selected workflows, so CACP appears as a visible product layer rather than a document-only appendix.

## Product Versions

Community Spirit should be introduced as a layered product, not as one flat smart-community demo:

1. **Community Life RPG**: residents explore the community, receive quests, join activities, unlock badges, and build a visible community identity.
2. **Spatial Quest Engine**: POIs, routes, tasks, and activities become the shared language for resident life, property service, and AI agents.
3. **Season Arc System**: communities can run recurring seasons such as first-week onboarding, summer sports, pet-friendly trails, and festival storylines.
4. **World Ops Console**: property teams operate the living world through activity pipelines, repair workflows, hot POIs, risk review, and workflow handoff.
5. **Robot-ready Reality Layer**: the same quest/task model can export semantic patrol payloads for future service robots, with privacy and approval guardrails.
6. **Physical AI Social Layer**: community intent, trust, resident acceptance, and human / AI / robot handoff are expressed as explicit task contracts before deployment.

The public showcase adds **Community Pulse**: a live recommendation engine that scores multiple events against resident interests, availability, social comfort, and walking distance. A selected pulse becomes a task and route, records join/check-in progress, advances a shared community goal, and exposes the same conversion to World Ops.

The latest prototype also closes a **Retention Loop**. It does not only ask whether a resident joined once; it measures first participation, 7-day return, current streaks, and season-by-season repeat visits from synthetic resident history plus in-session progress.

## Current Demo

The first public demo uses a fictional community named **OmniWeave Community / 万联创界社区**. All data is synthetic.

Demo video:

```text
reports/community-spirit-demo.mp4
```

Static demo:

```powershell
cd F:\xinghe_shequ\community-spirit
python -m http.server 4177
```

Open:

```text
http://127.0.0.1:4177/demo/web/index.html
```

React/Vite demo:

```powershell
npm.cmd install
npm.cmd run dev -- --port 5173
```

Open:

```text
http://127.0.0.1:5173/
```

Windows helper scripts:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-static-demo.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-vite-demo.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\preflight.ps1
```

## What It Shows

- A 2.5D SVG community world map with semantic POIs.
- AI prompt matching that turns resident needs into spatial quests.
- Route highlighting and step-by-step community-world instructions.
- Activity signup/check-in context as RPG-style community quests.
- A season arc panel that shows resident progress, active quest, next quests, and season reward.
- Scheduled side quests with time windows, locations, status, and action prompts.
- Repair ticket preview with precise POI context as world maintenance tasks.
- Property Dashboard as a world operations console.
- Risk/access review and workflow export summaries.
- Robot-ready patrol export JSON as a future reality-layer interface.
- Physical-AI social layer framing: human-readable task contracts, permission boundaries, trust signals, and low-pressure participation modes.
- Shareable task deep links and current workflow JSON export.
- English and Chinese display copy through `data/i18n.zh-CN.json`.
- Three explainable resident profiles and three ranked Community Pulses.
- Community Pulse recommendation, join, route, check-in, resident XP, shared-goal, and property conversion loop.
- Separate resident and operational Pulse lifecycles: residents can leave before check-in, while matching, open, full, expired, and ended states enforce join/check-in rules.
- Persistent in-session resident growth: XP, level, badge tracks, and completed Pulse history are isolated by resident profile.
- Three switchable season arcs: Summer Night Sports, Family Discovery, and World Keepers.
- First check-in rewards advance the linked season once; repeated clicks cannot duplicate XP or completion history.
- World Ops season context for resident level, season check-ins, XP, and completed Pulse tasks.
- A separate Spirit Points wallet so spending never reduces resident XP or level.
- Three contextual benefits: sports merchant offer, family property right, and shared-space co-creator vote.
- Benefit lifecycle: locked, available, claimed, activated/reserved, and redeemed, with duplicate-spend protection.
- Synthetic resident benefit passes with a human-readable credential code and claim/activation/redemption timeline.
- Itemized Spirit Points wallet entries with source, amount, timestamp, and resulting balance.
- World Ops commerce metrics for points awarded, points spent, claims, activations, and redemptions.
- World Ops Retention Loop metrics for first participation, 7-day return, average streak, and season comparison.
- Three focused product views: Resident World, Task & Benefits, and World Ops.
- Seven-step guided demo controller with deterministic reset and guarded step order.
- Mobile-first demo navigation with a compact progress summary, horizontally scrollable story steps, sticky product views, and touch-sized primary actions.

## Example Scenarios

Resident RPG quests:

- Start a Community Explorer Quest and unlock a badge.
- Join tonight's Community Pulse basketball meetup, walk to the court, check in, and help unlock the community movie night.
- Continue scheduled side quests: tonight's sports meetup, Saturday parent-child quest, and weekly helper task.
- Guide my guest from the North Gate to Building 3.
- Find the package locker.
- Join a weekend parent-child activity.
- Report a broken light near the kids' playground.

World operations:

- Publish a community activity.
- Review location-aware repair reports.
- View popular POIs and route workflows.
- Generate a robot patrol route.

Robot-ready task:

- Patrol the fire passage and underground garage entrance.
- Capture abnormal obstacles.
- Return inspection results to the property dashboard.

## Data Model

The public data files define the first shared language of the project:

```text
POI = where things are
Route = how people and robots move through the community
Task = why the movement matters
Activity = how community operation creates recurring reasons to return
Quest = how residents experience the community as a living world
Pulse = how current demand, resident intent, and an underused space become a live social event
Retention = whether residents come back after real-space participation
```

Files:

- `data/sample-pois.json`
- `data/sample-routes.json`
- `data/sample-tasks.json`
- `data/sample-activities.json`
- `data/sample-pulses.json`
- `data/sample-seasons.json`
- `data/sample-benefits.json`
- `data/i18n.zh-CN.json`

Validate the data:

```powershell
npm.cmd run validate:data
```

Run the full local check:

```powershell
npm.cmd run check
```

The release gate validates data references, Pulse lifecycle rules, retention metrics, the production build, project materials, current object counts, synthetic-data declarations, and generated assets.

## Documentation

- `PROJECT.md`: project landing page for reviewers and demos.
- `docs/vision.md`: product vision and long-term direction.
- `docs/architecture.md`: prototype architecture and system layers.
- `docs/data-model.md`: core object model and reference rules.
- `docs/competitive-landscape.md`: market context and differentiation.
- `docs/robot-ready-map.md`: future robot-facing semantic map direction.
- `docs/physical-ai-social-layer.md`: long-term social operating layer for physical-AI communities.
- `docs/physical-ai-community-roadmap.md`: roadmap from can-do physical AI to safe human / AI / robot collaboration.
- `docs/community-task-contract.md`: proposed contract language for intent, permission, privacy, interaction mode, fallback, trust, and handoff.
- `docs/protocol-design.md`: CACP protocol direction, relationship to MCP/A2A, core objects, operations, and extraction path.
- `docs/prototype-plan.md`: original prototype execution plan.
- `docs/project-summary.md`: submission-ready project summary.
- `docs/project-submission-form.md`: copy-ready project profile answers.
- `docs/devpost-world-product-day-submission.md`: copy-ready Devpost draft for Mind the Product World Product Day.
- `docs/hackathon-submission-strategy.md`: competition framing that keeps Community Spirit from collapsing back into a hackathon-only project.
- `docs/github-release-checklist.md`: first release checklist.
- `docs/github-promotion-plan.md`: GitHub launch, release, and promotion plan.
- `docs/demo-qa-checklist.md`: demo verification checklist.
- `docs/demo-recording-guide.md`: short video capture guide.
- `docs/workflow-export-contract.md`: JSON workflow export contract.

## Pitch and Validation

- `pitch/pitch-deck-outline.md`: 10-page pitch deck outline.
- `pitch/customer-interview-guide.md`: customer interview guide.
- `pitch/demo-script.md`: 3-minute demo script.

## CI

The GitHub Actions workflow at `.github/workflows/ci.yml` runs:

```powershell
npm.cmd run check
```

The Pages workflow at `.github/workflows/pages.yml` publishes the static demo. After deployment, open:

```text
https://<owner>.github.io/<repo>/demo/web/index.html
```

## Roadmap

### Phase 0: Open Prototype

- Fictional community data.
- Static and React web demos.
- AI assistant mock.
- Community life RPG framing.
- World operations dashboard.
- Robot-ready task export.

### Phase 1: Community Life RPG

- Resident identity, badges, and quest history.
- Recurring season arcs and limited-time community rewards.
- Time-windowed side quests that make residents return tonight, this weekend, and later this week.
- New-resident onboarding quests.
- Parent-child, sports, pet-friendly, merchant, and neighbor-help side quests.
- Seasonal and event-based community storylines.

### Phase 2: Pilot Community Operations

- Permissioned real community data import.
- 10-30 verified POIs.
- 5-10 daily life routes.
- Activity, repair, visitor, and route workflows.
- Property team world operations console.
- Resident testing with consent and safety controls.

### Phase 3: AI-native Community World

- AI community assistant.
- AI-generated route explanations.
- AI property report summaries.
- Activity recommendation.
- Dynamic quest generation from real community events.

### Phase 4: Robot-ready Reality Layer

- Semantic map export.
- Patrol route generation.
- Robot task interface.
- Dynamic update from inspection data.

### Phase 5: Physical AI Social Layer

- Human / AI / robot task contracts.
- Interaction modes for solo, parallel, buddy, family, elder-friendly, helper, operator, and robot-assisted tasks.
- Trust and acceptance metrics beyond retention.
- Synthetic community simulation for social risk, privacy boundaries, and deployment readiness.

## Data Policy

This repository only uses fictional or synthetic community data.

Do not commit real residential maps, resident information, unit numbers, access-control records, camera data, private property data, security routes, or robot operation logs.

真实试点必须先补充权限管理、居民授权、角色访问控制、审计日志、数据最小化、保留周期和安全评审。

## Status

The project is in the open prototype stage. The current goal is to validate the core concept through a runnable demo, technical report, GitHub project presentation, and early customer interviews.
