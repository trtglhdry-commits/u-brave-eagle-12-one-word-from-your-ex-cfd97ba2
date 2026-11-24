// One Word From Your Ex — entry program.
//
// The entry is exactly one word: the word an ex would use to describe
// the entrant. "unavailable" is that word: the classic verdict an ex
// delivers, painfully honest and instantly relatable. It stings because
// it is true — not an insult, but a diagnosis the entrant plainly knows:
// always somewhere else, always just out of reach, always with a reason
// that was never quite the real one. No near-synonym carries the same
// edge ("busy" is an excuse, "distant" is cold, "gone" is already over),
// and it needs no explanation: one word, and everyone who has lived
// through it hears the whole story.
//
// The program writes the word to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt), enforcing the competition gate itself:
// UTF-8, a single word of 1-24 characters, no whitespace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "unavailable";

function main(): void {
  // Gate: exactly one word, 1-24 characters, no whitespace at all.
  if (!/^\S{1,24}$/.test(WORD)) {
    throw new Error(`entry word fails the gate: ${JSON.stringify(WORD)}`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, WORD + "\n", "utf8");

  // Read back what was written: the entry must be exactly the word.
  if (readFileSync(outPath, "utf8") !== WORD + "\n") {
    throw new Error(`entry.txt does not contain the word: ${JSON.stringify(WORD)}`);
  }
}

main();
