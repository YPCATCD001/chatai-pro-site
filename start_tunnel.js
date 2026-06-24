const localtunnel = require('localtunnel');
(async () => {
  try {
    const tunnel = await localtunnel({ port: 3000 });
    console.log('TUNNEL_URL:' + tunnel.url);
    tunnel.on('close', () => console.log('Tunnel closed'));
    tunnel.on('error', (err) => console.error('Tunnel error:', err.message));
    setInterval(() => {}, 1000);
  } catch(e) {
    console.error('Failed to start tunnel:', e.message);
    process.exit(1);
  }
})();
