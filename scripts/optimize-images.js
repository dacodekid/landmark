const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/originals';
const outputDir = './public/img/optimized';

// Create directories if they don't exist
if (!fs.existsSync(inputDir)) fs.mkdirSync(inputDir, { recursive: true });
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Optimize images
fs.readdirSync(inputDir).forEach(file => {
  if (['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase())) {
    const inputImage = path.join(inputDir, file);
    const outputImage = path.join(outputDir, file);
    sharp(inputImage)
      .resize(1200, 800, { 
        fit: 'cover'
      })
      .toFile(outputImage)
      .then(() => console.log(`Optimized ${file}`))
      .catch(err => console.error(`Error processing ${file}:`, err));
  }
});
