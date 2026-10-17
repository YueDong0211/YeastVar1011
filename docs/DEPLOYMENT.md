# Install and run

YeastVar1011 runs as a static browser application. The included local server uses Node.js built-in modules; running the released workbench does not require `npm install`, a database, Python, R, or an analysis environment.

## Linux and macOS

Install [Node.js 24 LTS](https://nodejs.org/en/download), then download and extract a release or clone the repository:

```sh
git clone https://github.com/YueDong0211/YeastVar1011.git
cd YeastVar1011
sh scripts/setup.sh --start
```

Open the local address printed by the server. Press Ctrl+C in that terminal to stop it. The default address is `http://127.0.0.1:4173/`.

The same command works from an extracted release. Paths containing spaces are supported. The setup script checks readiness first and does not change shell profiles, install system packages, or request administrator privileges.

## Windows

The portable release includes `START.cmd`, `STOP.cmd`, and `CREATE-SHORTCUT.cmd`. Extract the entire release before opening `START.cmd`.

The Node.js route provides the same checks and server as Linux and macOS:

```powershell
powershell -NoProfile -File scripts/setup.ps1 -Start
```

If a local PowerShell policy prevents that script from running, the application can be started without changing the policy:

```powershell
node scripts/doctor.cjs
node scripts/dev-server.cjs
```

## Setup options

| Task | Linux/macOS | Windows PowerShell |
| --- | --- | --- |
| Check readiness only | `sh scripts/setup.sh` | `powershell -NoProfile -File scripts/setup.ps1` |
| Check and start | `sh scripts/setup.sh --start` | `powershell -NoProfile -File scripts/setup.ps1 -Start` |
| Select another port | `sh scripts/setup.sh --start --port 4180` | `powershell -NoProfile -File scripts/setup.ps1 -Start -Port 4180` |
| Select a free port automatically | `sh scripts/setup.sh --start --port 0` | `powershell -NoProfile -File scripts/setup.ps1 -Start -Port 0` |
| Install development dependencies | `sh scripts/setup.sh --dev` | `powershell -NoProfile -File scripts/setup.ps1 -Dev` |

`--dev` / `-Dev` runs `npm ci` using the committed lockfile. It replaces the local `node_modules` dependency installation, requires network access or an adequate npm cache, and leaves the lockfile unchanged. The default setup command installs nothing. `--dev` can be combined with `--start`.

The checker reports Node.js and npm versions, optional Git availability, required application files, referenced marker shards, and whether the selected local port can be bound. Port availability is a point-in-time check; the server reports if another program claims that port before startup. Machine-readable output is available with:

```sh
node scripts/doctor.cjs --port 0 --json
```

Exit code `0` means the required checks passed; `1` identifies a failed check or invalid option. Git is optional for an extracted release. npm is required for development installation, but the ordinary application can start directly with Node.js.

## Runtime compatibility

| Layer | Requirement |
| --- | --- |
| Local server | Node.js 22 or later; Node.js 24 LTS is the recommended runtime for this release |
| Operating systems | Linux, macOS, Windows with a compatible Node.js installation |
| Standard interface | A current browser with JavaScript, local storage, and file-download support |
| Optional immersive view | Browser WebGL support and available graphics acceleration; the standard workbench remains the default |
| Development checks | npm plus dependencies from `package-lock.json`; browser checks additionally require the matching Playwright browser installation |
| Scientific analysis | Separate tool environments and reference inputs documented in `analysis/` |

The minimum Node.js version is a compatibility floor. Use a maintained release according to the [official Node.js release schedule](https://nodejs.org/en/about/previous-releases). Catalogue software versions describe the methods being planned; they are not packages automatically installed into the workbench runtime.

## Data and network behavior

The server binds only to `127.0.0.1` and serves `dist/`. It does not upload local scientific inputs. Plans and preferences are held in the browser's storage for the current address; changing hostname or port creates a different browser origin, so export a JSON backup before changing the address used for an established plan.

The bundled interface, catalogues, citation renderer, and visual assets can be used locally without network access once the release and Node.js are available. Original-paper links, external companion media, and a user-configured remote AI service require their respective network connections. Installing development dependencies also requires a suitable npm cache or network access.

## Hosting and scientific execution

Deploy the contents of `dist/` to a static web host. GitHub Pages uses the repository's configured Pages workflow. The bundled local server is intended for desktop use and remains bound to the local computer; it does not become a public server by setting a host variable.

The workbench organizes methods, evidence, parameters, and exports. Scientific commands and their environment definitions are described separately in [analysis/README.md](../analysis/README.md). Reference genomes, barcode/UMI layouts, and input samples are configured there for the selected analysis. Starting the website does not launch sequencing analyses.

## Verification

```sh
node scripts/qa-doctor.cjs
node research/qa-dev-server.cjs
npm run check
```

The setup check uses no package dependencies. `qa-doctor.cjs` exercises accepted/rejected runtimes, missing files and shards, absent optional tools, missing development prerequisites, a real occupied port, automatic free-port selection, and command-line output. Shell syntax and PowerShell parsing should also be checked in the release environment.

## Registry and archive metadata

The repository includes [biotools.json](../biotools.json) and [.zenodo.json](../.zenodo.json) for maintainer review and submission. These files describe the software; creating them does not register the project or issue a DOI.

| Service | Role and submission route |
| --- | --- |
| [bio.tools](https://biotools.readthedocs.io/en/latest/community_specific_guidelines.html) | Discoverability catalogue for bioinformatics resources. A logged-in maintainer can add the prepared JSON through the registration interface. The minimum record contains a name, description, and homepage; the supplied record also includes software types, version, code/documentation links, license, and contact. |
| [Zenodo](https://help.zenodo.org/docs/github/enable-repository/) | Versioned software archive and DOI. Link the maintainer's GitHub account, enable the repository, then [create and archive a release](https://help.zenodo.org/docs/github/archive-software/github-upload/). Review the resulting record and DOI after processing. |
| [Bioconda](https://bioconda.github.io/contributor/guidelines.html) | Installation channel for bioinformatics packages. A submission requires a stable source release, checksum, redistributable licensing, a build recipe, dependency declarations, and package tests. A repository or website alone is not a Bioconda package. |

Keep the version and authors in `package.json`, `CITATION.cff`, `.zenodo.json`, and `biotools.json` synchronized when preparing a release. Zenodo's [documented metadata precedence](https://help.zenodo.org/docs/github/describe-software/) gives `.zenodo.json` priority over `CITATION.cff` when both are present. Add publication identifiers, affiliations, and ORCID identifiers only when confirmed. Credentials belong to the service account, never to these metadata files.
