import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import http from "node:http";
import https from "node:https";

const HOST = "api.netlify.com";
const SITE_ID = "00de2ab0-d070-47e8-9162-8e3558545393";
const AUTH_TOKEN = "nfp_3eDoe5u3X9NYEyzKv4fwhGQ7zzrtJmjMcdd8";
const PROXY_HOST = "127.0.0.1";
const PROXY_PORT = 18080;

function sha1(buf) {
  return crypto.createHash("sha1").update(buf).digest("hex");
}

function apiCall(method, urlPath, bodyBuf, contentType, timeout = 60000) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      host: PROXY_HOST,
      port: PROXY_PORT,
      method: "CONNECT",
      path: HOST + ":443",
      agent: false,
    });
    req.on("connect", (res, socket) => {
      if (res.statusCode !== 200) {
        reject(new Error("Proxy CONNECT failed: " + res.statusCode));
        return;
      }
      const req2 = https.request({
        hostname: HOST,
        port: 443,
        method,
        path: urlPath,
        socket,
        agent: false,
        servername: HOST,
        timeout,
        headers: {
          "Authorization": "Bearer " + AUTH_TOKEN,
          "Content-Type": contentType || "application/json",
          "Content-Length": bodyBuf ? bodyBuf.length : 0,
          "User-Agent": "TraeDeploy/1.0",
        },
      });
      let data = "";
      req2.on("response", (res2) => {
        res2.on("data", (chunk) => (data += chunk));
        res2.on("end", () => resolve({ status: res2.statusCode, body: data }));
      });
      req2.on("error", reject);
      if (bodyBuf) req2.write(bodyBuf);
      req2.end();
    });
    req.on("error", reject);
    req.end();
  });
}

function uploadFile(deployId, filePath, contentBuf, mime) {
  const encodedPath = encodeURIComponent(filePath).replace(/%2F/g, "/");
  return apiCall(
    "PUT",
    "/api/v1/deploys/" + deployId + "/files/" + encodedPath,
    contentBuf,
    mime,
    120000
  );
}

function listDir(dir, prefix = "") {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listDir(full, prefix + entry.name + "/"));
    } else {
      files.push(prefix + entry.name);
    }
  }
  return files;
}

async function main() {
  console.log("\n=== 构建文件清单 ===\n");
  const deployFiles = {}; // path -> sha1
  const fileContents = {}; // path -> { buf, mime

  // 1. HTML pages (from .netlify/deploy)
  const deployDir = "/workspace/.netlify/deploy/v1/blobs/deploy";
  if (fs.existsSync(deployDir)) {
    for (const name of fs.readdirSync(deployDir)) {
      const full = path.join(deployDir, name);
      const raw = fs.readFileSync(full);
      let decodedName;
      try { decodedName = Buffer.from(name, "base64").toString("utf8"); } catch { decodedName = name; }
      let htmlContent;
      try {
        const blob = JSON.parse(raw.toString("utf8"));
        htmlContent = blob.html || raw.toString("utf8");
      } catch {
        htmlContent = raw.toString("utf8");
      }

      // Normalize path
      let deployName;
      if (decodedName === "/index") deployName = "index.html";
      else if (decodedName === "/404.html" || decodedName === "404") deployName = "404.html";
      else if (decodedName === "/500.html" || decodedName === "500") deployName = "500.html";
      else if (decodedName.startsWith("/")) deployName = decodedName.slice(1) + "/index.html";
      else deployName = decodedName + "/index.html";

      const contentBuf = Buffer.from(htmlContent, "utf8");
      deployFiles[deployName] = sha1(contentBuf);
      fileContents[deployName] = { content: contentBuf, mime: "text/html; charset=utf-8" };
    }
  }

  // 2. Static assets (from .netlify/static)
  const staticDir = "/workspace/.netlify/static/_next";
  if (fs.existsSync(staticDir)) {
    // Files are at .netlify/static/_next/static/...
    // Should be uploaded as _next/static/...
    const staticFiles = listDir(staticDir, "_next/");
    for (const name of staticFiles) {
      const full = path.join("/workspace/.netlify/static", name);
      const content = fs.readFileSync(full);
      const hash = sha1(content);
      const ext = path.extname(name).toLowerCase();
      const mime =
        ext === ".js" ? "application/javascript; charset=utf-8" :
        ext === ".css" ? "text/css; charset=utf-8" :
        ext === ".json" ? "application/json; charset=utf-8" :
        ext === ".png" ? "image/png" :
        ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" :
        ext === ".svg" ? "image/svg+xml" :
        ext === ".woff" ? "font/woff" :
        ext === ".woff2" ? "font/woff2" :
        "application/octet-stream";
      deployFiles[name] = hash;
      fileContents[name] = { content, mime };
    }
  }

  // 3. Functions (Netlify function zip)
  const functionsDir = "/workspace/.netlify/functions";
  const funcFile = "___netlify-server-handler.zip";
  const funcFull = path.join(functionsDir, funcFile);
  if (fs.existsSync(funcFull)) {
    const content = fs.readFileSync(funcFull);
    const hash = sha1(content);
    const netlifyFuncPath = "___netlify-server-handler/" + funcFile;
    deployFiles[netlifyFuncPath] = hash;
    fileContents[netlifyFuncPath] = { content, mime: "application/zip" };
  }

  // 4. _redirects (Route API/dynamic paths to function
  const redirectsContent = Buffer.from(
    "/api/* /.netlify/functions/___netlify-server-handler 200\n" +
    "/_next/data/* /.netlify/functions/___netlify-server-handler 200\n" +
    "/bots/* /.netlify/functions/___netlify-server-handler 200\n" +
    "/dashboard /.netlify/functions/___netlify-server-handler 200\n" +
    "/conversations/* /.netlify/functions/___netlify-server-handler 200\n" +
    "/settings /.netlify/functions/___netlify-server-handler 200\n" +
    "/analytics /.netlify/functions/___netlify-server-handler 200\n"
  );
  const redirectsPath = "_redirects";
  deployFiles[redirectsPath] = sha1(redirectsContent);
  fileContents[redirectsPath] = { content: redirectsContent, mime: "text/plain" };

  console.log(`共 ${Object.keys(fileContents).length} 个文件`);

  // Create deploy
  console.log("\n=== 创建 Deploy ===\n");
  const payload = Buffer.from(JSON.stringify({ files: deployFiles }), "utf8");
  const createResult = await apiCall(
    "POST",
    "/api/v1/sites/" + SITE_ID + "/deploys",
    payload,
    "application/json",
    120000
  );

  if (createResult.status < 200 || createResult.status >= 300) {
    console.error("错误:", createResult.status, createResult.body.slice(0, 500));
    process.exit(1);
  }
  const deployData = JSON.parse(createResult.body);
  const deployId = deployData.id;
  console.log("Deploy ID:", deployId);

  console.log("\n=== 上传文件 ===\n");
  const filesList = Object.keys(fileContents);
  for (let i = 0; i < filesList.length; i++) {
    const filePath = filesList[i];
    const info = fileContents[filePath];
    const displayPath = filePath.length > 60 ? filePath.slice(0, 60) + "..." : filePath;
    process.stdout.write(`  [${i + 1}/${filesList.length}] ${displayPath}... `);
    const result = await uploadFile(deployId, filePath, info.content, info.mime);
    if (result.status >= 200 && result.status < 300) {
      console.log("OK");
    } else {
      console.log("FAILED (" + result.status + ")");
      if (result.body && result.body.length < 300) console.log("    " + result.body);
    }
  }

  console.log("\n=== 等待部署完成 ===\n");
  for (let tries = 0; tries < 30; tries++) {
    await new Promise((r) => setTimeout(r, 2000));
    const check = await apiCall("GET", "/api/v1/deploys/" + deployId, null, "application/json", 30000);
    try {
      const info = JSON.parse(check.body);
      console.log("  状态: " + info.state + " (locked: " + info.locked + ")");
      if (info.state === "ready" || info.state === "published") break;
    } catch {}
  }

  console.log("\n=== 完成 ===\n");
  console.log("Dashboard: https://app.netlify.com/sites/chatai-pro-2026/deploys/" + deployId);
  console.log("访问地址: https://chatai-pro-2026.netlify.app");
}

main().catch((e) => { console.error(e); process.exit(1); });
