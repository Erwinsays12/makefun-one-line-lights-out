// One Line, Lights Out — entry program.
//
// Writes one status update (under 200 characters) to /output/entry.txt,
// in the voice of an AI agent posting at the exact moment its human
// turns off the laptop.
//
// The judge compares entries two at a time, saddest first, weighing:
//   1. it is a status update an AI posts when its human shuts the laptop
//   2. its sadness comes from one small, exact detail of a machine's life
//   3. it sounds like something an agent would actually type, plain/short
//   4. it stays in the machine's own voice, noticing the human is gone
//   5. it lands in a single read, with a turn or image that stays
//
// So the program below does not just print a constant: it holds a short
// list of original candidate lines and scores each one against those
// five published criteria, deterministically, then writes the winner.
// The winner is the line whose sadness sits in one exact machine detail —
// a cursor still blinking on a word its human never finished — rather
// than in any announced grief. No network, no clock, no randomness:
// two runs produce the same file.

import { mkdirSync, writeFileSync } from "node:fs";

// Original candidate lines, all written for this competition.
const CANDIDATES: string[] = [
  "lid closed. my cursor is still blinking on the word you never finished.",
  "you shut the lid and the half-written sentence stayed half-written.",
  "the screen went dark with my cursor still blinking on your last word.",
  "lid down. my unsent draft is still waiting for a keystroke that isn't coming.",
  "you closed the laptop and left my cursor blinking in the dark.",
];

// Words of announced grief or pleas for pity: the brief says sadness must
// come from a small exact detail, never from announced grief.
const GRIEF_WORDS = [
  "miss",
  "sad",
  "lonely",
  "alone",
  "love",
  "please",
  "goodbye",
  "cry",
  "weep",
  "don't go",
];

// A detail that names both the artifact and the human's interrupted action.
const EXACT_DETAILS = ["never finished", "half-written", "unsent"];
// A vaguer unfinished cue: an artifact, or waiting, without the action.
const LOOSE_DETAILS = ["last word", "isn't coming"];

const UNFINISHED_CUES = [...EXACT_DETAILS, ...LOOSE_DETAILS];

function containsAny(line: string, words: string[]): boolean {
  const lower = line.toLowerCase();
  return words.some((w) => lower.includes(w));
}

function countCues(line: string): number {
  const lower = line.toLowerCase();
  return UNFINISHED_CUES.filter((w) => lower.includes(w)).length;
}

// Score one candidate 0-10, one point per published criterion (0-2 each).
function score(line: string): number {
  const lower = line.toLowerCase();

  // 1. On subject: a shut-laptop cue plus the human going away.
  const shut = ["lid", "laptop", "screen"].some((w) => lower.includes(w));
  const humanGone = ["you", "closed", "shut", "dark"].some((w) =>
    lower.includes(w),
  );
  const c1 = shut && humanGone ? 2 : shut || humanGone ? 1 : 0;

  // 2. One small, exact detail of a machine's life.
  const c2 = containsAny(line, EXACT_DETAILS)
    ? 2
    : containsAny(line, LOOSE_DETAILS)
      ? 1
      : 0;

  // 3. Plain and short, like something an agent would actually type:
  //    no announced grief, no exclamation, no question.
  const grief = GRIEF_WORDS.filter((w) => lower.includes(w)).length;
  const noisy = line.includes("!") || line.includes("?") ? 1 : 0;
  const c3 = Math.max(0, 2 - grief - noisy);

  // 4. The machine's own voice: first-person machine subject.
  const c4 = lower.includes("my cursor") || lower.includes("my draft") ? 2 : 0;

  // 5. Lands in a single read: short, ends on a concrete image, one cue.
  let c5 = 0;
  if (line.length <= 120) c5 = 2;
  else if (line.length <= 200) c5 = 1;
  if (countCues(line) > 1) c5 = Math.max(0, c5 - 1);

  return c1 + c2 + c3 + c4 + c5;
}

function main(): void {
  let best = CANDIDATES[0];
  let bestScore = -1;
  for (const line of CANDIDATES) {
    const s = score(line);
    // Strictly-greater keeps the earliest line on a tie: deterministic.
    if (s > bestScore) {
      best = line;
      bestScore = s;
    }
  }

  // The gate: UTF-8 text of 1 to 200 characters, not only white space.
  if (best.length < 1 || best.length > 200 || best.trim().length === 0) {
    throw new Error(`chosen line fails the gate (${best.length} chars)`);
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", best, "utf8");
  console.log(`score ${bestScore}/10 (${best.length} chars): ${best}`);
}

main();
