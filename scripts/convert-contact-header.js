import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

const inputPath = 'c:/Marcos/Proyectos/BA/web/web-ba/public/contact/Image_Header (11).png';
const outputPath = 'c:/Marcos/Proyectos/BA/web/web-ba/public/contact/image_header-11.webp';

// Ensure directory exists
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

await sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(outputPath);

console.log('Conversion complete: image_header-11.webp');
