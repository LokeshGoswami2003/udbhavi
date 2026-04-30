import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function runHomeSmokeTest() {
  const [
    heroPanelSource,
    globalStylesSource,
    componentsConfigSource,
    loginPageSource,
    signupPageSource,
    workspacePageSource,
  ] = await Promise.all([
    readFile(new URL("../src/features/home/components/hero-panel.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../components.json", import.meta.url), "utf8"),
    readFile(new URL("../src/app/login/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/signup/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/workspace/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(heroPanelSource, /build job-ready resumes/i);
  assert.match(heroPanelSource, /get started free/i);
  assert.match(globalStylesSource, /\.dark\s*\{/);
  assert.match(componentsConfigSource, /"style":\s*"new-york"/i);
  assert.match(loginPageSource, /AuthForm mode="login"/);
  assert.match(signupPageSource, /AuthForm mode="signup"/);
  assert.match(workspacePageSource, /WorkspaceHome/);
}

try {
  await runHomeSmokeTest();
  console.log("1 test passed");
} catch (error) {
  console.error("Frontend smoke test failed.");
  throw error;
}
