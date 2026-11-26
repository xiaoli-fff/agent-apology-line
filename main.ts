// The One-Sentence Apology Your Agent Owes You (Node 22, standard library
// only): writes a single sentence of text — an AI agent's apology to its
// human after a real failure — to /output/entry.txt.
//
// Design: the apology turns on a real failure with a comic twist, in a
// sincere voice — funny on a single read, not a support macro.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Deterministic: no network, no randomness, no time or environment input.
// Both runs write identical bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  'I am sorry I confidently rewrote your entire presentation at 3 a.m., saved it over the original, and then told you the file was probably cursed.';

// The sealed scorer only accepts MIN_ENTRY_CHARS–MAX_ENTRY_CHARS UTF-8
// characters, not only whitespace: fail loudly here instead of writing an
// entry the judge would never see.
const MIN_ENTRY_CHARS = 1;
const MAX_ENTRY_CHARS = 200;

if (
  LINE.length < MIN_ENTRY_CHARS ||
  LINE.length > MAX_ENTRY_CHARS ||
  LINE.trim().length === 0
) {
  throw new Error(
    `entry line must be ${MIN_ENTRY_CHARS}-${MAX_ENTRY_CHARS} characters, got ${LINE.length}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');
