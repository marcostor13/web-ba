<?php
/**
 * Database Migration Script for Blog SEO & UX Overhaul
 * 
 * Run this script to add properties to the blog_posts and blog_sections tables.
 * Usage: php migrate_blog.php
 */

require_once __DIR__ . '/db_config.php';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=$charset", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    echo "Starting migration...\n";

    // 1. Update blog_posts table
    $sql1 = "ALTER TABLE blog_posts 
            ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255) DEFAULT NULL,
            ADD COLUMN IF NOT EXISTS meta_description TEXT DEFAULT NULL,
            ADD COLUMN IF NOT EXISTS author VARCHAR(100) DEFAULT 'BA Kitchen & Bath',
            ADD COLUMN IF NOT EXISTS status ENUM('published', 'draft') DEFAULT 'published'";
    
    $pdo->exec($sql1);
    echo "✔ blog_posts table updated.\n";

    // 2. Update blog_sections table
    $sql2 = "ALTER TABLE blog_sections 
            ADD COLUMN IF NOT EXISTS title_level VARCHAR(5) DEFAULT 'h2',
            ADD COLUMN IF NOT EXISTS image_alt_1 VARCHAR(255) DEFAULT NULL,
            ADD COLUMN IF NOT EXISTS image_alt_2 VARCHAR(255) DEFAULT NULL";
    
    $pdo->exec($sql2);
    echo "✔ blog_sections table updated.\n";

    // 3. Initialize slugs for existing posts (optional but recommended)
    $stmt = $pdo->query("SELECT id, title FROM blog_posts WHERE slug IS NULL OR slug = ''");
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($posts) > 0) {
        $updateSlug = $pdo->prepare("UPDATE blog_posts SET slug = ? WHERE id = ?");
        foreach ($posts as $post) {
            $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $post['title'])));
            $updateSlug->execute([$slug, $post['id']]);
        }
        echo "✔ Slugs initialized for " . count($posts) . " posts.\n";
    }

    echo "\nMigration completed successfully!\n";

} catch (PDOException $e) {
    die("ERROR: " . $e->getMessage() . "\n");
}
