/**
 * CLI render: bundle the compositions and render one to an MP4.
 *
 *   pnpm render [path-to-input.json]
 *
 * Input JSON shape:
 * {
 *   "compositionId": "Scene" | "Project",
 *   "output": "out/example.mp4",
 *   "props": { "scene": {...} } | { "scenes": [...] }
 * }
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia } from "@remotion/renderer";

const entryPoint = fileURLToPath(new URL("../src/index.ts", import.meta.url));

async function main() {
  const inputPath = process.argv[2] ?? "render-input.json";
  const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));

  console.log("Bundling compositions…");
  const serveUrl = await bundle({ entryPoint });

  const compositions = await getCompositions(serveUrl);
  const composition = compositions.find((c) => c.id === input.compositionId);
  if (!composition) {
    throw new Error(`Composition not found: ${input.compositionId}`);
  }

  const outputLocation = input.output ?? "out.mp4";
  fs.mkdirSync(path.dirname(path.resolve(outputLocation)), { recursive: true });

  console.log(`Rendering ${composition.id} → ${outputLocation}`);
  await renderMedia({
    composition,
    serveUrl,
    codec: "h264",
    outputLocation,
    overwrite: true,
    inputProps: input.props ?? {},
    onProgress: ({ progress }) => {
      process.stdout.write(`\rprogress: ${(progress * 100).toFixed(1)}%`);
    },
  });
  console.log("\nrender complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
