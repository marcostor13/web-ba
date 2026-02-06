import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const dir = 'c:/Marcos/Proyectos/BA/web/web-ba/public/about-us';
const files = fs.readdirSync(dir);

for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
        const inputPath = path.join(dir, file);
        const cleanName = file.replace(/\.[^/.]+$/, "").replace(/\s+/g, '-').replace(/[()]/g, '').toLowerCase();
        const outputPath = path.join(dir, `${cleanName}.webp`);
        
        console.log(`Converting ${file} to ${cleanName}.webp...`);
        
        await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath);
    }
}
console.log('Done!');
