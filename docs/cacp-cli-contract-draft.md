# CACP CLI Contract Draft

This document describes the intended command-line contract for a future extracted CACP repository or package.

It is not a shipping promise yet. It exists so the validator surface can stabilize before extraction.

## Goal

The future CLI should make portable protocol validation feel obvious:

```powershell
cacp validate
```

That command should mean:

```text
validate the full portable CACP protocol capsule
```

## Default command

Recommended default:

```powershell
cacp validate
```

Equivalent current local behavior:

```powershell
node scripts\validate-cacp.mjs
```

## Proposed subcommands

The future CLI may expose these subcommands after extraction:

```text
cacp validate
cacp validate manifest
cacp validate contracts
cacp validate lifecycle
cacp validate exports
cacp validate pilot-readiness
cacp validate chain-coverage
cacp validate portable-extraction
```

## Subcommand meanings

| Command | Intended behavior | Current local equivalent |
| --- | --- | --- |
| `cacp validate` | Run the full portable protocol validator chain. | `node scripts/validate-cacp.mjs` |
| `cacp validate manifest` | Check that manifest references every portable-core asset. | `node scripts/validate-cacp-manifest.mjs` |
| `cacp validate contracts` | Check actor cards, contracts, and portable context fixture references. | `node scripts/validate-contracts.mjs` |
| `cacp validate lifecycle` | Check transitions, artifacts, and evidence rules. | `node scripts/validate-cacp-lifecycle.mjs` |
| `cacp validate exports` | Check workflow protocol bundles against source objects. | `node scripts/validate-cacp-workflow-export.mjs` |
| `cacp validate pilot-readiness` | Check governance gates and public-demo boundaries. | `node scripts/validate-cacp-pilot-readiness.mjs` |
| `cacp validate chain-coverage` | Check that every contract has a complete example chain. | `node scripts/validate-cacp-chain-coverage.mjs` |
| `cacp validate portable-extraction` | Check that the portable-core audit surface stays free of hidden Community Spirit coupling. | `node scripts/validate-cacp-portable-extraction.mjs` |

## Output contract

The CLI should preserve the current validator style:

- fail fast on the first broken validator stage;
- print a short human-readable repair hint;
- point to troubleshooting docs when the problem is structural;
- keep success output compact and machine-scannable.

## Non-goals

The CLI should not initially promise:

- remote network calls;
- automatic repo extraction;
- code generation;
- packaging or publish flows;
- migration of Community Spirit product data.

Those are separate workflows and should not hide inside `cacp validate`.

## Stability rule

Do not publish a standalone CLI until:

- validator stage names stop changing every iteration;
- docs and examples use the same names as the CLI;
- contributors can predict which command to run from the error message alone.
