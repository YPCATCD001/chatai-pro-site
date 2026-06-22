// 模拟 service.ts 的行为
const { createClient } = require("@supabase/supabase-js");

// 直接用 service_role key 调用 serviceRole 的简化形式
const client = createClient(
  "https://navepqbhdqjjsescfxws.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hdmVwcWJoZHFqanNlc2NmeHdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjA1MjkwNSwiZXhwIjoyMDk3NjI4OTA1fQ.bIVDoiw8mn_JbjaW7pY9QMjtaFOY82HWV0kIf6h2Xn0",
  {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  }
);

async function run() {
  // 用和 API 路由相同的方式调用 storage
  const fileName = `test-sr-${Date.now()}.txt`;
  const fileBytes = Buffer.from("Hello ChatAI Pro - service role test");

  console.log(`Uploading via serviceRole.storage.from()...`);
  const { data, error } = await client.storage
    .from("knowledge-base")
    .upload(fileName, fileBytes, {
      contentType: "text/plain",
      upsert: true,
    });

  if (error) {
    console.log("ERROR:", error.message);
    console.log("Full:", JSON.stringify(error, null, 2));
  } else {
    console.log("SUCCESS:", data);
  }
}
run();
