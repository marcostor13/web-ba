
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'ba_remodeling',
});

async function exportData() {
    try {
        const [projects] = await pool.query('SELECT * FROM projects');
        const [images] = await pool.query('SELECT * FROM project_images');
        const [blogPosts] = await pool.query('SELECT * FROM blog_posts');
        const [blogSections] = await pool.query('SELECT * FROM blog_sections');

        console.log('-- SQL Insert for projects');
        projects.forEach(p => {
            const values = [
                p.id,
                `'${p.name.replace(/'/g, "''")}'`,
                `'${p.main_image}'`,
                p.logo_overlay ? `'${p.logo_overlay}'` : 'NULL',
                `'${p.category}'`,
                `'${p.created_at.toISOString().slice(0, 19).replace('T', ' ')}'`,
                `'${p.updated_at.toISOString().slice(0, 19).replace('T', ' ')}'`
            ].join(', ');
            console.log(`INSERT INTO projects (id, name, main_image, logo_overlay, category, created_at, updated_at) VALUES (${values});`);
        });

        console.log('\n-- SQL Insert for project_images');
        images.forEach(img => {
            const values = [
                img.id,
                img.project_id,
                `'${img.image_path}'`
            ].join(', ');
            console.log(`INSERT INTO project_images (id, project_id, image_path) VALUES (${values});`);
        });

        console.log('\n-- SQL Insert for blog_posts');
        blogPosts.forEach(post => {
            const values = [
                post.id,
                `'${post.title.replace(/'/g, "''")}'`,
                `'${post.slug}'`,
                post.short_description ? `'${post.short_description.replace(/'/g, "''")}'` : 'NULL',
                `'${post.main_image}'`,
                `'${post.created_at.toISOString().slice(0, 19).replace('T', ' ')}'`,
                `'${post.updated_at.toISOString().slice(0, 19).replace('T', ' ')}'`
            ].join(', ');
            console.log(`INSERT INTO blog_posts (id, title, slug, short_description, main_image, created_at, updated_at) VALUES (${values});`);
        });

        console.log('\n-- SQL Insert for blog_sections');
        blogSections.forEach(section => {
            const values = [
                section.id,
                section.post_id,
                `'${section.type}'`,
                section.content_text ? `'${section.content_text.replace(/'/g, "''")}'` : 'NULL',
                section.image_path_1 ? `'${section.image_path_1}'` : 'NULL',
                section.image_path_2 ? `'${section.image_path_2}'` : 'NULL',
                section.order_index
            ].join(', ');
            console.log(`INSERT INTO blog_sections (id, post_id, type, content_text, image_path_1, image_path_2, order_index) VALUES (${values});`);
        });

    } catch (error) {
        console.error('Error exporting data:', error);
    } finally {
        await pool.end();
    }
}

exportData();
