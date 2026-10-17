# Release, registry and preprint publication

Status reviewed on **17 October 2026**. This document distinguishes a public software release, a registry entry, a distributable package, an archival DOI and a research preprint. Each has a separate submission and completion record.

## Current record

| Destination | Purpose | Verified status | Material and next completion record |
| --- | --- | --- | --- |
| GitHub | Public source, versioned releases and issue tracking | [v22.0.0 is published](https://github.com/YueDong0211/YeastVar1011/releases/tag/v22.0.0), with the updated portable workstation and SHA-256 file. The Linux QC workflow remains the v21 implementation. | Released source: `d9550cabee3b711db3a5cca2610515a212f63d5a`. [Platform, browser and deployment checks](https://github.com/YueDong0211/YeastVar1011/actions/runs/39007146650) and [Linux package build/install checks](https://github.com/YueDong0211/YeastVar1011/actions/runs/39007146568) passed. |
| GitHub Pages | Browser access to the workbench | [Public website](https://yuedong0211.github.io/YeastVar1011/). | Confirm the deployed version and asset checks after each Pages deployment. A successful source push alone is not a deployment result. |
| bio.tools | Discoverability and structured software description | [Metadata PR #4720](https://github.com/research-software-ecosystem/content/pull/4720) has been submitted to the official content repository. Schema validation passed; registry review and synchronization are pending. | Register through a maintainer account, review the imported fields, then record the assigned bio.tools identifier and public URL. |
| Zenodo | Archival software release with a DOI | [Version 22.0.0 is archived](https://zenodo.org/records/23431706). The Zenodo API returned version 22.0.0 and one source archive. [Version 21.0.0](https://zenodo.org/records/23429612) remains available. | Version DOI: [10.5281/zenodo.23431706](https://doi.org/10.5281/zenodo.23431706). Concept DOI: [10.5281/zenodo.23429611](https://doi.org/10.5281/zenodo.23429611). |
| Bioconda | Installation through a reviewed bioinformatics package channel | [Recipe source and tests](../packaging/bioconda/README.md) are prepared. [Native Linux build and installation tests passed](https://github.com/YueDong0211/YeastVar1011/actions/runs/38998175120). [Recipe PR #70384](https://github.com/bioconda/bioconda-recipes/pull/70384) is submitted and awaiting upstream review. | The submitted recipe uses the actual v21.0.0 archive SHA-256. Channel publication remains pending review and merge. |
| bioRxiv | Research manuscript dissemination | Submission cancelled by the author on 17 October 2026. No manuscript has been submitted or uploaded. | Local draft materials are retained unpublished. No submission is scheduled. |

The versioned GitHub release remains the source of installable release assets while registry and archive steps are pending. Do not advertise a DOI, bio.tools identifier, Bioconda installation command or bioRxiv article until the corresponding service has returned a real record.

## Prepare and publish the software release

1. Synchronize the version and software description in `package.json`, `CITATION.cff`, `.zenodo.json` and `biotools.json`. Keep the browser workbench and the separately configured Linux analysis workflow distinct in release notes.
2. Generate the public source snapshot using the repository's allowlist. Exclude local credentials, browser state, private maintenance history, downloaded papers, user configurations, sequencing data and temporary analysis outputs. Retain the required source, vendor licenses, attribution notices, documentation and reproducible tests.
3. Run the release checks for static assets, local-server behavior, setup/doctor commands, registry metadata, the browser workbench and the supported analysis fixture. Inspect each CI job rather than treating workflow creation as evidence of execution.
4. Tag the checked source, publish the release assets and verify their checksums and download links. Confirm the Pages deployment separately. A release should identify the tested commit and link its CI run.
5. Update the status table with the actual release URL and any new registry records. Keep earlier version links for reproducibility.

Installation and platform requirements are documented in [DEPLOYMENT.md](DEPLOYMENT.md). Original code is MIT-licensed; bundled libraries, fonts, citation styles and attributed scientific source material retain their own terms in [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md) and [DATA_SOURCES.md](../DATA_SOURCES.md).

## Register in bio.tools

The current submission uses the official metadata contribution route: [PR #4720](https://github.com/research-software-ecosystem/content/pull/4720). Its proposed identifier is `yeastvar1011`. Maintainer acceptance and a successful GitHub-to-bio.tools synchronization are required before the entry becomes a verified registry record. The direct registration route below remains available to an authenticated maintainer.

Use the existing `biotools.json` through the registration interface of a logged-in maintainer. Review the name, description, homepage, software types, supported systems, version, source/documentation links and contact before saving. The homepage and code links identify the workbench; the description also identifies the constrained FASTQ workflow. Add EDAM topics or operations only after matching the actual function to a verified ontology identifier. The [bio.tools registration guidelines](https://biotools.readthedocs.io/en/latest/community_specific_guidelines.html) describe required fields and community curation; the [API reference](https://biotools.readthedocs.io/en/latest/api_reference.html) describes authenticated programmatic registration.

Successful local schema validation establishes that the prepared record has the expected structure. Registration is complete when the service has accepted it and a public record can be opened. Record that URL and update the entry when release capabilities change.

## Archive a release in Zenodo

Connect the maintainer's GitHub account to Zenodo and enable YeastVar1011 in the repository integration, following [Enable a repository](https://help.zenodo.org/docs/github/enable-repository/). Archive the chosen release using the [GitHub release workflow](https://help.zenodo.org/docs/github/archive-software/github-upload/), then inspect the resulting files, version, creators, license description and related links.

Both citation files are maintained for their respective consumers. Zenodo gives `.zenodo.json` precedence when it is present alongside `CITATION.cff`, so update both before the release. This behavior is specified in [Describe software](https://help.zenodo.org/docs/github/describe-software/). Creator affiliations and ORCID identifiers should be included only when supplied and verified. Component licenses remain described in the archived notices even when the record identifies MIT as the original software license.

Use the DOI for the specific archived version when citing the exact software used in an analysis. Store the concept DOI separately for links intended to resolve to the version series. Populate DOI fields and badges only from Zenodo's returned record.

## Submit the Bioconda recipe

The candidate installs the browser assets and supporting source under `share/yeastvar1011`, with `yeastvar1011` and `yeastvar1011-doctor` entry points. Its runtime constraint is Node.js `>=22,<25` on Unix-like systems. Scientific workflow definitions are included as source; STAR, samtools, FastQC, MultiQC and Snakemake are installed through the separate analysis environments.

The native Linux candidate workflow builds and tests an installed package using a local source checkout. That CI recipe is explicitly marked **local-ci-only** and must not be submitted. For the submission, download the actual tagged release archive and use [scripts/render-bioconda.cjs](../scripts/render-bioconda.cjs) to calculate and verify its SHA-256 and render the release recipe. The commands and output layout are documented in [packaging/bioconda/README.md](../packaging/bioconda/README.md).

Submit the rendered `meta.yaml`, build script, wrappers and installation test through the Bioconda recipe review workflow. Keep the license inventory with the release: original code, vendor components and scientific source facts are not represented as one blanket MIT work. Bioconda's [contribution guidelines](https://bioconda.github.io/contributor/guidelines.html) require appropriate scope, stable sources, redistributable terms and an installation test. A passing upstream package test supplies review evidence; it does not establish channel acceptance. Announce channel installation only after the recipe is accepted and the package can be resolved from the channel.

## Prepare a bioRxiv software article

The present methods document describes the implemented resource and supported FASTQ processing route. It is not a submitted manuscript or evidence of new results in the 1011-strain population. bioRxiv expects research manuscripts with data; bioinformatics tools can be described through use cases, outputs or reanalysis within a research article. A protocol or software instruction sheet alone does not meet that scope. See bioRxiv's [screening procedures](https://connect.biorxiv.org/news/2022/06/13/screening_procedures).

Before manuscript submission, assemble:

- A defined scientific or methodological question and a reproducible use case. State whether inputs are synthetic fixtures, public biological data or newly generated data.
- Results that answer that question, with the datasets, configuration, output checks and comparisons needed to support each claim. Software checks establish implementation behavior; they do not establish biological accuracy or an advantage over competing methods.
- The complete author list, author order, affiliations, corresponding author, contributions, funding, conflicts, data/code availability and any relevant ethics statements. No values are inferred from the repository owner or laboratory name.
- A software version, archived code and analysis materials that match the manuscript. Add the archive DOI when it exists.
- Accurate acknowledgement of AI assistance where required by the target venue, with scientific responsibility retained by the named human authors. The final wording requires author review of the actual use and journal policy.

After authors finalize the article and its metadata, submit through the designated author's account. Save the service's submission receipt separately from the eventual public preprint DOI. Acceptance of a software registry entry, a package recipe or a GitHub release does not constitute manuscript posting.

## Record completed actions

For each destination retain the submitted version, source commit, submission date, responsible maintainer, validation/build link, returned identifier, public URL and current status. Update this document after a state change. Authentication tokens remain in service credentials or encrypted CI secrets and are never stored in these metadata files or exported plans.
