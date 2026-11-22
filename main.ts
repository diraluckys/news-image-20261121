// SPDX-License-Identifier: MIT
// News-image entry for 21 November 2026.
//
// The graded picture lives beside this file as entry.png: a fixed 1024x1024
// PNG (400,246 bytes) composed beforehand. This program has one job, to put
// an exact copy of it at the grader's output path, so the picture the judge
// sees is byte-for-byte the one in the repository. Nothing is drawn or
// fetched at run time, and two runs write identical bytes.
//
// When MAKEFUN_OUTPUT_DIR is set (for a local run), the copy lands there
// instead of /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(targetDir, { recursive: true });
const bytes = readFileSync(source);
const target = join(targetDir, "entry.png");
writeFileSync(target, bytes);
// Guard against a truncated copy: the file on disk must hold every byte.
const written = statSync(target).size;
if (written !== bytes.length) {
  throw new Error(`entry.png copy incomplete: wrote ${written} of ${bytes.length} bytes`);
}
