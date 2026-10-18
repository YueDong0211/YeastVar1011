# Annotation markers and functional evidence

Updated 18 October 2026. The marker workspace supports selecting and documenting a single-cell annotation panel. It separates RNA annotation evidence from gene-function annotation and keeps the source study attached to each relationship.

## Browse by the intended use

- **Single-cell annotation candidates** is the default entry. Select author annotation panels, reported subgroup candidates, differential RNA associations, single-cell coexpression modules, heterogeneity examples, or RNA reference sets. A differential or high-variability gene is a candidate for review, not an automatically validated state marker.
- **Yeast functional annotation** contains GO, curated functions, regulatory relationships and protein-localization evidence. These records help interpret a selected gene or programme.
- **All evidence** also retains mechanistic bulk RNA references, normalization references and other evidence outside the annotation-candidate view.

The current catalogue contains 5,150 gene records and 28,347 evidence relationships. The annotation view contains 4,262 genes with at least one eligible relationship; the functional view contains 4,914 genes. These overlapping sets are not counts of universally validated markers. Author annotation panels involve 142 unique genes; selecting a source or state narrows this further. The 49 registered sources include supplementary tables and sources held for review, rather than 49 independent validated studies.

## Select a panel

1. Choose the annotation entry and evidence purpose.
2. Search a gene name, systematic ORF, SGD identifier or alias. Exact-identity search accepts multiple identifiers and keeps ambiguous aliases visible.
3. Filter by source, condition, dataset and RNA phase. These requirements must be supported by the same evidence record. Tag intersections and unions operate at gene level and may combine records from different studies.
4. Open a tag to inspect the relation, assay, condition, strain, dataset, source table and original row. The card's phase refers to the matching evidence; a phase from another paper is not borrowed to fill a missing phase.
5. Add the gene to the panel and assign its intended use. Filtering does not discard selected genes. Use the panel preview to compare source RNA phases with functional evidence and user-defined assignments.

Project-specific mean expression, detection, rank and specificity remain empty until a suitable matrix is supplied. Published statistics keep their original comparison and units.

## Evidence additions and corrections

Gasch et al. (2017), Supplementary Table S3, contributes 61 author-panel relationships. The source explicitly assigns 33 relationships to RNA phases: M/G1 (11), G1 (7), and S (15). Its CLN2-associated DNA-replication group is not assigned an extra G1/S label. [Article and supplementary tables](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.2004050).

Urbonaite et al. (2021) contributes 116 mapped SC3 subgroup-marker relationships and 698 differential RNA relationships. Seven source rows with invalid suffixed identifiers remain unresolved. The source mean/SD/CV table is retained for investigation; its unresolved denominator prevents import into expression-ranking displays. [Article and supplementary data](https://www.nature.com/articles/s42003-021-02320-w).

Together, these imports add 875 relationships across 377 genes, including 12 previously absent SGD-mapped identities. The source manifest preserves original table identifiers, row numbers and hashes. [Source manifest](../research/v25-marker-manifest.json).

Existing metadata was completed for 859 Gasch S8 relationships and 4,155 Shabestary relationships. Gasch's condition, strain and dataset describe the 2017 evaluation context of previously defined gene sets. Shabestary's glutamine and proline comparisons use the reanalysed single-cell dataset GSE125162; G1/G2 and P1/P2 are subgroup names, not cycle phases. [Shabestary et al. (2024)](https://www.nature.com/articles/s41467-024-50602-8).

The 1,000 mapped Jariani Supplementary file 1 relationships are classified as differential candidates. The official table compares clusters 3 and 4 in the lag-3h sample. It contains 1,001 rows, including one source identifier not uniquely mapped in the catalogue. Original statistics remain unchanged. [Official supplementary-file definition](https://elifesciences.org/articles/55320/figures).

## Literature coverage and verification

The working window now spans 2010–2026, with earlier classics retained. Literature discovery, full-text review and gene-level table extraction are separate statuses. Search hits do not become marker records automatically. See the [reproducible search register](LITERATURE_SEARCH_V25.md) and [methods coverage review](RESEARCH_COVERAGE_V25.md).

Source-row checks, identity checks, evidence-purpose checks, phase isolation, same-record filters, tag algebra, five-language controls and offline catalogue round trips are covered by the repository checks. Statistical methods are documented recipes; this workstation does not claim to have executed them on the user's biological data.

## v25b source-context update

The catalogue adds 22 RNA observations across 21 existing genes, separately from 21 mitochondrial QC feature memberships. Fourteen new identities belong to the QC set. The 200 explicit tag-family mappings retain source conditions: NaCl, starvation and mycophenolic-acid labels are navigable, while DMSO controls remain unassigned to stress. Histone-cluster panels retain coexpression membership without assigning histone protein function to every member. Source figure/paragraph locations, detection lower bounds and their populations are shown in the evidence details.

Structured CSV/TSV import reads only named gene-identity columns, reports conflicts and invalidates stale previews. Plan notes retain the supported 5,000 characters; full backups include disabled DIY formulas. Matrix-only QC no longer inherits a global empty-droplet requirement; selecting DropletUtils or SoupX still requires their original inputs.


## v25c: source assertions and continuous state association

The catalogue now retains 5,275 SGD-resolved gene records and 30,056 source-relation occurrences (30,051 unique assertion IDs), across 50 registered source entries. Counts describe reference coverage, not independently validated state classifiers.

- **Continuous RNA associations** have a separate annotation-use filter. Wang 2022 within-age RNA–generation associations retain the original sampling group, R and unadjusted P. Positive/negative association is distinct from differential-expression direction.
- **Functional evidence** remains a separate layer. The new identities contribute 808 specific GO-slim assertions; 118 ontology-root mappings retain metadata only. The functional selector offers independent GO-slim BP/MF/CC branches, with source-row popups and GO links. Full GAF evidence codes remain restricted to GAF records.
- **Individual evidence selection** persists stable assertion IDs and unresolved IDs. An explicitly empty selection remains empty; older source-level plans retain their behavior. Exported JSON, HTML and XLSX distinguish selected assertions from the complete reference record. Only selected assertions contribute marker citations.
- **Evidence filters** require one record to support the selected source, evidence type, grade, condition and GO term. The displayed card grade follows those matching records. Tag unions/intersections remain gene-level combinations and may draw on multiple sources.
- **Data preservation** was checked against the preceding 28,347 occurrences. All existing evidence was retained, including five exact duplicate occurrences with shared stable assertion IDs. The 29 unresolved rows in the new source extraction were not imported.

Primary sources: [Wang et al., 2022](https://doi.org/10.1111/acel.13712), [Nadal-Ribelles et al., 2019](https://doi.org/10.1038/s41564-018-0346-9), and [SGD GO-slim mapping](https://downloads.yeastgenome.org/curation/literature/go_slim_mapping.tab). Source files and row locators are recorded with the assertions; the public release distributes attributed facts and provenance, not archived papers or supplementary workbooks.
