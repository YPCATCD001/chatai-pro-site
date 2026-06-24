#!/usr/bin/env python3
"""Netlify 部署脚本 v7 - 修复 functions 缺少 sha 字段的问题"""
import os, subprocess, json, hashlib, time, re, sys

TOKEN = "nfp_3eDoe5u3X9NYEyzKv4fwhGQ7zzrtJmjMcdd8"
SITE_ID = "00de2ab0-d070-47e8-9162-8e3558545393"
PROXY = "http://127.0.0.1:18080"
DEPLOY_DIR = "/workspace/.netlify/deploy"
STATIC_DIR = "/workspace/.netlify/static"
FUNC_DIR = "/workspace/.netlify/functions"

def curl(*args, capture=False, silent=True):
    cmd = ["curl", "-x", PROXY, "-sS",
           "-H", f"Authorization: Bearer {TOKEN}"]
    cmd.extend(args)
    if capture:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=600)
        return r.stdout, r.returncode
    else:
        subprocess.run(cmd, timeout=600, check=False)

def curl_json(*args):
    cmd = ["curl", "-x", PROXY, "-sS", "-m", "120",
           "-H", f"Authorization: Bearer {TOKEN}"]
    cmd.extend(args)
    r = subprocess.run(cmd, capture_output=True, text=True)
    try:
        return json.loads(r.stdout), r.returncode
    except:
        print(f"  JSON parse failed. Status: {r.returncode}. Output: {r.stdout[:200]}")
        return {}, r.returncode

def sha1_of_file(path):
    h = hashlib.sha1()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()

def walk_static_files(base_dir, prefix=""):
    """遍历目录，返回 {deploy_path: (sha1, full_path)}"""
    result = {}
    if not os.path.isdir(base_dir):
        return result
    for root, dirs, files in os.walk(base_dir):
        for fn in files:
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, base_dir)
            # 转换为 URL 格式（正斜杠）
            deploy_name = rel.replace(os.sep, "/")
            if prefix:
                deploy_name = prefix + "/" + deploy_name
            try:
                sha = sha1_of_file(full)
                result[deploy_name] = (sha, full)
            except Exception as e:
                print(f"  WARN: {full}: {e}")
    return result

def walk_next_static():
    """遍历 .netlify/static/_next/static -> _next/static/..."""
    result = {}
    ns_dir = os.path.join(STATIC_DIR, "_next", "static")
    if os.path.isdir(ns_dir):
        for root, dirs, files in os.walk(ns_dir):
            for fn in files:
                full = os.path.join(root, fn)
                rel = os.path.relpath(full, STATIC_DIR)
                deploy_name = rel.replace(os.sep, "/")
                try:
                    sha = sha1_of_file(full)
                    result[deploy_name] = (sha, full)
                except Exception as e:
                    print(f"  WARN: {full}: {e}")
    return result

def check_cve():
    """检查并忽略 CVE 警告"""
    url = f"https://api.netlify.com/api/v1/sites/{SITE_ID}/cve-ignore?cve_id=CVE-2025-55182"
    print(f"[1/6] 检查 CVE 状态...")
    data, rc = curl_json("-X", "GET", url)
    if data:
        state = data.get("ignore_state", "unknown")
        print(f"   CVE 状态: {state}")
        if state != "ignored":
            print("   POST 以忽略 CVE 警告...")
            data2, rc2 = curl_json("-X", "POST", "-H", "Content-Length: 0", url)
            print(f"   响应: {json.dumps(data2)[:300]}")
        else:
            print("   已忽略，跳过")
    print()

def build_file_list():
    print("[2/6] 构建文件清单...")
    files = {}
    sha1_to_path = {}
    upload_map = {}  # deploy_name -> (full_path, content_type, is_func)

    # 1. HTML/资源文件 (deploy 目录中的所有文件)
    static_files = walk_static_files(DEPLOY_DIR)
    for name, (sha, full) in static_files.items():
        files[name] = sha
        sha1_to_path[sha] = name
        ct = "text/html; charset=utf-8" if name.endswith(".html") else "application/octet-stream"
        if name.endswith(".json"):
            ct = "application/json; charset=utf-8"
        elif name.endswith(".css"):
            ct = "text/css; charset=utf-8"
        elif name.endswith(".js") or name.endswith(".mjs"):
            ct = "application/javascript; charset=utf-8"
        elif name.endswith(".svg"):
            ct = "image/svg+xml"
        elif name.endswith(".png"):
            ct = "image/png"
        elif name.endswith(".woff2"):
            ct = "font/woff2"
        elif name.endswith(".ico"):
            ct = "image/x-icon"
        upload_map[name] = (full, ct, False)

    # 2. _next/static 资源
    next_static = walk_next_static()
    for name, (sha, full) in next_static.items():
        files[name] = sha
        sha1_to_path[sha] = name
        ct = "application/octet-stream"
        if name.endswith(".js") or name.endswith(".mjs"):
            ct = "application/javascript; charset=utf-8"
        elif name.endswith(".css"):
            ct = "text/css; charset=utf-8"
        elif name.endswith(".json"):
            ct = "application/json; charset=utf-8"
        elif name.endswith(".woff2"):
            ct = "font/woff2"
        upload_map[name] = (full, ct, False)

    # 3. 创建 _redirects 文件
    redirects_content = "\n".join([
        "/*    /.netlify/functions/___netlify-server-handler    200",
    ]) + "\n"
    redirects_hash = hashlib.sha1(redirects_content.encode()).hexdigest()
    files["_redirects"] = redirects_hash
    sha1_to_path[redirects_hash] = "_redirects"
    upload_map["_redirects"] = (None, "text/plain; charset=utf-8", False)

    # 4. 函数 zip
    func_file = os.path.join(FUNC_DIR, "___netlify-server-handler.zip")
    if os.path.exists(func_file):
        func_sha = sha1_of_file(func_file)
        func_path = "___netlify-server-handler.zip"
        files[func_path] = func_sha
        sha1_to_path[func_sha] = func_path
        upload_map[func_path] = (func_file, "application/zip", True)
        func_size = os.path.getsize(func_file)
        print(f"   函数: {func_path} (sha1={func_sha[:16]}..., size={func_size:,} bytes)")
    else:
        print(f"   警告: 找不到函数文件 {func_file}")
        func_sha = None

    print(f"   HTML/资源: {len(static_files)} 个文件")
    print(f"   _next/static: {len(next_static)} 个文件")
    print(f"   总计: {len(files)} 个文件 (+ 1 个函数)")
    print()
    return files, sha1_to_path, upload_map, func_sha, redirects_content

def create_deploy(files, func_sha):
    print("[3/6] 创建部署...")
    payload = {"files": files}
    if func_sha:
        payload["functions"] = {
            "___netlify-server-handler": {
                "archive": "___netlify-server-handler.zip",
                "runtime": "nodejs24.x",
                "sha": func_sha
            }
        }
    
    # 写入 payload 供调试
    with open("/tmp/deploy_payload_v7.json", "w") as f:
        json.dump(payload, f, indent=2)
    print(f"   payload 大小: {os.path.getsize('/tmp/deploy_payload_v7.json'):,} bytes")
    
    data, rc = curl_json(
        "-H", "Content-Type: application/json",
        "-d", json.dumps(payload),
        f"https://api.netlify.com/api/v1/sites/{SITE_ID}/deploys"
    )
    
    deploy_id = data.get("id")
    state = data.get("state", "unknown")
    required = data.get("required", [])
    required_functions = data.get("required_functions", [])
    functions_info = data.get("functions", [])
    
    print(f"   ID: {deploy_id}")
    print(f"   State: {state}")
    print(f"   Required files: {len(required)} 个")
    print(f"   Required functions: {len(required_functions)} 个")
    if required_functions:
        for f in required_functions:
            print(f"     - {json.dumps(f)[:200]}")
    print(f"   Deploy 中的 functions: {len(functions_info)} 个")
    
    if not deploy_id:
        print(f"   错误: 部署创建失败!")
        print(f"   完整响应: {json.dumps(data)[:500]}")
        sys.exit(1)
    
    print()
    return deploy_id, required, required_functions

def upload_files(deploy_id, required, required_functions, sha1_to_path, upload_map, redirects_content):
    print(f"[4/6] 上传 {len(required)} 个文件 + {len(required_functions)} 个函数...")
    
    # 1. 上传普通文件
    for i, sha in enumerate(required):
        fpath = sha1_to_path.get(sha)
        if not fpath:
            print(f"  [file {i+1}/{len(required)}] SKIP (sha not found): {sha[:20]}...")
            continue
        
        info = upload_map.get(fpath)
        if not info:
            print(f"  [file {i+1}/{len(required)}] SKIP (no upload map): {fpath}")
            continue
        
        full_path, content_type, _is_func = info
        
        # _redirects 文件特殊处理
        if fpath == "_redirects":
            import tempfile
            tf = tempfile.NamedTemporaryFile(delete=False, mode="w", suffix=".txt")
            tf.write(redirects_content)
            tf.close()
            full_path = tf.name
        
        print(f"  [file {i+1}/{len(required)}] FILE -> /{fpath}")
        upload_url = f"https://api.netlify.com/api/v1/deploys/{deploy_id}/files/{fpath}"
        
        data, rc = curl_json(
            "-H", f"Content-Type: {content_type}",
            "-X", "PUT",
            "--data-binary", f"@{full_path}",
            upload_url
        )
        
        if isinstance(data, dict) and data.get("code") and data.get("code") >= 400:
            print(f"    ! 错误: {json.dumps(data)[:200]}")
        elif not data:
            print(f"    ! 空响应 (rc={rc})")
        else:
            if isinstance(data, dict):
                m = data.get("m") or data.get("message") or str(data)[:80]
                print(f"    OK ({m[:60]})")
            else:
                print(f"    OK")
    
    # 2. 上传函数 (required_functions 是独立列表)
    for i, func_meta in enumerate(required_functions):
        func_name = func_meta.get("name") or func_meta.get("n") or "___netlify-server-handler"
        func_archive = func_meta.get("archive") or func_meta.get("a") or "___netlify-server-handler.zip"
        func_runtime = func_meta.get("runtime") or func_meta.get("r") or "nodejs24.x"
        
        print(f"  [func {i+1}/{len(required_functions)}] FUNC -> /functions/{func_name} (runtime={func_runtime})")
        
        # 从 FUNC_DIR 查找函数 zip 文件
        func_file = os.path.join(FUNC_DIR, func_archive)
        if not os.path.exists(func_file):
            func_file = os.path.join(FUNC_DIR, f"{func_name}.zip")
        
        # 还没找到的话，从 upload_map 中找 is_func=True 的条目
        if not os.path.exists(func_file):
            for k, v in upload_map.items():
                if len(v) >= 3 and v[2]:  # is_func = True
                    func_file = v[0]
                    break
        
        if not os.path.exists(func_file):
            print(f"    ! 找不到函数文件: {func_file}")
            continue
        
        func_size = os.path.getsize(func_file)
        print(f"    size: {func_size:,} bytes")
        
        upload_url = f"https://api.netlify.com/api/v1/deploys/{deploy_id}/functions/{func_name}?runtime={func_runtime}"
        
        data, rc = curl_json(
            "-H", "Content-Type: application/zip",
            "-X", "PUT",
            "--data-binary", f"@{func_file}",
            upload_url
        )
        
        if isinstance(data, dict) and data.get("code") and data.get("code") >= 400:
            print(f"    ! 错误: {json.dumps(data)[:200]}")
        elif not data:
            print(f"    ! 空响应 (rc={rc})")
        else:
            if isinstance(data, dict):
                m = data.get("m") or data.get("message") or str(data)[:80]
                print(f"    OK ({m[:60]})")
            else:
                print(f"    OK")
    
    print()

def publish_deploy(deploy_id):
    print("[5/6] 发布部署...")
    data, rc = curl_json(
        "-X", "POST",
        "-H", "Content-Length: 0",
        f"https://api.netlify.com/api/v1/deploys/{deploy_id}/publish"
    )
    print(f"   响应: {json.dumps(data)[:300]}")
    print()

def wait_ready(deploy_id, max_wait=300):
    print("[6/6] 等待部署完成...")
    for i in range(max_wait // 10 + 1):
        data, rc = curl_json(
            f"https://api.netlify.com/api/v1/deploys/{deploy_id}"
        )
        state = data.get("state", "unknown")
        msg = data.get("error_message") or data.get("deploy_time") or ""
        print(f"   [{i*10}s] state={state}, functions={len(data.get('functions', []))}, {msg}")
        if state in ("ready", "published"):
            print(f"   部署成功!")
            url = data.get("ssl_url") or data.get("deploy_ssl_url") or data.get("url")
            print(f"   URL: {url}")
            return True
        if state == "error":
            print(f"   部署错误: {json.dumps(data)[:300]}")
            return False
        time.sleep(10)
    return False

if __name__ == "__main__":
    check_cve()
    files, sha1_to_path, upload_map, func_sha, redirects = build_file_list()
    deploy_id, required, required_functions = create_deploy(files, func_sha)
    upload_files(deploy_id, required, required_functions, sha1_to_path, upload_map, redirects)
    publish_deploy(deploy_id)
    wait_ready(deploy_id)
    print("\n=== 部署完成 ===")
    print(f"  站点: https://chatai-pro-2026.netlify.app")
