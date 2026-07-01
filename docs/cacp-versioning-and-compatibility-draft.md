# CACP Versioning And Compatibility Draft

This document defines the intended versioning and compatibility discipline for CACP before and after extraction.

It is still a draft because CACP is currently `v0.1` inside `community-spirit`, but the protocol already needs explicit rules for schema changes, validator changes, and example compatibility.

## Current version state

Current protocol state:

```text
spec: v0.1 draft
manifest schema_version: cacp.manifest.v0.1
object schemas: *.v0.1
status: draft inside Community Spirit
```

Interpretation:

- the protocol is real enough to validate;
- the naming surface is not yet frozen for v1.0;
- breaking changes are still allowed, but only with explicit coordinated updates.

## Versioning goals

The versioning model should make three things predictable:

1. when a schema change is breaking;
2. what else must change in the same patch set;
3. how contributors and future adopters should interpret compatibility claims.

## Pre-v1.0 rule

Before `v1.0`, CACP should follow this rule:

```text
breaking changes are allowed, silent breaking changes are not
```

Meaning:

- changing schema semantics is allowed while the protocol is still draft;
- any breaking change must update docs, examples, validators, and changelog together;
- no change should quietly invalidate existing example chains without explanation.

## Breaking vs non-breaking changes

### Breaking change

A change should be treated as breaking if it does any of the following:

- renames a required field;
- removes a field that validators or examples depend on;
- tightens an enum so an existing valid example becomes invalid;
- changes the meaning of a field in a way that old examples would be misleading;
- changes validator expectations so existing example chains fail without a migration;
- changes command names or validator stage names described in contributor docs.

### Non-breaking change

A change can usually be treated as non-breaking if it:

- adds a clearly optional field;
- adds a new example without invalidating previous ones;
- improves documentation wording without changing semantics;
- improves error messages without changing validator rules;
- adds a new validator stage that does not invalidate existing valid assets unexpectedly.

## Required coordinated updates

When a breaking protocol change happens before `v1.0`, update all impacted layers in the same change set:

1. `docs/cacp-spec-v0.1.md`
2. affected topical docs in `docs/`
3. affected schema files in `schemas/`
4. affected examples in `examples/`
5. affected validators in `scripts/`
6. `cacp.manifest.json`
7. `docs/cacp-changelog.md`
8. `docs/cacp-release-checklist.md` if the release process changed

## Schema version rule

For now, schema versions should remain aligned with the protocol draft line.

Examples:

```text
cacp.community_task_contract.v0.1
cacp.community_evidence.v0.1
cacp.reference_context.v0.1
```

Use a new schema version when:

- a change is breaking at the object level;
- old and new payloads cannot honestly be described by the same schema contract.

Do not bump schema versions just because:

- document wording improved;
- example coverage expanded;
- validator messages became clearer.

## Manifest version rule

`cacp.manifest.json` should change when the portable-core inventory or interpretation changes materially.

Examples:

- new protocol schema added;
- new example group added;
- new validator stage becomes part of the portable-core audit surface;
- protocol status text or maturity target changes in a meaningful way.

## Validator compatibility rule

Validator behavior is part of the protocol experience, even before extraction.

If a validator starts enforcing a stricter rule that invalidates old examples, treat it as a compatibility-significant change and document it in:

- `docs/cacp-changelog.md`
- `docs/cacp-validator-troubleshooting.md`
- release notes or roadmap docs when helpful

## Example compatibility rule

Examples are not just demos; they are part of the reference contract.

Therefore:

- every full-chain example should remain internally consistent across releases;
- removing or rewriting a canonical example should be treated as a compatibility-significant change;
- synthetic examples should evolve more slowly than experimental product ideas.

## CLI and command-surface rule

The future extracted CLI should not churn names casually.

If command names such as `cacp validate lifecycle` or `cacp validate portable-extraction` change, treat that as compatibility-significant even before publishing a package.

That means updating:

- `docs/cacp-cli-contract-draft.md`
- `docs/cacp-developer-guide.md`
- `docs/cacp-release-checklist.md`
- any validator help or troubleshooting text

## Extension compatibility rule

Extension URI names and versions are part of the protocol surface.

If an extension URI changes, or if a validator begins enforcing stricter extension semantics, treat that as compatibility-significant and update:

- `docs/cacp-extension-governance-draft.md`
- `docs/cacp-changelog.md`
- affected examples in `examples/contracts/`
- `examples/extensions/registry.json`
- validator troubleshooting guidance when helpful

## v1.0 gate

CACP should not claim `v1.0` compatibility until:

- object names are stable across at least one full development cycle;
- breaking-change rules are followed consistently;
- version bump expectations are documented and boring;
- extracted repo shape, CLI contract, and reference examples all agree on the same protocol surface.
