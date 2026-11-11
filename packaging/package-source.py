"""Build and verify a source ZIP from the canonical allowlisted snapshot."""
from pathlib import Path
import argparse
import hashlib
import json
import shutil
import subprocess
import zipfile

root = Path(__file__).resolve().parents[1]
package = json.loads((root / "package.json").read_text(encoding="utf-8"))
version = package["version"]
suffix = "-ProjectLocal" if package.get("yvDistribution") == "project-local" else ""
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--output-directory", type=Path, default=root / "releases")
args = parser.parse_args()
release_root = args.output_directory.resolve()
release_root.relative_to((root / "releases").resolve())
release_root.mkdir(parents=True, exist_ok=True)
target = release_root / f"YeastVar1011-{version}-Source{suffix}.zip"
if target.exists():
    raise SystemExit("This source ZIP already exists; choose a new release version or remove an unissued build.")
result = subprocess.run(["node", str(root / "scripts/prepare-public.cjs")], cwd=root,
                        check=True, text=True, capture_output=True)
snapshot = Path(json.loads(result.stdout)["path"])
assert snapshot.parent.resolve() == (root / "releases").resolve() and snapshot.name.startswith("public-source-")
try:
    subprocess.run(["node", str(snapshot / "scripts/source-manifest.cjs"), "--check"], cwd=snapshot, check=True)
    manifest = json.loads((snapshot / "source-manifest.json").read_text(encoding="utf-8"))
    files = [item["path"] for item in manifest["files"]] + ["source-manifest.json"]
    with zipfile.ZipFile(target, "w") as archive:
        for name in files:
            entry = zipfile.ZipInfo("YeastVar1011/" + name, (1980, 1, 1, 0, 0, 0))
            entry.create_system = 3
            entry.external_attr = (0o100755 if name.endswith(".sh") else 0o100644) << 16
            archive.writestr(entry, (snapshot / name).read_bytes(),
                             compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
    with zipfile.ZipFile(target) as archive:
        assert archive.testzip() is None
        assert len(archive.namelist()) == len(set(archive.namelist())) == len(files)
        assert set(archive.namelist()) == {"YeastVar1011/" + name for name in files}
        for item in manifest["files"]:
            data = archive.read("YeastVar1011/" + item["path"])
            assert len(data) == item["bytes"] and hashlib.sha256(data).hexdigest() == item["sha256"], item["path"]
    digest = hashlib.sha256(target.read_bytes()).hexdigest()
    target.with_name(target.name + ".sha256.txt").write_text(digest + "  " + target.name + "\n", encoding="utf-8")
    print(json.dumps({"archive": str(target), "files": len(files), "bytes": target.stat().st_size,
                      "sha256": digest, "verified": True}))
finally:
    shutil.rmtree(snapshot)
