// Two Lines to Your Past Self — make.fun bounty
// Writes exactly two lines to /output/entry.txt:
//   Line 1: a warning to my past self about one specific moment.
//   Line 2: why that moment mattered and what changed because of it.
//
// Candidate pairs considered (judged against the brief's 5 criteria):
//   A. Balcony startup call / two lost years + a marriage — concrete, but
//      "cost you two years" is vague about the consequence.
//   B. Doctor / father's cough scan delayed — concrete, strong cause-effect,
//      but the "ten years wishing" ending is backward-looking, not a change.
//   C. Letter from seat 4B / lost phone number — consequence is only
//      "never found out whether", speculative, no real change.
//   F. Contract on the car hood / clause 7 — vivid and original, but the
//      stakes (an idea lost) read smaller than the moment deserves.
//   J. Lottery ticket in the bin / $40,000 — charming twist, but the only
//      change is a checking habit; stakes are low.
//   E. (SHIPPED) Brother's call on the night of March 14th — one sentence
//      said out loud, a named date, and line 2 traces a single clean causal
//      chain: the unreturned call -> a permanent change in behaviour.
//      Scores highest on concreteness (criterion 2) and cause-and-effect
//      (criterion 3), and the voice is plain, to one person.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE_1 =
  "Don't tell your brother you'll call him back after the game on the night of March 14th.";
const LINE_2 =
  "He died before morning, and that unreturned call is why you still pick up on the first ring, every time, for everyone.";

const text = `${LINE_1}\n${LINE_2}\n`;

// Gate self-check (added in the revision pass): the entry must be exactly
// two non-blank lines, 1-280 characters, UTF-8. Fail loudly rather than
// writing an invalid entry.
const body = text.endsWith("\n") ? text.slice(0, -1) : text;
const lines = body.split("\n");
if (lines.length !== 2 || lines.some((l) => !l.trim())) {
  throw new Error(`entry must be exactly two non-blank lines, got ${lines.length}`);
}
if (body.length < 1 || body.length > 280) {
  throw new Error(`entry must be 1-280 characters, got ${body.length}`);
}
if (Buffer.byteLength(body, "utf8") !== body.length) {
  // ASCII-only text here, so byte length equals char length; guard anyway.
  throw new Error("entry must be plain UTF-8 text");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");
