import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { lucia } from "../lib/auth";
import pool from "../lib/db";
import { generateIdFromEntropySize } from "lucia";
import { hash, compare } from "bcryptjs";
import { saveAsWebP, deleteLocalFile } from "../lib/images";

export const server = {
    // ... existing auth actions (register, login, logout)
    register: defineAction({
        accept: "form",
        input: z.object({
            username: z.string().min(3),
            password: z.string().min(6),
        }),
        handler: async (input, context) => {
            const passwordHash = await hash(input.password, 10);
            const userId = generateIdFromEntropySize(10);
            try {
                await pool.execute("INSERT INTO user (id, username, password_hash) VALUES (?, ?, ?)", [userId, input.username, passwordHash]);
                const session = await lucia.createSession(userId, {});
                const sessionCookie = lucia.createSessionCookie(session.id);
                context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
                return { success: true };
            } catch (e: any) {
                if (e.code === 'ER_DUP_ENTRY') return { success: false, error: "Username already exists" };
                return { success: false, error: "Database error" };
            }
        },
    }),
    login: defineAction({
        accept: "form",
        input: z.object({
            username: z.string(),
            password: z.string(),
        }),
        handler: async (input, context) => {
            const [rows] = await pool.execute("SELECT * FROM user WHERE username = ?", [input.username]);
            const user = (rows as any[])[0];
            if (!user) return { success: false, error: "Invalid username or password" };
            const validPassword = await compare(input.password, user.password_hash);
            if (!validPassword) return { success: false, error: "Invalid username or password" };
            const session = await lucia.createSession(user.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return { success: true };
        },
    }),

    // CABINETS ACTIONS
    createCabinet: defineAction({
        accept: "form",
        input: z.object({
            name: z.string(),
            brand: z.string().optional(),
            description: z.string().optional(),
            series: z.string().optional(),
            specifications: z.string().optional(),
            tag: z.enum(["Blue", "Brown", "Gray", "White"]),
            image: z.any(), // File
        }),
        handler: async (input, context) => {
            if (!context.locals.user) return { success: false, error: "Unauthorized" };

            let imagePath = "";
            if (input.image && input.image.size > 0) {
                imagePath = await saveAsWebP(input.image as File, "uploads/cabinets");
            }

            try {
                await pool.execute(
                    "INSERT INTO cabinets (name, brand, image, description, series, specifications, tag) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [input.name, input.brand || "BA Kitchen & Bath", imagePath, input.description || "", input.series || "", input.specifications || "", input.tag]
                );
                return { success: true };
            } catch (e) {
                console.error(e);
                return { success: false, error: "Database error" };
            }
        },
    }),

    updateCabinet: defineAction({
        accept: "form",
        input: z.object({
            id: z.string(),
            name: z.string(),
            brand: z.string().optional(),
            description: z.string().optional(),
            series: z.string().optional(),
            specifications: z.string().optional(),
            tag: z.enum(["Blue", "Brown", "Gray", "White"]),
            image: z.any().optional(), // File
        }),
        handler: async (input, context) => {
            if (!context.locals.user) return { success: false, error: "Unauthorized" };

            let imagePath = "";
            if (input.image && input.image.size > 0) {
                imagePath = await saveAsWebP(input.image as File, "uploads/cabinets");

                // Delete old image
                const [rows] = await pool.execute("SELECT image FROM cabinets WHERE id = ?", [input.id]);
                const oldCabinet = (rows as any[])[0];
                if (oldCabinet && oldCabinet.image) {
                    await deleteLocalFile(oldCabinet.image);
                }
            }

            try {
                if (imagePath) {
                    await pool.execute(
                        "UPDATE cabinets SET name = ?, brand = ?, image = ?, description = ?, series = ?, specifications = ?, tag = ? WHERE id = ?",
                        [input.name, input.brand || "BA Kitchen & Bath", imagePath, input.description || "", input.series || "", input.specifications || "", input.tag, input.id]
                    );
                } else {
                    await pool.execute(
                        "UPDATE cabinets SET name = ?, brand = ?, image = ?, description = ?, series = ?, specifications = ?, tag = ? WHERE id = ?",
                        [input.name, input.brand || "BA Kitchen & Bath", input.description || "", input.series || "", input.specifications || "", input.tag, input.id]
                    );
                }
                return { success: true };
            } catch (e) {
                console.error(e);
                return { success: false, error: "Database error" };
            }
        },
    }),

    deleteCabinet: defineAction({
        accept: "form",
        input: z.object({
            id: z.string(),
        }),
        handler: async (input, context) => {
            if (!context.locals.user) return { success: false, error: "Unauthorized" };

            // Get image path to delete from S3
            const [rows] = await pool.execute("SELECT image FROM cabinets WHERE id = ?", [input.id]);
            const cabinet = (rows as any[])[0];

            if (cabinet && cabinet.image) {
                await deleteLocalFile(cabinet.image);
            }

            await pool.execute("DELETE FROM cabinets WHERE id = ?", [input.id]);
            return { success: true };
        },
    }),

    // DIAGNOSTIC ACTION
    ping: defineAction({
        accept: "json",
        input: z.object({}).optional(),
        handler: async (input, context) => {
            const requestId = Math.random().toString(36).substring(7);
            console.log(`[${requestId}] Ping diagnostic started`);
            try {
                const [rows] = await pool.execute("SELECT 1 as connected");
                const dbStatus = (rows as any[])[0]?.connected === 1;

                return {
                    success: true,
                    db: dbStatus ? "Connected" : "Failed",
                    env: {
                        hasBucket: !!process.env.AWS_S3_BUCKET_NAME || !!(import.meta as any).env?.AWS_S3_BUCKET_NAME,
                        region: process.env.AWS_S3_REGION || (import.meta as any).env?.AWS_S3_REGION || "not set"
                    }
                };
            } catch (e: any) {
                console.error(`[${requestId}] Ping failed:`, e);
                return { success: false, error: e.message };
            }
        }
    }),

    // PROJECTS ACTIONS
    createProject: defineAction({
        accept: "form",
        input: z.object({
            name: z.string(),
            category: z.string().default("Kitchen"),
            mainImage: z.any(), // File
            logoOverlay: z.any().optional(), // File
            gallery: z.union([z.any(), z.array(z.any())]).optional(), // File | File[]
        }),
        handler: async (input, context) => {
            if (!context.locals.user) return { success: false, error: "Unauthorized" };

            const requestId = Math.random().toString(36).substring(7);
            console.log(`[${requestId}] Starting createProject action`);

            try {
                // 1. Save Main Image
                console.log(`[${requestId}] Processing main image...`);
                const mainImagePath = await saveAsWebP(input.mainImage as File, "uploads/projects");
                console.log(`[${requestId}] Main image uploaded: ${mainImagePath}`);

                // 2. Save Logo Overlay (Optional)
                let logoOverlayPath = null;
                if (input.logoOverlay && (input.logoOverlay as File).size > 0) {
                    console.log(`[${requestId}] Processing logo overlay...`);
                    logoOverlayPath = await saveAsWebP(input.logoOverlay as File, "uploads/projects");
                    console.log(`[${requestId}] Logo overlay uploaded: ${logoOverlayPath}`);
                }

                // 3. Insert Project
                console.log(`[${requestId}] Inserting project into database...`);
                const [result] = await pool.execute(
                    "INSERT INTO projects (name, main_image, logo_overlay, category) VALUES (?, ?, ?, ?)",
                    [input.name, mainImagePath, logoOverlayPath, input.category]
                );
                const projectId = (result as any).insertId;
                console.log(`[${requestId}] Project inserted with ID: ${projectId}`);

                // 4. Save Gallery Images (SEQUENTIAL to avoid resource limits)
                let galleryFiles: File[] = [];
                if (input.gallery) {
                    if (Array.isArray(input.gallery)) {
                        galleryFiles = input.gallery;
                    } else {
                        galleryFiles = [input.gallery];
                    }
                }

                if (galleryFiles.length > 0) {
                    console.log(`[${requestId}] Processing ${galleryFiles.length} gallery images sequentially...`);
                    for (let i = 0; i < galleryFiles.length; i++) {
                        const file = galleryFiles[i];
                        if (file.size === 0) continue;

                        console.log(`[${requestId}] Processing gallery image ${i + 1}/${galleryFiles.length}...`);
                        const galleryPath = await saveAsWebP(file, "uploads/projects");
                        await pool.execute(
                            "INSERT INTO project_images (project_id, image_path) VALUES (?, ?)",
                            [projectId, galleryPath]
                        );
                    }
                    console.log(`[${requestId}] All gallery images processed`);
                }

                console.log(`[${requestId}] createProject completed successfully`);
                return { success: true };
            } catch (error: any) {
                console.error(`[${requestId}] Error in createProject action:`, error);
                return {
                    success: false,
                    error: error.message || "An unexpected error occurred while creating the project."
                };
            }
        },
    }),

    deleteProject: defineAction({
        accept: "form",
        input: z.object({
            id: z.string(),
        }),
        handler: async (input, context) => {
            if (!context.locals.user) return { success: false, error: "Unauthorized" };

            try {
                // Fetch images to delete from S3
                const [rows] = await pool.execute("SELECT main_image, logo_overlay FROM projects WHERE id = ?", [input.id]);
                const project = (rows as any[])[0];

                if (project) {
                    const imagesToDelete = [project.main_image, project.logo_overlay].filter(Boolean);

                    // Fetch gallery images
                    const [galleryRows] = await pool.execute("SELECT image_path FROM project_images WHERE project_id = ?", [input.id]);
                    (galleryRows as any[]).forEach(row => imagesToDelete.push(row.image_path));

                    for (const imgPath of imagesToDelete) {
                        await deleteLocalFile(imgPath);
                    }
                }

                await pool.execute("DELETE FROM projects WHERE id = ?", [input.id]);
                return { success: true };
            } catch (error: any) {
                console.error("Error in deleteProject action:", error);
                return { success: false, error: error.message || "Error deleting project" };
            }
        },
    }),

    updateProject: defineAction({
        accept: "form",
        input: z.object({
            id: z.string(),
            name: z.string(),
            category: z.string(),
            mainImage: z.any().optional(),
            logoOverlay: z.any().optional(),
            gallery: z.union([z.any(), z.array(z.any())]).optional(),
        }),
        handler: async (input, context) => {
            if (!context.locals.user) return { success: false, error: "Unauthorized" };

            console.log("updateProject input.gallery type:", typeof input.gallery);
            console.log("updateProject input.gallery isArray:", Array.isArray(input.gallery));

            try {
                // 1. Get current project state
                const [rows] = await pool.execute("SELECT * FROM projects WHERE id = ?", [input.id]);
                const project = (rows as any[])[0];
                if (!project) return { success: false, error: "Project not found" };

                let mainImagePath = project.main_image;
                let logoOverlayPath = project.logo_overlay;

                // 2. Handle main image update
                if (input.mainImage && (input.mainImage as File).size > 0) {
                    mainImagePath = await saveAsWebP(input.mainImage as File, "uploads/projects");

                    // Delete old
                    await deleteLocalFile(project.main_image);
                }

                // 3. Handle logo update
                if (input.logoOverlay && (input.logoOverlay as File).size > 0) {
                    logoOverlayPath = await saveAsWebP(input.logoOverlay as File, "uploads/projects");

                    // Delete old
                    if (project.logo_overlay) {
                        await deleteLocalFile(project.logo_overlay);
                    }
                }

                // 4. Update core project info
                await pool.execute(
                    "UPDATE projects SET name = ?, main_image = ?, logo_overlay = ?, category = ? WHERE id = ?",
                    [input.name, mainImagePath, logoOverlayPath, input.category, input.id]
                );

                // 5. Append new gallery images (SEQUENTIAL to avoid resource limits)
                let galleryFiles: File[] = [];
                if (input.gallery) {
                    if (Array.isArray(input.gallery)) {
                        galleryFiles = input.gallery;
                    } else {
                        galleryFiles = [input.gallery];
                    }
                }

                if (galleryFiles.length > 0) {
                    console.log(`[${input.id}] Processing ${galleryFiles.length} new gallery images sequentially...`);
                    for (let i = 0; i < galleryFiles.length; i++) {
                        const file = galleryFiles[i];
                        if (file.size === 0) continue;

                        console.log(`[${input.id}] Processing gallery image ${i + 1}/${galleryFiles.length}...`);
                        const galleryPath = await saveAsWebP(file, "uploads/projects");
                        await pool.execute("INSERT INTO project_images (project_id, image_path) VALUES (?, ?)", [input.id, galleryPath]);
                    }
                    console.log(`[${input.id}] Gallery update completed`);
                }

                return { success: true };
            } catch (error: any) {
                console.error("Error in updateProject action:", error);
                return {
                    success: false,
                    error: error.message || "An unexpected error occurred while updating the project."
                };
            }
        },
    }),

    deleteProjectImage: defineAction({
        accept: "form",
        input: z.object({
            imageId: z.number(),
        }),
        handler: async (input, context) => {
            if (!context.locals.user) return { success: false, error: "Unauthorized" };

            try {
                // 1. Get image path
                const [rows] = await pool.execute("SELECT image_path FROM project_images WHERE id = ?", [input.imageId]);
                const image = (rows as any[])[0];

                if (image && image.image_path) {
                    // 2. Delete local file
                    await deleteLocalFile(image.image_path);
                }

                // 3. Delete from DB
                await pool.execute("DELETE FROM project_images WHERE id = ?", [input.imageId]);

                return { success: true };
            } catch (error: any) {
                console.error("Error in deleteProjectImage action:", error);
                return { success: false, error: "Failed to delete image" };
            }
        },
    }),

    deleteProjectLogoOverlay: defineAction({
        accept: "form",
        input: z.object({
            projectId: z.string(),
        }),
        handler: async (input, context) => {
            if (!context.locals.user) return { success: false, error: "Unauthorized" };

            try {
                // 1. Get current logo path
                const [rows] = await pool.execute("SELECT logo_overlay FROM projects WHERE id = ?", [input.projectId]);
                const project = (rows as any[])[0];

                if (project && project.logo_overlay) {
                    // 2. Delete local file
                    await deleteLocalFile(project.logo_overlay);

                    // 3. Update DB
                    await pool.execute("UPDATE projects SET logo_overlay = NULL WHERE id = ?", [input.projectId]);
                }

                return { success: true };
            } catch (error: any) {
                console.error("Error in deleteProjectLogoOverlay action:", error);
                return { success: false, error: "Failed to delete logo overlay" };
            }
        },
    }),

    // BLOG ACTIONS
    createBlogPost: defineAction({
        accept: "form",
        input: z.object({
            title: z.string(),
            short_description: z.string().optional(),
            main_image: z.any(), // File
            sections: z.string(), // JSON string
        }).passthrough(),
        handler: async (input, context) => {
            if (!context.locals.user) return { success: false, error: "Unauthorized" };

            // 1. Process Main Image
            let mainImagePath = "";
            if (input.main_image && (input.main_image as File).size > 0) {
                mainImagePath = await saveAsWebP(input.main_image as File, "uploads/blog");
            } else {
                return { success: false, error: "Main image is required" };
            }

            // 2. Generate Slug
            const baseSlug = input.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

            let connection;
            try {
                connection = await pool.getConnection();
                await connection.beginTransaction();

                // 3. Insert Post
                const [postResult] = await connection.execute(
                    "INSERT INTO blog_posts (title, slug, short_description, main_image) VALUES (?, ?, ?, ?)",
                    [input.title, slug, input.short_description || "", mainImagePath]
                );
                const postId = (postResult as any).insertId;

                // 4. Process Sections
                const sections = JSON.parse(input.sections);
                let orderIndex = 0;

                for (const section of sections) {
                    let imagePath1 = null;
                    let imagePath2 = null;

                    // Handle Image 1
                    if (section.image_1_key && input[section.image_1_key]) {
                        const file = input[section.image_1_key] as File;
                        if (file.size > 0) {
                            imagePath1 = await saveAsWebP(file, "uploads/blog");
                        }
                    }

                    // Handle Image 2
                    if (section.image_2_key && input[section.image_2_key]) {
                        const file = input[section.image_2_key] as File;
                        if (file.size > 0) {
                            imagePath2 = await saveAsWebP(file, "uploads/blog");
                        }
                    }

                    await connection.execute(
                        "INSERT INTO blog_sections (post_id, type, content_text, image_path_1, image_path_2, order_index) VALUES (?, ?, ?, ?, ?, ?)",
                        [postId, section.type, section.content || null, imagePath1, imagePath2, orderIndex]
                    );
                    orderIndex++;
                }

                await connection.commit();
                return { success: true };
            } catch (e) {
                if (connection) await connection.rollback();
                console.error(e);
                return { success: false, error: "Database error" };
            } finally {
                if (connection) connection.release();
            }
        },
    }),

    updateBlogPost: defineAction({
        accept: "form",
        input: z.object({
            id: z.string(),
            title: z.string(),
            short_description: z.string().optional(),
            main_image: z.any().optional(), // File
            sections: z.string(), // JSON string
        }).passthrough(),
        handler: async (input, context) => {
            if (!context.locals.user) return { success: false, error: "Unauthorized" };

            let connection;
            try {
                connection = await pool.getConnection();
                await connection.beginTransaction();

                // 1. Update Main Info
                let mainImagePath = null;
                if (input.main_image && (input.main_image as File).size > 0) {
                    mainImagePath = await saveAsWebP(input.main_image as File, "uploads/blog");

                    // Fetch old image to delete
                    const [rows] = await connection.execute("SELECT main_image FROM blog_posts WHERE id = ?", [input.id]);
                    const oldPost = (rows as any[])[0];
                    if (oldPost && oldPost.main_image) {
                        await deleteLocalFile(oldPost.main_image);
                    }

                    await connection.execute("UPDATE blog_posts SET title = ?, short_description = ?, main_image = ? WHERE id = ?",
                        [input.title, input.short_description || "", mainImagePath, input.id]);
                } else {
                    await connection.execute("UPDATE blog_posts SET title = ?, short_description = ? WHERE id = ?",
                        [input.title, input.short_description || "", input.id]);
                }

                // 2. Process Sections (Full Replacement Strategy)
                const sections = JSON.parse(input.sections);

                // Delete existing sections data
                await connection.execute("DELETE FROM blog_sections WHERE post_id = ?", [input.id]);

                let orderIndex = 0;
                for (const section of sections) {
                    let imagePath1 = section.existing_image_1 || null;
                    let imagePath2 = section.existing_image_2 || null;

                    // Handle New Image 1
                    if (section.image_1_key && input[section.image_1_key]) {
                        const file = input[section.image_1_key] as File;
                        if (file.size > 0) {
                            imagePath1 = await saveAsWebP(file, "uploads/blog");
                        }
                    }

                    // Handle New Image 2
                    if (section.image_2_key && input[section.image_2_key]) {
                        const file = input[section.image_2_key] as File;
                        if (file.size > 0) {
                            imagePath2 = await saveAsWebP(file, "uploads/blog");
                        }
                    }

                    await connection.execute(
                        "INSERT INTO blog_sections (post_id, type, content_text, image_path_1, image_path_2, order_index) VALUES (?, ?, ?, ?, ?, ?)",
                        [input.id, section.type, section.content || null, imagePath1, imagePath2, orderIndex]
                    );
                    orderIndex++;
                }

                await connection.commit();
                return { success: true };
            } catch (e) {
                if (connection) await connection.rollback();
                console.error(e);
                return { success: false, error: "Database error" };
            } finally {
                if (connection) connection.release();
            }
        },
    }),
};
