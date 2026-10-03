// Convert images to optimised WebP for the site.
//
// Usage (from the repo root):
//   npm i --no-save sharp
//   node tools/optimize-images.js <input-file-or-folder> [maxWidth=1800] [quality=80]
//
// Output goes to assets/img/<name>.webp. Put original exports in assets/raw/ (gitignored).
// Use maxWidth ~640 for phone screenshots, ~1800 for charts and mockups.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const [input, maxWidth = '1800', quality = '80'] = process.argv.slice(2);
if (!input) {
  console.error('Usage: node tools/optimize-images.js <file-or-folder> [maxWidth] [quality]');
  process.exit(1);
}

const outDir = path.join(__dirname, '..', 'assets', 'img');
fs.mkdirSync(outDir, { recursive: true });

const files = fs.statSync(input).isDirectory()
  ? fs.readdirSync(input).filter((f) => /\.(png|jpe?g|webp|avif|tiff?)$/i.test(f)).map((f) => path.join(input, f))
  : [input];

(async () => {
  for (const file of files) {
    const name = path.basename(file).replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const dest = path.join(outDir, name + '.webp');
    const info = await sharp(file)
      .resize({ width: Number(maxWidth), withoutEnlargement: true })
      .webp({ quality: Number(quality), alphaQuality: 90, effort: 5 })
      .toFile(dest);
    console.log(`${path.relative(process.cwd(), dest)}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
  }
})();
