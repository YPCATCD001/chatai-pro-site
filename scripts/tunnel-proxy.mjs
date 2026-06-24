#!/usr/bin/env node
// 自建 localtunnel 客户端 - 通过系统代理连接到 localtunnel 服务器
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import https from "node:https";
import net from "node:net";
import fs from "node:fs";
import { HttpsProxyAgent } from "https-proxy-agent";

const PROXY = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || "http://127.0.0.1:18080";
const LT_HOST = process.env.LT_HOST || "localtunnel.me";
const LOCAL_PORT = parseInt(process.env.PORT || "3012", 10);

const httpsAgent = new HttpsProxyAgent(PROXY);

function requestTunnel() {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: LT_HOST,
        port: 443,
        path: "/?new",
        method: "GET",
        agent: httpsAgent,
        rejectUnauthorized: false,
        timeout: 30000,
      },
      (res) => {
        let data = "";
        res.on("data", (d) => (data += d));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (e) {
            reject(new Error(`Invalid JSON: ${data.slice(0, 200)}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.on("timeout", () => req.destroy(new Error("Timeout")));
    req.end();
  });
}

function connectToTunnel(tunnelHost, tunnelPort) {
  return new Promise((resolve, reject) => {
    const proxyUrl = new URL(PROXY);
    const proxyHost = proxyUrl.hostname;
    const proxyPort = parseInt(proxyUrl.port || "80", 10);

    const conn = net.connect(proxyPort, proxyHost, () => {
      const connectRequest = `CONNECT ${tunnelHost}:${tunnelPort} HTTP/1.1\r\nHost: ${tunnelHost}:${tunnelPort}\r\n\r\n`;
      conn.write(connectRequest);
    });

    let connectBuf = Buffer.alloc(0);
    let connected = false;

    conn.on("data", (chunk) => {
      if (connected) return;
      connectBuf = Buffer.concat([connectBuf, chunk]);
      if (connectBuf.includes(Buffer.from("\r\n\r\n"))) {
        const headerEnd = connectBuf.indexOf(Buffer.from("\r\n\r\n"));
        const header = connectBuf.slice(0, headerEnd).toString();
        if (header.includes("200") || header.startsWith("HTTP/1.1 2")) {
          connected = true;
          const remainder = connectBuf.slice(headerEnd + 4);
          resolve({ socket: conn, initialData: remainder });
        } else {
          conn.destroy();
          reject(new Error(`CONNECT failed: ${header.slice(0, 200)}`));
        }
      }
    });

    conn.on("error", (e) => {
      if (!connected) reject(e);
    });
    conn.on("close", () => {
      if (!connected) reject(new Error("Tunnel connection closed"));
    });
  });
}

// TCP 级别转发：把 tunnel 连接上的任何字节流转发到本地服务器
function pipeTunnel(tunnelSocket, idx) {
  let active = true;

  function connectLocal() {
    if (!active) return;
    const local = net.connect(LOCAL_PORT, "127.0.0.1");
    local.on("connect", () => {
      console.log(`   [socket-${idx}] request forwarded`);
    });

    // tunnel -> local
    tunnelSocket.on("data", onTunnelData);
    function onTunnelData(chunk) {
      if (!local.write(chunk)) {
        tunnelSocket.pause();
        local.once("drain", () => tunnelSocket.resume());
      }
    }

    // local -> tunnel
    local.on("data", (chunk) => {
      if (!tunnelSocket.write(chunk)) {
        local.pause();
        tunnelSocket.once("drain", () => local.resume());
      }
    });

    local.on("end", () => {
      console.log(`   [socket-${idx}] local ended`);
      // 继续等待下一个请求 - tunnel socket 保持
      tunnelSocket.removeListener("data", onTunnelData);
      // 不要立刻销毁 tunnel socket；等下一轮请求 - 但为了简化，我们重连一个新 socket
      // 实际上 keep-alive 请求都可能经过同一个 socket
      // 让它保持，直到 close
    });

    local.on("error", (e) => {
      console.error(`   [socket-${idx}] local error:`, e.message);
      tunnelSocket.removeListener("data", onTunnelData);
    });
  }

  tunnelSocket.on("data", () => {
    // 第一个数据到达时创建本地连接
    // 为了支持 keep-alive 多路复用，简单化：每次有新请求我们不重新连接 — 直接持续转发
  });

  // 简单做法：立刻建立本地连接并持续双向转发
  connectLocal();
  const local = connectLocal.__lastLocal; // 注意：简化逻辑
}

// 更简单的做法：每个 tunnel socket 维持一个持久本地连接，直接双向 pipe
function pipeSimple(tunnelSocket, idx) {
  console.log(`   [socket-${idx}] establishing local pipe`);
  const local = net.connect(LOCAL_PORT, "127.0.0.1");
  local.on("connect", () => {
    console.log(`   [socket-${idx}] pipe established`);
  });

  tunnelSocket.pipe(local).pipe(tunnelSocket);

  tunnelSocket.on("error", (e) => {
    console.error(`   [socket-${idx}] tunnel error:`, e.message);
    try {
      local.destroy();
    } catch {}
    // 3s 后重连
    setTimeout(() => reconnectSocket(idx), 3000);
  });

  tunnelSocket.on("close", () => {
    console.log(`   [socket-${idx}] tunnel closed, reconnecting...`);
    try {
      local.destroy();
    } catch {}
    setTimeout(() => reconnectSocket(idx), 2000);
  });

  local.on("error", (e) => {
    console.error(`   [socket-${idx}] local error:`, e.message);
    try {
      tunnelSocket.destroy();
    } catch {}
    setTimeout(() => reconnectSocket(idx), 3000);
  });
}

let tunnelInfo = null;

function reconnectSocket(idx) {
  if (!tunnelInfo) return;
  connectToTunnel(`${tunnelInfo.id}.${LT_HOST}`, tunnelInfo.port)
    .then(({ socket }) => {
      console.log(`   [socket-${idx}] reconnected`);
      pipeSimple(socket, idx);
    })
    .catch((e) => {
      console.error(`   [socket-${idx}] reconnect failed:`, e.message);
      setTimeout(() => reconnectSocket(idx), 5000);
    });
}

async function main() {
  tunnelInfo = await requestTunnel();
  console.log(`\n✅ Tunnel obtained:`);
  console.log(`   Public URL: ${tunnelInfo.url}`);
  console.log(`   Remote: ${tunnelInfo.id}.${LT_HOST}:${tunnelInfo.port}`);
  console.log(`   Max connections: ${tunnelInfo.max_conn_count}`);

  fs.writeFileSync("/tmp/tunnel-url.txt", tunnelInfo.url + "\n");

  const numSockets = tunnelInfo.max_conn_count || 2;

  for (let i = 0; i < numSockets; i++) {
    connectToTunnel(`${tunnelInfo.id}.${LT_HOST}`, tunnelInfo.port)
      .then(({ socket }) => {
        console.log(`   [socket-${i}] connected`);
        pipeSimple(socket, i);
      })
      .catch((e) => {
        console.error(`   [socket-${i}] connect failed:`, e.message);
        setTimeout(() => reconnectSocket(i), 3000);
      });
  }

  console.log(`\n🚀 Your app is live at: ${tunnelInfo.url}`);
  console.log(`   (press Ctrl+C to stop)\n`);

  // 每 5 分钟输出一次健康状态
  setInterval(() => {
    console.log(`[${new Date().toISOString()}] tunnel alive - ${tunnelInfo.url}`);
  }, 300000);
}

main().catch((e) => {
  console.error("❌ Tunnel startup failed:", e);
  process.exit(1);
});
