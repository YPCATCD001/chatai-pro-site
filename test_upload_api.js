const { createClient } = require("@supabase/supabase-js");

const url = "https://navepqbhdqjjsescfxws.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hdmVwcWJoZHFqanNlc2NmeHdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjA1MjkwNSwiZXhwIjoyMDk3NjI4OTA1fQ.bIVDoiw8mn_JbjaW7pY9QMjtaFOY82HWV0kIf6h2Xn0";

let cached = null;
function createServiceRoleClient() {
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
}
function getServiceRoleClient() {
  if (!cached) cached = createServiceRoleClient();
  return cached;
}

const serviceRole = {
  from: (table) => getServiceRoleClient().from(table),
  storage: {
    from: (bucket) => getServiceRoleClient().storage.from(bucket),
  },
};

async function run() {
  // 模拟 upload API 的调用：createClient() + serviceRole.storage.from()
  // 先读取一个测试文件
  const fileName = `test-api-${Date.now()}.txt`;
  const fileContent = "ChatAI Pro Test Upload";
  const fileBytes = Buffer.from(fileContent, 'utf-8');

  console.log(`Uploading ${fileName} (${fileBytes.length} bytes) via serviceRole.storage...`);

  const { data, error } = await serviceRole.storage
    .from("knowledge-base")
    .upload(fileName, fileBytes, {
      contentType: "text/plain",
      upsert: true,
    });

  if (error) {
    console.log("ERROR:", error.message);
    console.log("Full error:", JSON.stringify(error, null, 2));
  } else {
    console.log("SUCCESS:", data);
    const { data: publicUrlData } = serviceRole.storage.from("knowledge-base").getPublicUrl(fileName);
    console.log("Public URL:", publicUrlData?.publicUrl);
  }
}
run();
