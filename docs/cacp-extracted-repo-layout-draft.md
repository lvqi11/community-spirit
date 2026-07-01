# CACP Extracted Repo Layout Draft

This document describes the expected top-level layout for a future extracted `community-ai-collaboration-protocol` repository.

The purpose is to reduce ambiguity before any real split happens.

## Candidate root layout

```text
community-ai-collaboration-protocol/
  README.md
  LICENSE
  CONTRIBUTING.md
  SECURITY.md
  CODE_OF_CONDUCT.md
  cacp.manifest.json
  docs/
  schemas/
  examples/
    context/
    actors/
    contracts/
    transitions/
    artifacts/
    evidence/
    exports/
    pilot-readiness/
  scripts/
```

## Layout rules

### Top-level files

- `README.md` should explain CACP without assuming Community Spirit UI knowledge.
- `cacp.manifest.json` should remain the index of portable-core assets.
- governance files should remain protocol-specific rather than product-specific.

### `docs/`

Should contain:

- spec entry;
- design rationale;
- lifecycle / evidence guidance;
- pilot-readiness guidance;
- developer guide;
- troubleshooting;
- extraction, package, CLI, and repo-shape drafts until the project stabilizes.

Should not require:

- React component browsing;
- demo video context;
- hackathon submission context.

### `schemas/`

Should contain only portable protocol schemas.

Do not place product data schemas or Community Spirit UI payload schemas here.

### `examples/`

Should contain the portable synthetic corpus for the protocol.

The `context/` folder is part of the protocol surface because portable validators need a minimal shared-world fixture.

### `scripts/`

Should contain portable validator entry points only.

Do not include:

- Vite build helpers;
- demo launch scripts;
- product asset generation;
- video or screenshot helpers.

## What stays in Community Spirit

These should remain in the Community Spirit repository:

- React reference implementation source
- built web artifacts
- demo launch and compatibility assets
- presentation and media assets
- full product sample-world data files

Those are reference-implementation or presentation assets, not portable protocol-core assets.

## Extraction test

The layout should be considered believable only if contributors can imagine copying exactly these folders and files into a fresh repo and then running:

```powershell
node scripts\validate-cacp.mjs
node scripts\validate-cacp-portable-extraction.mjs
```

without needing the React app or product demo files.
