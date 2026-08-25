/**
 * Reassembles binary images from base64 parts in assets/images/.
 *
 * Why this exists: the images are committed as base64 text split into small
 * parts rather than as JPEGs. The tooling used to write to this repository
 * transfers text reliably and large binaries unreliably, and a silently
 * truncated JPEG is worse than no JPEG — it looks fine in git and broken in
 * the browser.
 *
 * Runs automatically before `next build` via the "prebuild" script, and the
 * assembled files are gitignored. To replace an image, drop a real JPEG into
 * public/brand/ and delete its parts — the script only writes files whose
 * parts it finds.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const SRC = "assets/images";
const OUT = "public/brand";

let dir;
try {
  dir = readdirSync(SRC);
} catch {
  console.log("[images] no assets/images — nothing to assemble");
  process.exit(0);
}

const groups = new Map();
for (const file of dir) {
  const m = file.match(/^(.+)\.b64\.(\d+)$/);
  if (!m) continue;
  const [, name, index] = m;
  if (!groups.has(name)) groups.set(name, []);
  groups.get(name).push({ index: Number(index), file });
}

mkdirSync(OUT, { recursive: true });

for (const [name, parts] of groups) {
  parts.sort((a, b) => a.index - b.index);

  // A missing part would corrupt the image quietly, so fail loudly instead.
  parts.forEach((p, i) => {
    if (p.index !== i) {
      throw new Error(`[images] ${name}: expected part ${i}, found ${p.index}`);
    }
  });

  const b64 = parts
    .map((p) => readFileSync(join(SRC, p.file), "utf8").trim())
    .join("");
  const bytes = Buffer.from(b64, "base64");
  writeFileSync(join(OUT, name), bytes);
  console.log(`[images] ${name} ← ${parts.length} parts, ${bytes.length} bytes`);
}
