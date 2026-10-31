import { access, copyFile, cp, mkdir, rm, writeFile } from 'node:fs/promises';
import config from '../astro.config.mjs';

const source = new URL('../dist/', import.meta.url);
const output = new URL('../dist-cloudflare/', import.meta.url);
const base = config.base.replace(/^\/+|\/+$/g, '');

if (base.split('/').some((segment) => segment === '.' || segment === '..')) {
  throw new Error('Astro base path must not contain dot segments.');
}

// Preserve the public URL prefix using real directories, without assets.base_path.
// GitHub Pages continues to publish the original dist directory.
await access(new URL('index.html', source));
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, base ? new URL(`${base}/`, output) : output, { recursive: true });
if (base) {
  await copyFile(new URL('404.html', source), new URL('404.html', output));
  await writeFile(new URL('_redirects', output), `/ /${base}/ 302\n`);
}

console.log(`Cloudflare static assets prepared for ${config.base}`);
