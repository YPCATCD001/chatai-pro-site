import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import http from "node:http";
import https from "node:https";
import { URL } from "node:url";

const HOST = "api.netlify.com";
const SITE_ID = "00de2ab0-d070-47e8-9162-8e3558545393";
const AUTH_TOKEN = "nfp_3eDoe5u3X9NYEyzKv4fwhGQ7zzrtJmjMcdd8";
const DEPLOY_DIR = "/workspace/.netlify/deploy/v1/blobs/deploy";
const STATIC_DIR = "/workspace/.netlify/static";
const FUNCTIONS_DIR = "/workspace/.netlify/functions";
const PROXY_URL = "http://127.0.0.1:18080";

function sha1(buf) {
  return crypto.createHash("sha1").update(buf).digest("hex");
}

function listFiles(dir, prefix = "") {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listFiles(full, prefix + entry.name + "/"));
    } else {
      out.push(prefix + entry.name);
    }
  }
  return out;
}

const proxyUrl = new URL(PROXY_URL);

function apiCall(method, pathname, bodyBuf, contentType) {
  return new Promise((resolve, reject) => {
    // Step 1: CONNECT through proxy
    const connectOptions = {
      host: proxyUrl.hostname,
      port: proxyUrl.port,
      method: "CONNECT",
      path: HOST + ":443",
      agent: false,
    };
    const connectReq = http.request(connectOptions);
    connectReq.on("connect", (res, socket) => {
      if (res.statusCode !== 200) {
        reject(new Error("Proxy CONNECT failed: " + res.statusCode));
        return;
      }
      // Step 2: Send HTTPS request through the tunnel socket
      const req = https.request({
        hostname: HOST,
        port: 443,
        method,
        path: pathname,
        socket: socket,
        agent: false,
        servername: HOST,
        headers: {
          "Authorization": "Bearer " + AUTH_TOKEN,
          "Content-Type": contentType || "application/json",
          "Content-Length": bodyBuf ? bodyBuf.length : 0,
          "User-Agent": "TraeDeploy/1.0",
        },
      });
      req.on("response", (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body }));
      });
      req.on("error", reject);
      if (bodyBuf) req.write(bodyBuf);
      req.end();
    });
    connectReq.on("error", reject);
    connectReq.end();
  });
}

async function main() {
  console.log("\n=== 构建文件清单 ===\n");
  const files = {};
  const filesMap = {};

  if (fs.existsSync(DEPLOY_DIR)) {
    for (const name of fs.readdirSync(DEPLOY_DIR)) {
      const full = path.join(DEPLOY_DIR, name);
      const raw = fs.readFileSync(full);
      let decodedName;
      try {
        decodedName = Buffer.from(name, "base64").toString("utf8");
      } catch { decodedName = name; }
      let htmlContent;
      try {
        const blobJSON = JSON.parse(raw.toString("utf8"));
        htmlContent = blobJSON.html || raw.toString("utf8");
      } catch {
        htmlContent = raw.toString("utf8");
      }
      let deployName;
      if (decodedName === "/index") deployName = "index.html";
      else if (decodedName === "/404.html" || decodedName === "404") deployName = "404.html";
      else if (decodedName === "/500.html" || decodedName === "500") deployName = "500.html";
      else if (decodedName === "NTAwLmh0bWw=") deployName = "404.html";
      else if (decodedName === "NTAwLmh0bWw=") deployName = "500.html";
      else if (decodedName.startsWith("/")) deployName = decodedName.slice(1) + "/index.html";
      else deployName = decodedName + "/index.html";

      const contentBuf = Buffer.from(htmlContent, "utf8");
      files[deployName] = sha1(contentBuf);
      filesMap[deployName] = { type: "html", content: contentBuf, mime: "text/html; charset=utf-8" };
    }
  }

  if (fs.existsSync(STATIC_DIR)) {
    const staticFiles = listFiles(STATIC_DIR, "_next/static/");
    for (const name of staticFiles) {
      const relPath = name.slice("_next/static/".length);
      const full = path.join(STATIC_DIR, relPath);
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
        ext === ".woff2" ? "font/woff2" : "application/octet-stream";
      files[name] = hash;
      filesMap[name] = { type: "static", content, mime };
    }
  }

  if (fs.existsSync(FUNCTIONS_DIR)) {
    const funcFile = "___netlify-server-handler.zip";
    const funcFull = path.join(FUNCTIONS_DIR, funcFile);
    if (fs.existsSync(funcFull)) {
      const content = fs.readFileSync(funcFull);
      const hash = sha1(content);
      files[funcFile] = hash;
      filesMap[funcFile] = { type: "function", content, mime: "application/zip" };
    }
  }

  const total = Object.keys(filesMap).length;
  const htmlCount = Object.values(filesMap).filter(f => f.type === "html").length;
  const staticCount = Object.values(filesMap).filter(f => f.type === "static").length;
  const funcCount = Object.values(filesMap).filter(f => f.type === "function").length;
  console.log(`共 ${total} 个文件待上传`);
  console.log(`  - HTML: ${htmlCount}`);
  console.log(`  - 静态资源: ${staticCount}`);
  console.log(`  - 函数包: ${funcCount}`);

  console.log("\n=== 创建 Deploy ===\n");
  const payload = JSON.stringify({ files });
  const createResult = await apiCall("POST", "/api/v1/sites/" + SITE_ID + "/deploys", Buffer.from(payload, "utf8"), "application/json");
  if (createResult.status < 200 || createResult.status >= 300) {
    console.log("错误:", createResult.status, createResult.body.slice(0, 300));
    process.exit(1);
  }
  const deployData = JSON.parse(createResult.body);
  const deployId = deployData.id;
  console.log("Deploy ID:", deployId);
  console.log("状态:", deployData.state);
  console.log("需上传文件数:", deployData.required ? deployData.required.length : 0);

  console.log("\n=== 上传文件 ===\n");
  let idx = 0;
  for (const [filename, info] of Object.entries(filesMap)) {
    idx++;
    process.stdout.write("  [" + idx + "/" + total + "] " + filename.slice(0, 50) + (filename.length > 50 ? "..." : "") + "...");
    const encodedPath = encodeURIComponent(filename).replace(/%2F/g, "/");
    const result = await apiCall("PUT", "/api/v1/deploys/" + deployId + "/files/" + encodedPath, info.content, info.mime);
    if (result.status >= 200 && result.status < 300) {
      console.log(" OK (" + result.status + ")");
    } else {
      console.log(" 失败 (" + result.status + ")");
      if (result.body.length < 300) console.log("    Response:", result.body);
    }
  }

  console.log("\n=== 等待部署完成 ===\n");
  for (let tries = 0; tries < 30; tries++) {
    await new Promise((r) => setTimeout(r, 2000));
    const check = await apiCall("GET", "/api/v1/deploys/" + deployId, null, "application/json");
    try {
      const info = JSON.parse(check.body);
      console.log("  状态: " + info.state + " (" + info.locked + ")");
      if (info.state === "ready" || info.state === "published") break;
    } catch {}
  }

  console.log("\n=== 完成 ===\n");
  console.log("Netlify Dashboard: https://app.netlify.com/sites/chatai-pro-2026/deploys/" + deployId);
  console.log("访问地址: https://chatai-pro-2026.netlify.app");
}

main().catch((e) => { console.error(e); process.exit(1); });
