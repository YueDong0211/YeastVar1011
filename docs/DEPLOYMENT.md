# Install and run

The local ProjectLocal build stores Windows launcher state, logs and compiler temporary files under `.yeastvar-local/` in the program folder. Keep the program on drive D to keep its runtime files there. Its generated shortcut is also placed in that folder.

The workstation is a static browser application with two local serving options: a Node.js source server and a Windows PowerShell/.NET portable server. Scientific execution uses the separately configured Linux workflow in `analysis/`.

## Windows portable

Download the Windows ZIP from the [release page](https://github.com/YueDong0211/YeastVar1011/releases/latest) and extract the complete folder. Open `START.cmd`; the launcher checks file integrity and opens the local workstation. Use `STOP.cmd` to stop that copy and `CREATE-SHORTCUT.cmd` to create a shortcut.

This distribution uses Windows PowerShell 5.1 and .NET rather than Python or Node.js. Keep the whole folder together. Copying only the launcher or opening it inside the ZIP leaves required application files unavailable.

## From source

Install [Node.js 24 LTS](https://nodejs.org/en/download), then clone the repository or extract the source release:

```sh
git clone https://github.com/YueDong0211/YeastVar1011.git
cd YeastVar1011
npm start
```

Open the loopback URL printed by the server. The default is `http://127.0.0.1:4173/`; Ctrl+C stops it. Starting the workstation requires no dependency installation or compilation. Node.js 22 is also supported.

The setup scripts run an environment check before startup:

| Task | Linux/macOS | Windows PowerShell |
| --- | --- | --- |
| Check readiness | `sh scripts/setup.sh` | `powershell -NoProfile -File scripts/setup.ps1` |
| Check and start | `sh scripts/setup.sh --start` | `powershell -NoProfile -File scripts/setup.ps1 -Start` |
| Choose port 4180 | `sh scripts/setup.sh --start --port 4180` | `powershell -NoProfile -File scripts/setup.ps1 -Start -Port 4180` |
| Choose a free port | `sh scripts/setup.sh --start --port 0` | `powershell -NoProfile -File scripts/setup.ps1 -Start -Port 0` |
| Install development dependencies | `sh scripts/setup.sh --dev` | `powershell -NoProfile -File scripts/setup.ps1 -Dev` |

`--dev` / `-Dev` runs `npm ci` from the lockfile. The ordinary setup command installs nothing. If script execution is restricted, `node scripts/doctor.cjs` and `node scripts/dev-server.cjs` provide direct entry points.

## Runtime and network

| Layer | Requirement |
| --- | --- |
| Browser interface | Current browser with JavaScript, local storage and file downloads |
| Source server | Node.js 22 or later; Node.js 24 LTS recommended |
| Source-server platforms | Windows, Linux and macOS |
| Windows portable server | Windows PowerShell 5.1 and .NET |
| Immersive view | WebGL and available graphics acceleration |
| Development browser checks | npm dependencies and a matching Playwright browser, or `CHROME_PATH` |
| FASTQ processing | Linux x86_64 and the Conda environments in `analysis/` |

Both local servers use the loopback interface. Plans and preferences belong to the current browser origin; a different hostname or port has separate storage. Export a JSON backup before changing the address used for a saved study.

The local application, catalogues, citation renderer and bundled artwork work offline. External papers and companion media require their hosts. The optional on-device Qwen model has a separate first-use download; existing files can be imported and loaded from cache as described in [LOCAL_ASSISTANT.md](LOCAL_ASSISTANT.md).

## Check an installation

```sh
node scripts/doctor.cjs --port 0 --json
node tests/qa-doctor.cjs
node tests/qa-dev-server.cjs
npm run check
npm run test:release
npm run test:source
```

The doctor checks the runtime, required application files, marker shards and actual port binding. Exit code `0` means the required checks passed; `1` indicates a failed check or invalid option. Git and npm are optional for source-server runtime; npm is needed for development installation.

For a Windows release, `tests/qa-portable-package.ps1 -ArchivePath PATH` checks the actual extracted package and its launcher. It verifies file hashes, rejects corruption, tests repeated launch and inspects served assets and video byte ranges. Packaging commands and source-manifest conventions are documented in [ARCHITECTURE.md](ARCHITECTURE.md).

## Static hosting

Serve `dist/` from an HTTPS static host. Relative paths support a repository subdirectory. The included Pages workflow validates the source and compatibility matrix before deploying `dist/`. When using a fork, select **GitHub Actions** as the Pages source.

## Linux and SLURM analysis

Follow [analysis/README.md](../analysis/README.md) to create the controller environment and configure read roles, CB/UMI coordinates, references, samples and resources. The **Install & cluster** workspace links those templates and the analysis ZIP. Set the SLURM account/partition and shared paths for the target cluster before submitting jobs.

The [software methods](software-methods.md) define retained molecular layers and QC denominators. [Publishing records](PUBLISHING.md) link the source, DOI archives and package-review status.
