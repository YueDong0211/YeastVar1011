# Repository and release structure

## Maintained components

| Path | Role |
| --- | --- |
| `dist/` | Editable browser application, curated JSON, offline catalogue bundles, local vendor code and visual assets |
| `dist/data/` | Workflow, literature, research-direction and marker catalogues; the marker manifest identifies its shards and content versions |
| `dist/assets/downloads/` | Current analysis source ZIP and SHA-256 sidecar |
| `analysis/` | Snakemake workflow, configuration examples, Linux environments, SLURM profile and deterministic tests |
| `portable/` and root `.cmd` files | Windows PowerShell/.NET server, integrity checks and launch/stop/shortcut entry points |
| `scripts/` | Loopback server, setup, environment checks, source inventory and the shared test runner |
| `tests/` | Maintained regressions, suite inventory and package verification |
| `packaging/` | Source, analysis and Windows ZIP builders, plus Bioconda rendering and recipe files |
| `research/evidence/` | Literature receipts, marker evidence, method inventories and source audits |
| `research/tools/` | Active literature discovery and catalogue asset writers |
| `docs/` | User, deployment, methods, source-coverage and publication documentation |
| `packaging/bioconda/` | Package template, relocatable command wrappers and installed-package tests |
| `.github/workflows/` | Website/compatibility, Linux FASTQ integration and Conda package checks |
| `CITATION.cff`, `codemeta.json`, `.zenodo.json`, `biotools.json` | Citation, discovery and archival metadata |

`dist/` is the distributed application source: there is no separate compilation step. Versioned module filenames identify successive implementation layers still loaded by `index.html`. They are not obsolete merely because their suffix is lower than the release version. The software release version and catalogue-development labels serve different purposes.

## Catalogue updates

Edit the relevant JSON records and their language fields together. `research/tools/write_catalogue_assets.py` writes matching network shards and offline bundles with content-derived part versions. The source manifest and per-record provenance remain part of the catalogue. Catalogue changes are checked with `npm run check` and `npm run test:catalogue`. `tests/suites.json` defines the maintained suites; `npm run test:ci` runs the complete website verification sequence.

## Release sequence

1. Update the release identity in `package.json`, its lockfile, `dist/release-info.js`, citation/discovery metadata and release notes. Refresh changed script URLs in `dist/index.html`.
2. Run `python packaging/package-analysis.py` and `python tests/qa-analysis-package.py` to rebuild and compare the downloadable analysis source against `analysis/`.
3. Run `npm test` for application, environment, server and release checks. Use the real browser smoke check for interface changes and the Linux integration workflow for analysis changes.
4. Run `npm run release:manifest`, then `npm run test:source`. Commit the reviewed inventory with the source.
5. Run `python packaging/package-source.py` to export, ZIP and verify the allowlisted source. `npm run release:source` exports a folder when a ZIP is not needed. Run `packaging/package-portable.ps1` for the Windows ZIP, then `tests/qa-portable-package.ps1 -ArchivePath PATH` against that exact archive.
6. Publish the tested Git tag, source ZIP, Windows ZIP and checksum sidecars. Inspect CI, Pages and the linked Zenodo record, then record the returned version DOI.

`source-manifest.json` inventories canonical LF source bytes, matching Git archives regardless of checkout line endings. It excludes itself to avoid a recursive digest. The Windows package's separate `package-manifest.json` hashes the actual packaged bytes. Release ZIPs have independent SHA-256 sidecars.

Build outputs are written under ignored `releases/`. Private research notes, deployment configuration, browser storage, user analysis configuration and caches are excluded from the source inventory. Third-party notices and source-attribution records travel with both distributions.

## Test execution and local files

`npm run test:list` lists the suites. The CI group preserves all catalogue, browser, Python and interface checks. The runner owns its integration server, selects an available loopback port and closes that process after the suite. Temporary files and reports are confined to `.yeastvar-local/qa/`; successful runs remove their own output.

`tests/` keeps individual regressions reviewable while one runner replaces repeated invocation and server-management code. Completed one-time catalogue migrations are available in Git history. Published evidence records remain in `research/evidence/`.

The project-local Windows distribution stores its instance state, compiler temporary files and generated shortcut inside the extracted workstation folder. Personal research notes and deployment configuration are excluded from public source archives.
