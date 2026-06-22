import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const botId = url.searchParams.get("botId") || "";
  const apiKey = url.searchParams.get("apiKey") || "";

  const js = WIDGET_SOURCE
    .replace("__BOT_ID__", JSON.stringify(botId))
    .replace("__API_KEY__", JSON.stringify(apiKey));

  return new NextResponse(js, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

const WIDGET_SOURCE = `/*! ChatAI Pro Widget */
(function () {
  var botId = __BOT_ID__;
  var apiKey = __API_KEY__;
  // Determine API base from the current script's src URL (supports embedding on any site).
  var apiBase;
  var scripts = document.getElementsByTagName("script");
  var thisScript = scripts[scripts.length - 1];
  if (thisScript && thisScript.src) {
    var u = new URL(thisScript.src, window.location.href);
    apiBase = u.protocol + "//" + u.host;
  } else {
    apiBase = window.location.protocol + "//" + window.location.host;
  }
  var loadKey = "__ChatAIWidgetLoaded_" + botId;
  if (window[loadKey]) return;
  window[loadKey] = true;

  var config = {
    name: "AI Assistant",
    welcome_message: "Hi there! How can I help you today?",
    primary_color: "#6366f1",
    position: "bottom-right",
  };

  var open = false;
  var conversationId = null;
  var visitorId = localStorage.getItem("chatai_visitor_" + botId);
  if (!visitorId) {
    visitorId = "v_" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem("chatai_visitor_" + botId, visitorId);
  }

  function bind(id, event, handler) {
    var el = document.getElementById(id);
    if (el && el.addEventListener) el.addEventListener(event, handler);
  }

  // Fetch bot configuration.
  fetch(
    apiBase + "/api/bots/" + encodeURIComponent(botId) + "/public?apiKey=" + encodeURIComponent(apiKey)
  )
    .then(function (r) {
      return r.ok ? r.json() : Promise.reject();
    })
    .then(function (data) {
      if (data) Object.assign(config, data);
      render();
    })
    .catch(function () {
      render();
    });

  function render() {
    // Clear previous UI elements if any (supports re-mount).
    var oldFab = document.getElementById("chatai-fab");
    var oldWin = document.getElementById("chatai-window");
    if (oldFab) oldFab.parentNode && oldFab.parentNode.removeChild(oldFab);
    if (oldWin) oldWin.parentNode && oldWin.parentNode.removeChild(oldWin);

    // Inject stylesheet once.
    if (!document.getElementById("chatai-style")) {
      var style = document.createElement("style");
      style.id = "chatai-style";
      style.textContent = getStyles();
      document.head.appendChild(style);
    }

    // Floating button.
    var fab = document.createElement("div");
    fab.id = "chatai-fab";
    fab.className = "chatai-fab";
    fab.style.background = config.primary_color || "#6366f1";
    fab.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#fff"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    if (config.position === "bottom-left") {
      fab.style.left = "24px";
      fab.style.right = "auto";
    }
    fab.addEventListener("click", toggle);
    document.body.appendChild(fab);

    // Chat window.
    var win = document.createElement("div");
    win.id = "chatai-window";
    win.className = "chatai-window";
    if (config.position === "bottom-left") {
      win.style.left = "24px";
      win.style.right = "auto";
    }

    win.innerHTML =
      '<div class="chatai-header" style="background:' + (config.primary_color || "#6366f1") + '">' +
      '<div class="chatai-title">' + escapeHtml(config.name || "AI Assistant") + '</div>' +
      '<div class="chatai-sub">Powered by AI</div>' +
      '<button class="chatai-close" id="chatai-close" aria-label="Close">&#x2715;</button>' +
      '</div>' +
      '<div class="chatai-messages" id="chatai-messages"></div>' +
      '<div class="chatai-footer">' +
      '<input type="text" class="chatai-input" id="chatai-input" placeholder="Type your message..." autocomplete="off"/>' +
      '<button class="chatai-send" id="chatai-send" style="background:' + (config.primary_color || "#6366f1") + '">Send</button>' +
      '</div>' +
      '<div class="chatai-transfer"><button id="chatai-human">Talk to a human</button></div>';

    document.body.appendChild(win);

    bind("chatai-close", "click", toggle);
    bind("chatai-send", "click", onSend);
    bind("chatai-input", "keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        onSend();
      }
    });
    bind("chatai-human", "click", function () {
      appendMessage("assistant", "Sure — please email us at support@" + location.hostname + " and we will get back to you shortly.");
    });

    if (config.welcome_message) appendMessage("assistant", config.welcome_message);
  }

  function toggle() {
    open = !open;
    var win = document.getElementById("chatai-window");
    if (win) win.classList.toggle("chatai-open", open);
    if (open) {
      var input = document.getElementById("chatai-input");
      if (input) setTimeout(function () { input.focus(); }, 120);
    }
  }

  function onSend() {
    var input = document.getElementById("chatai-input");
    if (!input) return;
    var text = (input.value || "").trim();
    if (!text) return;
    input.value = "";
    appendMessage("user", text);
    setTyping(true);
    sendToBot(text);
  }

  function appendMessage(role, content) {
    var container = document.getElementById("chatai-messages");
    if (!container) return;
    var el = document.createElement("div");
    el.className = "chatai-msg chatai-" + role;
    var bubble = document.createElement("div");
    bubble.className = "chatai-bubble";
    bubble.textContent = content;
    el.appendChild(bubble);
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
    return bubble;
  }

  function setTyping(val) {
    var container = document.getElementById("chatai-messages");
    if (!container) return;
    var existing = document.getElementById("chatai-typing");
    if (val && !existing) {
      var el = document.createElement("div");
      el.id = "chatai-typing";
      el.className = "chatai-msg chatai-assistant";
      el.innerHTML = '<div class="chatai-bubble chatai-dots"><span></span><span></span><span></span></div>';
      container.appendChild(el);
      container.scrollTop = container.scrollHeight;
    } else if (!val && existing) {
      existing.remove();
    }
  }

  function sendToBot(text) {
    var endpoint =
      apiBase + "/api/chat?botId=" + encodeURIComponent(botId) + "&apiKey=" + encodeURIComponent(apiKey);
    var body = JSON.stringify({
      message: text,
      visitorId: visitorId,
      conversationId: conversationId,
    });

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    })
      .then(function (res) {
        if (!res.ok) {
          setTyping(false);
          appendMessage("assistant", "Sorry, something went wrong. Please try again later.");
          return;
        }
        if (!res.body || typeof res.body.getReader !== "function") {
          return res.json().then(function (json) {
            setTyping(false);
            appendMessage("assistant", json.message || json.content || "No response.");
          });
        }

        var reader = res.body.getReader();
        var decoder = new TextDecoder("utf-8");
        var buffer = "";
        var currentBubble = null;
        var currentText = "";

        function process(chunk) {
          buffer += chunk;
          var lines = buffer.split(/\\r?\\n/);
          buffer = lines.pop() || "";
          for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (!line || line.indexOf("data:") !== 0) continue;
            var payload = line.replace(/^data:\\s*/, "").trim();
            if (!payload) continue;
            var obj;
            try { obj = JSON.parse(payload); } catch (e) { continue; }
            if (obj.type === "meta" && obj.conversationId && !conversationId) {
              conversationId = obj.conversationId;
            } else if (obj.type === "delta" && typeof obj.content === "string") {
              if (!currentBubble) {
                setTyping(false);
                currentBubble = appendMessage("assistant", "");
                currentText = "";
              }
              currentText += obj.content;
              currentBubble.textContent = currentText;
              var c = document.getElementById("chatai-messages");
              if (c) c.scrollTop = c.scrollHeight;
            } else if (obj.type === "done" && currentBubble) {
              if (obj.content) currentBubble.textContent = obj.content;
            } else if (obj.type === "error") {
              if (!currentBubble) setTyping(false);
              appendMessage("assistant", obj.message || "Something went wrong.");
            }
          }
        }

        return reader.read().then(function pump(result) {
          if (result.done) {
            setTyping(false);
            if (!currentBubble) appendMessage("assistant", "No response available right now.");
            return;
          }
          process(decoder.decode(result.value, { stream: true }));
          return reader.read().then(pump);
        });
      })
      .catch(function () {
        setTyping(false);
        appendMessage("assistant", "Network error — please try again in a moment.");
      });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }

  function getStyles() {
    return [
      '.chatai-fab{position:fixed;right:24px;bottom:24px;width:56px;height:56px;border-radius:999px;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 25px rgba(0,0,0,.15);z-index:2147483646;color:#fff;transition:transform .15s ease;}',
      '.chatai-fab:hover{transform:scale(1.05);}',
      '.chatai-window{position:fixed;right:24px;bottom:96px;width:380px;height:560px;max-height:80vh;background:#fff;border-radius:16px;box-shadow:0 20px 40px rgba(0,0,0,.15);display:none;flex-direction:column;overflow:hidden;z-index:2147483646;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;}',
      '.chatai-window.chatai-open{display:flex;}',
      '.chatai-header{color:#fff;padding:14px 16px;position:relative;}',
      '.chatai-title{font-weight:600;font-size:15px;}',
      '.chatai-sub{font-size:12px;opacity:.85;margin-top:2px;}',
      '.chatai-close{position:absolute;right:10px;top:10px;background:transparent;border:none;color:#fff;font-size:18px;cursor:pointer;opacity:.8;}',
      '.chatai-close:hover{opacity:1;}',
      '.chatai-messages{flex:1;padding:12px 14px;overflow-y:auto;background:#f8fafc;}',
      '.chatai-msg{display:flex;margin-bottom:10px;}',
      '.chatai-msg.chatai-user{justify-content:flex-end;}',
      '.chatai-msg.chatai-assistant{justify-content:flex-start;}',
      '.chatai-bubble{max-width:80%;padding:10px 12px;border-radius:12px;font-size:14px;line-height:1.45;word-break:break-word;white-space:pre-wrap;}',
      '.chatai-user .chatai-bubble{background:#e0e7ff;color:#1e293b;border-bottom-right-radius:4px;}',
      '.chatai-assistant .chatai-bubble{background:#fff;color:#0f172a;border:1px solid #e2e8f0;border-bottom-left-radius:4px;}',
      '.chatai-dots{display:inline-flex;align-items:center;gap:4px;min-height:22px;}',
      '.chatai-dots span{width:6px;height:6px;border-radius:999px;background:#94a3b8;display:inline-block;animation:chatai-bounce 1.2s infinite ease-in-out;}',
      '.chatai-dots span:nth-child(2){animation-delay:.15s;}',
      '.chatai-dots span:nth-child(3){animation-delay:.3s;}',
      '@keyframes chatai-bounce{0%,60%,100%{transform:translateY(0);opacity:.5;}30%{transform:translateY(-4px);opacity:1;}}',
      '.chatai-footer{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #e2e8f0;background:#fff;}',
      '.chatai-input{flex:1;height:40px;padding:0 10px;border-radius:10px;border:1px solid #cbd5e1;font-size:14px;outline:none;}',
      '.chatai-input:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.15);}',
      '.chatai-send{height:40px;padding:0 14px;border-radius:10px;color:#fff;font-size:14px;border:none;cursor:pointer;font-weight:500;}',
      '.chatai-transfer{text-align:center;padding:6px 0 12px;}',
      '.chatai-transfer button{background:transparent;border:none;color:#6366f1;font-size:12px;cursor:pointer;text-decoration:underline;}',
      '@media (max-width:480px){.chatai-window{right:12px;left:12px;width:auto;bottom:84px;}}',
    ].join("");
  }
})();
`;
