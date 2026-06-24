#!/usr/bin/env python3
"""Netlify 部署脚本 - 构建静态资源 + 打包函数 + API部署"""
import os, subprocess, json, hashlib, time, sys, tempfile, shutil

TOKEN = "nfp_3eDoe5u3X9NYEyzKv4fwhGQ7zzrtJmjMcdd8"
SITE_ID = "00de2ab0-d070-47e8-9162-8e3558545393"
PROJECT_ROOT = "/workspace"
DEPLOY_DIR = os.path.join(PROJECT_ROOT, ".netlify", "deploy")
STATIC_DIR = os.path.join(PROJECT_ROOT, ".netlify", "static")
FUNCTIONS_DIR = os.path.join(PROJECT_ROOT, ".netlify", "functions-internal", "___netlify-server-handler")
FUNCTION_ZIP = os.path.join(PROJECT_ROOT, ".netlify", "functions", "___netlify-server-handler.zip")
API = "https://api.netlify.com/api/v1"

def curl_json(*args, timeout=120):
    cmd = ["curl", "-sS", "-m", str(timeout),
           "-H", f"Authorization: Bearer {TOKEN}",
           "-H", "Content-Type: application/json"]
    cmd.extend(args)
    result = subprocess.run(cmd, capture_output=True, text=True)
    try:
        return json.loads(result.stdout), result.returncode
    except json.JSONDecodeError:
        return {"_raw": result.stdout[:300], "_stderr": result.stderr[:300]}, result.returncode

def curl_upload_binary(upload_url, file_path, content_type, timeout=600):
    """上传二进制文件到Netlify"""
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
        return {"_raw": result.stdout[:200], "_err": result.stderr[:200]}, result.returncode

def sha1_of_file(path):
    h = hashlib.sha1()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1024*1024), b""):
            h.update(chunk)
    return h.hexdigest()

def main():
    print("=" * 60)
    print("ChatAI Pro - Netlify 全自动部署")
    print("=" * 60)
    
    # Step 1: 准备静态资源
    print("\n[1/6] 准备静态资源目录...")
    os.makedirs(DEPLOY_DIR, exist_ok=True)
    os.makedirs(STATIC_DIR, exist_ok=True)
    
    # 复制 .next/static 到 .netlify/static/_next/static
    next_static = os.path.join(PROJECT_ROOT, ".next", "static")
    if os.path.isdir(next_static):
        dest = os.path.join(STATIC_DIR, "_next", "static")
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        if os.path.isdir(dest):
            shutil.rmtree(dest)
        shutil.copytree(next_static, dest)
        print(f"  复制 .next/static -> .netlify/static/_next/static")
    
    # 复制 prerendered HTML/pages 到 .netlify/deploy/
    # 检查是否有 prerendered pages in .next/server/app
    server_app = os.path.join(PROJECT_ROOT, ".next", "server", "app")
    if os.path.isdir(server_app):
        for root, dirs, files in os.walk(server_app):
            for fn in files:
                if fn.endswith(".html") or fn.endswith(".json"):
                    full = os.path.join(root, fn)
                    rel = os.path.relpath(full, server_app).replace(os.sep, "/")
                    # 处理特殊文件名: index.html -> /path/index.html, page.html -> /path/index.html
                    out_name = rel
                    if fn == "page.html":
                        out_name = rel.replace("page.html", "index.html")
                    dest_path = os.path.join(DEPLOY_DIR, out_name)
                    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
                    shutil.copy2(full, dest_path)
        print(f"  复制 prerendered pages -> .netlify/deploy/")
    
    # 为重要路由生成 fallback HTML (用于无JS环境)
    # 但主要的是让函数处理动态路由
    
    # Step 2: 创建 _redirects 文件
    print("\n[2/6] 创建路由配置...")
    redirects_content = "/*    /.netlify/functions/___netlify-server-handler    200\n"
    redirects_path = os.path.join(DEPLOY_DIR, "_redirects")
    with open(redirects_path, "w") as f:
        f.write(redirects_content)
    print(f"  _redirects: {redirects_content.strip()}")
    
    # Step 3: 打包函数
    print("\n[3/6] 打包函数为zip...")
    os.makedirs(os.path.dirname(FUNCTION_ZIP), exist_ok=True)
    
    # 先删除旧的zip
    if os.path.exists(FUNCTION_ZIP):
        os.remove(FUNCTION_ZIP)
    
    # 使用 zip 命令打包函数目录
    zip_cmd = ["bash", "-c", f"cd '{FUNCTIONS_DIR}' && zip -q -r '{FUNCTION_ZIP}' ."]
    result = subprocess.run(zip_cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  警告: zip失败: {result.stderr[:200]}")
        # 尝试使用 python zipfile
        import zipfile
        with zipfile.ZipFile(FUNCTION_ZIP, "w", zipfile.ZIP_DEFLATED) as zf:
            for root, dirs, files in os.walk(FUNCTIONS_DIR):
                for fn in files:
                    full = os.path.join(root, fn)
                    arc = os.path.relpath(full, FUNCTIONS_DIR)
                    zf.write(full, arc)
    
    zip_size = os.path.getsize(FUNCTION_ZIP)
    func_sha1 = sha1_of_file(FUNCTION_ZIP)
    print(f"  Function ZIP: {FUNCTION_ZIP}")
    print(f"  Size: {zip_size:,} bytes ({zip_size/1024/1024:.2f} MB)")
    print(f"  SHA1: {func_sha1}")
    
    # Step 4: 构建文件清单
    print("\n[4/6] 构建文件清单...")
    files = {}
    file_paths = {}  # sha1 -> (deploy_path, full_path)
    
    # deploy目录中的文件 (包括 _redirects)
    for root, dirs, filenames in os.walk(DEPLOY_DIR):
        for fn in filenames:
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, DEPLOY_DIR).replace(os.sep, "/")
            sha = sha1_of_file(full)
            files[rel] = sha
            file_paths[sha] = (rel, full)
    
    # static目录中的文件 (映射到正确的路径)
    for root, dirs, filenames in os.walk(STATIC_DIR):
        for fn in filenames:
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, STATIC_DIR).replace(os.sep, "/")
            sha = sha1_of_file(full)
            files[rel] = sha
            file_paths[sha] = (rel, full)
    
    # 函数 zip 作为文件清单的一部分 - 也需要声明
    files["___netlify-server-handler.zip"] = func_sha1
    file_paths[func_sha1] = ("___netlify-server-handler.zip", FUNCTION_ZIP)
    
    print(f"  共 {len(files)} 个文件")
    print(f"  - Deploy files: {sum(1 for k in files.keys() if not k.startswith('_next/') and 'zip' not in k)}")
    print(f"  - Static assets (_next): {sum(1 for k in files.keys() if k.startswith('_next/'))}")
    print(f"  - Function: 1")
    
    # Step 5: 创建部署
    print("\n[5/6] 创建Netlify部署...")
    payload = {
        "files": files,
        "functions": {
            "___netlify-server-handler": {
                "archive": "___netlify-server-handler.zip",
                "runtime": "nodejs24.x",
                "sha": func_sha1
            }
        }
    }
    
    with tempfile.NamedTemporaryFile(mode="w", delete=False, suffix=".json") as tf:
        json.dump(payload, tf)
        payload_file = tf.name
    
    deploy, rc = curl_json("-X", "POST", "-d", f"@{payload_file}",
                          f"{API}/sites/{SITE_ID}/deploys")
    os.unlink(payload_file)
    
    deploy_id = deploy.get("id")
    state = deploy.get("state")
    required = deploy.get("required", [])
    required_funcs = deploy.get("required_functions", [])
    
    print(f"  Deploy ID: {deploy_id}")
    print(f"  State: {state}")
    print(f"  Required files: {len(required)}")
    print(f"  Required functions: {len(required_funcs)}")
    
    if required_funcs:
        for f in required_funcs:
            print(f"    - {json.dumps(f)[:200]}")
    
    if not deploy_id:
        print(f"\n  错误: 部署创建失败!")
        print(f"  响应: {json.dumps(deploy)[:500]}")
        sys.exit(1)
    
    # 上传文件
    print(f"\n  上传文件...")
    uploaded = 0
    skipped = 0
    errors = 0
    for i, sha in enumerate(required):
        info = file_paths.get(sha)
        if not info:
            print(f"  [{i+1}/{len(required)}] SKIP (找不到sha: {sha[:16]}...)")
            skipped += 1
            continue
        
        deploy_path, full_path = info
        
        if deploy_path == "___netlify-server-handler.zip":
            # 函数特殊处理 - 通过 functions API 上传
            func_upload_url = f"{API}/deploys/{deploy_id}/functions/___netlify-server-handler"
            print(f"  [{i+1}/{len(required)}] 上传函数 ({deploy_path})")
            data, rc = curl_upload_binary(func_upload_url, full_path, "application/zip", timeout=600)
        else:
            file_upload_url = f"{API}/deploys/{deploy_id}/files/{deploy_path}"
            ct = "text/html; charset=utf-8" if deploy_path.endswith(".html") else \
                 "application/javascript; charset=utf-8" if deploy_path.endswith(".js") else \
                 "application/json; charset=utf-8" if deploy_path.endswith(".json") else \
                 "text/css; charset=utf-8" if deploy_path.endswith(".css") else \
                 "application/octet-stream"
            print(f"  [{i+1}/{len(required)}] 上传 {deploy_path}")
            data, rc = curl_upload_binary(file_upload_url, full_path, ct, timeout=120)
        
        if isinstance(data, dict) and data.get("code") and data.get("code") >= 400:
            print(f"    错误: {json.dumps(data)[:200]}")
            errors += 1
        else:
            uploaded += 1
    
    print(f"  完成: {uploaded} 已上传, {skipped} 跳过, {errors} 错误")
    
    # 如果需要函数单独上传 (required_functions)
    if required_funcs and len(required_funcs) > 0:
        print(f"\n  上传额外的函数文件...")
        for rf in required_funcs:
            func_name = rf.get("name", "___netlify-server-handler")
            func_upload_url = f"{API}/deploys/{deploy_id}/functions/{func_name}"
            print(f"  上传函数: {func_name}")
            data, rc = curl_upload_binary(func_upload_url, FUNCTION_ZIP, "application/zip", timeout=600)
            if isinstance(data, dict) and data.get("code") and data.get("code") >= 400:
                print(f"    错误: {json.dumps(data)[:200]}")
            else:
                print(f"    成功!")
    
    # Step 6: 发布部署
    print("\n[6/6] 发布部署...")
    result, rc = curl_json("-X", "POST", f"{API}/deploys/{deploy_id}/publish")
    print(f"  结果: state={result.get('state')}")
    
    # 等待就绪
    print("\n等待部署就绪...")
    final_state = state
    for i in range(30):
        time.sleep(5)
        status, rc = curl_json(f"{API}/deploys/{deploy_id}")
        final_state = status.get("state", "unknown")
        funcs = len(status.get("functions", []))
        summary = status.get("summary", {})
        print(f"  [{(i+1)*5}s] state={final_state}, functions={funcs}, summary={json.dumps(summary)[:100]}")
        if final_state in ("ready", "published"):
            print("  ✓ 部署完成!")
            break
        if final_state == "error":
            print(f"  ✗ 部署错误: {status.get('error_message')}")
            break
    
    print("\n" + "=" * 60)
    print(f"站点 URL: https://chatai-pro-2026.netlify.app")
    print(f"部署详情: https://app.netlify.com/sites/chatai-pro-2026/deploys/{deploy_id}")
    print(f"最终状态: {final_state}")
    print("=" * 60)
    
    # 测试首页
    print("\n" + "测试首页...")
    test_result = subprocess.run(
        ["curl", "-sS", "-o", "/dev/null", "-w", "%{http_code}", "-m", "30",
         "https://chatai-pro-2026.netlify.app/"],
        capture_output=True, text=True
    )
    print(f"  HTTP状态: {test_result.stdout}")
    
    if test_result.stdout.strip() == "200":
        print("  ✓ 首页可访问!")
    else:
        print(f"  注意: 首页状态={test_result.stdout}，可能需要等待CDN刷新")
        # 显示实际返回内容
        test2 = subprocess.run(
            ["curl", "-sS", "-m", "30", "https://chatai-pro-2026.netlify.app/"],
            capture_output=True, text=True, timeout=60
        )
        print(f"  响应前500字: {test2.stdout[:500]}")

if __name__ == "__main__":
    main()
