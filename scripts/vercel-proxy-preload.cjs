// preload.cjs — 让所有 Node.js 网络请求走本地 HTTP 代理
// 使用：NODE_OPTIONS="--require /workspace/scripts/vercel-proxy-preload.cjs" vercel ...
const PROXY_URL =
  process.env.HTTPS_PROXY ||
  process.env.HTTP_PROXY ||
  process.env.VERCEL_HTTP_PROXY ||
  'http://127.0.0.1:18080';

if (!PROXY_URL) {
  console.log('[vercel-proxy] 未设置代理，跳过');
  return;
}

// --- 1) undici / fetch (Node 18+ 内置) ---
// 这是 Vercel CLI 最新版使用的网络库
try {
  const undici = require('undici');
  if (undici.setGlobalDispatcher && undici.ProxyAgent) {
    undici.setGlobalDispatcher(new undici.ProxyAgent(PROXY_URL));
    console.log('[vercel-proxy] undici/fetch 代理已设置 -> ' + PROXY_URL);
  }
} catch (_) {}

// --- 2) 标准 https.request / http.request（老的 node 库）---
// 作为双保险，也劫持掉，让一些老的 package 也能走
try {
  const { HttpsProxyAgent } = require('https-proxy-agent');
  const https = require('https');
  const http = require('http');
  const agent = new HttpsProxyAgent(PROXY_URL);

  const origHttpsRequest = https.request;
  https.request = function (options, cb) {
    if (options && typeof options === 'object' && options.agent === undefined) {
      options.agent = agent;
    }
    return origHttpsRequest.call(this, options, cb);
  };
  const origHttpsGet = https.get;
  https.get = function (options, cb) {
    const req = https.request(options, cb);
    req.end();
    return req;
  };

  const origHttpRequest = http.request;
  http.request = function (options, cb) {
    if (options && typeof options === 'object' && options.agent === undefined) {
      options.agent = agent;
    }
    return origHttpRequest.call(this, options, cb);
  };
  const origHttpGet = http.get;
  http.get = function (options, cb) {
    const req = http.request(options, cb);
    req.end();
    return req;
  };
  console.log('[vercel-proxy] https/http.request 代理已设置 -> ' + PROXY_URL);
} catch (e) {
  console.log('[vercel-proxy] 跳过 https-proxy-agent（未安装）：' + e.message);
}

// --- 3) 用一个简单的 fetch 测试验证 ---
// 1 秒后发一次探测请求
setTimeout(() => {
  try {
    fetch('https://api.vercel.com/health')
      .then((r) => {
        console.log('[vercel-proxy] fetch 探测 -> HTTP ' + r.status);
        return r.text();
      })
      .then((t) => {
        console.log('[vercel-proxy] fetch 探测 body -> ' + t.slice(0, 120));
      })
      .catch((e) => console.log('[vercel-proxy] fetch 探测失败：' + e.message));
  } catch (_) {}
}, 1000);
