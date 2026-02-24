import sharp from 'sharp';
import { writeFile, unlink, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve the project root so we can write files to public/uploads/
// In Astro SSR (Node standalone), import.meta.url points inside dist/server/
// We go up until we find the project root (where package.json lives).
const getPublicDir = (): string => {
    // When running after build, cwd() is where you start the server (project root)
    // public/ must be served as static files by the Node server (configured in entry)
    return path.join(process.cwd(), 'public');
};

/**
 * Converts an uploaded file to WebP and saves it to the local filesystem.
 * Files are stored in public/uploads/<uploadDir>/
 * @param file The uploaded File object
 * @param uploadDir The subdirectory within public/uploads/
 * @returns The public URL path of the saved WebP image (e.g. /uploads/projects/...)
 */
export async function saveAsWebP(file: File, uploadDir: string): Promise<string> {
    const originalBuffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const originalExtension = file.name.split('.').pop() || 'bin';
    const cleanBaseName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-z0-9]+/gi, '-')
        .toLowerCase();

    console.log(`Processing file: ${file.name} (${file.type}, ${file.size} bytes)`);

    let processedBuffer = originalBuffer;
    let fileName = `${timestamp}-${cleanBaseName}.webp`;
    let isWebP = true;

    try {
        if (file.type.startsWith('image/')) {
            console.log('Attempting image optimization with sharp...');
            processedBuffer = await sharp(originalBuffer)
                .webp({ quality: 80 })
                .toBuffer();
            console.log('Image optimized successfully to WebP');
        } else {
            console.log('Not an image or unsupported type, skipping optimization');
            fileName = `${timestamp}-${cleanBaseName}.${originalExtension}`;
            isWebP = false;
        }
    } catch (sharpError) {
        console.warn('Sharp optimization failed, falling back to original file:', sharpError);
        fileName = `${timestamp}-${cleanBaseName}.${originalExtension}`;
        isWebP = false;
        processedBuffer = originalBuffer;
    }

    // Build the target directory and ensure it exists
    const publicDir = getPublicDir();
    const targetDir = path.join(publicDir, 'uploads', uploadDir);

    if (!existsSync(targetDir)) {
        await mkdir(targetDir, { recursive: true });
    }

    const targetPath = path.join(targetDir, fileName);
    await writeFile(targetPath, processedBuffer);
    console.log(`File saved to: ${targetPath}`);

    // Return the public URL path (relative to the web root)
    const publicPath = `/uploads/${uploadDir}/${fileName}`.replace(/\/+/g, '/');
    return publicPath;
}

/**
 * Deletes a locally stored file based on its public URL path.
 * @param urlPath The public path of the file (e.g. /uploads/projects/...)
 */
export async function deleteLocalFile(urlPath: string | null): Promise<void> {
    if (!urlPath) return;

    // Skip if it looks like a remote URL (legacy S3 images)
    if (urlPath.startsWith('http://') || urlPath.startsWith('https://')) {
        console.warn(`Skipping delete for remote URL (legacy S3 image): ${urlPath}`);
        return;
    }

    try {
        const publicDir = getPublicDir();
        // urlPath is like /uploads/projects/123-foo.webp
        const relativePath = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath;
        const fullPath = path.join(publicDir, relativePath);

        await unlink(fullPath);
        console.log(`Successfully deleted local file: ${fullPath}`);
    } catch (e: any) {
        if (e.code === 'ENOENT') {
            console.warn(`File not found for deletion (already removed?): ${urlPath}`);
        } else {
            console.warn(`Warning: Failed to delete local file (${urlPath}). Reason: ${e.message}`);
        }
    }
}
