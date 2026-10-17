# YeastVar1011: an evidence-linked workbench for yeast single-cell study design and raw-read quality control

Software resource description for version 21.0.0, prepared on 17 October 2026. Implementation, verification and publication records are linked throughout; submission status is recorded in [PUBLISHING.md](PUBLISHING.md).

## Abstract

Single-cell studies of genetically diverse yeast populations require analysis choices to be connected to assay structure, molecular evidence and biological context. YeastVar1011 combines a local browser workbench for study design with a separately configured Linux workflow for initial quality control of supported Illumina single-cell libraries. The workbench links selectable metrics, tools, marker panels, parameters and output specifications to source documentation and publications. Marker records preserve overlapping biological tags and study-specific evidence rather than assigning each gene a single universal state label. The executable workflow validates a fixed cell-barcode/UMI layout, processes libraries with STARsolo and retains tagged alignments, gene-count matrices, splice-junction counts and spliced/unspliced layers. A synthetic Linux integration test exercised FastQC, STARsolo, samtools and MultiQC and checked their actual outputs. The resource connects study design to traceable molecular outputs, providing a reproducible starting point for cell-state annotation and expression-variation analysis.

## Purpose and study representation

YeastVar1011 was developed to organize the analytical decisions needed for single-cell research in *Saccharomyces cerevisiae*, with expression variation as a central use case. Its population context is the 1011-isolate collection; the software name does not denote 1011 yeast species or imply that the collection's unpublished single-cell data are distributed. The public package contains software, reference annotations, attributed marker evidence, literature metadata and synthetic software-test inputs. Source provenance and reuse terms are documented in [DATA_SOURCES.md](../DATA_SOURCES.md).

The workbench represents a study as a versioned plan containing its objective, available input types, selected research directions, processing stages, methods, metrics, marker panels, parameters, dependency edges and requested outputs. Planning can begin with raw FASTQ, tagged alignments or an existing count matrix. Input requirements are reviewed against the selected route, so a matrix-based plan need not include upstream barcode extraction or alignment. These planning routes are distinct from the executable analysis workflow, whose current supported input is the explicit FASTQ layout described below.

The standard workbench exposes six stages: study scope, preparation, annotation, expression variation, extensions and review. Both the standard and optional immersive interfaces edit the same plan state. Selection changes, undo/redo history, saved plans and exports therefore refer to one study rather than independent interface-specific copies. The review stage presents the selected workflow and unresolved input requirements before export.

## Browser implementation and exchange formats

The application uses HTML, CSS and JavaScript with structured JSON catalogues. Large marker records are delivered in shards referenced by a manifest; alternate JavaScript bundles support the local distribution. A Node.js server using built-in modules serves the application on the loopback interface. The ordinary workbench requires no database or scientific runtime. Node.js 22 is the minimum supported server version, with Node.js 24 LTS recommended; detailed setup commands are provided in [DEPLOYMENT.md](DEPLOYMENT.md).

Plans are stored in browser storage for the current origin and can be backed up as JSON. Export facilities include a formatted HTML study plan, spreadsheets, SVG workflow/mind-map views, reference text and CSL citation records. citeproc-js formats bibliographic entries using the bundled APA citation style; KaTeX renders supported mathematical notation; ExcelJS constructs spreadsheet exports. These components are redistributed with their licenses and notices. Bibliographic output depends on the supplied source metadata, and unresolved records remain distinguishable from formatted references.

The interface provides Chinese, English, French, Spanish and Basque language options. The optional Three.js scene presents an illustrative yeast cell and changes the view as the user advances through the study. It begins only after an explicit start action, observes motion preferences and pauses rendering when inactive. Its geometry is an interface illustration, not microscopy or a model fitted to single-cell measurements. Storage controls separately manage appearance preferences, temporary interface state and study data, with explicit confirmation for destructive clearing. The optional AI connection uses a user-configured service; the application does not bundle a trained biological model.

## Marker evidence and annotation planning

Gene identifiers, aliases and functional descriptions are reconciled against Saccharomyces Genome Database records. Gene Ontology terms, relationships and yeast annotations provide a functional layer. Published yeast single-cell studies supply additional state-associated panels, including cell-cycle, stress, nutrient-response, aging and quiescence contexts. For example, Jackson and colleagues provide yeast cell-state and regulatory-network evidence across genotypes and environments [1]. The source inventory, import dates, checksums, original panel labels and available table coordinates are retained in the catalogue manifest and records.

The basic unit of interpretation is a **gene–tag–source relationship**. A gene may belong to several functional or state-associated panels, and the evidence supporting each relationship is kept separately. Functional annotation, periodic RNA expression, differential expression and protein-localization evidence are not interchangeable. Source conditions, contrasts and measurement types accompany the corresponding tag, allowing users to filter evidence and manually include or exclude genes before constructing an annotation panel.

Published mean expression, detection fractions or specificity statistics apply to their original study and contrast. They are not assigned to the new population as observed measurements. Unavailable statistics remain missing. Reanalysis of an existing experiment is identified as such rather than counted as independent replication. A selected panel is an annotation hypothesis to be assessed against the target data through expression, detection, coexpression, state specificity and consistency across biological replicates. The workbench does not treat marker membership alone as a validated cell label.

## Executable FASTQ workflow

The `analysis/` workflow uses Snakemake to coordinate reference validation, FASTQ inspection, FastQC, STARsolo alignment and counting, samtools diagnostics, descriptive matrix QC and MultiQC aggregation. Each library is processed as one counting unit; multiple sequencing lanes from the same library are combined before UMI collapsing. The supported protocol has a dedicated barcode read, one fixed contiguous cell-barcode segment, one fixed contiguous UMI segment and one cDNA read. Barcode and UMI coordinates, read lengths, quality encoding, whitelist, strandedness and reference files are explicit inputs. Unknown or incompatible layouts are rejected before processing.

The supplied configuration does not infer a commercial chemistry from read length. Combinatorial barcodes, barcodes embedded in a cDNA read, paired cDNA reads and non-UMI protocols require another protocol-specific implementation. The Linux execution profile targets x86_64. SLURM submission additionally requires valid institutional account/partition settings and identical input/output paths on submission and compute nodes. A single library alignment runs within one job; it is not distributed across nodes.

Preflight validation checks required configuration, sample/library/lane identities, FASTQ structure, paired read identity, sequence/quality lengths, gzip integrity, barcode and UMI coordinates, and whitelist compatibility. It examines the complete paired input stream and reports read counts, length summaries, N-base counts and Q30 fractions separately for cell barcode, UMI and cDNA. Reference checks inspect contig names and lengths, usable gene annotations, introns, whitelist entries and configured gene groups, and record input hashes. FastQC supplies additional sequence-quality, composition, duplication and overrepresented-sequence diagnostics [2]. Barcode composition and amplification-related duplication require assay-aware interpretation.

STARsolo performs barcode matching, UMI processing, spliced alignment and feature counting using STAR 2.7.11b [3,4]. The workflow preserves the actual command and STAR logs. Alignment intron limits, multimapping behavior, barcode/UMI rules and cell-filter settings are explicit configuration choices. The default `None` cell-filter option retains the raw barcode matrix; optional `TopCells` selection requires an explicit value. A selected barcode is not thereby established to be a biological singlet. The configured maximum cDNA length determines the splice-junction overhang, and reads exceeding that specification are rejected rather than silently using a mismatched index.

## Alignments and retained count layers

The primary alignment output is a coordinate-sorted genomic BAM with its index and retained unmapped records. Requested tags include raw barcode and UMI sequences and qualities (`CR`, `CY`, `UR`, `UY`), corrected identities when assigned (`CB`, `UB`), unique-gene assignments (`GX`, `GN`), alignment multiplicity/scores and splice-junction information. Tag presence is assessed according to read assignment: invalid, unmapped or ambiguous records need not carry every corrected tag. `Gene` is the first counted feature and determines STARsolo's BAM gene-assignment semantics [4].

| Retained output | Interpretation and downstream role |
| --- | --- |
| `Gene` raw matrix | Integer gene UMI counts from transcript-compatible assignments; an untransformed count branch for later expression modeling. |
| `GeneFull` raw matrix | Gene-body counting that admits exonic and intronic overlaps; an alternative feature-assignment branch. |
| `SJ` raw matrix and junction table | Barcode-level junction support and genomic junction context for splicing diagnostics. |
| `Velocyto` spliced, unspliced and ambiguous matrices | Integer layers for assessing whether a later RNA-velocity analysis has sufficient information. |
| Genomic BAM, BAI and logs | Read-level inspection of mapping, clipping, multimapping, tags and candidate loci. |
| Optional projected transcriptome BAM | STAR's transcriptome alignment projection under the configured semantics; not transcript abundance estimation. |

`GeneFull − Gene` is not used as a validated intron-count matrix. Spliced and unspliced counts are not themselves RNA velocities or transcription rates. RNA-velocity inference requires an explicit kinetic model and assessment of the information available for its parameters [5]. In yeast, the available intron signal and its annotation must be examined before choosing such a model. None of these layers establishes evolutionary ancestry.

samtools `quickcheck`, `flagstat`, `stats` and `idxstats` provide complementary BAM integrity, alignment-flag, sequence and contig summaries [6]. Custom summaries count primary mapped alignment records by contig at the library level and, when a corrected barcode is available, at the barcode level. Secondary and supplementary records are excluded from these custom denominators. These read fractions are not UMI fractions or chromosome-copy-number estimates. MultiQC aggregates the supported FastQC, STAR and samtools reports; cell and custom contig tables remain separate outputs [7].

## Descriptive cell and molecular metrics

For barcode \(c\), let \(Y_{gc}\) denote the integer `Gene` count for gene \(g\), and \(N_c=\sum_gY_{gc}\). The workflow reports total Gene UMIs \(N_c\), detected genes \(\sum_g\mathbf{1}(Y_{gc}>0)\), GeneFull totals, and the maximum-gene fraction \(\max_gY_{gc}/N_c\). For a configured gene set \(G\), its fraction is

\[
f_{Gc}=\frac{\sum_{g\in G}Y_{gc}}{N_c}.
\]

Mitochondrial and other gene-group summaries use explicitly supplied contig or gene definitions. An unassessed mitochondrial set is reported as unavailable, rather than as zero mitochondrial RNA. A zero denominator yields `NA`.

Let \(S_c\), \(U_c\) and \(A_c\) denote the sums of spliced, unspliced and ambiguous UMI counts for a barcode. Their totals are retained separately, and the reported unspliced fraction is \(U_c/(S_c+U_c)\), with ambiguous counts excluded from that denominator. For primary mapped alignment records, the fraction assigned to contig \(k\) is \(R_{kc}/\sum_jR_{jc}\); the corresponding library-level ratio uses library totals. Q30 fraction is the number of examined bases with Phred quality at least 30 divided by the number examined in the specified read segment. These are descriptive definitions implemented by the QC code, not new estimators of biological noise or heritability.

The custom QC stage does not discard cells, subtract ambient RNA, correct doublets, normalize or impute the raw matrices. Those decisions remain explicit downstream branches. Retaining the original counts allows different cell-selection and measurement-model assumptions to be compared without replacing the primary molecular evidence.

## Expression-variation use and downstream scope

For expression-variation studies, the study plan distinguishes total population heterogeneity, variation conditional on measured cell state, and mechanistic claims about stochastic regulation. A residual after state adjustment is not automatically intrinsic noise. Analysis units, culture replicates, library effects, mean-expression changes, capture variation and state composition must be defined for the actual experiment. If genetic effects are studied, strain identity and relatedness, population structure and the relevant replicate design are additional inputs; the marker catalogue does not provide those measurements.

The workbench catalogues downstream options including state annotation, enrichment, differential expression, coexpression and regulatory networks, trajectories, RNA velocity, perturbation modeling and genetic analyses. Selecting a method creates a plan item and its requirements; it does not imply that every catalogued algorithm executes within the browser or the initial FASTQ pipeline. Evidence for network causality, molecular kinetics or heritability must come from the selected method, its assumptions and the study data.

## Verification and reproducibility

Nine executable Python tests passed for the analysis implementation, covering malformed inputs, paired FASTQ/gzip integrity, reference and whitelist checks, integer matrix aggregation and a real Snakemake 9.27.0 dry-run. A deterministic fixture supplies artificial reference sequence, annotation, barcode whitelist and paired FASTQs. The [Linux integration run](https://github.com/YueDong0211/YeastVar1011/actions/runs/38997955784) successfully executed FastQC → STARsolo → samtools → MultiQC and verified BAM/BAI, the requested matrix layers, two fixture barcodes and 240 primary alignment records. These counts define a software test case; they are not a biological sample size or benchmark of real-data performance.

Seven environment-check tests passed for setup and doctor behavior, including runtime acceptance, missing files/shards, development prerequisites, invalid arguments and actual port binding. Local startup checks exercised both the PowerShell and POSIX-script routes and received an HTTP response from the server. CI compatibility checks passed for all six combinations of Linux, macOS and Windows with Node.js 22 and 24. Broader browser checks cover plan persistence, navigation, marker selection, export, language switching, reduced motion and scoped storage deletion. These checks assess implementation behavior, not comparative usability or biological accuracy.

Direct workflow versions are recorded in the analysis environment definitions: Python 3.12, Snakemake 9.27.0, SLURM executor 2.8.0, STAR 2.7.11b, samtools 1.24, FastQC 0.13.0 and MultiQC 1.35, with Java 17 for FastQC. A production run should retain the resolved Conda environment, configuration, commands, tool versions, input hashes and output manifest. Direct version constraints are not a complete platform lockfile. Native SLURM execution, analysis of the unpublished 1011-population data, and comparative biological benchmarks were not performed in the verification reported here.

## Code, data and licensing

Source code and release records are available at [YueDong0211/YeastVar1011](https://github.com/YueDong0211/YeastVar1011), with the public workbench at [GitHub Pages](https://yuedong0211.github.io/YeastVar1011/). The public source excludes unpublished sequencing data, local credentials and downloaded full-paper or original supplementary archives. Attributed catalogue facts retain source links. Original code uses MIT; third-party software, fonts, citation styles and source materials retain the component-specific terms described in [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md). Version 21.0.0 is archived at [doi:10.5281/zenodo.23429612](https://doi.org/10.5281/zenodo.23429612); the current registry and package-review records are listed in [PUBLISHING.md](PUBLISHING.md).

## References

1. Jackson, C. A., Castro, D. M., Saldi, G.-A., Bonneau, R., & Gresham, D. (2020). Gene regulatory network reconstruction using single-cell RNA sequencing of barcoded genotypes in diverse environments. *eLife, 9*, e51254. https://doi.org/10.7554/eLife.51254
2. Andrews, S. *FastQC: A quality control tool for high throughput sequence data*. [Official project](https://www.bioinformatics.babraham.ac.uk/projects/fastqc/); [version 0.13.0 source release](https://github.com/s-andrews/FastQC/releases/tag/v0.13.0).
3. Dobin, A., Davis, C. A., Schlesinger, F., Drenkow, J., Zaleski, C., Jha, S., Batut, P., Chaisson, M., & Gingeras, T. R. (2013). STAR: Ultrafast universal RNA-seq aligner. *Bioinformatics, 29*(1), 15–21. https://doi.org/10.1093/bioinformatics/bts635
4. STAR contributors. *STARsolo documentation and parameter definitions, version 2.7.11b*. [STARsolo documentation](https://github.com/alexdobin/STAR/blob/2.7.11b/docs/STARsolo.md); [parameter definitions](https://github.com/alexdobin/STAR/blob/2.7.11b/source/parametersDefault).
5. La Manno, G., et al. (2018). RNA velocity of single cells. *Nature, 560*, 494–498. https://doi.org/10.1038/s41586-018-0414-6
6. Danecek, P., et al. (2021). Twelve years of SAMtools and BCFtools. *GigaScience, 10*(2), giab008. https://doi.org/10.1093/gigascience/giab008
7. Ewels, P., Magnusson, M., Lundin, S., & Käller, M. (2016). MultiQC: Summarize analysis results for multiple tools and samples in a single report. *Bioinformatics, 32*(19), 3047–3048. https://doi.org/10.1093/bioinformatics/btw354

Additional version-specific execution details are linked in [analysis/README.md](../analysis/README.md). The marker source inventory is maintained in [DATA_SOURCES.md](../DATA_SOURCES.md) and the catalogue manifest; this short methods bibliography is not a replacement for citing the original marker studies used in an analysis.

## Editorial evidence record

| Claim | Supporting implementation or record | Interpretation |
| --- | --- | --- |
| Plans share selectable methods, metrics and marker panels | `dist/builder.js`, plan-input and export modules | Implemented software behavior; not evidence of a biological result. |
| Marker labels preserve context and provenance | Marker manifest/shards and `DATA_SOURCES.md` | Reference evidence; target-population specificity remains to be measured. |
| The constrained FASTQ route produces real outputs | Analysis source/tests and linked successful Linux CI | Demonstrated on the deterministic synthetic fixture. |
| Server readiness and startup are checked | `scripts/doctor.cjs`, `scripts/qa-doctor.cjs`, server tests | Environment and transport checks. |


Terminology: **barcode** denotes an observed molecular address until cell identity is established; **cell state** denotes an inferred biological condition; **marker evidence** denotes a source-specific gene association; **count layer** denotes a specified molecular-count definition; **expression variation** denotes a distributional property; **RNA velocity** denotes a model-based derivative; **study plan** denotes an analysis specification, not a completed analysis.

The research-article submission materials, author metadata and evaluation requirements are specified in [PUBLISHING.md](PUBLISHING.md).
