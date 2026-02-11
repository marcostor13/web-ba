import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { lucia } from "../lib/auth";
import pool from "../lib/db";
import { generateIdFromEntropySize } from "lucia";
import { hash, compare } from "bcryptjs";
import { saveAsWebP, deleteFromS3 } from "../lib/images";

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
                    await deleteFromS3(oldCabinet.image);
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
                await deleteFromS3(cabinet.image);
            }

            await pool.execute("DELETE FROM cabinets WHERE id = ?", [input.id]);
            return { success: true };
        },
    }),

    // PROJECTS ACTIONS
    createProject: defineAction({
        accept: "form",
        input: z.object({
            name: z.string(),
            category: z.string().default("Kitchen"),
            mainImage: z.any(), // File
            logoOverlay: z.any().optional(), // File
            gallery: z.any().optional(), // File | File[]
        }),
        handler: async (input, context) => {
            if (!context.locals.user) return { success: false, error: "Unauthorized" };

            // 1. Save Main Image
            const mainImagePath = await saveAsWebP(input.mainImage as File, "uploads/projects");

            // 2. Save Logo Overlay (Optional)
            let logoOverlayPath = null;
            if (input.logoOverlay && (input.logoOverlay as File).size > 0) {
                logoOverlayPath = await saveAsWebP(input.logoOverlay as File, "uploads/projects");
            }

            // 3. Insert Project
            const [result] = await pool.execute(
                "INSERT INTO projects (name, main_image, logo_overlay, category) VALUES (?, ?, ?, ?)",
                [input.name, mainImagePath, logoOverlayPath, input.category]
            );
            const projectId = (result as any).insertId;

            // 4. Save Gallery Images
            const galleryFiles = input.gallery
                ? (Array.isArray(input.gallery) ? input.gallery : [input.gallery]) as File[]
                : [];

            if (galleryFiles.length > 0) {
                await Promise.all(galleryFiles.map(async (file) => {
                    if (file.size === 0) return;
                    const galleryPath = await saveAsWebP(file, "uploads/projects");
                    await pool.execute(
                        "INSERT INTO project_images (project_id, image_path) VALUES (?, ?)",
                        [projectId, galleryPath]
                    );
                }));
            }

            return { success: true };
        },
    }),

    deleteProject: defineAction({
        accept: "form",
        input: z.object({
            id: z.string(),
        }),
        handler: async (input, context) => {
            if (!context.locals.user) return { success: false, error: "Unauthorized" };

            // Fetch images to delete from S3
            const [rows] = await pool.execute("SELECT main_image, logo_overlay FROM projects WHERE id = ?", [input.id]);
            const project = (rows as any[])[0];

            if (project) {
                const imagesToDelete = [project.main_image, project.logo_overlay].filter(Boolean);

                // Fetch gallery images
                const [galleryRows] = await pool.execute("SELECT image_path FROM project_images WHERE project_id = ?", [input.id]);
                (galleryRows as any[]).forEach(row => imagesToDelete.push(row.image_path));

                for (const imgPath of imagesToDelete) {
                    await deleteFromS3(imgPath);
                }
            }

            await pool.execute("DELETE FROM projects WHERE id = ?", [input.id]);
            return { success: true };
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
            gallery: z.any().optional(),
        }),
        handler: async (input, context) => {
            if (!context.locals.user) return { success: false, error: "Unauthorized" };

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
                await deleteFromS3(project.main_image);
            }

            // 3. Handle logo update
            if (input.logoOverlay && (input.logoOverlay as File).size > 0) {
                logoOverlayPath = await saveAsWebP(input.logoOverlay as File, "uploads/projects");

                // Delete old
                if (project.logo_overlay) {
                    await deleteFromS3(project.logo_overlay);
                }
            }

            // 4. Update core project info
            await pool.execute(
                "UPDATE projects SET name = ?, main_image = ?, logo_overlay = ?, category = ? WHERE id = ?",
                [input.name, mainImagePath, logoOverlayPath, input.category, input.id]
            );

            // 5. Append new gallery images
            const galleryFiles = input.gallery
                ? (Array.isArray(input.gallery) ? input.gallery : [input.gallery]) as File[]
                : [];

            if (galleryFiles.length > 0) {
                await Promise.all(galleryFiles.map(async (file) => {
                    if (file.size === 0) return;
                    const galleryPath = await saveAsWebP(file, "uploads/projects");
                    await pool.execute("INSERT INTO project_images (project_id, image_path) VALUES (?, ?)", [input.id, galleryPath]);
                }));
            }

            return { success: true };
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
                        await deleteFromS3(oldPost.main_image);
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
