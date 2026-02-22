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
      console.log(`  offset=${item.offset} byte=0x${item.hex}`);
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

// Also check if there is a v0-next-shadcn directory
const shadcnDir = '/vercel/share/v0-next-shadcn';
if (existsSync(shadcnDir)) {
  console.log('\n--- /vercel/share/v0-next-shadcn EXISTS ---');
  const shadcnFiles = [
    'lib/data.ts',
    'components/OddsButton.tsx',
  ];
  for (const file of shadcnFiles) {
    const fullPath = join(shadcnDir, file);
    if (existsSync(fullPath)) {
      const buf = readFileSync(fullPath);
      const nonAsciiCount = Array.from(buf).filter(b => b > 127).length;
      console.log(`${file}: ${buf.length} bytes, ${nonAsciiCount} non-ASCII bytes`);
      if (nonAsciiCount > 0) {
        const cleaned = Buffer.alloc(buf.length);
        for (let i = 0; i < buf.length; i++) {
          cleaned[i] = buf[i] > 127 ? 63 : buf[i];
        }
        writeFileSync(fullPath, cleaned);
        console.log(`CLEANED: ${file} in v0-next-shadcn`);
      }
    } else {
      console.log(`${file}: does not exist in v0-next-shadcn`);
    }
  }
} else {
  console.log('\n/vercel/share/v0-next-shadcn does NOT exist');
}

console.log('\nDone!');
