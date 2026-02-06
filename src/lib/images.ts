import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Converts an uploaded file to WebP and saves it to the specified directory.
 * @param file The uploaded File object
 * @param uploadDir The directory relative to public/
 * @returns The path of the saved WebP image relative to public/
 */
export async function saveAsWebP(file: File, uploadDir: string): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, '-').toLowerCase();
    const fileName = `${timestamp}-${cleanName}.webp`;

    const targetDir = path.join(process.cwd(), "public", uploadDir);
    if (!fs.existsSync(targetDir)) {
        await fs.promises.mkdir(targetDir, { recursive: true });
    }

    const fullPath = path.join(targetDir, fileName);

    await sharp(buffer)
        .webp({ quality: 80 })
        .toFile(fullPath);

    return path.join("/", uploadDir, fileName).replace(/\\/g, '/');
}
