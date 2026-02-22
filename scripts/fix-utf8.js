import { readFileSync, writeFileSync, readdirSync, statSync, rmSync, existsSync, lstatSync } from 'fs';
import { join } from 'path';

// Directories to scan
const dirs = ['/vercel/share/v0-project', '/vercel/share/v0-next-shadcn'];

function scanDir(dirPath) {
  console.log(`\n=== Scanning: ${dirPath} ===`);
  if (!existsSync(dirPath)) {
    console.log('Directory does not exist');
    return;
  }
  
  try {
    const stat = lstatSync(dirPath);
    console.log(`Is symlink: ${stat.isSymbolicLink()}`);
    console.log(`Is directory: ${stat.isDirectory()}`);
  } catch (e) {
    console.log(`lstat error: ${e.message}`);
  }

  // Remove .next cache
  const nextDir = join(dirPath, '.next');
  if (existsSync(nextDir)) {
    try {
      rmSync(nextDir, { recursive: true, force: true });
      console.log('Removed .next cache');
    } catch (e) {
      console.log(`Could not remove .next: ${e.message}`);
    }
  }

  function walkAndFix(dir) {
    let entries;
    try {
      entries = readdirSync(dir);
    } catch (e) {
      console.log(`Cannot read dir ${dir}: ${e.message}`);
      return;
    }

    for (const entry of entries) {
      if (entry === 'node_modules' || entry === '.next' || entry === '.git' || entry === 'scripts') continue;
      const fullPath = join(dir, entry);
      try {
        const st = statSync(fullPath);
        if (st.isDirectory()) {
          walkAndFix(fullPath);
        } else if (entry.endsWith('.ts') || entry.endsWith('.tsx')) {
          const buf = readFileSync(fullPath);
          const nonAsciiCount = Array.from(buf).filter(b => b > 127).length;
          if (nonAsciiCount > 0) {
            console.log(`CORRUPTED: ${fullPath} (${nonAsciiCount} non-ASCII bytes)`);
            // Show context around non-ASCII bytes
            for (let i = 0; i < buf.length; i++) {
              if (buf[i] > 127) {
                const start = Math.max(0, i - 10);
                const end = Math.min(buf.length, i + 10);
                const context = buf.slice(start, end).toString('latin1');
                console.log(`  byte 0x${buf[i].toString(16)} at offset ${i}: ...${context}...`);
              }
            }
            // Replace non-ASCII bytes with safe ASCII replacements
            const cleaned = Buffer.alloc(buf.length);
            for (let j = 0; j < buf.length; j++) {
              cleaned[j] = buf[j] > 127 ? 63 : buf[j]; // 63 = '?'
            }
            writeFileSync(fullPath, cleaned);
            console.log(`  -> FIXED`);
          } else {
            console.log(`OK: ${fullPath}`);
          }
        }
      } catch (e) {
        console.log(`Error processing ${fullPath}: ${e.message}`);
      }
    }
  }

  walkAndFix(dirPath);
}

for (const dir of dirs) {
  scanDir(dir);
}

console.log('\nDone!');
