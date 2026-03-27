<?php
require_once 'public/api/config.php';

try {
    echo "Starting migrations...\n";

    // 1. Update blog_posts table
    echo "Updating blog_posts table...\n";
    $pdo->exec("ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE AFTER title");
    $pdo->exec("ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255) AFTER title");
    $pdo->exec("ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_description TEXT AFTER meta_title");
    $pdo->exec("ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author VARCHAR(100) AFTER meta_description");
    $pdo->exec("ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS status ENUM('draft', 'published') DEFAULT 'published' AFTER author");

    // 2. Update blog_sections table
    echo "Updating blog_sections table...\n";
    $pdo->exec("ALTER TABLE blog_sections ADD COLUMN IF NOT EXISTS title_level VARCHAR(5) DEFAULT 'h2' AFTER type");
    $pdo->exec("ALTER TABLE blog_sections ADD COLUMN IF NOT EXISTS image_alt_1 VARCHAR(255) AFTER image_path_1");
    $pdo->exec("ALTER TABLE blog_sections ADD COLUMN IF NOT EXISTS image_alt_2 VARCHAR(255) AFTER image_path_2");

    echo "Migrations completed successfully.\n";
} catch (Exception $e) {
    echo "Migration failed: " . $e->getMessage() . "\n";
}
