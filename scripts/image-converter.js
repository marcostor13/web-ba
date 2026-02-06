import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Converts all PNG files in a directory to WebP format.
 * @param {string} targetDir - Absolute or relative path to the directory.
 * @param {boolean} removeOriginal - Whether to delete the original PNG files.
 */
async function convertPngToWebp(targetDir, removeOriginal = false) {
  const absoluteDir = path.isAbsolute(targetDir) 
    ? targetDir 
    : path.join(process.cwd(), targetDir);

  if (!fs.existsSync(absoluteDir)) {
    console.error(`Error: Directory not found -> ${absoluteDir}`);
    return;
  }

  const files = fs.readdirSync(absoluteDir);
  const pngFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');

  if (pngFiles.length === 0) {
    console.log(`No PNG files found in ${absoluteDir}`);
    return;
  }

  console.log(`Found ${pngFiles.length} PNG files. Starting conversion...`);

  for (const file of pngFiles) {
    const inputPath = path.join(absoluteDir, file);
    const outputPath = path.join(absoluteDir, `${path.parse(file).name}.webp`);

    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`Converted: ${file} -> ${path.parse(file).name}.webp`);

      if (removeOriginal) {
        fs.unlinkSync(inputPath);
        console.log(`Deleted original: ${file}`);
      }
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err.message);
    }
  }

  console.log('Optimization complete!');
}

// CLI Support
const args = process.argv.slice(2);
const dirArg = args[0] || 'public/home';
const deleteArg = args.includes('--delete');

convertPngToWebp(dirArg, deleteArg);
