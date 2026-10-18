# Scientific data and catalogue sources

YeastVar1011 is a research-plan workbench. Its shipped scientific catalogues contain reference annotations, literature metadata, source-attributed marker memberships and published statistics, and original explanations of analysis options. They do not contain the user's unpublished 1011-isolate single-cell FASTQ files, BAM files, count matrices, genotypes, or sample-level results.

## Where provenance is recorded

The marker manifest is [dist/data/markers.json](dist/data/markers.json). It records the sharded catalogue, source references, source panels and states, release history, interpretation rules, and import provenance. Individual records in the referenced marker shards retain source IDs, biological context, evidence type, and source-table information where available. The offline JavaScript bundles are alternate delivery formats for the same catalogue, not independent datasets.

The literature catalogue is [dist/data/literature.json](dist/data/literature.json); citation metadata are also supplied in `dist/citation-data.js`. These contain bibliographic information, links, and short editorial descriptions rather than copies of article abstracts or full papers. Tool and method entries link to their original publications and documentation. Publication dates, software suitability, and catalogue annotations are versioned reference information; consult the linked source for revisions.

## Foundational annotation sources

| Source | Material used and transformation | Attribution and terms |
| --- | --- | --- |
| [Saccharomyces Genome Database](https://www.yeastgenome.org/) | Systematic and standard gene identifiers, aliases, gene descriptions, feature classifications, and GO-slim mappings; identifiers are reconciled and displayed as searchable annotation fields | SGD curators and contributors; [SGD data availability statement](https://pmc.ncbi.nlm.nih.gov/articles/PMC10158836/) specifies [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Source files: [SGD_features.tab](https://downloads.yeastgenome.org/curation/chromosomal_feature/SGD_features.tab) and [go_slim_mapping.tab](https://downloads.yeastgenome.org/curation/literature/go_slim_mapping.tab). |
| [Gene Ontology Consortium](https://geneontology.org/) and SGD GO annotations | GO term labels, ontology relationships, and yeast annotations support functional tags; ontology and annotation records are transformed into a searchable catalogue, with source evidence retained where available | [GO citation and reuse policy](https://www.geneontology.org/docs/go-citation-policy/), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Source files: [sgd.gaf.gz](https://current.geneontology.org/annotations/sgd.gaf.gz), [go-basic.obo](https://purl.obolibrary.org/obo/go/go-basic.obo). |

The marker manifest records the actual retrieval date, release headers, and checksums used for these imports. The linked live endpoints may later change. Functional ontology membership is presented as functional evidence, not as proof that a gene uniquely identifies a cell state. Negated GO annotations are not promoted to positive marker evidence.

## Principal marker and state references

The following table describes major imported source groups. The manifest and per-marker source records provide the complete catalogue-level inventory and the corresponding supplemental-table references.

| Reference | Role in the catalogue | Context retained |
| --- | --- | --- |
| [Spellman et al. (1998)](https://pmc.ncbi.nlm.nih.gov/articles/PMC25624/) | Classical periodically expressed cell-cycle genes | Periodic RNA expression and reported phase assignment; a cell-cycle reference is not a universal classification of every condition |
| [Gasch et al. (2017)](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.2004050) | Environmental stress, ribosome-biogenesis, and ribosomal-protein programmes | Author-defined gene sets and their experimental context |
| [Jackson et al. (2020)](https://elifesciences.org/articles/51254) | Yeast single-cell states, genotype/environment context, and cell-cycle annotation | Original source panels and experimental conditions |
| [Jariani et al. (2020)](https://elifesciences.org/articles/55320) | Stress adaptation, lag-associated expression, and trajectory-associated modules | Specific time points, contrasts, and branches; trajectory labels are source-specific |
| [Dohn et al. (2022)](https://pmc.ncbi.nlm.nih.gov/articles/PMC8779198/) | mDrop-seq yeast state and stress references | Named *S. cerevisiae* programmes; no conversion of another species' markers into yeast markers |
| [Nadal-Ribelles et al. (2019)](https://doi.org/10.1038/s41564-018-0346-9) | Six explicitly illustrated metabolic-heterogeneity genes | Figure S4a in the supplement; BY4741 in YPD, 127 source cells. These are heterogeneity examples, not a complete state-classification panel. |
| [Wang et al. (2022)](https://doi.org/10.1111/acel.13712) | Aging-associated variable genes, slow/fast growth contrasts, and within-age RNA–generation associations | Supplementary S5 Sheets 3/4 retain original R, unadjusted P values, row identities and positive/negative association direction; sampling hours and completed division generations are separate variables |
| [Su et al. (2023)](https://doi.org/10.1186/s12864-023-09184-w) | Complete author-selected S4/S5 amino-acid and glucose-starvation differential-RNA panels | Original rows, source statistics, higher/lower directions, spheroplast context and the source's inconsistent prose selection criteria; CC BY 4.0 |
| [Brettner et al. (2024)](https://doi.org/10.1002/yea.3927) | Eight explicitly named daughter-cell and late-G1/early-S associations | Source cluster and assay context; this is a named-gene excerpt, not the complete supplementary cluster table |
| [Greenlaw et al. (2024)](https://doi.org/10.1093/nar/gkad1147) | Quiescence-associated RNA stabilization/degradation | Bulk metabolic-labelling evidence is labelled as supporting evidence rather than validated single-cell marker specificity |
| [Shabestary et al. (2024)](https://www.nature.com/articles/s41467-024-50602-8) | Nutrient-associated RNA states and transcription-factor localization evidence | RNA and protein-localization evidence remain distinct. Reanalysis of Jackson's data is identified as reanalysis, not independent replication; source G1/G2 group labels are not silently reinterpreted as cell-cycle phases |
| [Baquero Pérez et al. (2025)](https://doi.org/10.1101/gr.279874.124) | Seven explicitly named RNA observations in the source's high-density quiescent population | W303 background, six-day nutrient exhaustion, E-MTAB-14980; Figure 3C and the source Results paragraph. Reported detection lower bounds remain population-specific source observations. The broader chromatin-defined Class I set is not imported as a single-cell annotation panel. Article source material retains CC BY-NC 4.0 terms and is excluded from the public package. |
| [Nadal-Ribelles et al. (2025), stress adaptation](https://www.nature.com/articles/s41467-025-57911-6) | Stress-response signatures and state-associated marker statistics | Author-defined conditions, clusters, and contrasts |
| [Nadal-Ribelles et al. (2025), perturbation map](https://www.nature.com/articles/s41467-025-57600-4) | Control/NaCl state markers and author-defined perturbation panels | Original fold-change, detection-fraction, significance, and panel information where supplied; [associated data repository](https://doi.org/10.5281/zenodo.14062629) |
| [Hotz et al. (2026)](https://pmc.ncbi.nlm.nih.gov/articles/PMC12993945/) | Aging coexpression modules and associated differential-expression statistics | Published module membership and contrast information, without reproducing the article's figures or prose |

Source-specific rights remain in place. eLife and PLOS source pages provide their open-access license notices. The two linked 2025 Nature Communications articles provide CC BY 4.0 notices. The Greenlaw article is published under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/), and the Hotz article under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/). The project's MIT license does not override those terms. The workbench reports attributed scientific facts, identifiers, memberships, and statistics alongside original curation; it does not distribute those articles or claim to relicense their tables as MIT. Reuse of publication text, figures, original supplementary documents, or protected source compilations must follow the terms attached to that material. A link or DOI is not a new license grant.

## Transformations and interpretation

The catalogue normalizes identifiers, groups source panels under searchable tags, and separates evidence classes such as cell-cycle phase, stress response, quiescence, aging, RNA association, protein localization, and functional annotation. A gene may carry several tags. A source's original group label, condition, measurement type, and reported numerical fields remain the basis for interpreting that record.

Published expression statistics describe the original study and contrast. They are not baseline expression estimates for the user's population. Missing mean expression, detection rate, specificity, or validation values remain unavailable rather than being filled with inferred measurements. Reference marker membership supports panel selection; validating that panel in a new matrix is a separate analysis. Bibliographic duplication or reuse of the same underlying experiment does not create additional independent evidence.

The public source release excludes archived full-paper HTML/PDF files, downloaded original supplementary workbooks, unpublished data, local browser stores, private deployment configuration, and development caches. Source links and structured provenance remain available so researchers can obtain original materials from the publisher or data repository.

## Continuous associations and assertion-level selection

The v25c marker snapshot contains 5,275 gene records, 30,056 source-relation occurrences, 30,051 unique assertion IDs, and 50 registered source entries. Source entries may identify separate tables from the same paper; these totals are not counts of validated classifiers or independent studies. All 28,347 preceding evidence occurrences are retained. Five exact duplicate historical assertions share their stable ID while retaining their original occurrences.

The update adds 895 within-age RNA–generation associations from Wang et al. and six metabolic-heterogeneity examples from Nadal-Ribelles et al. It adds 125 SGD-resolved gene identities, with 808 specific GO-slim assertions. A further 118 ontology-root mappings retain aspect metadata but create no specific function or marker assertion. The 29 unresolved source rows are excluded from this import, including one source gene-ID/symbol conflict. Source-R and P fields are preserved at their reported precision; the import adds no FDR or correlation-method claim that the source did not specify.

Continuous association is a separate annotation-purpose filter. Positive/negative correlation is distinct from higher/lower expression in a contrast. The same gene may have opposite associations across sampling groups. Source filtering and condition filtering must match the same assertion; tag unions and intersections are explicitly gene-level combinations.

Plans can select individual stable evidence IDs. An omitted evidence-ID field preserves legacy source-level selection; an explicit empty list selects no assertions. Unresolved IDs remain visible for review. Exports retain source records while marking selection explicitly, and selected-evidence citations exclude unselected assertions. Project expression means, detection rates, ranks and specificity remain unmeasured until project data are supplied.

## Population context and future integration

The research context includes the 1011 *S. cerevisiae* collection and the associated population genomics, transcriptomics, proteomics, and long-read studies listed by the [Haplo team](https://www.haploteam.org/papers/). These references establish the project background. The application does not imply that all associated measurements are bundled, that population genotypes can be inferred from a reference marker label, or that unpublished single-cell data have been released.

For corrections, use the repository issue tracker and include the affected gene or source ID, the original publication/table, and the proposed correction. Preserve provenance when exporting or extending a marker panel, and cite the original biological studies and analysis tools used in an actual analysis.
