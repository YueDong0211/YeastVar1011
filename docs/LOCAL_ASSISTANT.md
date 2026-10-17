# Local research companion

The companion can generate short explanations in the browser using **Qwen2.5-0.5B-Instruct**, with relevant YeastVar catalogue entries supplied as context by the interface. It does not require an API key or send questions to an inference service. The existing catalogue search remains available independently of the model. Exact marker questions use a clearly labelled source summary assembled from the evidence database; the model does not assign marker functions or cell states.

## Loading and storage

Model loading starts only after the user selects the load button. The application does not prefetch model weights when a page or the companion panel opens. The first load retrieves fixed, public model files from Hugging Face. Subsequent loads reuse this browser's model cache when available. Browser storage policies, private browsing and user-cleared storage can remove the cache.

The selected model files total **519,136,999 bytes** (about 519 MB, or 495 MiB), including tokenizer and configuration files. The local JavaScript and WebAssembly runtime files total **22,528,676 bytes**. These are file sizes, not estimates of working memory. Memory consumption and generation speed depend on the browser and device.

The model is downloaded separately from the portable workstation archive. After those files have been cached, the locally served workstation can generate responses without external network access. This does not add an offline page-installation service worker to the hosted website.

“Stop” terminates the worker and interrupts generation or downloading. “Release model” also releases the worker's model memory. “Clear model cache” releases the model and deletes only `yeastvar-local-qwen25-05b-q8-v22`; it does not clear research plans, marker selections, preferences or other websites' caches. Cancelled partial downloads may need to restart.

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

The q8 file is smaller than this repository's q4 export (786,156,820 bytes). Quantization labels alone do not determine complete download size. q8 also provides a single weight file that can be reused by both supported execution backends. The model's `q4f16` export is smaller again, but requires float16 support and is not selected for the CPU compatibility path.

The runtime is shipped locally in `dist/vendor/transformers-3.8.1/`, with npm integrity and per-file SHA-256 values recorded in its `manifest.json`. No runtime code is loaded from a CDN. Remote custom model code is disabled; the application fixes the model identifier, revision and allowed generation options.

## Interface contract

`window.YV_LOCAL_MODEL` provides:

```javascript
const unsubscribe = YV_LOCAL_MODEL.onState(state => {
  // status: idle, loading, ready, generating or error
  // device, progress, downloaded, total, cached, error and warning
});

// Run only in response to the user's load action.
await YV_LOCAL_MODEL.load({ device: 'auto' }); // also 'wasm' or 'webgpu'

const response = await YV_LOCAL_MODEL.generate([
  { role: 'system', content: 'Use the supplied catalogue evidence.' },
  { role: 'user', content: 'Explain the selected QC metrics.' }
], { maxNewTokens: 128, onToken: chunk => appendText(chunk) });

YV_LOCAL_MODEL.cancel();
YV_LOCAL_MODEL.unload();
await YV_LOCAL_MODEL.clearCache();
unsubscribe();
```

The model produces explanatory text. Catalogue links, record identifiers, citations and actions must be generated from the actual catalogue records by the interface. Model output is not executable markup and cannot autonomously alter a research plan, start a pipeline, submit data or create citations.

Keep instructions and context short. During browser testing, the small model correctly repeated a supplied G1/S association in a minimal prompt but misinterpreted a longer marker evidence context. Marker summaries therefore use the database directly. Generated prose is not used to create annotation labels or update the marker library.

## Verification

`node research/qa-local-model-lifecycle-v22.cjs` checks lazy initialization, deployment subpaths, simultaneous loading, streaming callbacks, allowed generation options, concurrency control, cancellation, stale worker messages, retry races and isolated cache deletion. This test uses a worker double and does not establish inference correctness.

`node research/qa-local-model-v22.cjs` is the separate real-model browser test. It requires the actual model download or an existing cache, generates Chinese text, reloads cached weights with external HTTPS blocked and checks that model requests contain no prompt submission. Its execution report is saved under the ignored `research/cache/v22-local-model/` directory. Results should be reported only after that test completes.

When a file named `research/cache/v22-local-model/model_quantized.onnx` is available, the test first verifies its SHA-256 against the fixed model's published LFS checksum. It then serves those exact bytes from a temporary local HTTP server in place of the weight-download response. Tokenization and inference still execute in the unmodified application worker. The report records `fixtureVerified: true` for this mode; it tests real model execution without re-downloading 512 MB for every run.

## Sources and licensing

- [Original Qwen model card and Apache 2.0 license](https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct).
- [Fixed ONNX model revision and files](https://huggingface.co/onnx-community/Qwen2.5-0.5B-Instruct/tree/22942cb7d7ba4cc81bb4673549ca4d4614469b5e).
- [Transformers.js dtype documentation](https://huggingface.co/docs/transformers.js/en/guides/dtypes).
- [Transformers.js environment and custom cache API](https://huggingface.co/docs/transformers.js/v3.8.1/api/env).
- [Transformers.js custom runtime paths](https://huggingface.co/docs/transformers.js/v3.8.1/custom_usage).
- [WebLLM browser requirements](https://webllm.mlc.ai/docs/user/get_started.html). WebLLM was considered, but its WebGPU requirement does not provide the CPU fallback used here.

The vendor directory includes the Apache 2.0 runtime/model licenses, ONNX Runtime MIT license and Hugging Face Jinja MIT license. The model is not a scientific reference database: the workstation's curated evidence records supply the research context and source links.
