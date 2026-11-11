# YeastVar1011 22.1.1

## ProjectLocal maintenance distribution

The project-local maintenance packages are `YeastVar1011-22.1.1-Windows-ProjectLocal.zip` and `YeastVar1011-22.1.1-Source-ProjectLocal.zip`, with SHA-256 sidecars. This launcher-location build stores ports, service state, logs and compiler temporary files in `.yeastvar-local/` inside the program folder. `CREATE-SHORTCUT.cmd` also writes beside `START.cmd`. The ZIP metadata identify the `project-local` distribution. The original 22.1.1 release assets and archive remain available alongside these separately labelled maintenance packages.

## Published base release

Released 9 November 2026. This maintenance release standardizes the scientific description, citation metadata, original-code license and reproducible source inventory. The release assets, website identity and embedded analysis source use the same version. See the [changelog](../CHANGELOG.md).

## Choose a distribution

| Use | Entry point |
| --- | --- |
| Windows portable | Download [YeastVar1011-22.1.1-Windows-ProjectLocal.zip](https://github.com/YueDong0211/YeastVar1011/releases/download/v22.1.1/YeastVar1011-22.1.1-Windows-ProjectLocal.zip), extract the whole folder, then open `YeastVar1011/START.cmd` |
| Browser | [GitHub Pages workstation](https://yuedong0211.github.io/YeastVar1011/) |
| Source | Extract [YeastVar1011-22.1.1-Source-ProjectLocal.zip](https://github.com/YueDong0211/YeastVar1011/releases/download/v22.1.1/YeastVar1011-22.1.1-Source-ProjectLocal.zip), then run `npm start` with Node.js 22 or later |
| Linux / SLURM QC | Use the source archive's `analysis/` directory or **Install & cluster → Cluster QC pipeline** in the workstation; configure it using [analysis/README.md](../analysis/README.md) |

## Verify and share

The release provides a SHA-256 sidecar for each ZIP. The Windows launcher also checks every packaged file against `package-manifest.json` before startup. Package tests cover complete extraction, file integrity, corruption reporting, service readiness, repeat launch and video byte ranges. The source ZIP carries `source-manifest.json`, whose hashes use canonical LF text.

Send the complete Windows ZIP to share the portable program. The recipient extracts it and opens `START.cmd`; Python and Node.js are not required for this distribution. The optional Qwen model is an approximately 519 MB first-use download with separate local-file import and cache-only loading controls. Normal planning and exports work without loading it.

Plans and settings belong to the browser origin where they were created. Export a plan JSON backup before moving to another computer, browser or website address, then import it in the destination workstation. A program ZIP contains the application and reference catalogues, not personal browser storage.

## Citation

[Version DOI 10.5281/zenodo.24079647](https://doi.org/10.5281/zenodo.24079647) identifies this release. [CITATION.cff](../CITATION.cff) supplies the software citation. The [concept DOI](https://doi.org/10.5281/zenodo.23429611) resolves the release series; [publishing records](PUBLISHING.md) list archive and registry status. Earlier distributions remain available from GitHub and Zenodo.
