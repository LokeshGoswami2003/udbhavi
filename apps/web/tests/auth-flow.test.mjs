import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");

const [packageJsonSource, envExample, authContentSource, homePageSource, homeContentSource] = await Promise.all([
  readFile(path.join(rootDir, "package.json"), "utf8"),
  readFile(path.join(rootDir, ".env.example"), "utf8"),
  readFile(path.join(rootDir, "src/features/auth/content.ts"), "utf8"),
  readFile(path.join(rootDir, "src/app/page.tsx"), "utf8"),
  readFile(path.join(rootDir, "src/features/home/content.ts"), "utf8"),
]);

const packageJson = JSON.parse(packageJsonSource);

assert.match(packageJson.scripts.dev, /-p 3000/);
assert.match(packageJson.scripts.start, /-p 3000/);
assert.match(envExample, /NEXT_PUBLIC_API_BASE_URL=http:\/\/127\.0\.0\.1:8000/);
assert.doesNotMatch(envExample, /3002/);
assert.match(authContentSource, /Resume data stays reusable/);
assert.match(authContentSource, /The first session stays focused/);
assert.match(authContentSource, /Every screen leads forward/);
assert.match(authContentSource, /status: "Now"/);
assert.match(authContentSource, /status: "Next"/);
assert.match(authContentSource, /status: "Later"/);
assert.match(homePageSource, /min-h-\[calc\(100svh-4\.5rem\)\]/);
assert.doesNotMatch(homePageSource, /WorkspacePreview/);
assert.match(homeContentSource, /The post-auth workspace handoff is ready for onboarding/);

console.log("13 auth-flow checks passed");
