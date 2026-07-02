# Contributing to Community Spirit and CACP

Community Spirit is an open prototype for a community life RPG and physical-AI social layer. CACP is the protocol draft inside this repo. Contributions should keep the public demo safe, runnable, reviewable, and easy to understand.

## What to Contribute

- Demo UI improvements for resident, property, and robot-ready workflows.
- Synthetic POIs, routes, tasks, and activities that improve the sample data.
- Documentation that explains architecture, data policy, project usage, or pilot validation.
- React/Vite components that preserve the current static demo behavior while improving maintainability.
- CACP schemas, examples, validators, and docs that make the protocol clearer without implying real-world deployment.

## Data Rules

Use fictional or synthetic data only.

Do not commit real residential maps, resident identities, unit numbers, access control records, camera data, security routes, private property documents, or any data from a real community without explicit written permission and a privacy review.

CACP examples must remain `fictional_or_synthetic_only`. Do not include raw video, sensor payloads, payment data, access tokens, real robot logs, real resident profiles, or real property approvals.

## CACP Contribution Rules

- Update `docs/cacp-spec-v0.1.md` when changing protocol object semantics.
- Add or update examples when changing a schema.
- Add or update validators when adding new required references.
- Update `docs/cacp-changelog.md` for protocol-facing changes.
- A new CACP contract must include the full chain: contract, transition, artifact, evidence, workflow export bundle, and pilot readiness checklist.
- Run `node scripts\validate-cacp.mjs` and use the focused command printed by any failed validator stage.
- Check `docs/cacp-new-contributor-walkthrough.md` before adding a new scenario, especially for `public-notice` or `incident-review`.
- Keep `Community Spirit` as the reference implementation; do not rename the repository or split CACP into a package inside a casual PR.

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

- `npm.cmd run check` passes.
- `node scripts\validate-cacp.mjs` passes when schemas, examples, exports, or pilot-readiness files change.
- Every new protocol concept is linked from the relevant README/spec/decision/changelog docs.
- Public-facing copy does not imply real community deployment unless it is clearly labeled as a prototype.
- Public-facing CACP copy does not imply real pilot readiness unless all real-world gates are satisfied outside the public demo.
- Screenshots or demo notes are updated when the UI changes materially.
