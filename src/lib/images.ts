import sharp from 'sharp';
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

console.log("S3 Runtime Check:", {
    hasBucket: !!import.meta.env.AWS_S3_BUCKET_NAME,
    region: import.meta.env.AWS_S3_REGION || "us-east-1",
    hasAccessKey: !!import.meta.env.AWS_ACCESS_KEY_ID_BA,
    hasSecretKey: !!import.meta.env.AWS_SECRET_ACCESS_KEY_BA,
    endpoint: import.meta.env.AWS_S3_ENDPOINT || "none",
});

const s3Client = new S3Client({
    region: import.meta.env.AWS_S3_REGION || "us-east-1",
    credentials: {
        accessKeyId: import.meta.env.AWS_ACCESS_KEY_ID_BA || "",
        secretAccessKey: import.meta.env.AWS_SECRET_ACCESS_KEY_BA || "",
    },
    endpoint: import.meta.env.AWS_S3_ENDPOINT || undefined,
    forcePathStyle: import.meta.env.AWS_S3_FORCE_PATH_STYLE === "true" || import.meta.env.AWS_S3_FORCE_PATH_STYLE === true,
});

/**
 * Converts an uploaded file to WebP and uploads it to AWS S3.
 * @param file The uploaded File object
 * @param uploadDir The directory path within the bucket
 * @returns The full S3 URL of the saved WebP image
 */
export async function saveAsWebP(file: File, uploadDir: string): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, '-').toLowerCase();
    const fileName = `${timestamp}-${cleanName}.webp`;
    const key = `${uploadDir}/${fileName}`.replace(/\/+/g, '/').replace(/^\//, '');

    const processedBuffer = await sharp(buffer)
        .webp({ quality: 80 })
        .toBuffer();

    const bucket = import.meta.env.AWS_S3_BUCKET_NAME;
    console.log(`Starting upload to bucket: ${bucket}, key: ${key}`);

    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: bucket,
            Key: key,
            Body: processedBuffer,
            ContentType: "image/webp",
        },
    });

    try {
        await upload.done();
        console.log("Upload successful");
    } catch (error: any) {
        console.error("S3 Upload Error:", error);
        if (error.$metadata) {
            console.error("S3 Error Metadata:", error.$metadata);
        }
        throw error;
    }

    const region = import.meta.env.AWS_S3_REGION || "us-east-1";
    const endpoint = import.meta.env.AWS_S3_ENDPOINT;

    // Construct URL based on configuration
    if (endpoint) {
        // Custom endpoint (e.g., DigitalOcean, R2, or S3-compatible)
        const baseUrl = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint;
        const forcePathStyle = import.meta.env.AWS_S3_FORCE_PATH_STYLE === "true" || import.meta.env.AWS_S3_FORCE_PATH_STYLE === true;

        if (forcePathStyle) {
            return `${baseUrl}/${bucket}/${key}`;
        }
        return `${baseUrl.replace('://', `://${bucket}.`)}/${key}`;
    }

    // Standard AWS S3 URL
    if (region === "us-east-1") {
        return `https://${bucket}.s3.amazonaws.com/${key}`;
    }
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

/**
 * Deletes an object from AWS S3 based on its URL.
 * @param url The full S3 URL of the object to delete
 */
export async function deleteFromS3(url: string | null): Promise<void> {
    if (!url) return;

    try {
        const bucket = import.meta.env.AWS_S3_BUCKET_NAME;
        if (!bucket) return;

        // Extract key from URL
        // This is a simple extraction logic, might need adjustment for complex custom endpoints
        let key = "";

        const endpoint = import.meta.env.AWS_S3_ENDPOINT;

        if (url.includes(".amazonaws.com/")) {
            // Standard S3 URL
            key = url.split(".amazonaws.com/")[1];
        } else if (endpoint) {
            // Custom endpoint
            const endpointUrl = endpoint.replace(/^https?:\/\//, "");
            key = url.split(endpointUrl)[1].replace(/^\/?[^\/]+\//, ""); // Skip bucket Part if path-style
        } else {
            // Fallback: try to find the bucket name and get everything after it
            const parts = url.split(`/${bucket}/`);
            if (parts.length > 1) {
                key = parts[1];
            } else {
                // Last resort: just the path after the domain
                const urlObj = new URL(url);
                key = urlObj.pathname.replace(/^\//, "");
                if (key.startsWith(`${bucket}/`)) {
                    key = key.replace(`${bucket}/`, "");
                }
            }
        }

        if (!key) {
            console.warn(`Could not extract S3 key from URL: ${url}`);
            return;
        }

        await s3Client.send(new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
        }));
    } catch (e) {
        console.error(`Error deleting from S3: ${url}`, e);
    }
}
