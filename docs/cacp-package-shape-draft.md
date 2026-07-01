# CACP Package Shape Draft

This is not a publishing plan yet. It describes what a future CACP package could expose after the protocol stabilizes inside Community Spirit.

## Candidate package names

```text
@cacp/protocol
@community-spirit/cacp
community-ai-collaboration-protocol
```

Recommended default for now:

```text
community-ai-collaboration-protocol
```

Reason: it is descriptive, does not imply an official standards body, and matches the future repo target.

## Package contents

Future package should include:

```text
cacp.manifest.json
docs/
schemas/
examples/
scripts/
README.md
LICENSE
CONTRIBUTING.md
SECURITY.md
CODE_OF_CONDUCT.md
```

It should not include the Community Spirit React app, demo assets, Devpost docs, or product-specific UI code.

Repo layout draft: `docs/cacp-extracted-repo-layout-draft.md`.

## CLI shape

Current local command:

```powershell
node scripts\validate-cacp.mjs
```

Future package command:

```powershell
cacp validate
```

Possible future subcommands:

```text
cacp validate manifest
cacp validate contracts
cacp validate lifecycle
cacp validate exports
cacp validate pilot-readiness
cacp validate chain-coverage
cacp validate portable-extraction
```

Do not add subcommands until external users need them.

CLI contract draft: `docs/cacp-cli-contract-draft.md`.

## Exports

Future JavaScript package could expose:

```text
schemas
examples
validateCacp()
validateManifest()
validateChainCoverage()
```

Current repo should not implement package exports yet. The priority is keeping validators copyable and runnable without the React app.

## Community Spirit relationship

After extraction:

```text
CACP repo = protocol, schemas, examples, validators
Community Spirit = first reference implementation
```

Community Spirit should continue to:

- visualize task contracts;
- visualize evidence;
- visualize pilot readiness;
- export `cacp_protocol_bundle`;
- prove the protocol with a synthetic community RPG scenario.

## Publishing blockers

Do not publish a package until:

- schema names are stable across one development cycle;
- validator entry point is stable;
- package README can explain CACP without Community Spirit-specific context;
- examples remain synthetic-only;
- package does not include real-world deployment claims.
