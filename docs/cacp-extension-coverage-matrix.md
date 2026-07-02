# CACP Extension Coverage Matrix

This matrix summarizes the current extension registry coverage across the v0.1 synthetic CACP example chains.

It helps decide whether an extension should remain scenario-specific, receive more examples, or eventually become a core protocol concept.

## Current verdict

```text
extension registry is useful, but most extensions are still single-chain signals
```

`public-notice` currently appears in more than one contract and now spans five scenario families. `incident-review` now appears in both robot patrol and operator-led notice-failure review, but it should still stay draft until incident evidence semantics are stable across more task types.

## Coverage matrix

| Extension | Contract coverage | Actor coverage | Interaction mode coverage | Core candidate | Current recommendation |
| --- | --- | --- | --- | --- | --- |
| `ai-agent-suggestion` | `ctc-ai-suggested-garden-meetup` | `ai_agent` | `operator` | No | Keep as extension until more AI proposal scenarios exist. |
| `elder-friendly` | `ctc-elder-friendly-walking-helper` | `mixed` | `elder_friendly` | Yes | Add at least one more elder-friendly scenario before promotion discussion. |
| `incident-review` | `ctc-robot-fire-passage-patrol`, `ctc-playground-repair-notice-incident-review` | `robot`, `operator` | `robot_assist`, `operator` | No | Keep as extension; it now has a non-robot example, but incident evidence semantics are still early. |
| `light-social` | `ctc-evening-basketball-social-pulse` | `resident` | `parallel` | Yes | Add another resident social scenario before considering core. |
| `public-notice` | `ctc-ai-suggested-garden-meetup`, `ctc-elder-friendly-walking-helper`, `ctc-temporary-playground-repair-notice`, `ctc-shared-garden-maintenance-notice-update`, `ctc-playground-repair-notice-incident-review` | `ai_agent`, `mixed`, `operator` | `operator`, `elder_friendly` | Yes | Best current promotion candidate, now validated across property operation notice, notice-update, and notice-failure incident-review chains; keep in extension until timing fields and evidence facts stabilize. |
| `robot-assist` | `ctc-robot-fire-passage-patrol` | `robot` | `robot_assist` | No | Keep as extension until robot handoff semantics are validated beyond one scenario. |

## Promotion candidates

### Strongest current candidate

`public-notice` is the strongest current candidate because it already spans five scenario families:

- AI-agent proposal reviewed by an operator;
- elder-friendly helper coordination.
- resident-facing property operation scheduling.
- resident-facing property operation notice update.
- resident-facing property operation notice failure during execution.

Before promotion to core, CACP still needs:

- a clearer definition of notice timing;
- whether notice is required before proposal, approval, scheduling, or execution;
- whether notice evidence belongs in `CommunityEvidence`, `CACPPilotReadinessChecklist`, or both;
- whether notice failure needs an explicit timing value such as `on_notice_failure`.
- whether common notice facts should become explicit schema fields or stay extension-level evidence facts.

Current semantics draft:

```text
docs/cacp-public-notice-semantics-draft.md
```

### Watch-list candidates

`elder-friendly` and `light-social` are worth watching, but each is still represented by only one chain.

They should not become core yet because the current examples do not prove stable, cross-scenario semantics.

## Keep as extensions

These should stay as extensions for now:

- `ai-agent-suggestion`
- `incident-review`
- `robot-assist`

They are important directionally, but still either early or too close to one implementation family.

## Next coverage targets

Useful future example additions:

- compare the five `public-notice` timing patterns before adding a core field or stricter validator rule;
- another `light-social` example outside basketball;
- another `elder-friendly` example with a different helper or route pattern;
- a second robot/operator task that uses `robot-assist` without also depending on fire-passage inspection;
- another non-robot scenario that enters `incident_review`, if the protocol keeps `incident-review` as a general extension.

## Registry relationship

Source of truth:

```text
examples/extensions/registry.json
```

Schema:

```text
schemas/cacp-extension-registry.schema.json
```

This matrix is a human-readable review aid. The registry remains the machine-readable source of extension URI truth.
