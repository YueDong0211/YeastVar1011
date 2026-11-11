# Research evidence and curation

| Directory | Contents |
| --- | --- |
| `evidence/` | Literature search receipts, marker/source audits, method inventories and source-attributed proposals |
| `tools/` | Maintained literature discovery and catalogue asset writers |

Production catalogues remain in `dist/data/`. Source table names, row identifiers and published statistics in the evidence records retain their original context. Historical source-file paths record the import provenance; original supplementary files are not bundled.

Use `python research/tools/v25-literature-discovery.py` to refresh the local coverage report, or add `--refresh` to retrieve public metadata. `python research/tools/write_catalogue_assets.py` writes consistent marker shards and offline catalogue bundles from the curated data. Run `npm run test:catalogue` and the Python suite after catalogue changes.

Completed one-time catalogue migration scripts are retained in Git history rather than the current working tree. Active regression checks are grouped in `tests/` and selected through `tests/suites.json`.
