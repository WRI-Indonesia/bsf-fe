const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "node_modules", "payload", "dist", "bin", "loadEnv.js");

try {
  let content = fs.readFileSync(filePath, "utf8");

  const oldImport = "import nextEnvImport from '@next/env';";
  const newImport = "import { createRequire } from 'module'; const _require = createRequire(import.meta.url); const nextEnvImport = _require('@next/env');";

  if (content.includes(oldImport)) {
    content = content.replace(oldImport, newImport);
    fs.writeFileSync(filePath, content);
    console.log("[OK] Patched payload loadEnv.js successfully");
  } else if (content.includes(newImport)) {
    console.log("[OK] payload loadEnv.js already patched");
  } else {
    console.log("[WARN] Could not find the expected import pattern in loadEnv.js");
    console.log("       File may have been updated. Check manually.");
  }
} catch (err) {
  console.error("[FAIL] Failed to patch loadEnv.js:", err.message);
  process.exit(1);
}
