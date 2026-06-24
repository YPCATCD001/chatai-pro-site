#!/usr/bin/env node
// 关闭 TLS 证书验证以连接到 localtunnel 服务器
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import https from "node:https";
import http from "node:http";
import localtunnel from "localtunnel";

// 补丁 https agent 允许自签名
const origAgent = https.globalAgent;
https.globalAgent = new https.Agent({ rejectUnauthorized: false });

const port = parseInt(process.env.PORT || "3012", 10);
const host = process.env.LT_HOST || "https://localtunnel.me";

async function main() {
  console.log(`[tunnel] Opening tunnel for http://127.0.0.1:${port}`);
  console.log(`[tunnel] Using host: ${host}`);
  const tunnel = await localtunnel({
    port,
    host,
    local_host: "127.0.0.1",
    local_https: false,
    allow_invalid_cert: true,
  });
  console.log(`\n✅ Public URL: ${tunnel.url}`);
  tunnel.on("error", (err) => {
    console.error("[tunnel] error:", err);
    process.exit(1);
  });
  tunnel.on("close", () => {
    console.log("[tunnel] closed");
  });
}

main().catch((e) => {
  console.error("[tunnel] failed:", e);
  process.exit(1);
});
