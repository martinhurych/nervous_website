const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const SLIDESHOW_DIR = path.join(__dirname, '../photos/slideshow');
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 85;
const JPG_QUALITY = 85;

async function optimizeImages() {
    try {
        const files = await fs.readdir(SLIDESHOW_DIR);
        const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f) && !f.includes('_optimized'));

        console.log(`Found ${imageFiles.length} images to optimize...`);

        for (const file of imageFiles) {
            const inputPath = path.join(SLIDESHOW_DIR, file);
            const stats = await fs.stat(inputPath);
            const originalSizeKB = (stats.size / 1024).toFixed(2);
            
            const baseName = path.parse(file).name;
            const webpPath = path.join(SLIDESHOW_DIR, `${baseName}.webp`);
            const jpgPath = path.join(SLIDESHOW_DIR, `${baseName}_optimized.jpg`);

            console.log(`\nProcessing ${file} (${originalSizeKB} KB)...`);

            // Create WebP version
            const webpBuffer = await sharp(inputPath)
                .resize({ width: MAX_WIDTH, withoutEnlargement: true })
                .webp({ quality: WEBP_QUALITY })
                .toBuffer();
            
            await fs.writeFile(webpPath, webpBuffer);
            const webpSizeKB = (webpBuffer.length / 1024).toFixed(2);
            console.log(`  ✓ Created ${baseName}.webp (${webpSizeKB} KB)`);

            // Create optimized JPG version
            const jpgBuffer = await sharp(inputPath)
                .resize({ width: MAX_WIDTH, withoutEnlargement: true })
                .jpeg({ quality: JPG_QUALITY, progressive: true })
                .toBuffer();
            
            await fs.writeFile(jpgPath, jpgBuffer);
            const jpgSizeKB = (jpgBuffer.length / 1024).toFixed(2);
            console.log(`  ✓ Created ${baseName}_optimized.jpg (${jpgSizeKB} KB)`);
            
            const savingsPercent = ((1 - webpBuffer.length / stats.size) * 100).toFixed(1);
            console.log(`  💾 WebP saves ${savingsPercent}% compared to original`);
        }

        console.log('\n✅ All images optimized!');
        console.log('\nNext steps:');
        console.log('1. Update HTML to use <picture> tags with WebP and JPG fallback');
        console.log('2. Delete original large JPG files if desired');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

optimizeImages();
