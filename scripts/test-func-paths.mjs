import fs from "node:fs";
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

function apiCall(method, urlPath, bodyBuf, contentType, timeoutMs = 120000) {
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
        timeout: timeoutMs,
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

async function testFunctionPaths() {
  const funcBuf = fs.readFileSync("/workspace/.netlify/functions/___netlify-server-handler.zip");
  const funcHash = sha1(funcBuf);

  console.log("测试不同的函数路径...\n");

  const testPaths = [
    "___netlify-server-handler.zip",
    "netlify/functions/___netlify-server-handler.zip",
    ".netlify/functions/___netlify-server-handler.zip",
    "functions/___netlify-server-handler.zip",
    "___netlify-server-handler/handler.zip",
  ];

  for (const testPath of testPaths) {
    // 创建一个仅包含函数的 deploy
    const files = {};
    files[testPath] = funcHash;

    // 添加一个简单的 HTML 以确保 deploy 有效
    const htmlBuf = Buffer.from("<html><body>test</body></html>", "utf8");
    files["index.html"] = sha1(htmlBuf);

    // 创建 deploy
    const create = await apiCall("POST", "/api/v1/sites/" + SITE_ID + "/deploys", Buffer.from(JSON.stringify({ files }), "utf8"), "application/json", 120000);
    if (create.status < 200 || create.status >= 300) {
      console.log(`  ${testPath} -> 创建失败 (${create.status})`);
      continue;
    }
    const deployId = JSON.parse(create.body).id;

    // 上传 HTML (快速)
    await apiCall("PUT", "/api/v1/deploys/" + deployId + "/files/" + encodeURIComponent("index.html"), htmlBuf, "text/html", 60000);

    // 上传函数 zip (关键测试)
    const funcResult = await apiCall("PUT", "/api/v1/deploys/" + deployId + "/files/" + encodeURIComponent(testPath), funcBuf, "application/zip", 300000);
    if (funcResult.status >= 200 && funcResult.status < 300) {
      console.log(`  ✓ ${testPath} -> 成功 (${funcResult.status})`);
      // 检查 deploy 状态，看函数是否被识别
      await new Promise(r => setTimeout(r, 2000));
      const check = await apiCall("GET", "/api/v1/deploys/" + deployId, null, "application/json", 30000);
      try {
        const info = JSON.parse(check.body);
        console.log(`    状态: ${info.state}, 函数: ${info.functions_available ? info.functions_available : '无'}`);
      } catch {}
    } else {
      console.log(`  ✗ ${testPath} -> 失败 (${funcResult.status}): ${funcResult.body.slice(0, 100)}`);
    }
  }
}

testFunctionPaths().catch(e => { console.error(e); process.exit(1); });
