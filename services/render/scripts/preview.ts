/**
 * Start Remotion Studio for local editing/preview of the compositions.
 *
 *   pnpm preview
 */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const entryPoint = fileURLToPath(new URL("../src/index.ts", import.meta.url));
const child = spawn("npx", ["remotion", "studio", entryPoint], { stdio: "inherit" });
child.on("exit", (code) => process.exit(code ?? 0));
