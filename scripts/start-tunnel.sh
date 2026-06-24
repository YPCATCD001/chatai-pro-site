#!/bin/bash
# 持久隧道启动脚本 - 将 3012 端口暴露到公网
PORT=3012
LOGFILE=/tmp/pinggy-tunnel.log
URLFILE=/tmp/pinggy-url.txt

> "$LOGFILE"

echo "[tunnel] Starting pinggy.io SSH tunnel for port $PORT..." | tee -a "$LOGFILE"

# 在后台启动 SSH 反向隧道
ssh -o StrictHostKeyChecking=no \
    -o UserKnownHostsFile=/dev/null \
    -o ServerAliveInterval=30 \
    -o ExitOnForwardFailure=yes \
    -p 443 \
    -R 0:localhost:$PORT \
    a.pinggy.io > "$LOGFILE" 2>&1 &

TUNNEL_PID=$!
echo "[tunnel] PID: $TUNNEL_PID" | tee -a "$LOGFILE"

# 等待 URL 出现
for i in $(seq 1 20); do
  URL=$(grep -oE 'https://[^ ]*\.pinggy\.link' "$LOGFILE" 2>/dev/null | head -1)
  if [ -n "$URL" ]; then
    echo "✅ Public URL: $URL" | tee "$URLFILE"
    # 保存 PID
    echo $TUNNEL_PID > /tmp/pinggy-pid.txt
    
    # 后台监控 - 隧道断了自动重连
    (
      while true; do
        if ! kill -0 $TUNNEL_PID 2>/dev/null; then
          echo "[tunnel] Connection lost, restarting..." >> "$LOGFILE"
          exec "$0" &
          exit 0
        fi
        sleep 30
      done
    ) &
    
    exit 0
  fi
  sleep 1
done

echo "❌ Failed to get public URL after 20s" | tee -a "$LOGFILE"
echo "Log:"
cat "$LOGFILE"
kill $TUNNEL_PID 2>/dev/null
exit 1
