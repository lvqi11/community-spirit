# CACP Independence Audit

This audit checks whether CACP can eventually stand as a protocol repo or package without relying on hidden Community Spirit product context.

## Current verdict

```text
extraction-ready candidate, not extraction-now package
```

CACP now has a spec, manifest, schemas, examples, validators, developer guide, quality docs, reference UI, and full-chain coverage. It is not yet ready to split because the object model is still being hardened inside the Community Spirit reference implementation.

## Independence checks

| Area | Current state | Next hardening step |
| --- | --- | --- |
| Spec | `docs/cacp-spec-v0.1.md` explains the object model. | Keep reducing Community Spirit-specific wording. |
| Manifest | `cacp.manifest.json` indexes protocol assets. | Keep every future protocol asset in the manifest. |
| Examples | Resident social, elder-helper, robot/operator, and AI-agent proposal chains exist. | Add more mixed AI/human edge cases only after current names stabilize. |
| Validators | `node scripts\validate-cacp.mjs` runs the protocol capsule validator chain. | Keep validators runnable without React or Vite assumptions. |
| Reference UI | Community Spirit shows contract, evidence, lifecycle, and pilot readiness. | Treat UI as reference implementation, not protocol dependency. |
| Safety boundary | Public examples remain synthetic-only. | Continue rejecting real resident, camera, sensor, payment, access, or robot logs. |
| Package shape | Not packaged. | Draft package interface before publishing anything. |

## What still depends on Community Spirit

- Examples use Community Spirit synthetic task, route, activity, and POI ids.
- The reference UI lives in the React app.
- The demo story explains why these contracts matter.

These dependencies are acceptable before extraction. The extracted repo can keep examples as synthetic fixtures while Community Spirit remains the first reference implementation.

## Next decision gate

CACP can move closer to independent repo/package when:

- `node scripts\validate-cacp-portable-extraction.mjs` confirms the portable-core inventory and makes remaining Community Spirit couplings explicit;
- validator scripts can run after copying only `schemas/`, `examples/`, `docs/cacp-*`, `cacp.manifest.json`, and `scripts/validate-cacp*.mjs`;
- schema names do not churn across one full development cycle;
- external readers can understand CACP from the spec, developer guide, and examples without opening the React app.
