# CACP Context Fixture Contract

This document defines how `examples/context/community-reference-context.json` should be used.

The purpose of the context fixture is to give portable CACP validators a minimal, synthetic shared-world vocabulary for `poi_id`, `route_id`, `task_id`, and `activity_id`.

## Why this fixture exists

Portable CACP validation should not depend on the full Community Spirit product data model.

The context fixture exists so protocol examples can keep place references while remaining portable.

## What belongs in the fixture

The fixture should contain only:

- synthetic `pois` used by CACP examples;
- synthetic `routes` used by CACP examples;
- synthetic `tasks` used by CACP examples;
- synthetic `activities` used by CACP examples;
- a synthetic community identifier;
- short descriptive titles or notes that help humans understand the ids.

## What does not belong in the fixture

Do not turn the fixture into a second product database.

Do not add:

- map coordinates for the whole community;
- live occupancy or sensor state;
- resident profiles;
- access-control data;
- camera payloads;
- payment or merchant state;
- UI-only display metadata that validators do not need;
- product analytics fields.

Those belong to Community Spirit product data, not the portable protocol surface.

## Update rule

Only edit the fixture when a CACP example truly needs a new shared-world identifier.

Use this order:

1. Reuse an existing `poi`, `route`, `task`, or `activity` id if it already matches the scenario.
2. Add a new fixture item only when the scenario introduces a genuinely new place or task concept.
3. Keep names stable once referenced by contracts, exports, evidence, or docs.

## Contributor workflow

When adding a new scenario:

1. check whether the needed `poi_id`, `route_id`, `task_id`, or `activity_id` already exists in `examples/context/community-reference-context.json`;
2. if not, add the minimal new fixture item;
3. update the contract and any related export bundle;
4. run `node scripts\validate-cacp.mjs`;
5. run `node scripts\validate-cacp-portable-extraction.mjs`;
6. finish with `npm.cmd run check`.

## Stability rule

The fixture should grow slower than the scenario list.

If contributors are adding many context ids for one-off cases, that is a signal to pause and ask whether:

- the protocol examples are becoming too product-specific;
- the scenario should instead reuse an existing place or route;
- a schema change is being used to hide an example-design problem.

## Extraction rule

When CACP is eventually extracted, this fixture should move with:

```text
schemas/
examples/
scripts/
docs/
cacp.manifest.json
```

It should remain a protocol reference fixture, not a promise of real deployment data.
