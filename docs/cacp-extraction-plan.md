# CACP Extraction Plan

CACP should not be extracted into a separate repository until it can stand as a protocol project without depending on hidden Community Spirit context.

## Current position

`community-spirit` remains the product and first reference implementation.

CACP is now a protocol capsule inside the repo:

- spec;
- manifest;
- schemas;
- examples;
- validators;
- developer guide;
- release roadmap;
- reference UI.

## Extraction target

Possible future repository name:

```text
community-ai-collaboration-protocol
```

The extracted repo should contain:

- `README.md`
- `docs/cacp-spec-v0.1.md`
- `cacp.manifest.json`
- `schemas/`
- `examples/`
- `scripts/validate-*.mjs`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `CODE_OF_CONDUCT.md`
- release checklist and changelog

Community Spirit should remain linked as:

```text
first reference implementation
```

## Do not extract yet if

- examples are incomplete;
- validators require Community Spirit UI or app state;
- spec text cannot explain CACP without the demo;
- public examples are not clearly synthetic-only;
- the object model is still changing every iteration;
- there is no developer guide for adding new protocol scenarios.

## Extraction readiness checklist

- [ ] `npm.cmd run validate:protocol` passes.
- [ ] `node scripts\validate-cacp.mjs` passes as the future package-style validator entry.
- [ ] `node scripts\validate-cacp-portable-extraction.mjs` passes as a read-only dry-run of the future extracted surface.
- [ ] `scripts/validate-cacp-chain-coverage.mjs` validates every contract chain.
- [ ] `cacp.manifest.json` references every protocol asset.
- [ ] At least three complete examples exist:
  - resident social;
  - elder-friendly helper;
  - robot/operator.
- [ ] At least one AI-agent proposal example exists.
- [ ] Public demo safety boundary is enforced in validators.
- [ ] CACP docs do not require Devpost or hackathon context.
- [ ] Community Spirit reference UI can be linked externally.
- [ ] Contribution, security, code of conduct, issue template, PR template, changelog, and release checklist exist.

## Extraction sequence

1. Freeze a CACP draft tag inside `community-spirit`.
2. Run `node scripts\validate-cacp-portable-extraction.mjs` and confirm the remaining couplings are intentional and documented.
3. Copy protocol assets into the new repository.
4. Run validators in the new repository without the React app.
5. Replace Community Spirit inline CACP docs with links to the extracted repo where appropriate.
6. Keep Community Spirit examples synchronized as the reference implementation.

## Package direction

Before publishing any package, prefer a local CLI shape:

```powershell
node scripts/validate-cacp-manifest.mjs
node scripts/validate-cacp-chain-coverage.mjs
```

Only after the schema and validator interfaces stabilize should CACP become a package or SDK.
