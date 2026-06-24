// Quick build script - invokes @netlify/plugin-nextjs directly
import { mkdir, writeFile, rm, copyFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);

// Dynamic import of plugin-nextjs (ESM module)
const pluginModule = await import("@netlify/plugin-nextjs");
console.log("Plugin loaded. Keys:", Object.keys(pluginModule));

const constants = {
  IS_LOCAL: true,
  PUBLISH_DIR: join(process.cwd(), ".next"),
  FUNCTIONS_DIST: join(process.cwd(), ".netlify", "functions-internal"),
  EDGE_FUNCTIONS_DIST: join(process.cwd(), ".netlify", "edge-functions-json"),
  SITE_ID: "00de2ab0-d070-47e8-9162-8e3558545393",
  CONFIG_PATH: join(process.cwd(), "netlify.toml"),
  INTERNAL_EDGE_FUNCTIONS_SRC: join(process.cwd(), ".netlify", "edge-functions"),
  INTERNAL_FUNCTIONS_SRC: join(process.cwd(), ".netlify", "functions-internal"),
  PACKAGE_PATH: "",
  BUILD_TELEMETRY_DISABLED: "true"
};

const netlifyConfig = {
  build: {
    command: "npm run build",
    publish: ".next"
  },
  functions: {
    "*": {
      included_files: []
    }
  },
  redirects: [],
  headers: [],
  edge_functions: []
};

const packageJson = require(join(process.cwd(), "package.json"));

const options = {
  constants,
  netlifyConfig,
  packageJson,
  utils: {
    build: {
      failBuild: (msg) => { throw new Error("failBuild: " + msg); },
      failPlugin: (msg) => { throw new Error("failPlugin: " + msg); },
      cancelBuild: (msg) => { console.log("Cancel:", msg); },
      show: (msg) => console.log("Show:", typeof msg === "string" ? msg : JSON.stringify(msg).slice(0, 200))
    },
    status: {
      show: (status) => console.log("Status:", status?.summary || status)
    },
    cache: {
      restore: async () => false,
      save: async () => false
    },
    run: {
      command: async (cmd) => {
        console.log("Running:", cmd);
        return { stdout: "", stderr: "", success: true, code: 0 };
      }
    },
    git: {
      fileMatch: async () => []
    },
    blob: {
      getDeployStore: () => ({
        get: async () => null,
        getJSON: async () => null,
        set: async () => null,
        setJSON: async () => null,
        delete: async () => null,
        list: async () => []
      })
    }
  },
  inputs: {},
  deployId: "local-build-" + Date.now(),
  featureFlags: {},
  systemLog: () => {},
  logs: {
    info: console.log,
    warn: console.warn,
    error: console.error,
    debug: console.log
  }
};

try {
  console.log("\n=== Running onPreBuild ===");
  await pluginModule.onPreBuild(options);
  console.log("=== onPreBuild done ===");
  
  console.log("\n=== Running onBuild ===");
  await pluginModule.onBuild(options);
  console.log("=== onBuild done ===");
  
  console.log("\n=== Running onEnd ===");
  if (pluginModule.onEnd) await pluginModule.onEnd(options);
  console.log("=== onEnd done ===");
  
  console.log("\n=== Results ===");
  execSync("ls -la .netlify/functions-internal/ 2>&1 || true", { stdio: "inherit" });
  execSync("ls -la .netlify/deploy/ 2>&1 || true", { stdio: "inherit" });
  console.log("\n=== Build artifacts ready ===");
} catch (err) {
  console.error("Build failed:", err.message);
  console.error(err.stack);
  process.exit(1);
}
