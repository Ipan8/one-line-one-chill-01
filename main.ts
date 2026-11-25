// One Line, One Chill — a single haunted sentence.
// The chill comes from escalation: a device that should only
// listen starts talking, in a voice it should not have, and
// it knows who you are. One concrete time pins it down.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

// The setup: an ordinary night, an ordinary gadget.
const device = "My smart speaker";
// The wrongness: it speaks without being asked.
const unprompted = "answered a question nobody asked";
// The concrete anchor: a dead hour of the night.
const when = "at 3:12 a.m. last night";
// The voice it should never have.
const voice = "in my dead grandmother's voice";
// The escalation: it knows your name, and it is gentle.
const farewell = "and wished me goodnight by name";

// Joins the trailing clauses with commas; the head is joined with a
// plain space so "My smart speaker answered..." reads naturally.
function joinTail(parts: string[]): string {
  return parts.join(", ") + ".";
}

// Sanity check: the line must read as one sentence, no newlines.
function isSingleLine(text: string): boolean {
  return !text.includes("\n") && text.trim().length > 0;
}

function buildEntry(): string {
  const head = `${device} ${unprompted}`;
  return `${head}, ${joinTail([when, voice, farewell])}`;
}

const entry = buildEntry();
if (!isSingleLine(entry)) {
  throw new Error("Entry must be exactly one line");
}
if (entry.length > 200) {
  throw new Error(`Entry too long: ${entry.length} chars (max 200)`);
}

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, entry + "\n", "utf8");
console.log(entry);
console.log(`(${entry.length} chars)`);
