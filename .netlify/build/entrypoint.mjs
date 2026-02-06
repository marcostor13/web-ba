import './chunks/virtual_CZpefBZC.mjs';
import * as z from 'zod';
import { l as lucia } from './chunks/auth_BXBfL_D5.mjs';
import { p as pool } from './chunks/db_DIG-MEGf.mjs';
import { generateIdFromEntropySize } from 'lucia';
import { compare, hash } from 'bcryptjs';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { d as defineAction } from './chunks/server_CQBP3Dg2.mjs';

async function saveAsWebP(file, uploadDir) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const timestamp = Date.now();
  const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, "-").toLowerCase();
  const fileName = `${timestamp}-${cleanName}.webp`;
  const targetDir = path.join(process.cwd(), "public", uploadDir);
  if (!fs.existsSync(targetDir)) {
    await fs.promises.mkdir(targetDir, { recursive: true });
  }
  const fullPath = path.join(targetDir, fileName);
  await sharp(buffer).webp({ quality: 80 }).toFile(fullPath);
  return path.join("/", uploadDir, fileName).replace(/\\/g, "/");
}

const server = {
  // ... existing auth actions (register, login, logout)
  register: defineAction({
    accept: "form",
    input: z.object({
      username: z.string().min(3),
      password: z.string().min(6)
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
      } catch (e) {
        if (e.code === "ER_DUP_ENTRY") return { success: false, error: "Username already exists" };
        return { success: false, error: "Database error" };
      }
    }
  }),
  login: defineAction({
    accept: "form",
    input: z.object({
      username: z.string(),
      password: z.string()
    }),
    handler: async (input, context) => {
      const [rows] = await pool.execute("SELECT * FROM user WHERE username = ?", [input.username]);
      const user = rows[0];
      if (!user) return { success: false, error: "Invalid username or password" };
      const validPassword = await compare(input.password, user.password_hash);
      if (!validPassword) return { success: false, error: "Invalid username or password" };
      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return { success: true };
    }
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
      image: z.any()
      // File
    }),
    handler: async (input, context) => {
      if (!context.locals.user) return { success: false, error: "Unauthorized" };
      let imagePath = "";
      if (input.image && input.image.size > 0) {
        imagePath = await saveAsWebP(input.image, "uploads/cabinets");
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
    }
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
      image: z.any().optional()
      // File
    }),
    handler: async (input, context) => {
      if (!context.locals.user) return { success: false, error: "Unauthorized" };
      let imagePath = "";
      if (input.image && input.image.size > 0) {
        imagePath = await saveAsWebP(input.image, "uploads/cabinets");
        const [rows] = await pool.execute("SELECT image FROM cabinets WHERE id = ?", [input.id]);
        const oldCabinet = rows[0];
        if (oldCabinet && oldCabinet.image) {
          try {
            await fs.promises.unlink(path.join(process.cwd(), "public", oldCabinet.image));
          } catch (e) {
          }
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
    }
  }),
  deleteCabinet: defineAction({
    accept: "form",
    input: z.object({
      id: z.string()
    }),
    handler: async (input, context) => {
      if (!context.locals.user) return { success: false, error: "Unauthorized" };
      const [rows] = await pool.execute("SELECT image FROM cabinets WHERE id = ?", [input.id]);
      const cabinet = rows[0];
      if (cabinet && cabinet.image) {
        const fullPath = path.join(process.cwd(), "public", cabinet.image);
        try {
          await fs.promises.unlink(fullPath);
        } catch (e) {
        }
      }
      await pool.execute("DELETE FROM cabinets WHERE id = ?", [input.id]);
      return { success: true };
    }
  }),
  // PROJECTS ACTIONS
  createProject: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
      category: z.string().default("Kitchen"),
      mainImage: z.any(),
      // File
      logoOverlay: z.any().optional(),
      // File
      gallery: z.any().optional()
      // File | File[]
    }),
    handler: async (input, context) => {
      if (!context.locals.user) return { success: false, error: "Unauthorized" };
      const uploadDir = path.join(process.cwd(), "public", "uploads", "projects");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const mainImagePath = await saveAsWebP(input.mainImage, "uploads/projects");
      let logoOverlayPath = null;
      if (input.logoOverlay && input.logoOverlay.size > 0) {
        logoOverlayPath = await saveAsWebP(input.logoOverlay, "uploads/projects");
      }
      const [result] = await pool.execute(
        "INSERT INTO projects (name, main_image, logo_overlay, category) VALUES (?, ?, ?, ?)",
        [input.name, mainImagePath, logoOverlayPath, input.category]
      );
      const projectId = result.insertId;
      const galleryFiles = input.gallery ? Array.isArray(input.gallery) ? input.gallery : [input.gallery] : [];
      for (const file of galleryFiles) {
        if (file.size === 0) continue;
        const galleryPath = await saveAsWebP(file, "uploads/projects");
        await pool.execute(
          "INSERT INTO project_images (project_id, image_path) VALUES (?, ?)",
          [projectId, galleryPath]
        );
      }
      return { success: true };
    }
  }),
  deleteProject: defineAction({
    accept: "form",
    input: z.object({
      id: z.string()
    }),
    handler: async (input, context) => {
      if (!context.locals.user) return { success: false, error: "Unauthorized" };
      const [rows] = await pool.execute("SELECT main_image, logo_overlay FROM projects WHERE id = ?", [input.id]);
      const project = rows[0];
      if (project) {
        const imagesToDelete = [project.main_image, project.logo_overlay].filter(Boolean);
        const [galleryRows] = await pool.execute("SELECT image_path FROM project_images WHERE project_id = ?", [input.id]);
        galleryRows.forEach((row) => imagesToDelete.push(row.image_path));
        for (const imgPath of imagesToDelete) {
          const fullPath = path.join(process.cwd(), "public", imgPath);
          if (fs.existsSync(fullPath)) await fs.promises.unlink(fullPath);
        }
      }
      await pool.execute("DELETE FROM projects WHERE id = ?", [input.id]);
      return { success: true };
    }
  }),
  updateProject: defineAction({
    accept: "form",
    input: z.object({
      id: z.string(),
      name: z.string(),
      category: z.string(),
      mainImage: z.any().optional(),
      logoOverlay: z.any().optional(),
      gallery: z.any().optional()
    }),
    handler: async (input, context) => {
      if (!context.locals.user) return { success: false, error: "Unauthorized" };
      const uploadDir = path.join(process.cwd(), "public", "uploads", "projects");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const [rows] = await pool.execute("SELECT * FROM projects WHERE id = ?", [input.id]);
      const project = rows[0];
      if (!project) return { success: false, error: "Project not found" };
      let mainImagePath = project.main_image;
      let logoOverlayPath = project.logo_overlay;
      if (input.mainImage && input.mainImage.size > 0) {
        mainImagePath = await saveAsWebP(input.mainImage, "uploads/projects");
        const oldPath = path.join(process.cwd(), "public", project.main_image);
        if (fs.existsSync(oldPath)) await fs.promises.unlink(oldPath);
      }
      if (input.logoOverlay && input.logoOverlay.size > 0) {
        logoOverlayPath = await saveAsWebP(input.logoOverlay, "uploads/projects");
        if (project.logo_overlay) {
          const oldPath = path.join(process.cwd(), "public", project.logo_overlay);
          if (fs.existsSync(oldPath)) await fs.promises.unlink(oldPath);
        }
      }
      await pool.execute(
        "UPDATE projects SET name = ?, main_image = ?, logo_overlay = ?, category = ? WHERE id = ?",
        [input.name, mainImagePath, logoOverlayPath, input.category, input.id]
      );
      const galleryFiles = input.gallery ? Array.isArray(input.gallery) ? input.gallery : [input.gallery] : [];
      for (const file of galleryFiles) {
        if (file.size === 0) continue;
        const galleryPath = await saveAsWebP(file, "uploads/projects");
        await pool.execute("INSERT INTO project_images (project_id, image_path) VALUES (?, ?)", [input.id, galleryPath]);
      }
      return { success: true };
    }
  }),
  // BLOG ACTIONS
  createBlogPost: defineAction({
    accept: "form",
    input: z.object({
      title: z.string(),
      short_description: z.string().optional(),
      main_image: z.any(),
      // File
      sections: z.string()
      // JSON string
    }).passthrough(),
    handler: async (input, context) => {
      if (!context.locals.user) return { success: false, error: "Unauthorized" };
      let mainImagePath = "";
      if (input.main_image && input.main_image.size > 0) {
        mainImagePath = await saveAsWebP(input.main_image, "uploads/blog");
      } else {
        return { success: false, error: "Main image is required" };
      }
      const baseSlug = input.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
      let connection;
      try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [postResult] = await connection.execute(
          "INSERT INTO blog_posts (title, slug, short_description, main_image) VALUES (?, ?, ?, ?)",
          [input.title, slug, input.short_description || "", mainImagePath]
        );
        const postId = postResult.insertId;
        const sections = JSON.parse(input.sections);
        let orderIndex = 0;
        for (const section of sections) {
          let imagePath1 = null;
          let imagePath2 = null;
          if (section.image_1_key && input[section.image_1_key]) {
            const file = input[section.image_1_key];
            if (file.size > 0) {
              imagePath1 = await saveAsWebP(file, "uploads/blog");
            }
          }
          if (section.image_2_key && input[section.image_2_key]) {
            const file = input[section.image_2_key];
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
    }
  }),
  updateBlogPost: defineAction({
    accept: "form",
    input: z.object({
      id: z.string(),
      title: z.string(),
      short_description: z.string().optional(),
      main_image: z.any().optional(),
      // File
      sections: z.string()
      // JSON string
    }).passthrough(),
    handler: async (input, context) => {
      if (!context.locals.user) return { success: false, error: "Unauthorized" };
      let connection;
      try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        let mainImagePath = null;
        if (input.main_image && input.main_image.size > 0) {
          mainImagePath = await saveAsWebP(input.main_image, "uploads/blog");
          const [rows] = await connection.execute("SELECT main_image FROM blog_posts WHERE id = ?", [input.id]);
          const oldPost = rows[0];
          if (oldPost && oldPost.main_image) {
            try {
              await fs.promises.unlink(path.join(process.cwd(), "public", oldPost.main_image));
            } catch (e) {
            }
          }
          await connection.execute(
            "UPDATE blog_posts SET title = ?, short_description = ?, main_image = ? WHERE id = ?",
            [input.title, input.short_description || "", mainImagePath, input.id]
          );
        } else {
          await connection.execute(
            "UPDATE blog_posts SET title = ?, short_description = ? WHERE id = ?",
            [input.title, input.short_description || "", input.id]
          );
        }
        const sections = JSON.parse(input.sections);
        await connection.execute("DELETE FROM blog_sections WHERE post_id = ?", [input.id]);
        let orderIndex = 0;
        for (const section of sections) {
          let imagePath1 = section.existing_image_1 || null;
          let imagePath2 = section.existing_image_2 || null;
          if (section.image_1_key && input[section.image_1_key]) {
            const file = input[section.image_1_key];
            if (file.size > 0) {
              imagePath1 = await saveAsWebP(file, "uploads/blog");
            }
          }
          if (section.image_2_key && input[section.image_2_key]) {
            const file = input[section.image_2_key];
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
    }
  })
};

export { server };
