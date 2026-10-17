# Third-party notices

The MIT license in this repository covers the original YeastVar1011 application code. It does not replace the licenses of the software, fonts, scientific source material, or external media listed below. Copyright and license notices supplied by their authors remain in the distribution.

## Bundled software and fonts

| Component and use | License and attribution | Bundled notice / source | Upstream |
| --- | --- | --- | --- |
| three.js, interactive cell scene | MIT; copyright 2010–2026 three.js authors | [THREE-LICENSE.txt](dist/vendor/THREE-LICENSE.txt); readable `three.core.js` and `three.module.js` in the same directory | [three.js](https://github.com/mrdoob/three.js) |
| ExcelJS, spreadsheet export | MIT; copyright 2014–2019 Guyon Roche | [EXCELJS-LICENSE.txt](dist/vendor/EXCELJS-LICENSE.txt); `exceljs.min.js` | [ExcelJS](https://github.com/exceljs/exceljs) |
| KaTeX JavaScript and CSS, formula rendering | MIT; copyright 2013–2020 Khan Academy and other contributors | [LICENSE](dist/vendor/katex/LICENSE); `katex.min.js` and `katex.min.css` | [KaTeX](https://github.com/KaTeX/KaTeX) |
| KaTeX font files, mathematical glyphs | SIL Open Font License 1.1; copyright 2009–2010 Design Science, Inc. and 2014–2018 Khan Academy; reserved family names retained | [OFL.txt](dist/vendor/katex/fonts/OFL.txt); each font also contains its own copyright and license metadata | [KaTeX fonts](https://github.com/KaTeX/katex-fonts); [official OFL text](https://openfontlicense.org/open-font-license-official-text/) |
| citeproc-js, bibliographic formatting | Distributed here under the Common Public Attribution License 1.0 (CPAL); the upstream alternative GNU AGPL version 3 or later remains available; copyright 2009–2019 Frank Bennett | [upstream license notice](dist/vendor/citations/LICENSE-citeproc-js), [CPAL](dist/vendor/citations/CPAL-1.0.txt), [AGPL text](dist/vendor/citations/AGPL-3.0-only.txt), and the complete readable [citeproc.js source](dist/vendor/citations/citeproc.js) | [Juris-M/citeproc-js](https://github.com/Juris-M/citeproc-js) |
| Citation Style Language APA style and US English locale | Creative Commons Attribution-ShareAlike 3.0 Unported; copyright the contributors identified in the XML files | [CSL notice](dist/vendor/citations/LICENSE-CSL.txt), [APA style](dist/vendor/citations/apa.csl), [locale](dist/vendor/citations/locales-en-US.xml) | [CSL styles](https://github.com/citation-style-language/styles), [CSL locales](https://github.com/citation-style-language/locales), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |

The vendored components are retained as separate components. YeastVar1011 has not modified the font outlines or the bundled CSL style and locale. The font license covers all bundled TTF, WOFF, and WOFF2 variants; the MIT license for KaTeX JavaScript is not a replacement for the font license. The SIL OFL does not impose its license on documents rendered with those fonts.

The complete readable citeproc-js source is provided with the application, including the hosted distribution. CPAL section 15 treats network use as external deployment and requires source availability. The included CPAL Exhibit B contains no Attribution Information; section 14(c) therefore does not impose a separate splash-screen or logo requirement for this copy. Its copyright notice, license choices, and source must remain available when redistributing it. Changes to covered citeproc-js code must follow the corresponding license rather than the application's MIT license.

Package-manager development and test dependencies retain their own licenses in their respective distributions. Consult `package-lock.json` for the resolved dependency inventory. They are not relicensed by this project.

## Scientific catalogues

The marker, tool, method, and literature catalogues combine original editorial curation with source-attributed scientific information. The code license does not grant rights in publications, publisher figures, original supplementary files, or third-party databases. See [DATA_SOURCES.md](DATA_SOURCES.md) for the source inventory, transformation notes, and source-specific terms. Bibliographic records and links are provided so users can consult and cite the original work.

## Visual assets and external companion media

The yeast artwork and emblem in `dist/assets/` were created for this project with AI image-generation assistance; the background video was assembled from the project's yeast artwork. These are conceptual illustrations, not microscopy, measured cell geometry, or biological simulation outputs. The interactive cell scene is an authored illustrative model built using three.js.

The optional companion in `dist/mascot.js` refers to remotely hosted media from the [user-supplied Tencent community post](https://pd.qq.com/g/MengDaoTuanACG/post/B_f7018b693e4d02001441152197810561440X60). The remote images are not bundled in this repository or its portable package. Their character, artwork, and media rights remain with their respective rights holders; no open-source license for those images was verified, and the application MIT license does not cover them. Their availability depends on the external host. Users may hide the companion or choose their own local image; user-selected images are stored locally by the application.

Names of referenced tools, journals, institutions, characters, and databases remain the names or trademarks of their respective owners. Their inclusion identifies a source or dependency and does not imply endorsement.
