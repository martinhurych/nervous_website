#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  dim: '\x1b[2m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message, error = null) {
  log(`✗ ERROR: ${message}`, 'red');
  if (error && error.stack) {
    log(`\nStack trace:\n${error.stack}`, 'dim');
  }
}

function logSuccess(message) {
  log(`✓ ${message}`, 'green');
}

function logInfo(message) {
  log(`ℹ ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠ ${message}`, 'yellow');
}

// Main generator function
async function generateProductPages(forceRegenerate = false) {
  try {
    logInfo('Starting product page generation...\n');

    // Step 1: Load equipment data
    const equipmentDataPath = path.join(__dirname, '..', 'equipment-data.js');
    if (!fs.existsSync(equipmentDataPath)) {
      logError(`equipment-data.js not found at: ${equipmentDataPath}`);
      process.exit(1);
    }

    logInfo(`Reading equipment data from: ${equipmentDataPath}`);
    
    // Read and parse equipment data
    const equipmentDataContent = fs.readFileSync(equipmentDataPath, 'utf8');
    
    // Extract EQUIPMENT_DATA array using regex
    const dataMatch = equipmentDataContent.match(/const\s+EQUIPMENT_DATA\s*=\s*(\[[\s\S]*?\]);/);
    if (!dataMatch) {
      logError('Could not parse EQUIPMENT_DATA from equipment-data.js');
      process.exit(1);
    }

    // Safely evaluate the array
    let EQUIPMENT_DATA;
    try {
      EQUIPMENT_DATA = eval(dataMatch[1]);
    } catch (error) {
      logError('Failed to parse equipment data array', error);
      process.exit(1);
    }

    logSuccess(`Loaded ${EQUIPMENT_DATA.length} products`);

    // Step 2: Create products directory
    const productsDir = path.join(__dirname, '..', 'products');
    if (!fs.existsSync(productsDir)) {
      logInfo('Creating products/ directory...');
      try {
        fs.mkdirSync(productsDir, { recursive: true });
        logSuccess('Created products/ directory');
      } catch (error) {
        logError(`Failed to create products/ directory: ${error.message}`, error);
        log('\nTry running: mkdir products', 'yellow');
        process.exit(1);
      }
    }

    // Step 3: Generate HTML for each product
    let generatedCount = 0;
    let skippedCount = 0;
    const productUrls = [];

    for (const item of EQUIPMENT_DATA) {
      const filename = `${item.id}.html`;
      const filepath = path.join(productsDir, filename);
      
      // Check if file exists and skip if not forcing regeneration
      if (!forceRegenerate && fs.existsSync(filepath)) {
        skippedCount++;
        productUrls.push({ id: item.id, name: item.name });
        continue;
      }

      try {
        const html = generateProductHTML(item);
        fs.writeFileSync(filepath, html, 'utf8');
        generatedCount++;
        productUrls.push({ id: item.id, name: item.name });
        log(`  Generated: ${filename}`, 'dim');
      } catch (error) {
        logError(`Failed to generate ${filename}`, error);
        process.exit(1);
      }
    }

    if (forceRegenerate) {
      logSuccess(`\nRegenerated all ${generatedCount} product pages`);
    } else {
      logSuccess(`\nGenerated ${generatedCount} new product pages`);
      if (skippedCount > 0) {
        logInfo(`Skipped ${skippedCount} existing pages (use --force to regenerate)`);
      }
    }

    // Step 4: Generate sitemap.xml
    logInfo('\nGenerating sitemap.xml...');
    const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
    try {
      const sitemap = generateSitemap(productUrls);
      fs.writeFileSync(sitemapPath, sitemap, 'utf8');
      logSuccess('Generated sitemap.xml');
    } catch (error) {
      logError('Failed to generate sitemap.xml', error);
      process.exit(1);
    }

    // Success summary
    log('\n' + '='.repeat(50), 'green');
    logSuccess('Product page generation completed successfully!');
    log('='.repeat(50) + '\n', 'green');

  } catch (error) {
    logError('Unexpected error during generation', error);
    process.exit(1);
  }
}

// Generate HTML for a single product
function generateProductHTML(item) {
  const baseUrl = 'https://nervousmusictastemaker.com';
  const productUrl = `${baseUrl}/products/${item.id}.html`;
  const imageUrl = `${baseUrl}/images/${item.id}.jpg`;
  
  // Use detailedDescription if available, otherwise fall back to description
  const description = item.detailedDescription || item.description;
  
  // Escape HTML entities
  const escapeHtml = (text) => {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Load catalog.html body content
  const catalogPath = path.join(__dirname, '..', 'catalog.html');
  const catalogContent = fs.readFileSync(catalogPath, 'utf8');
  const bodyMatch = catalogContent.match(/<body>([\s\S]*)<\/body>/);
  const bodyContent = bodyMatch ? bodyMatch[1] : '';
  
  // Fix relative paths for products folder
  const fixedBodyContent = bodyContent
    .replace(/href="index\.html"/g, 'href="../index.html"')
    .replace(/href="catalog\.html"/g, 'href="../catalog.html"')
    .replace(/href="services\.html"/g, 'href="../services.html"')
    .replace(/href="contact\.html"/g, 'href="../contact.html"')
    .replace(/src="equipment-data\.js/g, 'src="../equipment-data.js')
    .replace(/src="app\.js/g, 'src="../app.js')
    .replace(/src="images\//g, 'src="../images/');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(item.name)} - nervousmusictastemaker</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="${escapeHtml(description.substring(0, 160))}">
    <link rel="canonical" href="${productUrl}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="product">
    <meta property="og:url" content="${productUrl}">
    <meta property="og:title" content="${escapeHtml(item.name)} - nervousmusictastemaker">
    <meta property="og:description" content="${escapeHtml(description.substring(0, 300))}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:site_name" content="nervousmusictastemaker">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="${productUrl}">
    <meta name="twitter:title" content="${escapeHtml(item.name)} - nervousmusictastemaker">
    <meta name="twitter:description" content="${escapeHtml(description.substring(0, 200))}">
    <meta name="twitter:image" content="${imageUrl}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="../favicon.ico">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="../style.css">
    
    <!-- Plausible Analytics -->
    <script defer data-domain="nervousmusictastemaker.com" src="https://plausible.chararray.cz/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"></script>
    <script>window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }</script>
    
    <!-- Schema.org Product Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "${escapeHtml(item.name)}",
      "description": "${escapeHtml(description)}",
      "image": "${imageUrl}",
      "category": "${escapeHtml(item.category)}",
      "brand": {
        "@type": "Brand",
        "name": "nervousmusictastemaker"
      },
      "offers": {
        "@type": "Offer",
        "price": "${item.price}",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31",
        "itemCondition": "https://schema.org/UsedCondition"
      }
    }
    </script>
</head>
${fixedBodyContent}
    
    <!-- Auto-open modal when visiting product page directly -->
    <script>
        // When page loads, automatically open the modal for this product
        window.addEventListener('DOMContentLoaded', function() {
            // Give a moment for the page to fully initialize
            setTimeout(function() {
                if (typeof openItemModal === 'function') {
                    openItemModal('${item.id}');
                }
            }, 100);
        });
    </script>
</body>
</html>`;
}

// Generate sitemap.xml
function generateSitemap(productUrls) {
  const baseUrl = 'https://nervousmusictastemaker.com';
  const today = new Date().toISOString().split('T')[0];
  
  const mainPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: 'catalog.html', priority: '0.9', changefreq: 'weekly' },
    { url: 'services.html', priority: '0.8', changefreq: 'monthly' },
    { url: 'contact.html', priority: '0.8', changefreq: 'monthly' }
  ];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Add main pages
  mainPages.forEach(page => {
    sitemap += `  <url>
    <loc>${baseUrl}/${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  // Add product pages
  productUrls.forEach(product => {
    sitemap += `  <url>
    <loc>${baseUrl}/products/${product.id}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;
  
  return sitemap;
}

// Parse command line arguments
const args = process.argv.slice(2);
const forceRegenerate = args.includes('--force');

// Run generator
generateProductPages(forceRegenerate);
