# Devpost Submission Draft: Mind the Product World Product Day

Use this as the copy-ready draft for:

```text
Mind the Product presents World Product Day: Everyone Ships Now
https://mindtheproduct.devpost.com/
```

Do not submit the external form until the final Novus.ai requirement and public video URL are ready.

## Source Assets

- GitHub repository: https://github.com/lvqi11/community-spirit
- Recommended live demo: https://lvqi11.github.io/community-spirit/
- Local static fallback demo: `demo/web/index.html`
- Recommended release: https://github.com/lvqi11/community-spirit/releases/tag/v0.2.0
- Earlier open prototype release: https://github.com/lvqi11/community-spirit/releases/tag/v0.1.0
- Current demo video file: https://github.com/lvqi11/community-spirit/blob/main/reports/community-spirit-demo.mp4
- Local video file: `reports/community-spirit-demo.mp4`

## Submission Readiness Checklist

- [x] Public deployed app URL exists.
- [x] Public GitHub repository exists.
- [x] Project started after 2026-05-20. Current git baseline: 2026-06-11.
- [x] Working product, not only a pitch deck.
- [x] Synthetic-only public data.
- [x] No real residents, access control, cameras, payments, robots, or sensor logs.
- [x] Install Novus.ai on the deployed project.
- [x] Generate Novus.ai Track Events on the deployed project.
- [ ] Add a screenshot of the Novus.ai Track Events dashboard.
- [ ] Add a Novus Signals screenshot if hourly analysis produces one before submission.
- [ ] Upload the demo video to YouTube, Vimeo, or Youku and use that public URL in Devpost.
- [ ] Final-submit Devpost only after user confirmation.

## Project Name

```text
Community Spirit
```

## Tagline

```text
A community life RPG and physical-AI social layer grounded in real spatial operations.
```

## Elevator Pitch

```text
Community Spirit turns real community spaces into low-pressure quests for residents and auditable task contracts for operators, AI agents, and future robots.
```

## Project URL

```text
https://lvqi11.github.io/community-spirit/
```

## Repository URL

```text
https://github.com/lvqi11/community-spirit
```

## Video URL

Current artifact:

```text
https://github.com/lvqi11/community-spirit/blob/main/reports/community-spirit-demo.mp4
```

Devpost-ready action:

```text
Upload reports/community-spirit-demo.mp4 to YouTube, Vimeo, or Youku, then paste that public video URL here.
```

## Built With

```text
React 19
Vite
JavaScript
CSS
SVG map rendering
Structured JSON data
GitHub Actions
GitHub Pages
CACP draft schema
Novus.ai / Pendo Web SDK optional analytics layer
```

Add after integration:

```text
Novus.ai
```

## Short Description

```text
Community Spirit is a working community life RPG and physical-AI social layer. It uses synthetic community data to turn places, routes, activities, recommendations, benefits, retention, operator workflows, and future robot-ready tasks into one coherent product experience.
```

## Full Description

Community Spirit is not a conventional smart-community dashboard. It is a working product prototype that turns a fictional residential community into a lightweight RPG world and an auditable physical-AI task layer.

Residents receive personalized Community Pulse recommendations based on interests, availability, social comfort, and walking distance. A recommendation becomes a route, task, join flow, check-in, XP update, Spirit Points reward, benefit pass, and retention signal.

Operators see the same activity as World Ops: conversion, lifecycle state, space activation, retention, commerce, workflow handoff, risk review, and robot-ready export.

The newest release adds CACP, the Community AI Collaboration Protocol direction. CACP defines Community Task Contracts for what must be true before a real-world task is handed to a person, operator, AI agent, or future robot: intent, place, interaction mode, permission, visibility, risk, resident touch, privacy boundary, fallback, feedback, and lifecycle.

All public data is fictional or synthetic. The demo does not connect to real residents, real communities, access-control systems, cameras, payments, robots, or sensor logs.

## Inspiration

Community life often fails at the last mile. Activities are broadcast through noisy group chats. Residents lack a personalized reason to participate. Underused spaces stay quiet. Operators cannot connect recommendations to arrival, repeat participation, or benefit conversion.

At the same time, physical AI is moving closer to everyday spaces. Robots and AI agents will need more than maps and task execution. They will need a social contract: who approved this action, where it can happen, whether residents are touched, what data is off-limits, who takes over when uncertainty appears, and how trust is measured.

Community Spirit started from that gap.

## What It Does

- Scores live Community Pulse opportunities against a resident profile.
- Turns recommendations into spatial tasks and routes.
- Simulates join, leave, and check-in lifecycle states.
- Updates XP, level, badges, season progress, Spirit Points, and wallet history.
- Unlocks contextual benefits with claim, activation, and redemption states.
- Gives operators World Ops metrics for conversion, lifecycle, space activation, retention, commerce, and workflow handoff.
- Exports robot-ready semantic task payloads without claiming robot control.
- Shows CACP Community Task Contracts directly inside the product experience.
- Validates data references, pulse lifecycle rules, retention metrics, protocol contracts, build output, and submission assets with `npm run check`.

## How We Built It

The prototype is a React/Vite app backed by structured JSON data. The community model includes POIs, routes, tasks, activities, Community Pulses, resident profiles, seasons, benefits, and CACP task contracts.

The product has three focused views:

```text
Resident World -> Task & Benefits -> World Ops
```

The static GitHub Pages demo is kept as a public compatibility layer, while the React/Vite experience is the primary product surface.

CACP is implemented as:

- protocol design documentation;
- Community Task Contract JSON schema;
- three synthetic contract examples;
- a validator script;
- a visible Task Contract View in the demo;
- workflow JSON export that includes the matching contract.

## Challenges

- Keeping the product from collapsing into a generic smart-community dashboard.
- Making the resident experience playful without hiding the operational rigor.
- Designing a physical-AI direction without pretending to control real robots.
- Keeping privacy and synthetic-data boundaries explicit.
- Turning protocol language into visible product UI instead of leaving it as documentation.

## Accomplishments

- Shipped a working public demo with a deterministic seven-step story.
- Built a coherent loop from recommendation to route, check-in, reward, benefit, retention, and World Ops.
- Added the first CACP draft as a protocol layer for community task contracts.
- Included three validated synthetic contract examples: social Pulse, elder-friendly helper flow, and robot-assist patrol review.
- Made the project auditable with automated validation and a public release.

## What We Learned

Product value in physical spaces is not only about task execution. It is about acceptance. Residents need low-pressure reasons to participate. Operators need measurable loops. Future AI agents and robots need explicit permission, privacy, fallback, and audit boundaries before they act.

The core insight is:

```text
MCP connects models to tools and resources.
A2A connects agents to agents.
CACP connects people, places, operators, AI agents, and robots through community task contracts.
```

## What's Next

- Use the installed Novus.ai Track Events dashboard as sponsor integration proof.
- Add a judge landing page that explains the seven-step story in one screen.
- Refresh the demo video so it shows the Task Contract View and CACP layer.
- Expand CACP with actor cards, audit logs, resident notice flows, and contract lifecycle transitions.
- Add more synthetic scenarios for senior living communities, campuses, mixed-use parks, and robot company pilots.
- Eventually extract CACP into an independent protocol repository while keeping Community Spirit as the first reference implementation.

## Testing Instructions

Open:

```text
https://lvqi11.github.io/community-spirit/
```

Local fallback static demo:

```text
demo/web/index.html
```

Suggested review path:

1. Start with the basketball or robot patrol sample prompt.
2. Review the selected route and task details.
3. Scroll to the CACP Task Contract panel.
4. Check World Ops for operator-facing metrics.
5. Try the robot patrol scenario to see robot-ready export and human-review boundaries.

Local verification:

```powershell
npm.cmd install
npm.cmd run check
npm.cmd run dev -- --port 5173
```

Then open:

```text
http://127.0.0.1:5173/
```

## Data Safety / Privacy

All current data is fictional or synthetic. The prototype does not connect to real residents, real communities, payments, merchants, access control, cameras, security systems, robots, or sensor logs.

A real pilot would require verified spaces, resident consent, role-based permissions, audit logs, data minimization, retention policies, and property/operator approval.

## Novus.ai Field

Current status:

```text
Novus.ai / Pendo Web SDK is installed on the deployed GitHub Pages demo. The Novus Track Events dashboard shows 17/17 tracked events for the Community Spirit project, including pulse_joined, pulse_checked_in, benefit_claimed, benefit_activated, benefit_redeemed, demo_step_run, workflow_json_exported, community_agent_query_submitted, task_link_copied, and demo_completed.
```

Dashboard screenshot to upload:

```text
https://novus.pendo.io/admin/track-events
Project/app: xhei
Visible proof: All 17 / Tracked 17 / Not Tracked 0
```

Signals note:

```text
The Signals page may still show "No signals yet" because Novus states that signal analysis runs hourly. Do not block final submission on Signals if Track Events and the dashboard screenshot are available.
```

## Eligibility / Event-window Note

The repository baseline commit is dated 2026-06-11, after the 2026-05-20 World Product Day hackathon start date.

If asked what was built during the event window, use:

```text
Community Spirit was built during the event window as a working product prototype. The latest release adds CACP, Community Task Contracts, validation, and a visible Task Contract View in the demo.
```

## Recommended Categories / Tags

```text
Product Management
AI
Civic Tech
Community
Property Tech
Spatial Computing
Robotics
Synthetic Data
React
Vite
Protocol
```

## Judge-facing One-liner

```text
Community Spirit is a shipped product prototype for the social layer physical AI needs before it enters real community life.
```
