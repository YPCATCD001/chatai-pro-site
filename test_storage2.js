const { createClient } = require("@supabase/supabase-js");
const url = "https://navepqbhdqjjsescfxws.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hdmVwcWJoZHFqanNlc2NmeHdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjA1MjkwNSwiZXhwIjoxMDk3NjI4OTA1fQ.bIVDoiw8mn_JbjaW7pY9QMjtaFOY82HWV0kIf6h2Xn0";

const client = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
});

async function run() {
  const fileName = `test-nodejs-${Date.now()}.txt`;
  console.log(`Uploading ${fileName}...`);
  const { data, error } = await client.storage
    .from("knowledge-base")
    .upload(fileName, "Hello Node.js", {
      contentType: "text/plain",
    });
  if (error) {
    console.log("ERROR:", error.message);
    console.log("Full:", JSON.stringify(error, null, 2).substring(0, 300));
  } else {
    console.log("SUCCESS:", data);
  }
}
run();
