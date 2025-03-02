const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/originals';
const outputDir = './app/img/optimized';

// Create directories if they don't exist
if (!fs.existsSync(inputDir)) fs.mkdirSync(inputDir, { recursive: true });
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Optimize images
fs.readdirSync(inputDir).forEach(file => {
  if (['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase())) {
    sharp(path.join(inputDir, file))
      .resize(1920, 1080, { // Max size for full-width carousel
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({
        quality: 100,
        alphaQuality: 100
      })
      .toFile(path.join(outputDir, `${path.parse(file).name}.webp`))
      .then(() => console.log(`Optimized ${file}`))
      .catch(err => console.error(`Error processing ${file}:`, err));
  }
});
