/**
 * Keys the flat-white background out of the generated buddy artwork and
 * writes transparent PNGs to public/images/buddy/.
 *
 * All buddy shots are edits of one base generation, so they share a canvas
 * and pose. We flood-fill "background" from the image borders (interior
 * whites like eye highlights survive), then crop every file to the UNION
 * bounding box so costumes stay pixel-aligned when the UI swaps them.
 *
 * Usage: node scripts/buddy-key.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.resolve(WEB, "..", "images");
const OUT = path.join(WEB, "public", "images", "buddy");

const JOBS = [
  ["1784311703927-f1f5232a.jpg", "base"],
  ["1784311740035-4bfc6b16.jpg", "explorer"],
  ["1784311757914-e16b41e0.jpg", "cricket"],
  ["1784311778108-77fdc16d.jpg", "party"],
  ["1784311795537-ab286721.jpg", "wizard"],
  ["1784311821113-1bb353d2.jpg", "super"],
  ["1784311840125-942e46ba.jpg", "royal"],
  ["1784311861887-8da62a22.jpg", "dancer"],
  ["1784311892019-161f9f3f.jpg", "astro"],
];

const WHITE = 225; // border-connected pixels this bright are background
const FEATHER_LO = 185; // silhouette-edge pixels fade out from this brightness
const PAD = 12;
const OUT_HEIGHT = 720;

async function loadMask(file) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const bg = new Uint8Array(w * h);
  const stack = [];
  const tryPush = (x, y) => {
    const i = y * w + x;
    if (bg[i]) return;
    const p = i * 4;
    if (data[p] >= WHITE && data[p + 1] >= WHITE && data[p + 2] >= WHITE) {
      bg[i] = 1;
      stack.push(i);
    }
  };
  for (let x = 0; x < w; x++) {
    tryPush(x, 0);
    tryPush(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    tryPush(0, y);
    tryPush(w - 1, y);
  }
  while (stack.length) {
    const i = stack.pop();
    const x = i % w;
    const y = (i / w) | 0;
    if (x > 0) tryPush(x - 1, y);
    if (x < w - 1) tryPush(x + 1, y);
    if (y > 0) tryPush(x, y - 1);
    if (y < h - 1) tryPush(x, y + 1);
  }
  return { data, w, h, bg };
}

fs.mkdirSync(OUT, { recursive: true });

const imgs = [];
let minX = Infinity;
let minY = Infinity;
let maxX = -1;
let maxY = -1;

for (const [srcName, outName] of JOBS) {
  const img = await loadMask(path.join(SRC, srcName));
  if (imgs.length && (img.w !== imgs[0].w || img.h !== imgs[0].h)) {
    throw new Error(`${srcName}: canvas ${img.w}x${img.h} differs from first`);
  }
  for (let y = 0; y < img.h; y++) {
    for (let x = 0; x < img.w; x++) {
      if (!img.bg[y * img.w + x]) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  imgs.push({ ...img, outName });
}

const left = Math.max(0, minX - PAD);
const top = Math.max(0, minY - PAD);
const width = Math.min(imgs[0].w, maxX + PAD + 1) - left;
const height = Math.min(imgs[0].h, maxY + PAD + 1) - top;
console.log(`union crop: ${width}x${height} @ ${left},${top}`);

for (const img of imgs) {
  const { data, w, h, bg, outName } = img;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const p = i * 4;
      if (bg[i]) {
        data[p + 3] = 0;
        continue;
      }
      const edge =
        (x > 0 && bg[i - 1]) ||
        (x < w - 1 && bg[i + 1]) ||
        (y > 0 && bg[i - w]) ||
        (y < h - 1 && bg[i + w]);
      if (edge) {
        const br = Math.min(data[p], data[p + 1], data[p + 2]);
        if (br >= FEATHER_LO) {
          const t = (br - FEATHER_LO) / (255 - FEATHER_LO);
          data[p + 3] = Math.round(255 * (1 - t));
        }
      }
    }
  }
  const dst = path.join(OUT, `${outName}.png`);
  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left, top, width, height })
    .resize({ height: OUT_HEIGHT, fit: "inside" })
    .png({ palette: true, quality: 90, compressionLevel: 9 })
    .toFile(dst);
  console.log(`wrote ${dst}`);
}
