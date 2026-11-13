#!/usr/bin/env python3
"""Audit-fix deploy for Nyota demo (23 Oct 2026): #refund section + link,
Referrer-Policy header. Uploads index.html, vercel.json, assets/* fresh,
creates a production deploy. Unreferenced files (reel mp4, old bak, json)
are deliberately NOT uploaded."""
import base64, glob, hashlib, json, os, subprocess, sys

VERCEL = "/opt/hatch/bin/vercel"
BASE = "/home/hatch/workspace/nyota-demo-deploy"
FILES = ["index.html", "vercel.json"] + sorted(
    os.path.relpath(p, BASE) for p in glob.glob(f"{BASE}/assets/*"))

def call_tool(name, args):
    p = subprocess.run([VERCEL, "call-tool", "--name", name,
                        "--arguments-json", json.dumps(args)],
                       capture_output=True, text=True, timeout=180)
    return p.returncode, (p.stdout or "") + (p.stderr or "")

files = []
for deploy_path in FILES:
    data = open(f"{BASE}/{deploy_path}", "rb").read()
    sha = hashlib.sha1(data).hexdigest()
    rc, out = call_tool("upload_file", {
        "requestBody": base64.b64encode(data).decode(),
        "contentLength": len(data), "xVercelDigest": sha,
    })
    print(f"upload {deploy_path}: rc={rc} sha={sha} size={len(data)}")
    if rc != 0:
        print("UPLOAD FAILED — stopping"); print(out[:600]); sys.exit(1)
    files.append({"file": deploy_path, "sha": sha, "size": len(data)})

print(f"total files: {len(files)}")
rc, out = call_tool("create_deployment", {
    "skipAutoDetectionConfirmation": "1",
    "requestBody": {"name": "nyota-demo", "target": "production", "files": files},
})
print(f"create_deployment rc={rc}")
print(out[:2000])
