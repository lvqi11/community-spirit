# GitHub Release Checklist

## Repository Setup

- Add `README.md`, `LICENSE`, `.gitignore`, `CONTRIBUTING.md`, and `SECURITY.md`.
- Add `PROJECT.md`, `.github/workflows/ci.yml`, and `.github/workflows/pages.yml`.
- Keep all public demo data fictional or synthetic.
- Include screenshots from `demo/web/community-spirit-demo.png` and `demo/web/community-spirit-demo-mobile.png`.
- Confirm the static demo runs through a local HTTP server.
- Treat the React/Vite demo as the primary project experience and confirm it can install, build, and run.
- Run `npm.cmd run check` and require submission validation to pass.

## Suggested CACP Draft Release

Release name:

```text
Community Spirit v0.2.0 - CACP Draft Release
```

Release summary:

```text
Community Spirit now includes the first CACP draft: a Community AI Collaboration Protocol direction with Community Task Contracts, schema validation, synthetic examples, and a visible Task Contract View in the React demo.
```

Highlights:

- CACP protocol direction for coordinating people, places, operators, AI agents, and future robots.
- Community Task Contract schema and validator.
- Three synthetic contract examples for social Pulse, elder-friendly helper flow, and robot-assist patrol review.
- Task Contract View in the React demo for interaction mode, permission, visibility, risk, resident touch, privacy boundary, fallback, feedback, and lifecycle.
- Workflow export includes the selected community task contract when available.
- Physical AI Community Roadmap from task execution to social collaboration.
- Synthetic-only public data and automated release validation.

Release gate:

```powershell
npm.cmd run check
```

## Previous Open Prototype Release

Release name:

```text
Community Spirit Open Prototype v0.1
```

Release summary:

```text
Community life RPG and physical-AI social layer that connects personalized real-space participation, resident growth, benefits, World Ops, task contracts, and future robot-ready tasks.
```

Highlights:

- Static web demo with POI, route, task, activity, repair, and robot patrol scenarios.
- Property dashboard derived from the same structured data.
- Chinese display copy in `data/i18n.zh-CN.json`.
- React/Vite three-view product with a seven-step deterministic demo controller.
- Community Pulse recommendation, lifecycle, resident growth, seasons, Spirit Points, benefit passes, and wallet ledger.
- Retention Loop metrics for first participation, 7-day return, streaks, and season comparison.
- Physical-AI social layer documentation for task contracts, interaction modes, trust, and human / AI / robot handoff.
- Physical AI Community Roadmap and Community Task Contract as first-class repository assets.
- Mobile-first demo navigation and touch-sized actions.
- Project summary and demo script.
- Copy-ready project profile answers in `docs/project-submission-form.md`.
- Demo QA checklist in `docs/demo-qa-checklist.md`.
- Demo recording guide in `docs/demo-recording-guide.md`.

## Pages Deployment

The existing Pages workflow publishes the React/Vite build from `dist/`. The public Pages URL should open at the repository root path:

```text
https://<owner>.github.io/<repo>/
```

The older static demo remains a local compatibility fallback at:

```text
demo/web/index.html
```

## Promotion Checklist

- Pin the repository after publication.
- Add topics: `community`, `civic-tech`, `ai-agents`, `spatial-computing`, `property-tech`, `robotics`, `synthetic-data`.
- Use the README first screen as the public pitch; do not describe it as a generic smart-community dashboard.
- Link the online demo, demo video, and release notes from the repository About section.
- Publish one short launch post focused on the problem and one technical post focused on the structured data model.
