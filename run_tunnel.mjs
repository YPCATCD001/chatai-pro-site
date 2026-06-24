import localtunnel from 'localtunnel';

(async () => {
  let tunnel;
  try {
    console.log('Starting tunnel to port 3000...');
    tunnel = await localtunnel({ 
      port: 3000,
      local_host: 'localhost'
    });
    console.log('TUNNEL_URL:' + tunnel.url);
    
    tunnel.on('request', (info) => {
      console.log('Request:', info.method, info.path);
    });
    tunnel.on('error', (err) => {
      console.error('Tunnel error:', err.message);
    });
    tunnel.on('close', () => {
      console.log('Tunnel closed');
    });
    
    // keep alive
    setInterval(() => {}, 1000);
  } catch (e) {
    console.error('Failed:', e.message);
    process.exit(1);
  }
})();
