
import sharp from 'sharp';
import path from 'path';

const source = 'public/kitchen/Image_Header (6).png';
const target = 'public/blog/image_header_6.webp';

async function convert() {
    try {
        await sharp(source)
            .webp({ quality: 100, lossless: false })
            .toFile(target);
        console.log(`Converted ${source} to ${target}`);
    } catch (error) {
        console.error('Error converting image:', error);
    }
}

convert();
