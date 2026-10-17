# Bioconda package recipe

This recipe installs the YeastVar1011 workbench under `$PREFIX/share/yeastvar1011`, with two relocatable commands in `$PREFIX/bin`:

```sh
yeastvar1011 --help
yeastvar1011 --version
yeastvar1011 --port 4173
yeastvar1011-doctor --port 0 --json
```

The first command starts the loopback web server; `--base-path /path/` optionally selects a URL prefix. The checker validates runtime, files, catalogue shards, and an available port. Both commands provide `--help` and `--version`. The installed `analysis/` directory contains separately configured workflow definitions; scientific tools such as STAR, FastQC, and Snakemake are not installed by this workbench package.

## Render a release recipe

Create a versioned GitHub source release first. Download that exact tag archive and use its bytes to calculate the source checksum:

```sh
version=21.0.0
url="https://github.com/YueDong0211/YeastVar1011/archive/refs/tags/v${version}.tar.gz"
curl --fail --location "$url" --output yeastvar1011-source.tar.gz
node scripts/render-bioconda.cjs --version "$version" --source-url "$url" --archive yeastvar1011-source.tar.gz
```

The renderer produces `releases/recipe/yeastvar1011-VERSION/` with `meta.yaml`, the build and test scripts, wrappers, and a provenance record. It accepts only a matching versioned tag URL for this repository. It rejects invalid digests, non-gzip downloads, checksum mismatches, output paths outside `releases/recipe/`, and an existing output directory. It never edits the source template. A separately calculated `--sha256` may replace `--archive`; Conda still verifies the downloaded archive against the digest during build.

The checksum is for the downloaded source archive. It is not the checksum of `meta.yaml`, the exported manifest, or the generated recipe. This avoids a checksum that changes when its own recipe is added.

## Build and test on Linux

Use a dedicated build environment:

```sh
conda create -n yeastvar-build --override-channels -c conda-forge conda-build nodejs=24
conda activate yeastvar-build
conda-build --override-channels -c conda-forge -c bioconda releases/recipe/yeastvar1011-21.0.0
```

The independent `bioconda-package.yml` workflow performs a native Linux build against the checked-out source before a new tag exists. It renders a **local-source CI recipe**, builds the package, and runs its installed-command tests. A local-source recipe is never the submission recipe. Render the final tag URL and real archive SHA256 after the release is available, and build that release recipe before submitting it to Bioconda.

`run_test.sh` tests the actual installed launchers, HTTP serving, URL subpaths, marker shards, local three.js and citeproc files, and bundled license files. It uses only the runtime Node.js dependency, not a browser automation environment. The build performs no `npm install`, downloads no biological data, and requires no administrator privileges.

## Recipe scope and source paths

`noarch: generic` is appropriate for these static JavaScript assets and source files. The `__unix` dependency restricts the command wrappers to Unix platforms; Bioconda does not provide Windows packages. Runtime Node.js is constrained to `>=22,<25`, matching the supported Node 22 and 24 lines. The conda-forge Node package has builds for Linux x86_64 and macOS x86_64/ARM64; the dedicated scientific workflow has its own platform and environment requirements.

All copy sources are beneath Conda's `SRC_DIR`. Installation targets are beneath `PREFIX`. Wrappers locate `share/yeastvar1011` relative to their installed `bin` location, so the package does not embed a workstation path or assume its original build prefix. `RECIPE_DIR` supplies the wrapper source. No user configuration, browser storage, raw sequencing data, or development cache is copied into the package.

## Licenses and review

The recipe lists component-specific licenses rather than applying MIT to the entire distribution. It retains the original code license, third-party notices, scientific data-source notice, three.js and ExcelJS notices, KaTeX MIT and font OFL notices, citeproc source and dual-license texts, and CSL notices. Existing source-derived marker facts and statistics retain citations and their context. Original paper text, figures, and downloaded supplementary documents are not installed.

Some cited scientific sources use CC BY-NC or CC BY-NC-ND. Their appearance in the compound license inventory identifies those source-rights boundaries; it does not change the original application's MIT license or grant new rights to the publications. The associated source facts and curation are documented in `DATA_SOURCES.md`. Reviewers can assess the combined catalogue and redistribution scope from those files. Registration or source publication does not imply acceptance into the Bioconda channel.

Primary packaging references:

- [Bioconda recipe requirements](https://bioconda.github.io/contributor/guidelines.html): biological scope, stable source URL, checksum, redistributable license, tests, and wrapper usage notes.
- [Conda metadata reference](https://docs.conda.io/projects/conda-build/en/stable/resources/define-metadata.html): `noarch: generic`, source paths, license files, and dependencies.
- [Conda build-script reference](https://docs.conda.io/projects/conda-build/en/stable/resources/build-scripts.html): build and test execution.
- [conda-forge Node.js packages](https://anaconda.org/conda-forge/nodejs) and [feedstock](https://github.com/conda-forge/nodejs-feedstock): runtime availability.
