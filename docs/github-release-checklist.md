# GitHub Release Checklist

## Repository Setup

- Add `README.md`, `LICENSE`, `.gitignore`, `CONTRIBUTING.md`, and `SECURITY.md`.
- Add `PROJECT.md`, `.github/workflows/ci.yml`, and `.github/workflows/pages.yml`.
- Keep all public demo data fictional or synthetic.
- Include screenshots from `demo/web/community-spirit-demo.png` and `demo/web/community-spirit-demo-mobile.png`.
- Confirm the static demo runs through a local HTTP server.
- Treat the React/Vite demo as the primary project experience and confirm it can install, build, and run.
- Run `npm.cmd run check` and require submission validation to pass.

## Suggested First Release

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
- Mobile-first demo navigation and touch-sized actions.
- Project summary and demo script.
- Copy-ready project profile answers in `docs/project-submission-form.md`.
- Demo QA checklist in `docs/demo-qa-checklist.md`.
- Demo recording guide in `docs/demo-recording-guide.md`.

## Pages Deployment Option

The existing Pages workflow publishes the compatibility static demo. The React/Vite build in `dist/` is the primary submission artifact and should be used when the hosting target supports built assets.

```text
/demo/web/index.html
```

## Promotion Checklist

- Pin the repository after publication.
- Add topics: `community`, `civic-tech`, `ai-agents`, `spatial-computing`, `property-tech`, `robotics`, `synthetic-data`.
- Use the README first screen as the public pitch; do not describe it as a generic smart-community dashboard.
- Link the online demo, demo video, and release notes from the repository About section.
- Publish one short launch post focused on the problem and one technical post focused on the structured data model.
