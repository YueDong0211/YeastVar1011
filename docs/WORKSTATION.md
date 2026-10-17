# YeastVar1011 — research plan workstation

A local and hosted research-plan builder for single-cell expression variation in the 1011 *Saccharomyces cerevisiae* strain collection. It connects raw reads, molecule counting, quality control, cell states, expression distributions, regulation, RNA dynamics and population genetics.

## Use the workstation

On Windows, open `START.cmd`. For a shared copy, extract the complete portable ZIP before starting. The launcher verifies the retained files and serves the local application. `STOP.cmd` stops that local session; `CREATE-SHORTCUT.cmd` creates a shortcut.

The hosted edition is https://yeastvar1011-research-atlas.robust-bread-5701.chatgpt.site. Access follows the existing Site audience.

To preview the static application during development:

```text
python -m http.server 4173 --directory dist --bind 127.0.0.1
```

No compilation is required. The catalogue also has a bundled local-file fallback, including sharded marker records and offline citation metadata.

## Research planning

Start with the research scope and available inputs. Select QC metrics, state annotations, marker panels, noise estimands and research extensions, then review the input requirements and export the plan. Tool documentation provides entry points, parameters, native outputs and proposed derived summaries. The workstation prepares plans; sequencing tools run in the user's analysis environment.

The research atlas offers route browsing and a question-based coverage map. Each route connects a question to its required inputs, statistical unit, methods, metrics, outputs and primary sources. Core expression-noise analyses retain raw molecular counts and distinguish state composition, state-conditioned variation, sampling and RNA composition. Population-genetic routes add matched genotypes, relatedness, phased alleles or population history according to the question.

The v12 evidence audit covers relevant primary studies and official methods from 2016–2026, retaining older foundational methods where used. New routes include latent expression distributions, paralog transcript buffering, RNA proportionality, local sample landscapes, poly(A)-site usage, yeast metabolic models, shared genetic effects, allelic regulation, rare-variant sets and genetic interactions. Common design rules appear once; route-specific checks remain with the methods.

## Marker evidence and citations

Marker records support multiple tags, evidence types, cycle phases, functional uses and source-specific statistics. Search, nested filters, union/intersection/exclusion and manually selected panels share the same plan. Reference statistics retain their original source context. Project-specific expression, detection and specificity values are populated from analysis results when supplied.

The v13 panel preview compares RNA cycle evidence, functional tags and manual assignments. Author-used panels from the 2025 genetic and environmental perturbation atlas can be inspected before explicitly merging them into the current selection. Original source states, differential-expression statistics, supplementary table positions and enrichment tables are retained separately. Opening a panel does not mark its evidence as reviewed.

Marker planning also includes Localized Marker Detector (LMD), a cluster-independent multiscale method, alongside existing grouped comparisons, Hotspot and geneBasis. Discovery, tuning and confirmation partitions are specified by strain and culture.

Literature records link primary articles and method documentation. APA 7 exports use locally bundled citeproc-js, the official CSL style and structured author metadata. Bibliographic years distinguish online publication from issue year where relevant.

## Interface and export

Classic mode remains the default. The optional immersive design entry opens a static mode chooser; 3D is initialized only after **Start immersive design** is selected. Returning to classic mode releases the scene, and opening the entry again requires a fresh explicit start. Both modes use the same saved plan and preserve the current planning stage when switching. Entering unfolds the scene and decision panels; returning retracts them into the classic workspace. Native view transitions have a lightweight fallback, respect reduced motion and cancel cleanly during rapid navigation.

The v19 immersive view has six stages: research focus, data and QC, annotation, expression noise, research extensions and plan preparation. A locally rendered budding-yeast morphology illustration sits in a stylized liquid environment with refracted light and depth particles. Six distinct shots combine dolly distance, field of view, focus, elevation and lateral framing; transitions use a brief pullback followed by a smooth move. It supports pointer and keyboard rotation, structure-linked catalogue entry points, wall-opacity control, wheel zoom, quality selection and reduced motion. A translucent layered wall, vacuole, nuclear envelope, nucleolus, folded membranes and instanced granules form the authored biological illustration. It is an illustrative 3D model, not a reconstruction from a sample. Scene motion can be paused independently; reduced motion also pauses the liquid environment. The scene pauses in hidden tabs and outside the viewport and releases GPU resources when closed; plan editing also works without WebGL.

Each selection now carries its record identity and action into the scene. Tools, measurements and markers use different visual emphasis; selecting, removing, filtering and inspecting receive distinct feedback. Where record metadata identifies a relevant structure, that structure is emphasized. These are interaction cues, not measured biological responses. Chapter navigation retracts the outgoing decision panel before revealing the next panel while the same WebGL canvas continues the camera movement. Reduced motion uses static feedback.

Local data management is available in Settings, classic More actions, companion settings and the immersive toolbar. Reset interface/model retains research content and the current language; clear temporary views retains appearance and research content. Full local deletion uses a review and explicit acknowledgement, includes this app’s storage and companion-image database, and offers a plan backup first. The backup does not include separate notes, feedback, companion media or connection settings. No action clears other applications’ storage or claims to erase the browser HTTP cache.

Selections change the actual plan. Preparation compiles selected methods, measures, inputs and references into the real export document, then displays it with document and editable-backup downloads. Editing invalidates the previous preview. No analysis results are simulated by the preparation sequence.

Chinese, English, French, Spanish and Basque are available. Export language and font can be selected independently of the interface. The workstation exports the research plan, workflow diagram, tables, formulas, marker selections and references. Custom formulas and figure specifications are stored with the plan.

Plan preview displays the actual export document, the research structure and saved step dependencies. Planned-result templates define axes, grouping, required fields and source links for marker summaries, annotation evaluation, mean–noise effects, expression distributions, cycle profiles, QC retention, networks and QTLs. Selected specifications persist with the plan and are included in document, Markdown, JSON and spreadsheet exports. Empty CSV templates contain field names only; result plots require imported observations.

The v18 classic workspace has a compact header, visible preview and immersive entries, a More actions disclosure for import and helper links, section shortcuts, and clear-search/filter actions that preserve plan selections. The actual previous/next controls remain reachable at the bottom of the viewport, with reserved content space and mobile-keyboard handling.

The six planning stages share one horizontal navigation rail. Individual steps have stable addresses; refresh and browser history restore the selected step. Previous/next controls, keyboard navigation and touch swipes on the stage heading use the same navigation state. Content slides only when the route changes. Forms, tables and reading retain native scrolling, and reduced-motion settings are respected.

Supported result specifications open a figure configuration for review. Applying it transfers the chart type and field mapping without replacing imported observations; cancelling preserves the existing configuration. SVG, PNG and source-data exports require valid plotted observations. Other result specifications retain their field templates and method sources.

The observatory scene, floating or docked detail panels, pinned or automatic sidebar, dragon companion and catalogue search remain available. The companion opens display settings, local catalogue search and contribution tools. Docked panels hide controls that apply only to floating windows.

The review page groups export, plan checks and workflow/result specifications into three tabs. The export view displays a live document preview beside document, workbook, vector-figure and bibliography choices. Language, font and palette share one set of controls; JSON backups and other interchange formats are under More formats. The primary download action follows the selected output.

Click the page title in the top bar to find a page or analysis stage. Global search groups pages, markers, measures, methods, papers and formulas, supports multiple words, and opens actual records with keyboard navigation.

The dragon companion is freely draggable. Dragging saves its position and pauses roaming; its settings offer roaming, staying in place, size and position reset. It pauses during form entry, focus, open panels and hidden tabs. Reduced-motion settings stop automatic movement.

Appearance settings include Slide (default), Yeast 3D and Off. The appearance popover links directly to these controls. The optional 3D transition uses a local, procedurally generated budding-yeast visual model and the bundled Three.js runtime. A separate preview supports pointer and keyboard rotation. The renderer loads on demand, stops when idle or hidden, and is released when disabled. Reduced motion bypasses animated transitions; unavailable WebGL falls back to ordinary navigation.

Plan editing includes undo and redo for selections, text and parameters, with bounded history retained across reloads. Save indicators reflect browser storage outcomes and offer Retry and a downloadable JSON backup when saving fails. Imports are validated before replacement; undoing a complete backup import restores its attached DIY configuration as well.

Research directions support search and a selected-only view within one draft. Cancel preserves the existing plan; Save returns to its editing entry point. First-time plans identify the expression-noise starting template. Returning to a page restores its reading position, keyboard metric selection retains focus, and the skip link goes to content without changing the current page.

The marker library keeps selected genes visible across filters, indicates selections outside the current result set and provides removable filter chips. Clearing filters preserves the plan. Unapplied marker-editing drafts remain available during the browser session, with explicit Save and Discard controls.

## Development

See the repository README for the supported start, check and packaging commands. See CONTRIBUTING.md for evidence and interface contribution conventions.
