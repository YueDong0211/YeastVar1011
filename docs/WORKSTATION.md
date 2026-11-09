# Using the research workstation

YeastVar1011 connects a yeast single-cell research question to methods, molecular evidence, data requirements and an exportable study plan.

## Open a workspace

Use the [public workstation](https://yuedong0211.github.io/YeastVar1011/), the Windows portable `START.cmd`, or `npm start` from the source distribution. The [deployment guide](DEPLOYMENT.md) gives installation details. Windows sharing requires the complete extracted portable folder.

Plans and preferences are stored in the browser for the current address. A JSON backup transfers a plan between hosted and local copies, browsers or computers. Export it before clearing storage or changing the local server address.

## Build a study plan

The six stages share one navigation rail: scope, preparation, annotation, expression variation, extensions and review. Step addresses, browser history and reload restore the current stage. Classic and immersive modes edit the same plan.

1. **Scope:** name the study, state its question, choose research directions and record available inputs.
2. **Preparation:** select the raw-read, alignment or matrix entry point; add processing methods, QC measures and required molecular layers.
3. **Annotation:** inspect marker assertions and select a panel together with the annotation methods.
4. **Expression variation:** define the biological unit, estimand, replication, mean effects and state/measurement model.
5. **Extensions:** choose additional analyses and resolve their method branches, data dependencies and source declarations.
6. **Review:** inspect missing inputs and conflicts, edit output specifications and export the plan.

The noise/genetics/evolution catalogue links each selected analysis to its declared tools and metrics. Selecting an alternative model changes its dependencies. Shared tools remain while another selected analysis needs them. Manual selections and explicit exclusions are retained; the review shows unresolved branches and missing requirements.

Undo and redo cover selections, text, parameters and complete plan import. A save indicator reports browser storage outcomes. If saving fails, use Retry or download a backup. Research-direction editing has explicit Save and Cancel actions.

## Read marker evidence

Search by gene or source and choose filters for cycle phase, biological tags, studies, evidence classes and functional annotations. Active filters can be removed individually. Choice-list search and paging narrow the filter choices without changing selected study evidence.

Each gene can have several tags. Inspect the gene–tag–source assertion for its experimental condition, measurement type, reported direction, source statistics and table location. RNA association, protein localization and functional membership retain their own evidence types. Published statistics describe their original study; project-specific expression and detection values require the target data.

Selected genes remain visible across filters, and the workspace indicates selections outside the current results. Tag unions/intersections combine genes; assertion-level selection determines which source statements travel with the plan. Opening a reference panel does not merge it automatically. Explicitly review and save a panel before using it for annotation.

The [database directory](DATABASE_RESOURCES.md) identifies imported SGD/GO records and external regulation, interaction, expression and population resources. The [source inventory](../DATA_SOURCES.md) documents the imported evidence.

## Inspect methods and research directions

Method cards provide their entry point, inputs, assumptions, parameters, formulas, native outputs and proposed summaries. Branch choices update the plan's requirements. Population-genetic routes request the matched identities, genotypes, relatedness or supplied mapping results appropriate to the selected question.

The QTL catalogue describes trait definitions, statistical units and RNA/additional-omics inputs. The noise/genetics/evolution catalogue provides model variants and source references. Record external alignment, tree or reference provenance where a recipe requests it. Selecting these records prepares an analysis specification; the exported commands and cited tools are used in the research environment.

The reference library searches structured author, date, DOI and tool metadata. APA references and CSL downloads use those source records. The global search also finds pages, stages, genes, methods, metrics and formulas.

## Review and export

The review page includes the live document, plan checks and workflow/result specifications. Resolve input and branch conflicts, then choose document, workbook, vector diagram, bibliography or an editable backup. Export language, font and palette are shared across the corresponding outputs. Additional interchange formats are available under More formats.

Result specifications define axes, grouping, required fields and source links. An empty CSV template contains field names. A supported specification can configure a figure without replacing imported observations; actual plots require valid data. SVG/PNG and source-data exports preserve the chosen figure configuration.

Plan editing invalidates an earlier preparation preview. The displayed document and final downloads are compiled from the current selections and metadata. Cite the selected source studies and methods alongside the software.

## Optional interfaces

**Immersive mode** starts after an explicit action and follows the same six planning stages. The illustrative yeast cell supports rotation, zoom, structure-linked navigation, quality selection and motion controls. It pauses when hidden and releases rendering resources on exit. Reduced motion and the classic interface remain available.

**The research companion** searches catalogue records, reviews plan requirements and opens workspace guidance without a model. An optional local Qwen model explains retrieved records after loading its fixed files. See [local companion setup](LOCAL_ASSISTANT.md) for import, cache-only loading, release and cache deletion. Companion appearance, dragging and movement are controlled in its settings.

**Specimen studio and figure tools** provide authored visual customization and data-based plotting. The [studio guide](SPECIMEN_STUDIO.md) describes its controls. The scene and artwork are illustrations; plots use supplied observations.

## Data management

Settings offers appearance reset, temporary-view cleanup and full local deletion. The full reset presents a review and plan-backup option. A plan backup contains study selections and attached figure specifications; separate notes, feedback, companion media and connection settings have their own storage. Export needed material before clearing it.

For corrections, include the affected page, language and record/source ID in a [GitHub issue](https://github.com/YueDong0211/YeastVar1011/issues). Use the [contribution guide](../CONTRIBUTING.md) for source and translation changes.
