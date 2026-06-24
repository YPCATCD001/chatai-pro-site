#!/usr/bin/env python3
import os, sys, json, hashlib, subprocess, urllib.parse

TOKEN = "nfp_3eDoe5u3X9NYEyzKv4fwhGQ7zzrtJmjMcdd8"
SITE_ID = "00de2ab0-d070-47e8-9162-8e3558545393"
PROXY = "http://127.0.0.1:18080"
API_BASE = "https://api.netlify.com"

def api_call(method, path, body_file=None, content_type="application/json", timeout=120):
    cmd = ["curl", "-sS", "-m", str(timeout),
           "-x", PROXY,
           "-H", f"Authorization: Bearer {TOKEN}",
           "-H", f"Content-Type: {content_type}",
           "-X", method,
           "-w", "\n%{http_code}",
           f"{API_BASE}{path}"]
    if body_file:
        cmd.extend(["--data-binary", f"@{body_file}"])

    result = subprocess.run(cmd, capture_output=True, check=False)
    raw = result.stdout.decode("utf-8", errors="replace")
    # Split at last newline for status code
    if "\n" in raw:
        body_part, status_part = raw.rsplit("\n", 1)
        try:
            status = int(status_part.strip())
        except ValueError:
            status = 0
            body_part = raw
    else:
        status = 0
        body_part = raw
    return status, body_part

def sha1_file(path):
    h = hashlib.sha1()
    with open(path, "rb") as f:
        while True:
            chunk = f.read(65536)
            if not chunk: break
            h.update(chunk)
    return h.hexdigest()

def sha1_bytes(data):
    return hashlib.sha1(data).hexdigest()

print("=== 构建文件清单 ===")
files = {}
file_paths = {}  # path -> (content_or_filepath, mime, is_file)

# 1. 读取 HTML
deploy_dir = "/workspace/.netlify/deploy/v1/blobs/deploy"
if os.path.exists(deploy_dir):
    for name in os.listdir(deploy_dir):
        full = os.path.join(deploy_dir, name)
        raw = open(full, "rb").read()
        try:
            blob = json.loads(raw.decode("utf8"))
            html = blob["html"] if isinstance(blob, dict) and "html" in blob else raw.decode("utf8")
            html_bytes = html.encode("utf8")
        except:
            try: html_bytes = raw.decode("utf8").encode("utf8")
            except: html_bytes = raw

        try: fname = __import__("base64").b64decode(name).decode("utf8")
        except: fname = name

        if fname == "/index": deploy_name = "index.html"
        elif fname in ("/404.html", "404"): deploy_name = "404.html"
        elif fname in ("/500.html", "500"): deploy_name = "500.html"
        elif fname.startswith("/"): deploy_name = fname[1:] + "/index.html"
        else: deploy_name = fname + "/index.html"

        files[deploy_name] = sha1_bytes(html_bytes)
        tmp = f"/tmp/deploy_{abs(hash(deploy_name))}.html"
        with open(tmp, "wb") as f: f.write(html_bytes)
        file_paths[deploy_name] = (tmp, "text/html; charset=utf-8")

# 2. 读取静态资源
static_dir = "/workspace/.netlify/static/_next/static"
if os.path.exists(static_dir):
    for root, dirs, fnames in os.walk(static_dir):
        for fn in fnames:
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, "/workspace/.netlify/static")
            files[rel] = sha1_file(full)
            ext = os.path.splitext(fn)[1].lower()
            mime = "application/octet-stream"
            if ext == ".js": mime = "application/javascript; charset=utf-8"
            elif ext == ".css": mime = "text/css; charset=utf-8"
            elif ext == ".json": mime = "application/json; charset=utf-8"
            elif ext == ".png": mime = "image/png"
            elif ext == ".svg": mime = "image/svg+xml"
            file_paths[rel] = (full, mime)

print(f"  {len(files)} 个静态文件")

# 3. _redirects
redirects = (
    "/api/* /.netlify/functions/___netlify-server-handler 200\n"
    "/_next/data/* /.netlify/functions/___netlify-server-handler 200\n"
    "/bots/* /.netlify/functions/___netlify-server-handler 200\n"
    "/dashboard /.netlify/functions/___netlify-server-handler 200\n"
    "/conversations/* /.netlify/functions/___netlify-server-handler 200\n"
    "/settings /.netlify/functions/___netlify-server-handler 200\n"
    "/analytics /.netlify/functions/___netlify-server-handler 200\n"
    "/* /.netlify/functions/___netlify-server-handler 200\n"
).encode("utf-8")
redirects_file = "/tmp/_redirects"
with open(redirects_file, "wb") as f: f.write(redirects)
files["_redirects"] = sha1_bytes(redirects)
file_paths["_redirects"] = (redirects_file, "text/plain")

# 4. 函数
func_file = "/workspace/.netlify/functions/___netlify-server-handler.zip"
func_sha = sha1_file(func_file)
func_size = os.path.getsize(func_file)
print(f"  函数: {func_size} bytes ({func_size/1024/1024:.1f}MB)")

# 5. 创建 deploy
print("\n=== 创建 Deploy ===")
payload = json.dumps({
    "files": files,
    "functions": {
        "___netlify-server-handler": {
            "archive": "___netlify-server-handler.zip",
            "runtime": "nodejs24.x"
        }
    }
})
payload_file = "/tmp/deploy_payload.json"
with open(payload_file, "w") as f: f.write(payload)

status, body = api_call("POST", f"/api/v1/sites/{SITE_ID}/deploys", payload_file, "application/json", 120)
if status < 200 or status >= 300:
    print(f"错误 ({status}): {body[:500]}")
    sys.exit(1)

deploy = json.loads(body)
deploy_id = deploy["id"]
print(f"Deploy ID: {deploy_id}")
print(f"State: {deploy.get('state')}")
print(f"Required: {len(deploy.get('required', []))} files")
print(f"Required functions: {deploy.get('required_functions', [])}")

# 6. 上传静态文件
print(f"\n=== 上传 {len(file_paths)} 个静态文件 ===")
for i, (fpath, (filepath, mime)) in enumerate(file_paths.items()):
    encoded = urllib.parse.quote(fpath, safe="")
    status, body = api_call("PUT", f"/api/v1/deploys/{deploy_id}/files/{encoded}", filepath, mime, 60)
    if 200 <= status < 300:
        print(f"  [{i+1}/{len(file_paths)}] OK {fpath}")
    else:
        print(f"  [{i+1}/{len(file_paths)}] FAIL {fpath} ({status}): {body[:200]}")

# 7. 上传函数
print(f"\n=== 上传函数 ({func_size/1024/1024:.1f}MB) ===")
status, body = api_call("PUT", f"/api/v1/deploys/{deploy_id}/functions/___netlify-server-handler?runtime=nodejs24.x", func_file, "application/zip", 600)
if 200 <= status < 300:
    print("  OK 函数上传成功!")
    try:
        info = json.loads(body)
        print(f"  函数信息: {json.dumps(info, indent=2)[:500]}")
    except:
        print(f"  响应: {body[:300]}")
else:
    print(f"  FAIL ({status}): {body[:500]}")

# 8. 等待部署完成
print("\n=== 等待部署完成 ===")
import time
for i in range(40):
    time.sleep(3)
    status, body = api_call("GET", f"/api/v1/deploys/{deploy_id}", None, "application/json", 30)
    try:
        info = json.loads(body)
        print(f"  状态: {info.get('state')} (locked: {info.get('locked')})")
        if info.get("state") in ("ready", "published"):
            break
    except:
        pass

print(f"\n=== 完成! ===")
print(f"站点: https://chatai-pro-2026.netlify.app")
print(f"Deploy: https://app.netlify.com/sites/chatai-pro-2026/deploys/{deploy_id}")
