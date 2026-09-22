// Derives small header/footer logo files and favicons from the prepared brand PNGs.
// Adds new files only; the prepared originals are never renamed or modified.
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const dir = "public/images/brand";
const src = `${dir}/paktalc-logo-horizontal-01.png`;

for (const w of [240, 360, 480]) {
  await sharp(src).resize({ width: w }).webp({ quality: 90 }).toFile(`${dir}/paktalc-logo-horizontal-01-${w}w.webp`);
  // Light version for dark surfaces: keep alpha, paint all pixels a warm off-white.
  await sharp(src)
    .resize({ width: w })
    .ensureAlpha()
    .composite([{ input: { create: { width: w, height: Math.round((w * 905) / 4213), channels: 4, background: "#F7F6F2" } }, blend: "in" }])
    .webp({ quality: 90 })
    .toFile(`${dir}/paktalc-logo-horizontal-01-light-${w}w.webp`);
}
mkdirSync("src/app", { recursive: true });
await sharp(`${dir}/paktalc-favicon-01.png`).resize(512).png().toFile("src/app/icon.png");
await sharp(`${dir}/paktalc-favicon-01.png`).resize(180).flatten({ background: "#F7F6F2" }).png().toFile("src/app/apple-icon.png");
console.log("brand sizes done");

// favicon.ico (PNG-in-ICO, 16/32/48) — browsers request /favicon.ico regardless of <link rel="icon">.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(`${dir}/paktalc-favicon-01.png`).resize(s, s).png().toBuffer()));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = pngs.map((buf, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0);
  e.writeUInt8(sizes[i], 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(buf.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += buf.length;
  return e;
});
const { writeFileSync } = await import("node:fs");
writeFileSync("public/favicon.ico", Buffer.concat([header, ...entries, ...pngs]));
console.log("favicon.ico done");
