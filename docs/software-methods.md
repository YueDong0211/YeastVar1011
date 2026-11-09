# YeastVar1011: evidence-linked study design and quality control for yeast single-cell research

**Yue Dong · Software version 22.1.1 · 9 November 2026**

## Abstract

Single-cell studies of genetically diverse yeast populations require analysis choices to be matched to assay structure, biological replication and source-specific molecular evidence. YeastVar1011 connects these decisions in a browser-based study-design workstation. A versioned plan links research questions, marker assertions, methods, parameters and input requirements, with document, spreadsheet, diagram and citation exports. The marker catalogue preserves gene–tag–source relationships, allowing functional annotation and study-specific RNA associations to be inspected together without collapsing their evidence types. Analysis recipes link expression-variation, population-genetic and evolutionary questions to their declared tools and data. A separate Linux Snakemake workflow processes explicitly configured fixed-barcode/UMI libraries with FastQC, STARsolo, samtools and MultiQC, retaining tagged alignments and integer count layers. Automated checks exercise catalogue integrity, planning behavior, cross-platform startup and Windows packaging; a deterministic synthetic integration test verifies the complete FASTQ route. The resource provides an inspectable specification of a yeast single-cell study and a reproducible starting point for molecular quality control.

## 1. Research setting

Genetic background, cellular state and measurement structure all affect how expression variation is interpreted. The 1011 *Saccharomyces cerevisiae* isolate collection provides a population-genomic context for studying this variation [1]. Yeast single-cell work has also established condition- and genotype-dependent expression programmes that can inform annotation [2]. A usable study specification must connect these sources to the experiment's actual sampling units, molecular layers and analysis choices.

YeastVar1011 represents that specification as a research plan. Its main contribution is the connection between source-attributed evidence, selectable analyses and explicit prerequisites. Researchers can begin with raw FASTQ, tagged alignments or an existing count matrix. The selected entry point determines which upstream requirements are relevant. A separate executable workflow implements the supported raw-read QC route.

## 2. Study representation and analysis dependencies

A plan contains the objective, available input types, research directions, stages, methods, QC measures, marker selections, parameters, dependency edges and requested outputs. Both the classic interface and optional immersive interface operate on the same saved state. Undo/redo, recovery and JSON import/export preserve that state across navigation and reloads.

Each analysis recipe declares its own tool, metric, method-option and input dependencies. Selecting a recipe links those records to the plan; a dependency shared by several analyses remains selected until its final owning analysis is removed. Manual choices and explicit exclusions are retained. Alternative models can request different branches, and incompatible requests remain visible for resolution. Input declarations and external source references are recorded independently of method selection, so selecting an analysis cannot create a genotype matrix, phylogeny or other missing measurement.

The research catalogue covers expression distributions, RNA dynamics, regulatory and coexpression networks, perturbation designs and population genetics. QTL cards identify the trait, statistical unit and required data for RNA, distributional, state-dependent and additional-omics questions. Noise/genetics/evolution recipes connect Bayesian count models, relatedness-aware models, phylogenetic inference and trait-evolution designs to the corresponding inputs and source papers. These records produce analysis specifications and references; execution uses the cited tools in the research environment.

## 3. Marker evidence

Gene identifiers, aliases and descriptions are reconciled against Saccharomyces Genome Database records. Gene Ontology annotations add a functional layer. Published yeast studies supply cell-cycle, stress, nutrient-response, quiescence and aging associations. The [source inventory](../DATA_SOURCES.md) and marker manifest retain source identifiers, import provenance, original panel labels and available table coordinates.

The unit of annotation is a **gene–tag–source assertion**. A gene can carry several tags, and a tag can have several supporting records. Functional membership, periodic RNA expression, differential expression, continuous association and protein localization retain distinct evidence types. Search and filters operate on these records; assertion-level selection allows a plan to retain the relevant context rather than every statement associated with a gene.

Published means, detection fractions, effect sizes and significance fields remain attached to their original experiment and contrast. Unreported values remain missing. Reanalysis of one experiment is identified by its data origin. A selected marker panel is assessed in the target data through expression, detection, coexpression, state association and consistency across biological replicates.

## 4. Browser implementation and exchange formats

The application is distributed as editable HTML, CSS, JavaScript and JSON under `dist/`. Marker records are sharded using a manifest; offline JavaScript bundles carry the same records. A loopback server built from Node.js standard modules serves the source distribution. The Windows portable distribution uses PowerShell and a .NET server. The browser interface supports Chinese, English, French, Spanish and Basque, with independent export-language selection.

Plans are stored for the current browser origin and transferred as JSON. Exports include formatted study documents, workbooks, workflow diagrams, marker tables, formula definitions and bibliographic records. ExcelJS writes spreadsheets, KaTeX renders mathematical notation, and citeproc-js with the APA CSL style formats references. Component licenses are retained in the distribution.

An optional dedicated browser worker runs Qwen2.5-0.5B-Instruct with Transformers.js and ONNX Runtime. Catalogue retrieval supplies the evidence context; links and source identities come from stored records. Loading, local-file import, offline cache use and deletion are explicit controls. The model provides explanatory text; deterministic plan review and catalogue search remain available without it. The [local companion specification](LOCAL_ASSISTANT.md) records the model revision, file hashes, resource limits and validation procedures.

## 5. Executable raw-read workflow

The `analysis/` workflow uses Snakemake to coordinate reference validation, paired-FASTQ inspection, FastQC [3], STARsolo alignment/counting [4,5], samtools diagnostics [6], descriptive matrix QC and MultiQC [7]. All lanes from one library are counted together before UMI collapsing. Libraries remain separate counting units.

The supported layout has a dedicated barcode read containing one fixed contiguous cell barcode (CB) and one fixed contiguous unique molecular identifier (UMI), paired with one cDNA read. Coordinates, read lengths, Phred encoding, whitelist, strand, reference and alignment settings are supplied in the configuration. Preflight checks validate those fields, FASTA/GTF compatibility, paired read identities, complete gzip streams, sequence/quality lengths and whitelist entries. The audit records read counts, segment-specific Q30 numerators/denominators, N bases and input hashes.

STARsolo 2.7.11b performs spliced alignment, barcode matching, UMI processing and feature counting. The configured maximum cDNA length determines the index overhang. Barcode correction, UMI deduplication, intron limits, multimapping and cell filtering are explicit choices. The default `None` cell filter retains raw matrices; optional `TopCells` selection uses a supplied count. Tool commands, versions and logs accompany the outputs.

Linux x86_64 is the execution target. The optional SLURM profile specifies the target cluster's account, partition and resources. Submission and compute nodes must share the same data, output and environment paths. Each library's STAR alignment occupies one job. Combinatorial or embedded barcodes, paired cDNA reads and non-UMI assays require a protocol-specific workflow.

## 6. Molecular outputs and QC definitions

| Output | Definition and use |
| --- | --- |
| Genomic BAM/BAI | Coordinate-sorted cDNA alignments, unmapped records and requested raw/corrected barcode, UMI, gene and alignment tags |
| `Gene` raw matrix | Integer gene UMI counts from transcript-compatible assignments |
| `GeneFull` raw matrix | Gene-body counts admitting exonic and intronic overlaps |
| `SJ` raw matrix and junction table | Barcode-level splice-junction support and genomic junction context |
| `Velocyto` layers | Separate integer spliced, unspliced and ambiguous counts |
| BAM and per-barcode summaries | Integrity checks, alignment composition, contig fractions and molecular QC |
| MultiQC and run manifest | Aggregated native reports, configuration, commands, tool versions and input hashes |

For barcode \(c\), let \(Y_{gc}\) be the integer `Gene` UMI count for gene \(g\), with \(N_c=\sum_gY_{gc}\). The workflow reports \(N_c\), the number of detected genes, and the maximum-gene fraction. A configured gene set \(G\) has fraction

\[
f_{Gc}=\frac{\sum_{g\in G}Y_{gc}}{N_c}.
\]

If \(S_c\), \(U_c\) and \(A_c\) are the spliced, unspliced and ambiguous UMI totals, the unspliced fraction is \(U_c/(S_c+U_c)\); ambiguous counts are retained separately. Contig fractions use primary mapped alignment records, excluding secondary and supplementary records. Their denominators are read records rather than UMIs. A zero denominator, or an unassessed mitochondrial gene set, produces `NA`.

Raw count layers remain available for downstream cell selection, normalization and measurement modeling. `GeneFull` and `Gene` use different assignment definitions; their subtraction is not an intron-count estimator. RNA-velocity inference uses an additional kinetic model [8], whose information requirements must be assessed from the available yeast intron signal. Requested corrected tags are evaluated in the context of barcode and read assignment.

## 7. Expression-variation design

The plan distinguishes population heterogeneity, variation conditional on measured state and mechanistic models of stochastic regulation. It records biological units, culture replication, library/batch structure, mean-expression effects and state composition before selecting a noise estimand. Residual variation after adjustment retains the interpretation of its measurement model and conditioning variables.

Genetic analyses additionally require matched strain identities, genotypes or supplied trait/QTL summaries, relatedness and the replication appropriate to the question. Phylogenetic analyses require sequence or tree provenance and a specified evolutionary model. The plan exposes these requirements alongside method choices, allowing investigators to resolve them before analysis and to retain them with exported methods.

## 8. Verification and reproducibility

The maintained test suite checks catalogue identities, source references, selected evidence, method branches, shared dependencies, import/export, persistence and browser navigation. Server and environment tests exercise real loopback binding and required assets. The compatibility matrix covers Linux, macOS and Windows with Node.js 22 and 24. Windows-package tests extract a fresh ZIP, verify every file hash, reject a same-length corrupted file, launch the real service, repeat the launch and inspect HTTP byte ranges.

The analysis tests cover malformed configuration, FASTQ pairing/gzip integrity, reference and whitelist consistency, retained STAR arguments and integer matrix aggregation. In the configured Linux environment, they also resolve the actual Snakemake job graph. The integration fixture contains artificial sequence, annotation, two barcodes and 240 paired reads. The [Linux execution record](https://github.com/YueDong0211/YeastVar1011/actions/runs/42596876845) verifies actual FastQC, STARsolo, samtools and MultiQC products, including BAM tags and requested count layers. These fixture values describe software behavior rather than a biological cohort or comparative benchmark.

Direct analysis versions are Python 3.12, Snakemake 9.27.0, SLURM executor 2.8.0, STAR 2.7.11b, samtools 1.24, FastQC 0.13.0 and MultiQC 1.35, with Java 17 for FastQC. Production runs retain resolved environments, configuration, input hashes and output manifests. [Installation commands](DEPLOYMENT.md), [workflow instructions](../analysis/README.md) and [release records](PUBLISHING.md) provide the reproducibility entry points.

## 9. Availability and attribution

The [source repository](https://github.com/YueDong0211/YeastVar1011) provides tagged releases, a Windows portable package, an analysis source bundle and SHA-256 inventories. The [workstation](https://yuedong0211.github.io/YeastVar1011/) is publicly accessible. Version 22.1.1 is archived at [doi:10.5281/zenodo.24079647](https://doi.org/10.5281/zenodo.24079647); the [concept DOI](https://doi.org/10.5281/zenodo.23429611) identifies the release series. `CITATION.cff` supplies structured citation metadata.

Original code and documentation are MIT-licensed, copyright 2026 Yue Dong. Scientific catalogues retain source attribution and component-specific terms in [DATA_SOURCES.md](../DATA_SOURCES.md) and [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md). The distributed materials comprise software, curated reference records and artificial test inputs.

## References

1. Peter, J., et al. (2018). Genome evolution across 1,011 *Saccharomyces cerevisiae* isolates. *Nature, 556*, 339–344. https://doi.org/10.1038/s41586-018-0030-5
2. Jackson, C. A., Castro, D. M., Saldi, G.-A., Bonneau, R., & Gresham, D. (2020). Gene regulatory network reconstruction using single-cell RNA sequencing of barcoded genotypes in diverse environments. *eLife, 9*, e51254. https://doi.org/10.7554/eLife.51254
3. Andrews, S. *FastQC: A quality control tool for high throughput sequence data*. [Project](https://www.bioinformatics.babraham.ac.uk/projects/fastqc/); [0.13.0 source release](https://github.com/s-andrews/FastQC/releases/tag/v0.13.0).
4. Dobin, A., et al. (2013). STAR: Ultrafast universal RNA-seq aligner. *Bioinformatics, 29*(1), 15–21. https://doi.org/10.1093/bioinformatics/bts635
5. STAR contributors. *STARsolo documentation and parameter definitions, version 2.7.11b*. [Documentation](https://github.com/alexdobin/STAR/blob/2.7.11b/docs/STARsolo.md); [parameters](https://github.com/alexdobin/STAR/blob/2.7.11b/source/parametersDefault).
6. Danecek, P., et al. (2021). Twelve years of SAMtools and BCFtools. *GigaScience, 10*(2), giab008. https://doi.org/10.1093/gigascience/giab008
7. Ewels, P., Magnusson, M., Lundin, S., & Käller, M. (2016). MultiQC: Summarize analysis results for multiple tools and samples in a single report. *Bioinformatics, 32*(19), 3047–3048. https://doi.org/10.1093/bioinformatics/btw354
8. La Manno, G., et al. (2018). RNA velocity of single cells. *Nature, 560*, 494–498. https://doi.org/10.1038/s41586-018-0414-6
