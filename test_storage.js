const { createClient } = require("@supabase/supabase-js");

const url = "https://navepqbhdqjjsescfxws.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hdmVwcWJoZHFqanNlc2NmeHdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjA1MjkwNSwiZXhwIjoyMDk3NjI4OTA1fQ.bIVDoiw8mn_JbjaW7pY9QMjtaFOY82HWV0kIf6h2Xn0";

const client = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
});

async function run() {
  const fileName = `test-${Date.now()}.txt`;
  console.log(`Uploading ${fileName} to knowledge-base...`);

  const { data, error } = await client.storage
    .from("knowledge-base")
    .upload(fileName, "Hello ChatAI Pro - test upload", {
      contentType: "text/plain",
      upsert: true,
    });

  if (error) {
    console.log("ERROR:", error.message);
    console.log("Full error:", JSON.stringify(error, null, 2));
  } else {
    console.log("SUCCESS:", data);
    const publicUrl = client.storage.from("knowledge-base").getPublicUrl(fileName);
    console.log("Public URL:", publicUrl.data?.publicUrl);
  }
}
run();
