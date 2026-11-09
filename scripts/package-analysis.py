"""Build the downloadable QC source package from an explicit source allowlist."""
from pathlib import Path
import hashlib
import json
import zipfile

root = Path(__file__).resolve().parents[1]
version = json.loads((root / "package.json").read_text(encoding="utf-8"))["version"]
files = ["README.md", "config.example.yaml", "samples.example.tsv", "environment.yaml", "run.sh", ".gitignore", "profiles/slurm/config.yaml", "workflow/Snakefile", "workflow/envs/qc.yaml", "workflow/scripts/qc.py", "tests/test_pipeline.py", "tests/make_fixture.py", "tests/assert_e2e.py"]
target = root / "dist/assets/downloads" / f"YeastVar1011-analysis-v{version}.zip"
target.parent.mkdir(parents=True, exist_ok=True)
manifest = {"version": version, "files": []}


def add_file(archive, name, data):
    entry = zipfile.ZipInfo("YeastVar1011-analysis/" + name, (1980, 1, 1, 0, 0, 0))
    entry.create_system = 3
    entry.external_attr = 0o100644 << 16
    archive.writestr(entry, data, compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)


with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
    for name in files:
        data = (root / "analysis" / name).read_bytes().replace(b"\r\n", b"\n")
        add_file(archive, name, data)
        manifest["files"].append({"path": name, "sha256": hashlib.sha256(data).hexdigest(), "bytes": len(data)})
    add_file(archive, "LICENSE", (root / "LICENSE").read_bytes().replace(b"\r\n", b"\n"))
    add_file(archive, "source-manifest.json", (json.dumps(manifest, indent=2) + "\n").encode("utf-8"))
digest = hashlib.sha256(target.read_bytes()).hexdigest()
target.with_name(target.name + ".sha256.txt").write_text(digest + "  " + target.name + "\n", encoding="utf-8")
print(json.dumps({"path": str(target), "source_files": len(files), "bytes": target.stat().st_size, "sha256": digest}))
