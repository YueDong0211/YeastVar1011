# YeastVar1011 · Raw FASTQ QC workflow

An executable first analysis stage for Illumina single-cell libraries with a **dedicated barcode read, one fixed-length cell barcode, one fixed-length UMI, and one cDNA read**. The workflow produces an auditable QC report, tagged coordinate-sorted BAM and integer expression layers for subsequent cell selection and expression-noise analysis.

The supplied configuration deliberately leaves assay-specific fields empty. It does not assume 10x chemistry, read order, barcode length, strand, strain reference or mitochondrial chromosome names. Combinatorial barcodes, an embedded barcode within a cDNA mate, paired cDNA reads and non-UMI assays require a separate protocol-specific implementation.

## Start on Linux

Requirements: Linux x86_64, a working Conda installation, and sufficient storage for a STAR index, BAM and raw matrices. Python is pinned to 3.12. Use Miniforge or an institution-provided Conda installation. Snakemake requires the **conda command** to create rule environments; a standalone micromamba executable is insufficient for this launcher.

```bash
cd analysis
conda env create -f environment.yaml
conda activate yv-qc
bash run.sh init
```

Fill `config.yaml` and `samples.tsv`, then:

```bash
bash run.sh check
bash run.sh check --inspect-reference
bash run.sh dry-run --cores 8
bash run.sh envs
bash run.sh local --cores 8
```

`init` preserves existing files. `check` validates the configuration and input paths; `--inspect-reference` additionally reads the FASTA, GTF, whitelist and optional gene groups. Full paired FASTQ integrity checks are separate workflow jobs and finish before alignment. `dry-run` resolves the real Snakemake job graph without running analysis. `envs` creates the pinned rule environment before processing. The core count is a scheduling example, not a recommended biological parameter.

All relative paths are resolved from `analysis/`, including paths in an alternate configuration. Set `YV_CONFIG=/absolute/path/to/run.yaml` to use another configuration. Use a different `output_dir` for each protocol/reference/analysis branch. Inputs must remain outside that output directory.

For a cluster without outbound access, create rule environments on an approved connected node using `envs`, then retain `.snakemake/conda/` on shared storage. Do not rebuild environments on every compute node. A Conda YAML pins direct tools; it is not a complete platform-specific dependency lock. Preserve `conda list --explicit` from the controller and each resolved rule environment with the project when freezing a production run.

## Required configuration

| Field | Purpose |
|---|---|
| `protocol.name`, `layout`, `barcode_orientation`, `quality_encoding` | Document the actual chemistry and confirm the supported layout, orientation and Phred+33 encoding. |
| `cb_start`, `cb_length`, `umi_start`, `umi_length`, `barcode_read_length` | One-based CB/UMI coordinates and exact barcode-read length. Intervals must not overlap. STAR 2.7.11b supports CB ≤31 and UMI ≤16 bases in this mode. |
| `strand` | `Forward`, `Reverse` or `Unstranded`, justified by the protocol. |
| `whitelist`, `cb_match`, `umi_dedup`, `umi_filter` | Explicit barcode correction and UMI collapsing choices. The whitelist contains unsuffixed A/C/G/T sequences, one per line. The `MultiGeneUMI_CR` filter requires `1MM_CR` deduplication. |
| `reference.fasta`, `gtf`, `source` | Matching FASTA/GTF and assembly/annotation provenance. GTF exons require `gene_id`, `transcript_id` and strand. No automatic reference substitution across the 1011 backgrounds. |
| `sjdb_overhang` | Set to the maximum sequenced cDNA length minus one, following STAR documentation. Reads longer than the declared value are rejected during FASTQ validation. |
| `mitochondrial_contigs` | Exact FASTA contig IDs. `[]` explicitly leaves mitochondrial UMI QC unassessed (`NA`), rather than silently reporting zero. |
| `alignment.intron_min`, `intron_max`, `multimappers_max` | Explicit alignment choices appropriate to the reference and study. No mammalian intron-length preset is imposed. |
| `alignment.cell_filter` | `[None]` preserves raw barcode matrices. `[TopCells, N]` is an optional explicit count-based selection; it is not proof that those barcodes are singlets. |
| `gene_groups` | Optional named gene-ID files, for example rRNA or ribosomal-protein genes. Only listed and validated groups generate QC fractions. |
| `resources` | Threads, total memory and runtime per job. These are editable scheduling examples. Half of the STAR job's stated memory is allocated to BAM sorting, leaving the other half for alignment/counting; increase the total allocation if the data require it. |

`samples.tsv` has one row per library/lane, with `cdna_fastq` and `barcode_fastq` assigned by **function**, not inferred from R1/R2 filenames. Lanes from one library are counted together so UMI collapsing occurs once. Different libraries never share a barcode identity: exported IDs are `library_id:barcode`. Library metadata must match across its lanes. `UNKNOWN` may be used for unknown strain/condition/replicate/batch information; this does not create a valid biological replication design. A pooled library's background label is not a per-cell genotype assignment.

FASTQs may be `.fastq`, `.fq`, `.fastq.gz` or `.fq.gz`. A library must use one compression convention consistently. Inputs are neither trimmed nor deleted. The full FASTQ check validates gzip integrity, read counts, mate-name synchronization, record structure, sequence/quality lengths, barcode length and cDNA length. It reports raw CB/UMI/cDNA Q30 numerator and denominator counts, N bases, exact whitelist matches and SHA-256 file hashes. Q30 is the conventional Phred quality descriptor, not a cell exclusion threshold.

## SLURM execution

Edit `profiles/slurm/config.yaml` with an account and partition accepted by the institution. If the cluster forbids account selection, remove `slurm_account` and set `slurm-no-account: true`. The launcher rejects unresolved placeholders.

```bash
bash run.sh envs
bash run.sh slurm --jobs 20
```

The workflow directory, input files, output directory and Conda environment cache must be accessible at the **same paths on submission and compute nodes**. Keep the Snakemake controller running in a persistent terminal or scheduler allocation according to local policy. Each STAR library is one SLURM job; it does not distribute a single alignment across nodes. `jobs` limits concurrent jobs, while rule `threads`, `mem_mb` and `runtime` determine each job's request. Runtime values are minutes. No fixed institutional account or partition is embedded.

Native Windows runs the website and configuration/unit checks; STAR processing is a Linux task. On Windows use a Linux workstation, approved WSL2 environment or cluster. This package does not install WSL or obtain cluster credentials. ARM/macOS tool availability is not asserted by the x86_64 execution profile.

## Workflow and retained evidence

```text
config + samples
  ├─ reference/whitelist/gene-group validation → STAR genome index
  ├─ complete paired FASTQ integrity + CB/UMI quality audit
  └─ FastQC for each lane and read role
       ↓
STARsolo per library (all lanes together)
  ├─ coordinate-sorted genomic BAM + unmapped records + requested tags
  ├─ Gene / GeneFull / SJ raw matrices
  ├─ Velocyto spliced / unspliced / ambiguous raw matrices
  └─ STAR logs, read-per-barcode statistics and splice junction table
       ↓
samtools QC + chromosome fractions + integer matrix QC
       ↓
MultiQC HTML + per-barcode TSV + versions/commands/input hashes
```

| Output | Metrics or evidence | Use |
|---|---|---|
| `preflight/LIB/LANE.json` | Complete read-pair count, CB/UMI/cDNA Q30 and N-base counts, lengths, whitelist exact-match count, file hashes | Detect broken pairs, wrong read layout, mismatched whitelist and changed inputs. |
| `fastqc/LIB/LANE/ROLE/` | Per-base/read quality, GC/N content, lengths, sequence duplication, overrepresented sequences, adapter/poly(A)/poly(G) screening as implemented in the pinned FastQC release | Raw read diagnostics. Barcode-read sequence bias and transcript duplication require protocol-aware interpretation. |
| `reference/validation.json` | Contig lengths, usable genes, annotated intron counts/range, whitelist count, reference hashes, derived index parameter | Check annotation compatibility and preserve reference provenance. |
| `star/LIB/Aligned.sortedByCoord.out.bam` and `.bai` | Original cDNA alignments, retained unmapped records, alignment multiplicity, barcode/UMI sequence and quality tags | Reinspect alignment, locus assignment and molecular support without relying only on matrices. |
| `star/LIB/Log.final.out`, `Log.out`, `Log.progress.out`, `command.json` | Input/mapped/unmapped reads, mismatches, splice/multimapping summaries and actual command | Audit and compare library-level measurement quality. |
| `star/LIB/SJ.out.tab`, `Solo.out/SJ/raw/` | Splice junction support and barcode-by-junction counts | Splicing diagnostics; retain genomic coordinates and strand/motif context. |
| `Solo.out/Gene/raw/` | Integer unique-gene UMI counts for transcript-compatible reads | Primary untransformed count branch for later noise modeling. |
| `Solo.out/GeneFull/raw/` | Gene-body counts admitting exonic and intronic overlaps | Alternative counting branch. **GeneFull − Gene is not a validated intron matrix.** |
| `Solo.out/Velocyto/raw/` | Integer spliced, unspliced and ambiguous layers | Assess information available for later RNA velocity models. These counts are not velocities, rates or evolutionary trajectories. |
| `Solo.out/*/CellReads.stats`, feature summary files where emitted by STAR | Read assignment and barcode diagnostics | Preserve STAR's native definitions; not every feature emits every statistic. |
| `bam_qc/LIB/flagstat.txt`, `stats.txt`, `idxstats.tsv`, `quickcheck.log` | Alignment flags, mapped/unmapped records, clipping/base/length metrics, per-contig segment totals, header/EOF integrity | BAM diagnostics. `idxstats` can count multiple alignments of a read; it is not a UMI count. |
| `bam_qc/LIB/chromosome_proportions.tsv` | Contig counts divided by all primary mapped alignment records | Compare mapping allocation without secondary/supplementary alignment double counting. This is not chromosome copy number. |
| `bam_qc/LIB/barcode_chromosome_counts.tsv.gz` | Primary mapped read counts and per-barcode contig fractions for corrected CB tags | Retain a cell-resolved alignment-composition layer. |
| `bam_qc/LIB/bam_metrics.json` | Mapped/unique-locus/spliced/soft-clipped primary records, requested-tag presence on primary mapped records | Separate missing-tag diagnostics from expected unassigned reads. |
| `cells/LIB.qc.tsv.gz` | Gene UMIs, detected genes, GeneFull UMIs, top-gene fraction, mitochondrial and configured gene-group UMIs/fractions; spliced/unspliced/ambiguous totals | Compare raw barcode expression distributions before cell selection. Only barcodes with a nonzero reported layer are tabulated; all whitelist columns remain in the raw matrices. |
| `multiqc/multiqc_report.html` | Aggregated supported FastQC/STAR/samtools reports | Library-level overview. Custom cell/contig TSVs remain separate downloadable outputs. |
| `run_manifest.json`, `benchmarks/LIB.star.tsv` | Resolved configuration, exact commands/tool versions and observed STAR resource use | Reproducibility and cluster resource adjustment. |

Requested BAM tags: `NH HI AS nM NM MD jM jI CR CY UR UY CB UB GX GN sS sQ sM sF`. The raw tags retain CB/UMI sequence and quality; `CB/UB` retain corrected identities when assigned; `GX/GN` identify unique-gene assignments. Sorting is required for corrected tags in STARsolo. A tag is not guaranteed to be present on every unmapped, invalid-barcode or ambiguous read. The first counted feature is `Gene`, which determines STARsolo BAM assignment semantics.

An optional `transcriptome_bam: true` requests STAR's projected transcriptome BAM with `BanSingleEnd_ExtendSoftclip` semantics. It is an alignment projection, not isoform abundance estimation. The primary output is always the genomic BAM. CAGE/TSS maps, poly(A)-site usage, full-length isoforms, allele-specific expression and robust velocity may require additional assay structure or reference information; they are not inferred merely because a BAM exists.

No cells are discarded by custom QC code. No doublet correction, ambient-RNA subtraction, normalization, imputation, expression-noise fitting, cell-state annotation or QTL inference is run at this stage. Preserve the original matrices for those separately documented branches. Small spliced/unspliced signals in yeast require evaluation of gene coverage, intron annotation and model identifiability before velocity analysis.

## Formulas and units

- Q30 fraction = bases with Phred score ≥30 / bases examined, reported separately for CB, UMI and cDNA.
- Gene-group fraction = Gene-matrix UMIs assigned to the configured gene group / total Gene-matrix UMIs.
- Top-gene fraction = largest single-gene Gene-matrix UMI count / total Gene-matrix UMIs.
- Unspliced fraction = unspliced UMIs / (spliced + unspliced UMIs); ambiguous UMIs are reported separately and excluded from this denominator.
- Chromosome read fraction = primary mapped alignment records on a contig / all primary mapped alignment records, either per library or per barcode as labeled.

Zero denominators and unassessed mitochondrial sets produce `NA`. These are descriptive ratios defined by their numerator and denominator; they are not estimates of transcription rate or genetic heritability. Integer UMI counts remain separate from read counts. STAR's small-genome index setting is derived using its documented `min(14, floor(log2(genome_bases)/2 − 1))` rule, bounded below by one for the synthetic fixture.

## Reproducible software checks

```bash
bash run.sh test
python tests/make_fixture.py --output /tmp/yv-qc-synthetic
YV_CONFIG=/tmp/yv-qc-synthetic/config.yaml bash run.sh dry-run --cores 2
YV_CONFIG=/tmp/yv-qc-synthetic/config.yaml bash run.sh local --cores 2
python tests/assert_e2e.py --results results-synthetic-test
```

The fixture directory must be new. The deterministic test contains artificial reference sequence, annotation, whitelist and paired FASTQs; it does not contain or simulate the biological conclusions of the 1011 collection. Unit tests exercise malformed input, pairing/gzip integrity, whitelist/reference consistency, integer matrix calculations and a real Snakemake dry-run. The final command checks actual STAR/samtools/FastQC/MultiQC products after Linux execution. Passing a dry-run alone does not establish binary execution, SLURM integration or biological validity.

## Official sources and pinned tools

Verified against upstream documentation and release/package metadata on 17 October 2026. Direct versions: Python 3.12; Snakemake 9.27.0; SLURM executor 2.8.0; STAR 2.7.11b; samtools 1.24; FastQC 0.13.0; MultiQC 1.35. Java 17 is included for FastQC.

- [STARsolo 2.7.11b documentation](https://github.com/alexdobin/STAR/blob/2.7.11b/docs/STARsolo.md): read order, barcode/UMI counting, matrix layers and tags.
- [STAR 2.7.11b parameter definitions](https://github.com/alexdobin/STAR/blob/2.7.11b/source/parametersDefault): alignment, indexing, tag definitions, memory and cell-filter parameters.
- [STARsolo parameter validation source](https://github.com/alexdobin/STAR/blob/2.7.11b/source/ParametersSolo.cpp): CB/UMI limits, tag requirements and supported option combinations.
- [STARsolo matrix output source](https://github.com/alexdobin/STAR/blob/2.7.11b/source/SoloFeature_outputResults.cpp): raw metadata and velocity-layer filenames.
- [FastQC 0.13.0 release](https://github.com/s-andrews/FastQC/releases/tag/v0.13.0) and [official project](https://www.bioinformatics.babraham.ac.uk/projects/fastqc/): raw QC and runtime requirements.
- [samtools documentation](https://www.htslib.org/doc/samtools.html), [flagstat](https://www.htslib.org/doc/samtools-flagstat.html), [stats](https://www.htslib.org/doc/samtools-stats.html), [idxstats](https://www.htslib.org/doc/samtools-idxstats.html): BAM metrics and counting units.
- [MultiQC execution documentation](https://docs.seqera.io/multiqc/getting_started/running_multiqc) and [releases](https://github.com/MultiQC/MultiQC/releases): report aggregation.
- [Snakemake CLI and profiles](https://snakemake.readthedocs.io/en/stable/executing/cli.html) and [SLURM executor documentation](https://snakemake.github.io/snakemake-plugin-catalog/plugins/executor/slurm.html): Conda deployment, resources and scheduler mapping.
- [Bioconda package records](https://anaconda.org/bioconda/repo): availability of the pinned Linux workflow tools. Installation and an actual synthetic run must still be checked on the target platform.

Method references: Dobin et al. (2013), *STAR: ultrafast universal RNA-seq aligner*, [doi:10.1093/bioinformatics/bts635](https://doi.org/10.1093/bioinformatics/bts635); La Manno et al. (2018), *RNA velocity of single cells*, [doi:10.1038/s41586-018-0414-6](https://doi.org/10.1038/s41586-018-0414-6); Danecek et al. (2021), *Twelve years of SAMtools and BCFtools*, [doi:10.1093/gigascience/giab008](https://doi.org/10.1093/gigascience/giab008); Ewels et al. (2016), *MultiQC: summarize analysis results for multiple tools and samples in a single report*, [doi:10.1093/bioinformatics/btw354](https://doi.org/10.1093/bioinformatics/btw354).
