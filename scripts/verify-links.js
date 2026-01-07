import { readdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = join(__dirname, '..', 'dist');
const TIMEOUT = 10000; // 10 seconds timeout per request

// Extract all links from HTML content
function extractLinks(html) {
  const links = new Set();

  // Match href attributes
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;

  while ((match = hrefRegex.exec(html)) !== null) {
    const link = match[1];
    // Only check external http/https links
    if (link.startsWith('http://') || link.startsWith('https://')) {
      links.add(link);
    }
  }

  return Array.from(links);
}

// Extract JavaScript file references from HTML
function extractJsFiles(html) {
  const jsFiles = new Set();

  // Match script src attributes
  const scriptRegex = /<script[^>]*src=["']([^"']+)["']/g;
  let match;

  while ((match = scriptRegex.exec(html)) !== null) {
    const src = match[1];
    if (src.endsWith('.js')) {
      jsFiles.add(src);
    }
  }

  return Array.from(jsFiles);
}

// Extract links from JavaScript content
function extractLinksFromJs(jsContent) {
  const links = new Set();

  // Match URLs in strings (both single and double quotes)
  const urlRegex = /["'](https?:\/\/[^"'\s]+)["']/g;
  let match;

  while ((match = urlRegex.exec(jsContent)) !== null) {
    const link = match[1];
    // Filter out very short URLs that are likely false positives
    if (link.length > 10) {
      links.add(link);
    }
  }

  return Array.from(links);
}

// Check if a URL is accessible
async function checkLink(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)',
      },
    });
    clearTimeout(timeoutId);

    return {
      url,
      status: response.status,
      ok: response.ok,
    };
  } catch (error) {
    clearTimeout(timeoutId);

    // If HEAD fails, try GET (some servers don't support HEAD)
    if (error.name !== 'AbortError') {
      try {
        const controller2 = new AbortController();
        const timeoutId2 = setTimeout(() => controller2.abort(), TIMEOUT);

        const response = await fetch(url, {
          method: 'GET',
          signal: controller2.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)',
          },
        });
        clearTimeout(timeoutId2);

        return {
          url,
          status: response.status,
          ok: response.ok,
        };
      } catch (getError) {
        return {
          url,
          status: null,
          ok: false,
          error: getError.message,
        };
      }
    }

    return {
      url,
      status: null,
      ok: false,
      error: error.message,
    };
  }
}

// Recursively find all HTML files in a directory
async function findHtmlFiles(dir) {
  const files = [];

  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        files.push(...await findHtmlFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }

  return files;
}

// Main function
async function main() {
  console.log('🔍 Starting link verification...\n');

  // Find all HTML files
  const htmlFiles = await findHtmlFiles(DIST_DIR);
  console.log(`Found ${htmlFiles.length} HTML file(s):`);
  htmlFiles.forEach(file => console.log(`  - ${file}`));
  console.log();

  // Extract all links from HTML and find referenced JS files
  const allLinks = new Set();
  const allJsFiles = new Set();

  for (const file of htmlFiles) {
    const content = await readFile(file, 'utf-8');

    // Extract links from HTML
    const links = extractLinks(content);
    links.forEach(link => allLinks.add(link));

    // Extract JS file references
    const jsFiles = extractJsFiles(content);
    jsFiles.forEach(jsFile => allJsFiles.add(jsFile));
  }

  console.log(`Found ${allJsFiles.size} JavaScript file(s) referenced in HTML`);

  // Extract links from JavaScript files
  for (const jsFile of allJsFiles) {
    // Resolve the JS file path relative to dist directory
    const jsFilePath = join(DIST_DIR, jsFile.startsWith('/') ? jsFile.slice(1) : jsFile);

    try {
      const jsContent = await readFile(jsFilePath, 'utf-8');
      const links = extractLinksFromJs(jsContent);
      links.forEach(link => allLinks.add(link));
      console.log(`  - Extracted ${links.length} link(s) from ${jsFile}`);
    } catch (error) {
      console.log(`  ⚠️  Could not read ${jsFile}: ${error.message}`);
    }
  }

  console.log(`\nFound ${allLinks.size} unique external link(s) to verify\n`);

  if (allLinks.size === 0) {
    console.log('✅ No external links to verify');
    return;
  }

  // Check all links
  const results = [];
  let checked = 0;

  for (const link of allLinks) {
    checked++;
    process.stdout.write(`\rChecking links: ${checked}/${allLinks.size}`);

    const result = await checkLink(link);
    results.push(result);

    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n');

  // Report results
  const broken = results.filter(r => !r.ok);
  const working = results.filter(r => r.ok);

  if (broken.length === 0) {
    console.log('✅ All links are working!\n');
    console.log(`Verified ${working.length} link(s) successfully`);
  } else {
    console.log(`❌ Found ${broken.length} broken link(s):\n`);

    for (const link of broken) {
      console.log(`  • ${link.url}`);
      if (link.status) {
        console.log(`    Status: ${link.status}`);
      }
      if (link.error) {
        console.log(`    Error: ${link.error}`);
      }
      console.log();
    }

    console.log(`✅ ${working.length} link(s) are working`);

    // Exit with error code if there are broken links
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
