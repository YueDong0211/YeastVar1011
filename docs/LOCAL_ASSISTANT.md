# Local research companion

The companion can generate short explanations in the browser using **Qwen2.5-0.5B-Instruct**, with relevant YeastVar catalogue entries supplied as context by the interface. It does not require an API key or send questions to an inference service. Matched questions first display a labelled source summary. **Explain with Qwen** requests an optional generated explanation. Unmatched questions return search guidance without starting generation. The model does not assign marker functions or cell states.

Current-plan review and workspace guidance are deterministic interface functions, available without model loading. Plan review separates declared inputs, planned outputs and missing prerequisites, and offers direct links to the inventory and review. Turning off **Use current plan** excludes plan reads from source rendering and model context, including explanations of earlier plan reviews. When a plan changes, an earlier review is marked as stale.

The interface buffers generated text until generation completes. If the response contains no valid numbered reference to the supplied evidence, it displays the source summary instead and explains the substitution. This checks reference syntax and range, not scientific entailment. Small-model prose can still misinterpret evidence; source records remain visible and the model cannot write marker labels, change a plan or create citations. Browser testing of this update found unsupported explanations, which motivated source-first answers and the no-match gate.

## Loading and storage

Model loading starts only after the user selects the load button. The application does not prefetch model weights when a page or the companion panel opens. The first load retrieves fixed, public model files from Hugging Face. Subsequent loads reuse this browser's model cache when available. Browser storage policies, private browsing and user-cleared storage can remove the cache.

Cached model files are checked against the byte lengths published for the pinned model revision. The worker checks available uncompressed length headers and counts the actual response stream without creating a second full weight buffer. A missing or mismatched body is removed from this model cache. A mismatched header is discarded before use; a truncated body encountered during reading stops that load with `MODEL_FILE_INCOMPLETE`, after which loading again retrieves the missing file. These are completeness checks, not a cryptographic content checksum. The browser's `cached` state becomes true only after all five fixed model files have been read from, or successfully written to, the cache.

The selected model files total **519,136,999 bytes** (about 519 MB, or 495 MiB), including tokenizer and configuration files. The local JavaScript and WebAssembly runtime files total **22,528,676 bytes**. These are file sizes, not estimates of working memory. Memory consumption and generation speed depend on the browser and device.

The model is downloaded separately from the portable workstation archive. After those files have been cached, the locally served workstation can generate responses without external network access. This does not add an offline page-installation service worker to the hosted website.

### Loading from the model cache only

`load({offline: true})` requires the five fixed model files to be present in this browser's model cache and prevents fallback model downloads. The default remains `offline: false`. Unload an existing session before changing this option; calling `load()` on an already ready model reuses that session.

The worker first checks the canonical cache entries. It then uses Transformers.js `allowLocalModels=true`, `allowRemoteModels=false` and `local_files_only=true`. These settings alone are not a cache-only feature in Transformers.js 3.8.1: its model-file loader checks the custom cache before network fallback but can still try a local model path on a miss. Disabling both local and remote models instead fails a configuration check before looking in the cache.

An additional fetch guard inside this dedicated offline worker therefore rejects every fetch except GET/HEAD requests for the bundled JavaScript, module and WebAssembly runtime files under the same-origin `vendor/transformers-3.8.1/` directory. Model requests are rejected before the original fetch function runs, including the library's local-path fallback. Missing cache files, or a missing-file fallback after the initial check, produce `MODEL_OFFLINE_FILES_MISSING`. Existing response-stream checks still reject incomplete cached bodies. The guard belongs to that worker and leaves ordinary model-loading workers and the main page unchanged. The local web server must still serve the application and its bundled runtime files.

“Stop” terminates the worker and interrupts generation or downloading. “Release model” also releases the worker's model memory. “Clear model cache” releases the model and deletes only `yeastvar-local-qwen25-05b-q8-v22`; it does not clear research plans, marker selections, preferences or other websites' caches. Cancelled partial downloads may need to restart.

Concurrent cache-clear requests share one deletion operation. A load attempted before it finishes returns `MODEL_CACHE_CLEARING`; await the deletion before loading again. Failed deletion preserves an explicit storage warning and permits a later retry. Messages or rejected generations from a released worker cannot change the replacement worker's state. Worker script or message-decoding failures terminate that worker, reject its pending operations and leave loading available for a fresh attempt.

### Importing existing model files

Users who already downloaded the pinned model can select these five local files together. The weight file's on-disk parent directory is irrelevant; its basename must remain `model_quantized.onnx`.

| Local filename | Exact bytes | File in the pinned model repository |
| --- | ---: | --- |
| `config.json` | 678 | `config.json` |
| `generation_config.json` | 242 | `generation_config.json` |
| `tokenizer_config.json` | 7,849 | `tokenizer_config.json` |
| `tokenizer.json` | 7,031,673 | `tokenizer.json` |
| `model_quantized.onnx` | 512,096,557 | `onnx/model_quantized.onnx` |

The importer accepts an array of browser `File` objects or a file input's `FileList`. It checks all filenames, duplicate names, completeness and exact sizes before opening or writing the cache. It streams `Response(file)` into the same model cache used by Transformers.js, without uploading files, creating a model worker or allocating a complete file `ArrayBuffer`. The keys use the fixed Hugging Face resolve URL and revision, including `onnx/` for the weight, then the existing same-origin cache-key encoding. These filenames and sizes verify completeness; users should obtain the files from the linked pinned model revision. They do not establish a full cryptographic content check.

Starting an import releases an active model session. Import, load and cache deletion cannot run concurrently; a competing operation returns `MODEL_CACHE_IMPORTING` or `MODEL_CACHE_CLEARING`. A storage failure leaves `cached` false and reports the error. Successful files may remain if a later write fails; repeat the complete import after storage is available. A successful import reports five files and 519,136,999 bytes, leaves the model unloaded, and makes loading from that cache available. Browser storage remains subject to quota and eviction policies.

## Fixed model and runtime

| Component | Locked value |
| --- | --- |
| Model | `onnx-community/Qwen2.5-0.5B-Instruct` |
| Model revision | `22942cb7d7ba4cc81bb4673549ca4d4614469b5e` |
| Quantization | `q8` (`onnx/model_quantized.onnx`) |
| ONNX weight bytes | 512,096,557 |
| ONNX weight SHA-256 | `41834041ab1b29eff9fc592f1a29a1844133aea35832ea9fa91682be13016100` |
| Runtime | Transformers.js 3.8.1 |
| Bundled ONNX Runtime Web | `1.22.0-dev.20250409-89f8206ba4` |
| Prompt limit | 2,048 tokenizer tokens |
| Output limit | 256 new tokens; default 128 |
| Decoding | Greedy, repetition penalty 1.1 |
| Worker | Dedicated module Web Worker |
| Devices | WebGPU when available; WebAssembly CPU fallback |

The limits are application resource controls, not the model's advertised maximum context length. Earlier conversation turns are removed first if the prompt exceeds the application limit; a remaining oversized prompt produces an explicit error rather than being silently truncated. The caller controls which catalogue excerpts enter the prompt.

Device detection does not establish that every GPU operator will run. The worker performs a one-token WebGPU warm-up; a rejected GPU session or first execution is disposed before the same q8 model is loaded on the WebAssembly CPU backend. The warning `gpu-fallback` records that change. A CPU failure remains visible instead of entering an automatic reload loop.

The q8 file is smaller than this repository's q4 export (786,156,820 bytes). Quantization labels alone do not determine complete download size. q8 also provides a single weight file that can be reused by both supported execution backends. The model's `q4f16` export is smaller again, but requires float16 support and is not selected for the CPU compatibility path.

The runtime is shipped locally in `dist/vendor/transformers-3.8.1/`, with npm integrity and per-file SHA-256 values recorded in its `manifest.json`. No runtime code is loaded from a CDN. Remote custom model code is disabled; the application fixes the model identifier, revision and allowed generation options.

## Interface contract

`window.YV_LOCAL_MODEL` provides:

```javascript
const unsubscribe = YV_LOCAL_MODEL.onState(state => {
  // status: idle, loading, ready, generating or error
  // device, progress, downloaded, total, cached, offline, error and warning
});

// Run only in response to the user's load action.
await YV_LOCAL_MODEL.load({ device: 'auto' }); // also 'wasm' or 'webgpu'
// To require existing model-cache files without a fallback model download:
// YV_LOCAL_MODEL.unload();
// await YV_LOCAL_MODEL.load({ device: 'wasm', offline: true });

const response = await YV_LOCAL_MODEL.generate([
  { role: 'system', content: 'Use the supplied catalogue evidence.' },
  { role: 'user', content: 'Explain the selected QC metrics.' }
], { maxNewTokens: 128, onToken: chunk => appendText(chunk) });

YV_LOCAL_MODEL.cancel();
YV_LOCAL_MODEL.unload();
await YV_LOCAL_MODEL.clearCache();
// fileInput is an ordinary <input type="file" multiple> selected by the user.
await YV_LOCAL_MODEL.importFiles(fileInput.files);
// Public file metadata for a picker and download-source list:
console.table(YV_LOCAL_MODEL.info.expectedFiles); // name, path and exact bytes
unsubscribe();
```

The model produces explanatory text. Catalogue links, record identifiers, citations and actions must be generated from the actual catalogue records by the interface. Model output is not executable markup and cannot autonomously alter a research plan, start a pipeline, submit data or create citations.

Keep instructions and context short. During browser testing, the small model correctly repeated a supplied G1/S association in a minimal prompt but misinterpreted a longer marker evidence context. Marker summaries therefore use the database directly. Generated prose is not used to create annotation labels or update the marker library.

## Verification

`node research/qa-local-model-lifecycle-v22.cjs` checks lazy initialization, deployment subpaths, simultaneous loading, streaming callbacks, allowed generation options, concurrency control, cancellation, stale worker messages, unload/reload races, message transport failures, isolated cache deletion and cache-clear/load races. Local-import checks cover missing, duplicate, unexpected and wrong-size files before any cache write, array and FileList-shaped inputs, exact canonical keys, streamed byte counts, model-session release, competing cache operations and failed-storage recovery. Cache-only checks verify the explicit boolean option, preflight rejection before model-session creation, canonical cache lookup, complete streamed file reads, denied model fetches before the native function runs, allowed bundled runtime fetches, a cache race after preflight and unchanged normal-worker behavior. It also runs the production worker's request handler with an isolated runtime double to check corrupted cache headers and streams, decoded HTTP body lengths, fixed model options, explicit context errors and GPU warm-up fallback. An unfinished test promise fails the process instead of silently exiting successfully. These doubles do not establish inference correctness or performance.

`node research/qa-local-model-v22.cjs` is the separate real-model browser test. It requires the actual model download or an existing cache, generates Chinese text, reloads cached weights with external HTTPS blocked and checks that model requests contain no prompt submission. Its execution report is saved under the ignored `research/cache/v22-local-model/` directory. Results should be reported only after that test completes.

When a file named `research/cache/v22-local-model/model_quantized.onnx` is available, the test first verifies its SHA-256 against the fixed model's published LFS checksum. It then serves those exact bytes from a temporary local HTTP server in place of the weight-download response. Tokenization and inference still execute in the unmodified application worker. The report records `fixtureVerified: true` for this mode; it tests real model execution without re-downloading 512 MB for every run.

## Sources and licensing

- [Original Qwen model card and Apache 2.0 license](https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct).
- [Fixed ONNX model revision and files](https://huggingface.co/onnx-community/Qwen2.5-0.5B-Instruct/tree/22942cb7d7ba4cc81bb4673549ca4d4614469b5e).
- [Pinned model file metadata, byte lengths and LFS checksum](https://huggingface.co/api/models/onnx-community/Qwen2.5-0.5B-Instruct/tree/22942cb7d7ba4cc81bb4673549ca4d4614469b5e?recursive=true).
- [Transformers.js dtype documentation](https://huggingface.co/docs/transformers.js/en/guides/dtypes).
- [Transformers.js environment and custom cache API](https://huggingface.co/docs/transformers.js/v3.8.1/api/env).
- [Transformers.js custom runtime paths](https://huggingface.co/docs/transformers.js/v3.8.1/custom_usage).
- [Transformers.js 3.8.1 model-file download and cache implementation](https://github.com/huggingface/transformers.js/blob/3.8.1/src/utils/hub.js).
- [Transformers.js 3.8.1 streaming callbacks](https://huggingface.co/docs/transformers.js/v3.8.1/api/generation/streamers).
- [WebLLM browser requirements](https://webllm.mlc.ai/docs/user/get_started.html). WebLLM was considered, but its WebGPU requirement does not provide the CPU fallback used here.

The vendor directory includes the Apache 2.0 runtime/model licenses, ONNX Runtime MIT license and Hugging Face Jinja MIT license. The model is not a scientific reference database: the workstation's curated evidence records supply the research context and source links.
