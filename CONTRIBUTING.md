# Contributing to Community Spirit

Community Spirit is an open prototype for an AI-native community digital twin. Contributions should keep the public demo safe, runnable, and easy to understand.

## What to Contribute

- Demo UI improvements for resident, property, and robot-ready workflows.
- Synthetic POIs, routes, tasks, and activities that improve the sample data.
- Documentation that explains architecture, data policy, hackathon usage, or pilot validation.
- React/Vite components that preserve the current static demo behavior while improving maintainability.

## Data Rules

Use fictional or synthetic data only.

Do not commit real residential maps, resident identities, unit numbers, access control records, camera data, security routes, private property documents, or any data from a real community without explicit written permission and a privacy review.

## Local Demo

Static demo:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-static-demo.ps1
```

Open:

```text
http://127.0.0.1:4177/demo/web/index.html
```

React/Vite demo:

```powershell
npm.cmd install
powershell -ExecutionPolicy Bypass -File .\scripts\start-vite-demo.ps1
```

## Pull Request Checklist

- The static demo still loads `data/*.json`.
- `node --check demo/web/app.js` passes.
- JSON files parse successfully.
- Public-facing copy does not imply real community deployment unless it is clearly labeled as a prototype.
- Screenshots or demo notes are updated when the UI changes materially.
