import sharp from 'sharp';
import path from 'node:path';

const inputPath = 'c:/Marcos/Proyectos/BA/web/web-ba/public/blog/Image_Header (10).png';
const outputPath = 'c:/Marcos/Proyectos/BA/web/web-ba/public/blog/image_header-10.webp';

await sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(outputPath);

console.log('Conversion complete: image_header-10.webp');
