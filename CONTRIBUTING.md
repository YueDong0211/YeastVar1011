# Contributing to YeastVar1011

Contributions to the interface, research methods, marker evidence and translations are welcome.

## Start locally

Use Node.js 20 or later. Run `npm ci` and `npm start`, then visit the local address printed by the server. The application in `dist/` runs without compilation. Run `npm run check` and `npm run test:server` before submitting changes.

Open a GitHub issue for a reproducible problem or propose a pull request. Include the page, selected language, browser, steps and expected behaviour. Remove personal information and connection credentials from screenshots and exported plans.

## Research contributions

- Cite a primary source or official tool documentation, ideally a DOI and a specific supplementary table or software output field.
- Preserve the experimental context: organism, strain, condition, platform, statistical unit and evidence type.
- A marker may have several functional and annotation tags. Keep periodic expression, protein function and manually proposed annotation separate.
- Preserve original source statistics and units. Do not present reference measurements as observations from a user's data.
- For a method, specify required inputs, optional inputs, parameter meanings, native outputs and derived metrics. Distinguish an analysis plan from an executed analysis.
- Link formulas to their sources and define symbols. Explain which assumptions the interpretation requires.
- Keep JSON and offline bundled data consistent. Run the catalogue reference check after changes; do not edit generated bundles without updating the corresponding data source.

## Interface contributions

Keep Chinese, English, French, Spanish and Basque labels together. Test keyboard focus, a narrow viewport, reduced motion and both planning modes. Every visible control must perform the described action. Preserve the user's saved plan when changing presentation.

## Licensing

Original code contributions are accepted under the project's MIT license. Identify the license and attribution for external code, fonts, images and datasets. Do not submit downloaded full-text papers or third-party media without redistribution rights. Existing vendor notices must remain intact.

## Research collaboration

Contact [Yue Dong](mailto:yuedong02@outlook.com). Interface and evidence corrections are best tracked in GitHub issues so they can be reviewed and linked to a revision.
