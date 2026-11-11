# Verification suites

`tests/suites.json` is the maintained test inventory. `scripts/test.cjs` runs selected suites in order, stops on failure and returns a failing exit status. It uses the current Node.js runtime, `YV_PYTHON` or the platform Python command, and PowerShell for Windows package checks.

```sh
npm run test:list
npm test
npm run test:catalogue
npm run test:ci
```

`npm test` checks application syntax, source and release identity, the environment checker and the loopback server. `npm run test:ci` adds every maintained catalogue regression, real-browser smoke checks, Python package checks and assistant/cluster integration. It requires the npm development dependencies, Chromium and Python 3.12. The website workflow supplies a fixed official Playwright image.

`npm run test:portable` tests the extracted Windows package and its actual launcher. `npm run test:model` is a separate opt-in test of real Qwen inference and may download model weights. The real-model fixture and browser cache live in `.yeastvar-local/cache/local-model/`.

The runner starts its own loopback server on an available port for integration tests and closes only that process. Temporary files and browser reports stay under `.yeastvar-local/qa/`; successful runs remove their own output. A failed run retains its diagnostics. Use `--keep-output` with the runner to retain a successful run's reports.

Version suffixes in regression filenames identify the behaviour being protected. They do not indicate obsolete tests.
