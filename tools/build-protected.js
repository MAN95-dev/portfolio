// Build the password-protected case studies.
//
// Usage (from the repo root):
//   node tools/build-protected.js
//
// The readable source of each protected page lives in private/ (gitignored) and never
// reaches GitHub. This script scrambles it with StatiCrypt (AES, decrypted in the
// visitor's browser) and writes the result into the site, which is safe to commit.
//
// - Images under private/img/ are embedded into the page before scrambling, so they're
//   protected too. Images under assets/ stay as normal public files.
// - The password for each page is read from private/<name>-password.txt.
// - The salt lives in tools/staticrypt.json. Keep it the same, or anyone who ticked
//   "Remember me" will have to type the password again.
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '..');
const pages = [
  { name: 'group-search', src: 'private/group-search-full.html', out: 'work/group-search' },
];

const mime = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.gif': 'image/gif' };

for (const page of pages) {
  const password = fs.readFileSync(path.join(root, `private/${page.name}-password.txt`), 'utf8').trim();
  let html = fs.readFileSync(path.join(root, page.src), 'utf8');

  // Embed private images: src="<anything>/private/img/file.webp" becomes a data: URI
  html = html.replace(/src="[^"]*?private\/img\/([^"]+)"/g, (_, file) => {
    const p = path.join(root, 'private/img', file);
    const type = mime[path.extname(p).toLowerCase()] || 'application/octet-stream';
    return `src="data:${type};base64,${fs.readFileSync(p).toString('base64')}"`;
  });

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'protected-'));
  const tmpFile = path.join(tmp, 'index.html');
  fs.writeFileSync(tmpFile, html);
  const outDir = path.join(root, page.out);
  fs.mkdirSync(outDir, { recursive: true });

  execFileSync('npx', ['-y', 'staticrypt@3', tmpFile,
    '-p', password,
    '-d', page.out,
    '-c', 'tools/staticrypt.json',
    '--short',
    '-t', 'tools/password-template.html',
    '--remember', '30',
    '--template-title', 'Group Search case study',
    '--template-instructions', "This case study includes confidential Slimming World data, so it's password protected. Enter the password I sent you.",
    '--template-placeholder', 'Password',
    '--template-button', 'Read the case study',
    '--template-remember', 'Remember me on this device',
    '--template-error', "That password didn't work. Please try again.",
    '--template-color-primary', '#d3072a',
    '--template-color-secondary', '#fbf8f4',
  ], { stdio: 'inherit', cwd: root });

  // Keep the password page out of search results
  const outFile = path.join(outDir, 'index.html');
  const built = fs.readFileSync(outFile, 'utf8');
  if (!built.includes('name="robots"')) {
    fs.writeFileSync(outFile, built.replace(/<head>/i, '<head>\n    <meta name="robots" content="noindex">'));
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`Protected: ${path.relative(root, outFile)}`);
}
