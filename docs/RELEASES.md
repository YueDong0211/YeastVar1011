# YeastVar1011 22.1.0

Released 24 October 2026.

The browser application, Windows portable package and source release use the same version. The Windows package contains the current catalogue and plan-linking interface, including the marker evidence, QTL directory and 19 noise, genetics and evolution analyses added after 22.0.0.

| Use | Entry point |
| --- | --- |
| Windows portable workstation | Download `YeastVar1011-22.1.0-Windows.zip` from the [release](https://github.com/YueDong0211/YeastVar1011/releases/tag/v22.1.0), extract the complete folder, then open `YeastVar1011/START.cmd`. Python and Node.js are not required. |
| Browser workstation | [GitHub Pages](https://yuedong0211.github.io/YeastVar1011/) or the [alternative website](https://yeastvar1011-research-atlas.robust-bread-5701.chatgpt.site). |
| Source and development | Extract the tagged source archive, then run `npm start` with Node.js 22 or later. Development dependencies are installed separately with `npm ci`. |
| Linux / SLURM QC | Use the source archive's `analysis/` directory, or download the analysis package from **Install & cluster → Cluster QC pipeline**. Follow `analysis/README.md` before configuring data and cluster resources. |

The Windows portable package verifies its files against a SHA-256 manifest before starting. The release provides a separate SHA-256 file for the ZIP itself. Package checks cover complete extraction, file integrity, corruption reporting, server readiness, repeated launch and video byte ranges.

The optional Qwen model is a separate first-use download of approximately 519 MB. It is not bundled in the ZIP. Imported model files and the browser model cache can be used for subsequent offline loading. The catalogue guide, research plans and normal exports work without loading the model.

Plans and settings remain in the browser storage of the address where they were created. Export a plan JSON before moving to another computer, browser or website address; then import it in the destination workstation. Sending the program ZIP does not include personal browser storage.

Use the whole portable ZIP for sharing. Keep source packages and analysis tools separate from scientific input data. Historical releases remain available from GitHub and Zenodo for reproducibility.
