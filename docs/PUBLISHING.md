# Publishing and archival records

Maintained for **22.1.1**, 9 November 2026. The [release guide](RELEASES.md) describes the distributions; the [software methods](software-methods.md) describe their scientific scope.

## Public records

| Destination | Record | Status |
| --- | --- | --- |
| GitHub | [Source repository](https://github.com/YueDong0211/YeastVar1011), [v22.1.1](https://github.com/YueDong0211/YeastVar1011/releases/tag/v22.1.1) | Published source/Windows ZIPs and SHA-256 sidecars |
| GitHub Pages | [Workstation](https://yuedong0211.github.io/YeastVar1011/) | Deployment follows the validated `main` branch |
| Zenodo | [Concept DOI 10.5281/zenodo.23429611](https://doi.org/10.5281/zenodo.23429611) | Existing software series; GitHub release integration enabled |
| Zenodo 22.1.1 | [Version DOI 10.5281/zenodo.24079647](https://doi.org/10.5281/zenodo.24079647) | Published 9 November 2026; software record, author Yue Dong, MIT |
| Zenodo 22.1.0 | [Version DOI 10.5281/zenodo.23620291](https://doi.org/10.5281/zenodo.23620291) | Published 24 October 2026 |
| bio.tools | [Metadata PR #4720](https://github.com/research-software-ecosystem/content/pull/4720) | Updated to 22.1.1; schema instance validation passed; registry review and synchronization pending |
| Bioconda | [Recipe PR #70384](https://github.com/bioconda/bioconda-recipes/pull/70384) | Updated to 22.1.1 using the downloaded tag archive and its SHA-256; upstream review pending |

## Verification records

Release 22.1.1 identifies source commit `e6e8e87794ce97ee5986bc57a2918809153a73dc`. Its [website/platform checks](https://github.com/YueDong0211/YeastVar1011/actions/runs/42596856388), [Linux FASTQ integration](https://github.com/YueDong0211/YeastVar1011/actions/runs/42596876845) and [Conda installation checks](https://github.com/YueDong0211/YeastVar1011/actions/runs/42596856350) passed. Local package verification checked all 319 Windows files, nine launcher/package behaviors and all 431 inventoried source files. Current workflow histories are available under [GitHub Actions](https://github.com/YueDong0211/YeastVar1011/actions).

The submitted Bioconda source archive has SHA-256 `036ec00aad9570e71dc63c440c6cf8358eb8a6214db46362ad4f10c1d6a74a7c`. This is the GitHub tag `.tar.gz` used by Conda, distinct from the release's separately checksummed ZIPs.

## Release and archive procedure

1. Synchronize the version and date across the application, package, citation and discovery metadata. Rebuild the analysis download and validate its contents against source.
2. Run the maintained source, application, browser, server and package checks. The [repository map](ARCHITECTURE.md) lists commands and output formats.
3. Publish the tested Git tag and ZIPs with SHA-256 sidecars. Record the source commit, CI run and download URLs.
4. Inspect the Zenodo record produced by the existing GitHub integration: version, creators, license, source archive and related GitHub tag. Record its returned version DOI and update the citation. Use the concept DOI for the series and the version DOI for an exact release.

Zenodo reads `.zenodo.json` before `CITATION.cff` when both are present, as described in [software metadata](https://help.zenodo.org/docs/github/describe-software/). Keep their creators and version consistent. The existing series retains all prior releases.

## Discovery and installation channels

`biotools.json` is the maintained registry description. Update the existing metadata PR when the public software changes; the registry's accepted public entry is the completion record. bio.tools uses its own review and synchronization process.

The [Bioconda template](../packaging/bioconda/README.md) installs the static workstation and relocatable Node.js launchers. Its scientific workflow definitions are included as source; analysis dependencies are configured through `analysis/`. A release recipe is rendered from the real tagged `.tar.gz` and its SHA-256 using `scripts/render-bioconda.cjs`. The local-source CI recipe is a build check rather than the submitted recipe. Channel availability is recorded after upstream acceptance.

## Authorship and terms

Author and maintainer: **Yue Dong**. Original code and documentation use MIT; component attribution is retained in [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md) and [DATA_SOURCES.md](../DATA_SOURCES.md). The tagged source, checksums and DOI archive identify a citable software version and its public release date.
