<div align="center">

<img src="dist/assets/yeastvar-emblem.png" alt="YeastVar1011 emblem" width="112">

# YeastVar1011

**Evidence-linked study design and quality control for yeast single-cell research**

[Open the workstation](https://yuedong0211.github.io/YeastVar1011/) · [Download](https://github.com/YueDong0211/YeastVar1011/releases/latest) · [Methods](docs/software-methods.md) · [User guide](docs/WORKSTATION.md)

[![Website and platform checks](https://github.com/YueDong0211/YeastVar1011/actions/workflows/pages.yml/badge.svg)](https://github.com/YueDong0211/YeastVar1011/actions/workflows/pages.yml)
[![Raw FASTQ QC](https://github.com/YueDong0211/YeastVar1011/actions/workflows/analysis-integration.yml/badge.svg)](https://github.com/YueDong0211/YeastVar1011/actions/workflows/analysis-integration.yml)
[![Conda package checks](https://github.com/YueDong0211/YeastVar1011/actions/workflows/bioconda-package.yml/badge.svg)](https://github.com/YueDong0211/YeastVar1011/actions/workflows/bioconda-package.yml)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23429611.svg)](https://doi.org/10.5281/zenodo.23429611)

</div>

YeastVar1011 helps researchers turn a yeast single-cell question into a documented analysis plan. The browser workstation connects quality-control measures, source-attributed marker evidence, expression-variation models and population-genetic analyses to their inputs, assumptions and references. Its population context is the 1011 *Saccharomyces cerevisiae* isolate collection.

A study plan records selected methods, parameters, dependencies, marker assertions and intended outputs. It can be exported as a document, workbook, diagram, bibliography or editable JSON backup. For raw-read processing, the repository also provides a configured Linux Snakemake workflow using FastQC, STARsolo, samtools and MultiQC.

中文：用于构建酵母单细胞研究方案的开源工作站。选择研究问题、QC 指标、分析方法和 marker 证据，核查输入条件，再导出含参数、公式、依赖关系和参考文献的方案。界面支持中、英、法、西、巴斯克语；导出语言可独立设置。

![Workstation overview](docs/images/workstation.png)

## Get started

**Local ProjectLocal build:** the ZIPs in `releases/` include the project-local Windows launcher. Its ports, service state, logs and compiler temporary files are stored in `.yeastvar-local/` inside the extracted program folder. The optional shortcut is created beside `START.cmd`. The scientific catalogue and published base release remain version 22.1.1.

**In a browser:** open the [public workstation](https://yuedong0211.github.io/YeastVar1011/).

**Windows ProjectLocal:** use `releases/YeastVar1011-22.1.1-Windows-ProjectLocal.zip`, extract the complete folder on drive D and open `START.cmd`. This route uses Windows PowerShell and .NET. `STOP.cmd` stops the local service; `CREATE-SHORTCUT.cmd` creates a shortcut in the same folder. The [published base release](https://github.com/YueDong0211/YeastVar1011/releases/tag/v22.1.1) is recorded separately.

**From source, with Node.js 22 or later:**

```sh
git clone https://github.com/YueDong0211/YeastVar1011.git
cd YeastVar1011
npm start
```

Open the loopback address printed in the terminal. The source server uses Node.js built-in modules; no installation or compilation is needed to start it. Node.js 24 LTS is recommended. See [installation and deployment](docs/DEPLOYMENT.md) for platform-specific commands.

## Research workflow

1. **Define the study.** Record the question, biological units, available data and entry point: raw reads, alignments or count matrices.
2. **Choose the analysis.** Select methods, QC measures, expression-variation estimands or research extensions. Linked analysis recipes add their declared tools and inputs to the plan.
3. **Assemble annotation evidence.** Search genes, combine source and biological filters, inspect the supporting assertions and select a marker panel.
4. **Review requirements.** Resolve method branches, inspect missing inputs and record reference or model specifications.
5. **Export the plan.** Save the research document and an editable backup; use the cited tools in the analysis environment.

| Workspace | Main use |
| --- | --- |
| Raw reads and QC | Specify barcode/UMI layout, alignment, cell selection and molecular-count layers |
| Marker evidence | Inspect gene–tag–source assertions, study conditions, reported statistics and selected panels |
| Expression variation | Define estimands, replication, mean effects, state composition and measurement models |
| Research directions | Connect enrichment, regulatory networks, RNA dynamics, perturbations and population genetics to their inputs |
| QTL catalogue | Compare RNA, distributional, state-dependent and additional-omics traits and their statistical units |
| Noise, genetics and evolution | Select Bayesian noise models, phylogenetic analyses and trait/evolution designs with linked dependencies |
| Plan review and export | Review parameters, formulas, outputs and references; export documents, tables, diagrams and backups |

The classic and optional 3D interfaces edit the same saved plan. The 3D cell is an illustration used for navigation. The [local research companion](docs/LOCAL_ASSISTANT.md) retrieves catalogue records and reviews plan requirements; an optional on-device Qwen model can explain the retrieved context. Its approximately 519 MB model download starts on request.

## Raw-read analysis

The executable [QC workflow](analysis/README.md) supports a dedicated barcode read containing one fixed contiguous cell barcode (CB) and one unique molecular identifier (UMI), paired with one cDNA read. Configure the actual read roles, coordinates, whitelist, reference, strand and resources before execution.

```text
Reference and paired-FASTQ validation
  → FastQC
  → STARsolo alignment and counting
  → samtools, contig summaries and per-barcode QC
  → MultiQC and run manifest
```

Outputs include tagged genomic BAM/BAI, `Gene`, `GeneFull`, `SJ` and `Velocyto` count layers, native tool logs and descriptive QC tables. Linux x86_64 is the execution target; the supplied SLURM profile is configured for the target cluster. The browser prepares plans and exports; the workflow performs this initial sequencing-analysis stage.

## Evidence and reproducibility

Marker records retain overlapping biological tags and source-specific assertions. Published expression statistics remain attached to their original study and contrast. The catalogue's [data-source inventory](DATA_SOURCES.md), [database guide](docs/DATABASE_RESOURCES.md) and [software methods](docs/software-methods.md) describe provenance and interpretation.

Automated checks cover catalogue identities, input contracts, analysis dependencies, plan persistence, reference exports, local serving and the Windows launcher. The Linux integration workflow executes the complete FASTQ route on a deterministic artificial fixture and checks its BAM, count layers and reports. Current records are linked in [publishing and archival records](docs/PUBLISHING.md).

For development:

```sh
npm ci
npm run check
npm run test:doctor
npm run test:server
npm run test:release
npm run test:source
npx playwright install chromium
npm run test:public
```

`CHROME_PATH` selects an installed Chrome/Chromium executable for browser checks. The [repository map](docs/ARCHITECTURE.md) identifies maintained source, tests and packaging entry points. Version **22.1.1**, released **9 November 2026**, standardizes the scientific documentation, licensing and source inventory; see the [changelog](CHANGELOG.md).

## Local data

Plans and preferences are stored in the browser for the current website address. Export a JSON backup to transfer them between computers, browsers or hosted/local copies. Settings includes scoped cleanup and a full local reset. Optional model downloads, external sources and companion media have their own network connections.

## Citation and license

Use [CITATION.cff](CITATION.cff) for the software citation and cite the original methods and datasets used in the study. The [concept DOI](https://doi.org/10.5281/zenodo.23429611) identifies the version series; use a version DOI to identify the exact archived release. [CodeMeta](codemeta.json) and [bio.tools metadata](biotools.json) provide machine-readable descriptions.

Dong, Y. (2026). *YeastVar1011: evidence-linked study design and quality control for yeast single-cell research* (Version 22.1.1) [Computer software]. Zenodo. https://doi.org/10.5281/zenodo.24079647

Copyright © 2026 Yue Dong. Original code and documentation are distributed under the [MIT License](LICENSE). Bundled libraries, fonts, citation styles and scientific sources retain the terms recorded in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and [DATA_SOURCES.md](DATA_SOURCES.md).

## Contribute and contact

See [CONTRIBUTING.md](CONTRIBUTING.md) for evidence, interface and translation conventions. Report reproducible problems or source corrections through [GitHub issues](https://github.com/YueDong0211/YeastVar1011/issues). Research collaboration: [Yue Dong](mailto:yuedong02@outlook.com).

## Repository map

- `dist/`: workstation interface, catalogues, local runtimes and visual assets.
- `analysis/`: Linux raw-read QC workflow and SLURM profile.
- `scripts/`: application launch, setup, source inventory and shared test entry point.
- `tests/`: regression checks, grouped in `tests/suites.json`.
- `research/evidence/` and `research/tools/`: source audits and maintained curation tools.
- `packaging/`: source, Windows and analysis ZIP builders and the Bioconda recipe.

Use `npm test` for core checks, `npm run test:catalogue` for evidence and methods, and `npm run test:ci` for the full website suite. See [verification suites](tests/README.md) and [repository architecture](docs/ARCHITECTURE.md).
