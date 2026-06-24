#!/usr/bin/env python3
import os, sys, json, hashlib, urllib.request, ssl

PROXY_HOST = "127.0.0.1"
PROXY_PORT = 18080
HOST = "api.netlify.com"
SITE_ID = "00de2ab0-d070-47e8-9162-8e3558545393"
TOKEN = "nfp_3eDoe5u3X9NYEyzKv4fwhGQ7zzrtJmjMcdd8"

# 通过 HTTP 代理连接 HTTPS
def api_request(method, path, body=None, content_type="application/json", timeout=120):
    import http.client

    # 1) CONNECT through proxy
    conn = http.client.HTTPConnection(PROXY_HOST, PROXY_PORT, timeout=timeout)
    conn.set_tunnel(HOST, port=443)
    conn.connect()

    # 2) Now send the HTTPS request through the tunnel
    # Actually, set_tunnel+connect handles the CONNECT, then we use the connection
    # as an HTTPS connection
    ssl_context = ssl.create_default_context()
    https_conn = http.client.HTTPSConnection(
        HOST, 443, timeout=timeout, context=ssl_context
    )
    # Replace the socket with our tunneled socket
    https_conn.sock = conn.sock

    headers = {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": content_type,
        "User-Agent": "TraeDeploy/1.0",
    }
    if body is not None:
        headers["Content-Length"] = str(len(body))

    https_conn.request(method, path, body, headers)
    resp = https_conn.getresponse()
    resp_body = resp.read()
    https_conn.close()
    conn.close()
    return resp.status, resp_body

# 构建文件清单
def sha1_file(path):
    h = hashlib.sha1()
    with open(path, "rb") as f:
        while True:
            chunk = f.read(65536)
            if not chunk: break
            h.update(chunk)
    return h.hexdigest()

# 1. 读取静态资源
print("=== 构建文件清单 ===")
files = {}
file_contents = {}

# 从 .netlify/deploy 读取 HTML
deploy_dir = "/workspace/.netlify/deploy/v1/blobs/deploy"
if os.path.exists(deploy_dir):
    for name in os.listdir(deploy_dir):
        full = os.path.join(deploy_dir, name)
        raw = open(full, "rb").read()
        try:
            decoded = json.loads(raw.decode("utf8"))
            html = decoded.get("html", "").encode("utf8")
        except:
            try: html = raw.decode("utf8").encode("utf8")
            except: html = raw

        try:
            fname = __import__("base64").b64decode(name).decode("utf8")
        except:
            fname = name

        if fname == "/index":
            deploy_name = "index.html"
        elif fname == "/404.html" or fname == "404":
            deploy_name = "404.html"
        elif fname == "/500.html" or fname == "500":
            deploy_name = "500.html"
        elif fname.startswith("/"):
            deploy_name = fname[1:] + "/index.html"
        else:
            deploy_name = fname + "/index.html"

        h = hashlib.sha1()
        h.update(html)
        files[deploy_name] = h.hexdigest()
        file_contents[deploy_name] = (html, "text/html; charset=utf-8")

# 从 .netlify/static 读取静态资源
static_dir = "/workspace/.netlify/static/_next/static"
if os.path.exists(static_dir):
    for root, dirs, fnames in os.walk(static_dir):
        for fn in fnames:
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, "/workspace/.netlify/static")
            content = open(full, "rb").read()
            h = hashlib.sha1()
            h.update(content)
            ext = os.path.splitext(fn)[1].lower()
            mime = "application/octet-stream"
            if ext == ".js": mime = "application/javascript; charset=utf-8"
            elif ext == ".css": mime = "text/css; charset=utf-8"
            elif ext == ".json": mime = "application/json; charset=utf-8"
            elif ext == ".png": mime = "image/png"
            elif ext == ".svg": mime = "image/svg+xml"
            files[rel] = h.hexdigest()
            file_contents[rel] = (content, mime)

print(f"  {len(files)} 个静态文件")

# 2. 函数
func_path = "/workspace/.netlify/functions/___netlify-server-handler.zip"
func_hash = sha1_file(func_path)
func_buf = open(func_path, "rb").read()
func_size = len(func_buf)
print(f"  函数: {func_size} bytes")

# 3. _redirects
redirects = (
    "/api/* /.netlify/functions/___netlify-server-handler 200\n"
    "/_next/data/* /.netlify/functions/___netlify-server-handler 200\n"
    "/* /.netlify/functions/___netlify-server-handler 200\n"
).encode("utf-8")
h = hashlib.sha1()
h.update(redirects)
files["_redirects"] = h.hexdigest()
file_contents["_redirects"] = (redirects, "text/plain")

# 4. 创建 deploy
print("\n=== 创建 Deploy ===")
payload = json.dumps({
    "files": files,
    "functions": {
        "___netlify-server-handler": {
            "archive": "___netlify-server-handler.zip",
            "runtime": "nodejs24.x"
        }
    }
}).encode("utf-8")

status, body = api_request("POST", f"/api/v1/sites/{SITE_ID}/deploys", payload, "application/json", 120)
if status < 200 or status >= 300:
    print(f"错误 ({status}): {body.decode()[:500]}")
    sys.exit(1)

deploy = json.loads(body)
deploy_id = deploy["id"]
print(f"Deploy ID: {deploy_id}")
print(f"State: {deploy.get('state')}")
print(f"Required: {len(deploy.get('required', []))} files")
print(f"Required functions: {deploy.get('required_functions', [])}")

# 5. 上传静态文件
print(f"\n=== 上传 {len(file_contents)} 个静态文件 ===")
for i, (fpath, (content, mime)) in enumerate(file_contents.items()):
    encoded = urllib.parse.quote(fpath, safe="")
    status, body = api_request(
        "PUT", f"/api/v1/deploys/{deploy_id}/files/{encoded}",
        content, mime, 60
    )
    if 200 <= status < 300:
        print(f"  [{i+1}/{len(file_contents)}] OK {fpath} ({len(content)} bytes)")
    else:
        print(f"  [{i+1}/{len(file_contents)}] FAIL {fpath} ({status}): {body.decode()[:150]}")

# 6. 上传函数
print(f"\n=== 上传函数 ({func_size} bytes) ===")
encoded_name = urllib.parse.quote("___netlify-server-handler", safe="")
status, body = api_request(
    "PUT", f"/api/v1/deploys/{deploy_id}/functions/{encoded_name}?runtime=nodejs24.x",
    func_buf, "application/zip", 600
)
if 200 <= status < 300:
    print(f"  OK 函数上传成功!")
    try:
        info = json.loads(body)
        print(f"  响应: {json.dumps(info, indent=2)[:300]}")
    except:
        print(f"  响应: {body.decode()[:300]}")
else:
    print(f"  FAIL ({status}): {body.decode()[:500]}")

# 7. 等待部署完成
print("\n=== 等待部署完成 ===")
import time
for i in range(30):
    time.sleep(3)
    status, body = api_request("GET", f"/api/v1/deploys/{deploy_id}", None, "application/json", 30)
    try:
        info = json.loads(body)
        print(f"  状态: {info.get('state')} (locked: {info.get('locked')})")
        if info.get("state") in ("ready", "published"):
            break
    except:
        pass

print(f"\n=== 完成! ===")
print(f"URL: https://chatai-pro-2026.netlify.app")
print(f"Deploy: https://app.netlify.com/sites/chatai-pro-2026/deploys/{deploy_id}")
