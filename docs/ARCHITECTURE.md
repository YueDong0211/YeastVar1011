# Repository and release structure

## Maintained components

| Path | Role |
| --- | --- |
| `dist/` | Editable browser application, curated JSON, offline catalogue bundles, local vendor code and visual assets |
| `dist/data/` | Workflow, literature, research-direction and marker catalogues; the marker manifest identifies its shards and content versions |
| `dist/assets/downloads/` | Current analysis source ZIP and SHA-256 sidecar |
| `analysis/` | Snakemake workflow, configuration examples, Linux environments, SLURM profile and deterministic tests |
| `portable/` and root `.cmd` files | Windows PowerShell/.NET server, integrity checks and launch/stop/shortcut entry points |
| `scripts/` | Cross-platform server/setup, environment checks, source and analysis packaging, recipe rendering |
| `research/` | Maintained catalogue, controller, browser and package regressions; source records used by those checks; catalogue writers |
| `docs/` | User, deployment, methods, source-coverage and publication documentation |
| `packaging/bioconda/` | Package template, relocatable command wrappers and installed-package tests |
| `.github/workflows/` | Website/compatibility, Linux FASTQ integration and Conda package checks |
| `CITATION.cff`, `codemeta.json`, `.zenodo.json`, `biotools.json` | Citation, discovery and archival metadata |

`dist/` is the distributed application source: there is no separate compilation step. Versioned module filenames identify successive implementation layers still loaded by `index.html`. They are not obsolete merely because their suffix is lower than the release version. The software release version and catalogue-development labels serve different purposes.

## Catalogue updates

Edit the relevant JSON records and their language fields together. `research/write_catalogue_assets.py` writes matching network shards and offline bundles with content-derived part versions. The source manifest and per-record provenance remain part of the catalogue. Catalogue changes are checked with `npm run check` and the corresponding `research/qa-*.cjs` regressions; the website workflow lists the maintained set.

## Release sequence

1. Update the release identity in `package.json`, its lockfile, `dist/release-info.js`, citation/discovery metadata and release notes. Refresh changed script URLs in `dist/index.html`.
2. Run `python scripts/package-analysis.py` and `python research/qa-analysis-package.py` to rebuild and compare the downloadable analysis source against `analysis/`.
3. Run application, environment, server and release checks. Use the real browser smoke check for interface changes and the Linux integration workflow for analysis changes.
4. Run `npm run release:manifest`, then `npm run test:source`. Commit the reviewed inventory with the source.
5. Run `python scripts/package-source.py` to export, ZIP and verify the allowlisted source. `npm run release:source` exports a folder when a ZIP is not needed. Run `research/package-portable.ps1` for the Windows ZIP, then `research/qa-portable-package.ps1 -ArchivePath PATH` against that exact archive.
6. Publish the tested Git tag, source ZIP, Windows ZIP and checksum sidecars. Inspect CI, Pages and the linked Zenodo record, then record the returned version DOI.

`source-manifest.json` inventories canonical LF source bytes, matching Git archives regardless of checkout line endings. It excludes itself to avoid a recursive digest. The Windows package's separate `package-manifest.json` hashes the actual packaged bytes. Release ZIPs have independent SHA-256 sidecars.

Build outputs are written under ignored `releases/`. Private research notes, deployment configuration, browser storage, user analysis configuration and caches are excluded from the source inventory. Third-party notices and source-attribution records travel with both distributions.
