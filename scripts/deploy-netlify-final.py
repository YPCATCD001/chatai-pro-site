#!/usr/bin/env python3
"""Netlify 全自动部署脚本 - 不使用代理"""
import os, subprocess, json, hashlib, time, sys, tempfile

TOKEN = "nfp_3eDoe5u3X9NYEyzKv4fwhGQ7zzrtJmjMcdd8"
SITE_ID = "00de2ab0-d070-47e8-9162-8e3558545393"
DEPLOY_DIR = "/workspace/.netlify/deploy"
STATIC_DIR = "/workspace/.netlify/static"
FUNC_FILE = "/workspace/.netlify/functions/___netlify-server-handler.zip"
API = "https://api.netlify.com/api/v1"

def curl_json(*args, timeout=120, method="GET"):
    """调用 Netlify API 并返回 JSON"""
    cmd = ["curl", "-sS", "-m", str(timeout),
           "-H", f"Authorization: Bearer {TOKEN}",
           "-H", "Content-Type: application/json"]
    cmd.extend(args)
    result = subprocess.run(cmd, capture_output=True, text=True)
    try:
        return json.loads(result.stdout), result.returncode
    except json.JSONDecodeError:
        return {"_raw": result.stdout[:200], "_stderr": result.stderr[:200]}, result.returncode

def curl_upload(upload_url, file_path, content_type, timeout=600):
    """上传文件到 Netlify"""
    cmd = ["curl", "-sS", "-m", str(timeout),
           "-H", f"Authorization: Bearer {TOKEN}",
           "-H", f"Content-Type: {content_type}",
           "-X", "PUT",
           "--data-binary", f"@{file_path}",
           upload_url]
    result = subprocess.run(cmd, capture_output=True, text=True)
    try:
        data = json.loads(result.stdout)
        return data, result.returncode
    except:
        return {"_raw": result.stdout[:200], "_stderr": result.stderr[:200]}, result.returncode

def curl_upload_text(upload_url, content, content_type, timeout=60):
    """上传文本内容"""
    tf = tempfile.NamedTemporaryFile(mode="w", delete=False, suffix=".txt")
    tf.write(content)
    tf.close()
    try:
        return curl_upload(upload_url, tf.name, content_type, timeout)
    finally:
        os.unlink(tf.name)

def sha1_of_file(path):
    """计算文件 SHA1"""
    h = hashlib.sha1()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1024*1024), b""):
            h.update(chunk)
    return h.hexdigest()

def build_file_list():
    """构建文件列表: {deploy_path: sha1}"""
    files = {}
    file_map = {}  # sha1 -> (path, full_path)

    # 1. deploy 目录中的 HTML/静态文件
    if os.path.isdir(DEPLOY_DIR):
        for root, dirs, filenames in os.walk(DEPLOY_DIR):
            for fn in filenames:
                full = os.path.join(root, fn)
                rel = os.path.relpath(full, DEPLOY_DIR).replace(os.sep, "/")
                sha = sha1_of_file(full)
                files[rel] = sha
                file_map[sha] = (rel, full)

    # 2. _next/static 资源
    ns_dir = os.path.join(STATIC_DIR, "_next", "static")
    if os.path.isdir(ns_dir):
        for root, dirs, filenames in os.walk(ns_dir):
            for fn in filenames:
                full = os.path.join(root, fn)
                rel = os.path.relpath(full, STATIC_DIR).replace(os.sep, "/")
                sha = sha1_of_file(full)
                files[rel] = sha
                file_map[sha] = (rel, full)

    # 3. 函数 zip
    if os.path.exists(FUNC_FILE):
        func_sha = sha1_of_file(FUNC_FILE)
        files["___netlify-server-handler.zip"] = func_sha
        file_map[func_sha] = ("___netlify-server-handler.zip", FUNC_FILE)

    # 4. _redirects 文件
    redirects_content = "/*    /.netlify/functions/___netlify-server-handler    200\n"
    redirects_hash = hashlib.sha1(redirects_content.encode()).hexdigest()
    files["_redirects"] = redirects_hash
    file_map[redirects_hash] = ("_redirects", None)

    print(f"  共 {len(files)} 个文件（含函数）")
    if os.path.exists(FUNC_FILE):
        print(f"  函数文件: {FUNC_FILE}")
        print(f"  函数大小: {os.path.getsize(FUNC_FILE):,} bytes")
        print(f"  函数 SHA1: {func_sha}")
    return files, file_map, redirects_content

def get_content_type(path):
    """根据路径推断 Content-Type"""
    if path.endswith(".html"): return "text/html; charset=utf-8"
    if path.endswith(".json"): return "application/json; charset=utf-8"
    if path.endswith(".css"): return "text/css; charset=utf-8"
    if path.endswith(".js") or path.endswith(".mjs"): return "application/javascript; charset=utf-8"
    if path.endswith(".svg"): return "image/svg+xml"
    if path.endswith(".png"): return "image/png"
    if path.endswith(".woff2"): return "font/woff2"
    if path.endswith(".ico"): return "image/x-icon"
    if path.endswith(".zip"): return "application/zip"
    return "application/octet-stream"

def main():
    print("=" * 60)
    print("ChatAI Pro - Netlify 全自动部署")
    print("=" * 60)

    # Step 1: 检查站点
    print("\n[1/5] 检查站点...")
    site, rc = curl_json(f"{API}/sites/{SITE_ID}")
    print(f"  名称: {site.get('name')}")
    print(f"  URL: {site.get('url')}")
    print(f"  状态: {site.get('state')}")
    print(f"  Published deploy: {site.get('published_deploy_id')}")

    # Step 2: 构建文件列表
    print("\n[2/5] 构建文件清单...")
    files, file_map, redirects = build_file_list()

    # Step 3: 创建部署
    print("\n[3/5] 创建部署...")
    payload = {"files": files}
    # 函数元数据（不含 sha，让 Netlify 通过 files 识别）
    payload["functions"] = {
        "___netlify-server-handler": {
            "archive": "___netlify-server-handler.zip",
            "runtime": "nodejs24.x"
        }
    }
    
    # 通过临时文件发送 payload（避免命令行参数过长）
    with tempfile.NamedTemporaryFile(mode="w", delete=False, suffix=".json") as tf:
        json.dump(payload, tf)
        payload_file = tf.name
    
    deploy, rc = curl_json("-X", "POST", "-d", f"@{payload_file}",
                          f"{API}/sites/{SITE_ID}/deploys")
    os.unlink(payload_file)
    
    deploy_id = deploy.get("id")
    state = deploy.get("state")
    required = deploy.get("required", [])
    required_functions = deploy.get("required_functions", [])
    deploy_functions = deploy.get("functions", [])
    
    print(f"  Deploy ID: {deploy_id}")
    print(f"  State: {state}")
    print(f"  Required files: {len(required)}")
    print(f"  Required functions: {len(required_functions)}")
    if required_functions:
        for f in required_functions:
            print(f"    - {json.dumps(f)[:200]}")
    print(f"  Deploy functions: {len(deploy_functions)}")
    
    if not deploy_id:
        print(f"\n  错误: 部署创建失败!")
        print(f"  响应: {json.dumps(deploy)[:500]}")
        sys.exit(1)

    # Step 4: 上传文件
    print(f"\n[4/5] 上传 {len(required)} 个文件...")
    for i, sha in enumerate(required):
        info = file_map.get(sha)
        if not info:
            print(f"  [{i+1}/{len(required)}] SKIP (找不到 sha: {sha[:16]}...)")
            continue
        
        deploy_path, full_path = info
        print(f"  [{i+1}/{len(required)}] 上传 {deploy_path}")
        
        if deploy_path == "_redirects":
            data, rc = curl_upload_text(
                f"{API}/deploys/{deploy_id}/files/{deploy_path}",
                redirects, "text/plain; charset=utf-8"
            )
        else:
            ct = get_content_type(deploy_path)
            data, rc = curl_upload(
                f"{API}/deploys/{deploy_id}/files/{deploy_path}",
                full_path, ct
            )
        
        if isinstance(data, dict) and data.get("code") and data.get("code") >= 400:
            print(f"    错误: {json.dumps(data)[:200]}")
        elif not data or isinstance(data, dict) and not data.get("id") and not data.get("path"):
            # 可能返回空，检查是否成功
            pass
        else:
            ok_info = ""
            if isinstance(data, dict):
                if data.get("id"): ok_info = f"id={data.get('id')}"
                elif data.get("path"): ok_info = f"path={data.get('path')}"
                else: ok_info = "OK"
            print(f"    成功 ({ok_info})")

    # Step 5: 发布部署
    print("\n[5/5] 发布部署...")
    result, rc = curl_json("-X", "POST", f"{API}/deploys/{deploy_id}/publish")
    print(f"  结果: state={result.get('state')}")
    
    # 等待部署 ready
    print("\n等待部署就绪...")
    for i in range(30):
        time.sleep(5)
        status, rc = curl_json(f"{API}/deploys/{deploy_id}")
        state = status.get("state")
        funcs = len(status.get("functions", []))
        print(f"  [{i*5}s] state={state}, functions={funcs}")
        if state == "ready" or state == "published":
            print("  ✓ 部署完成!")
            break
        if state == "error":
            print(f"  ✗ 部署错误: {status.get('error_message')}")
            break
    
    print("\n" + "=" * 60)
    print(f"站点 URL: https://{site.get('name')}.netlify.app")
    print(f"部署详情: https://app.netlify.com/sites/{site.get('name')}/deploys/{deploy_id}")
    print("=" * 60)

if __name__ == "__main__":
    main()
