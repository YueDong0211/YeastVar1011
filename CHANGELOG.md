# Changelog

## Repository maintenance (unreleased)

- Separate runtime scripts, regression tests, packaging tools and research evidence.
- Replace repeated CI invocations and background-server setup with a shared suite runner.
- Confine test output and portable runtime state to the workstation directory.
- Remove six completed catalogue migration scripts from the working tree; retain their history and source evidence.
- Complete the Bioconda runtime-license inventory and use a fixed browser-test image.
- Precompile the Windows server during packaging so Unicode-path startup does not invoke the legacy PowerShell compiler. Source-checkout compilation uses an explicit project-local temporary directory.

## Local ProjectLocal distribution — 2026-11-09

- Keep Windows port preferences, instance state, logs and compiler temporary files in `.yeastvar-local/` beside the program.
- Create the optional shortcut inside the program folder.
- Label local source and Windows ZIPs as ProjectLocal, with new integrity manifests and checksums.

## 22.1.1 — 2026-11-09

- Rewrote the project overview, software methods, user guide and publishing records around the implemented study representation, evidence model and executable QC route.
- Added CodeMeta, a repository/release map and a maintained canonical-LF source inventory with SHA-256 verification.
- Standardized the original-code MIT license and synchronized software, citation, registry, website and download metadata.
- Made public source export use the repository's maintained inventory and npm commands directly.
- Added scientific description and citation files to the Windows package; made the cluster-download browser check follow the release version.
- Fixed a spurious import-undo prompt caused by comparing export timestamps, and included the cluster workspace regression in CI.
- Retained the current marker, QTL, noise/genetics/evolution catalogues and analysis-linking interface.

## 22.1.0 — 2026-10-24

- Aligned the browser workstation, source package and Windows portable download.
- Included the expanded marker, QTL and noise/genetics/evolution catalogues with linked analysis dependencies.
- Added complete portable-package integrity, extracted startup, repeated-launch and media byte-range checks.
- Included the distributed SLURM profile and checked that every exported source file is tracked.

## 22.0.0 — 2026-10-17

- Added the local research companion, source-linked catalogue guidance and on-device model controls.
- Published browser/compatibility checks and versioned software packages.

## 21.0.0 — 2026-10-17

- Established the public source and first Zenodo software archive.
- Published the configured Linux FASTQ QC workflow, synthetic integration fixture and candidate Conda recipe.

See [GitHub releases](https://github.com/YueDong0211/YeastVar1011/releases) and [Zenodo](https://doi.org/10.5281/zenodo.23429611) for the immutable historical distributions.
