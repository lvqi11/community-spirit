# CACP Validator Troubleshooting

Use this guide when `node scripts\validate-cacp.mjs` or `npm.cmd run check` fails on a CACP protocol object.

Run the focused validator first:

```powershell
node scripts\validate-cacp.mjs
```

Then fix the first reported error before adding more objects. Most CACP failures are broken references, incomplete full-chain coverage, or public-demo safety boundary violations.

## Common failures

### No matching CommunityActorCard for a contract actor

Symptom:

```text
unknown actor
actor has no matching CommunityActorCard actor_type
```

Fix:

- check `contract.actor.type`;
- add or update a matching file in `examples/actors/`;
- ensure the actor card declares the needed capability, zone boundary, human handoff, manual stop, and audit support.

### Unknown `task_id`, `poi_id`, or `route_id`

Symptom:

```text
unknown task_id
unknown poi_id
unknown route_id
```

Fix:

- use IDs that already exist in `examples/context/community-reference-context.json`;
- if adding a new context item, keep it fictional or synthetic and make sure the portable reference context still matches the contracts that depend on it.

### Unknown transition, artifact, or evidence reference

Symptom:

```text
references unknown evidence
references unknown artifact
does not match any known contract
```

Fix:

- verify that `contract_id` is identical across transition, artifact, evidence, export bundle, and pilot readiness files;
- use exact IDs, not display titles;
- keep files in the matching examples folder.

### Protected lifecycle transition lacks required evidence

Symptom:

```text
requires resident_notice
requires operator_approval
requires schedule_confirmation
```

Fix:

- resident-facing or elder-helper transitions usually need resident notice evidence;
- robot/operator transitions usually need operator approval evidence;
- scheduled social tasks usually need schedule confirmation evidence;
- AI-proposed tasks need human/operator review evidence before approval.

### Transition is not allowed

Symptom:

```text
unsupported lifecycle transition
```

Fix:

- compare the `from_state` and `to_state` pair with the allowed lifecycle in `docs/cacp-lifecycle-artifacts-evidence.md`;
- avoid skipping review/notice/approval states when the scenario affects people, shared space, or future robots.

### Extension URI is invalid

Symptom:

```text
extension URI must follow
duplicates extension URI
```

Fix:

- use `https://community-spirit.dev/cacp/extensions/<kebab-name>/v0.1`;
- keep extension names lowercase and kebab-case;
- remove duplicate extension URIs from the same contract;
- add new extension URIs to `examples/extensions/registry.json`;
- check `docs/cacp-extension-governance-draft.md` before adding a new extension.

### Workflow export bundle does not match source objects

Symptom:

```text
bundle contract does not match source contract
actor card mismatch
missing lifecycle transition
```

Fix:

- rebuild the bundle from the same contract, actor card, transition, artifact, and evidence chain;
- do not hand-edit bundle fields so they drift from the source examples.

### Full-chain coverage failure

Symptom:

```text
every examples/contracts item needs same-contract transition, artifact, evidence, workflow export bundle, and pilot readiness checklist
```

Fix:

- for each file in `examples/contracts/`, add the same-contract objects in:
  - `examples/transitions/`
  - `examples/artifacts/`
  - `examples/evidence/`
  - `examples/exports/`
  - `examples/pilot-readiness/`

### Pilot readiness claims too much

Symptom:

```text
public_demo_only
real-world gate is marked satisfied
```

Fix:

- keep public examples at `public_demo_only`;
- do not mark consent, legal notice, operator training, privacy review, incident handling, or retention gates as truly satisfied for fictional examples;
- document what would be required before a real pilot.

### Public examples contain sensitive or real-world payloads

Symptom:

```text
real resident
camera
sensor
payment
access token
robot payload
```

Fix:

- remove real identifiers and raw operational payloads;
- replace with synthetic summaries;
- keep only the minimum evidence needed to explain the lifecycle transition.

### Manifest points to a missing file

Symptom:

```text
cacp.manifest.json points to a missing CACP asset
```

Fix:

- update `cacp.manifest.json` whenever adding, moving, or removing a protocol document, schema, validator, example group, or reference UI file;
- run `node scripts\validate-cacp-manifest.mjs`.

## Recovery loop

When a failure is unclear:

1. Run `node scripts\validate-cacp.mjs`.
2. Read the first error only.
3. Find the referenced object ID with `rg "<id>"`.
4. Check whether every object in the chain shares the same `contract_id`.
5. Re-run the focused validator.
6. Finish with `npm.cmd run check`.
