# Research and marker evidence update — v22

Reviewed on 17 October 2026. This release extends the research-plan catalogue; adding a tool does not run it on the user's sequencing data.

## Expression-noise research extensions

| Added direction | Method and source | Required information and interpretation |
| --- | --- | --- |
| Ty and other repetitive-element RNA variability | [IRescue](https://doi.org/10.1093/nar/gkae793) | Tagged BAM, retained multimapping candidates, matching yeast repeat annotation and cell barcodes. Store ambiguity and fractional allocation separately from integer gene UMI counts. TE RNA does not measure DNA insertion events. |
| Shared and state-specific between-strain variance | [CTMM](https://doi.org/10.1038/s41467-024-49242-9) | State-specific sample means, their sampling variances, sample identity and covariates. Analyse relatedness explicitly when adapting the model to the 1011 collection. Between-strain mean variation is a different estimand from within-strain cell-to-cell noise. |
| Programmes coordinated across cell states within a culture | [DIALOGUE](https://doi.org/10.1038/s41587-022-01288-0) | Matched states within independent cultures or samples, adequate representation and held-out samples. The proposed yeast adaptation evaluates cross-state programme coordination; it does not establish cell communication. |
| RNA velocity modules and uncertainty | [cell2fate](https://doi.org/10.1038/s41592-025-02608-3) | Supported spliced/unspliced layers, appropriate genes and state coverage. Assess sparse yeast intron information, posterior uncertainty and stability before biological interpretation. |
| Binding, perturbation and expression evidence in GRNs | [Mahendrawada et al., 2025](https://doi.org/10.1038/s41586-025-08916-0) | Keep binding, functional response and coexpression as distinct edge evidence; use prior removal and held-out validation. Public regulatory evidence is an external prior, not a measurement in the user's cells. |
| Count-based mean-eQTL comparison | [jaxQTL preprint](https://doi.org/10.1101/2025.01.18.25320755) | Requires genotype and sample design. Compare mean-QTL and noise-QTL with appropriate offsets, kinship and calibration; this is an optional genetics extension. |
| Mechanism-based noise and network benchmarks | [Harissa](https://doi.org/10.1007/978-3-031-42697-1_7), [CARDAMOM](https://doi.org/10.1371/journal.pcbi.1010962) | Simulate known bursting/network mechanisms and the measurement layer; evaluate recovered noise and false network edges against the simulated truth. Simulation evaluates a method, not a biological discovery. |
| Temporal GRNs and virtual interventions | [CardamomOT](https://doi.org/10.1371/journal.pcbi.1014838) | Requires actual sampling times and protein kinetic priors, with yeast-specific sensitivity analysis. Pseudotime alone does not supply the exact time labels required by this method. |

The catalogue now contains **153 tools, 279 metrics, 51 research directions and 209 literature records**. These counts come from the integrated JSON catalogues. All earlier marker evidence was retained.

## Added marker evidence

There are **5,124 SGD gene records and 42 marker source records**, including **497 new gene–context evidence relationships involving 465 genes**. Thirty-four gene identities are new to this catalogue. A source record can represent a table or panel within a paper; source-record counts are not paper counts.

| Source panel | Imported membership |
| --- | --- |
| Su 2023 amino-acid starvation, higher RNA | 272 genes |
| Su 2023 amino-acid starvation, lower RNA | 137 genes |
| Su 2023 glucose starvation, higher RNA | 27 genes |
| Su 2023 glucose starvation, lower RNA | 53 genes |
| Brettner 2024 newly divided daughter-cell association | DSE1, DSE2, DSE4 |
| Brettner 2024 late-G1/early-S source combination | CLN2, HSL1, GIN4, POL1, RNR1 |

The four starvation panels contain every published selected row in [Su et al. (2023), Tables S4/S5](https://doi.org/10.1186/s12864-023-09184-w). Each relationship retains its original row, contrast, direction and statistical values. The paper's Results and Methods describe different effect-size criteria, so the import uses the published selected table without imposing a new cutoff. Its spheroplast preparation and treatment context accompany the evidence. No hypotonic-response list was invented for the comparison in which the authors reported no significant differential expression.

The eight [Brettner et al. (2024)](https://doi.org/10.1002/yea.3927) relationships are explicitly named in the paper; they are not represented as a complete import of its supplementary cluster table. Source-study state interpretation remains attached to its panel and does not overwrite a gene's other functional or cycle evidence.

[Eder et al., bioRxiv version 3](https://www.biorxiv.org/content/10.1101/2025.03.12.642837v3), dated 19 August 2026, is recorded as a preprint. Its latest metadata and abstract were verified against the official version API; the older v2 full text was available, but the complete latest programme tables were not obtained. No complete marker panel is claimed for that source. Its use of overlapping data with Brettner 2024 is recorded to avoid treating the studies as independent replication.

## Coverage still requiring data or source material

- Validate detection, direction, specificity and panel transfer across strains and conditions in the 1011 dataset, with held-out cultures and genotypes.
- Obtain the complete latest Eder programme tables and Brettner cluster supplements before importing their full panels.
- Expand natural-population accessory-gene and noncoding-feature identity handling using strain-specific reference crosswalks.
- Add direct state evidence for meiosis, mating, sporulation and germination across relevant ploidy, mating type and nutrient conditions. Functional GO membership alone does not establish state specificity.

Project-specific expression levels, detection fractions and specificity are left unmeasured until project data are analysed. Source effect sizes remain source statistics. Original supplementary files and full-text copies are excluded from the public distribution; the catalogue retains their provenance and retrieval links.
