import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("Vercel output routes the root path through the Nitro function", async () => {
  const outputDirectory = new URL("../.vercel/output/", import.meta.url);
  const config = JSON.parse(
    await readFile(new URL("config.json", outputDirectory), "utf8"),
  );

  assert.equal(config.version, 3);
  assert.deepEqual(config.routes.at(-1), {
    src: "/(.*)",
    dest: "/__server",
  });

  const handlerUrl = new URL(
    "functions/__server.func/index.mjs",
    outputDirectory,
  );
  handlerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: handler } = await import(handlerUrl.href);
  const response = await handler.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {},
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(await response.text(), developmentPreviewMeta);
});
