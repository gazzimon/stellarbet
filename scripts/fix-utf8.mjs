import { readFileSync, writeFileSync, rmSync, existsSync } from 'fs';
import { join } from 'path';

const root = '/vercel/share/v0-project';

// Remove .next cache to force full recompilation
const nextDir = join(root, '.next');
if (existsSync(nextDir)) {
  rmSync(nextDir, { recursive: true, force: true });
  console.log('Removed .next directory');
}

// Files to check and clean
const filesToCheck = [
  'components/OddsButton.tsx',
  'lib/data.ts',
  'components/MatchRow.tsx',
  'components/TopCategories.tsx',
  'app/page.tsx',
];

for (const file of filesToCheck) {
  const fullPath = join(root, file);
  if (!existsSync(fullPath)) {
    console.log(`SKIP: ${file} does not exist`);
    continue;
  }

  const buf = readFileSync(fullPath);
  console.log(`\n--- ${file} ---`);
  console.log(`Size: ${buf.length} bytes`);

  // Check for non-ASCII bytes
  const nonAscii = [];
  for (let i = 0; i < buf.length; i++) {
    if (buf[i] > 127) {
      nonAscii.push({ offset: i, byte: buf[i], hex: buf[i].toString(16) });
    }
  }

  if (nonAscii.length > 0) {
    console.log(`FOUND ${nonAscii.length} non-ASCII bytes:`);
    for (const item of nonAscii) {
      const context = buf.slice(Math.max(0, item.offset - 10), item.offset + 10).toString('utf8', 0, 20);
      console.log(`  offset=${item.offset} byte=0x${item.hex} context="${context}"`);
    }

    // Replace non-ASCII bytes with '?' to make it valid ASCII
    const cleaned = Buffer.alloc(buf.length);
    for (let i = 0; i < buf.length; i++) {
      cleaned[i] = buf[i] > 127 ? 63 : buf[i]; // 63 = '?'
    }
    writeFileSync(fullPath, cleaned);
    console.log(`CLEANED: ${file}`);
  } else {
    console.log('OK: No non-ASCII bytes found');
  }
}

// Also check if there's a symlink or v0-next-shadcn directory issue
const shadcnDir = '/vercel/share/v0-next-shadcn';
if (existsSync(shadcnDir)) {
  console.log('\n--- /vercel/share/v0-next-shadcn EXISTS ---');
  const shadcnData = join(shadcnDir, 'lib/data.ts');
  const shadcnOdds = join(shadcnDir, 'components/OddsButton.tsx');
  
  if (existsSync(shadcnData)) {
    const buf = readFileSync(shadcnData);
    const nonAscii = [];
    for (let i = 0; i < buf.length; i++) {
      if (buf[i] > 127) nonAscii.push(i);
    }
    console.log(`v0-next-shadcn/lib/data.ts: ${buf.length} bytes, ${nonAscii.length} non-ASCII`);
  }
  if (existsSync(shadcnOdds)) {
    const buf = readFileSync(shadcnOdds);
    const nonAscii = [];
    for (let i = 0; i < buf.length; i++) {
      if (buf[i] > 127) nonAscii.push(i);
    }
    console.log(`v0-next-shadcn/components/OddsButton.tsx: ${buf.length} bytes, ${nonAscii.length} non-ASCII`);
  }
} else {
  console.log('\n/vercel/share/v0-next-shadcn does NOT exist');
}
