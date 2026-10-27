// Builds transparent logo variants, favicon/app icons and the OG image from logo.jpeg.
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = "logo.jpeg";
const NAVY = [15, 37, 67];
const BG_LUM = 247;
const FG_LUM = 34;

mkdirSync("public/brand", { recursive: true });

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

function recolor(rgb) {
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    const a = Math.max(0, Math.min(1, (BG_LUM - lum) / (BG_LUM - FG_LUM)));
    out[j] = rgb[0];
    out[j + 1] = rgb[1];
    out[j + 2] = rgb[2];
    out[j + 3] = Math.round(a * 255);
  }
  return sharp(out, { raw: { width, height, channels: 4 } });
}

// Trim the transparent margin so the logo sits flush in the header.
const darkFull = await recolor(NAVY).png().toBuffer();
const lightFull = await recolor([255, 255, 255]).png().toBuffer();
const trimmedDark = await sharp(darkFull).trim().png().toBuffer();
const trimmedLight = await sharp(lightFull).trim().png().toBuffer();
await sharp(trimmedDark).toFile("public/brand/logo.png");
await sharp(trimmedLight).toFile("public/brand/logo-white.png");

// Symbol only: the hexagon "S" sits left of the wordmark.
const symbolBox = { left: 110, top: 85, width: 310, height: 360 };
const symbol = await sharp(await sharp(darkFull).extract(symbolBox).png().toBuffer()).trim().png().toBuffer();
const symbolWhite = await sharp(await sharp(lightFull).extract(symbolBox).png().toBuffer()).trim().png().toBuffer();
await sharp(symbol).toFile("public/brand/symbol.png");

async function squareIcon(size, file, pad = 0.2) {
  const inner = Math.round(size * (1 - pad * 2));
  const glyph = await sharp(symbolWhite)
    .resize(inner, inner, { fit: "inside" })
    .toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: { r: NAVY[0], g: NAVY[1], b: NAVY[2], alpha: 1 } },
  })
    .composite([{ input: glyph, gravity: "center" }])
    .png()
    .toFile(file);
}
await squareIcon(512, "src/app/icon.png");
await squareIcon(180, "src/app/apple-icon.png", 0.16);

// Open Graph image 1200x630: navy field, white logo, amber accent bar.
const logoForOg = await sharp(trimmedLight).resize({ width: 760 }).toBuffer();
const accent = await sharp({
  create: { width: 1200, height: 14, channels: 4, background: { r: 245, g: 158, b: 11, alpha: 1 } },
}).png().toBuffer();
await sharp({
  create: { width: 1200, height: 630, channels: 4, background: { r: NAVY[0], g: NAVY[1], b: NAVY[2], alpha: 1 } },
})
  .composite([
    { input: logoForOg, gravity: "center" },
    { input: accent, top: 616, left: 0 },
  ])
  .png()
  .toFile("public/brand/og.png");

console.log("brand assets written");
