<?php
/**
 * Adds columns expected by blog.php (SEO meta, author, status, section alts).
 * Works on standard MySQL (no ADD COLUMN IF NOT EXISTS).
 *
 * From project root: php public/api/migrate_blog.php
 * After running in production, remove or protect this file.
 */

require_once __DIR__ . '/config.php';

if (!headers_sent()) {
    header_remove('Content-Type');
    header('Content-Type: text/plain; charset=UTF-8');
}

function columnExists(PDO $pdo, string $table, string $column): bool {
    $stmt = $pdo->prepare(
        'SELECT COUNT(*) FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?'
    );
    $stmt->execute([$table, $column]);
    return (int) $stmt->fetchColumn() > 0;
}

try {
    echo "Starting migration...\n";

    if (!columnExists($pdo, 'blog_posts', 'meta_title')) {
        $pdo->exec('ALTER TABLE blog_posts ADD COLUMN meta_title VARCHAR(255) DEFAULT NULL AFTER title');
        echo "✔ blog_posts.meta_title\n";
    }
    if (!columnExists($pdo, 'blog_posts', 'meta_description')) {
        $pdo->exec('ALTER TABLE blog_posts ADD COLUMN meta_description TEXT DEFAULT NULL AFTER meta_title');
        echo "✔ blog_posts.meta_description\n";
    }
    if (!columnExists($pdo, 'blog_posts', 'author')) {
        $pdo->exec("ALTER TABLE blog_posts ADD COLUMN author VARCHAR(100) DEFAULT 'BA Kitchen & Bath'");
        echo "✔ blog_posts.author\n";
    }
    if (!columnExists($pdo, 'blog_posts', 'status')) {
        $pdo->exec("ALTER TABLE blog_posts ADD COLUMN status ENUM('published','draft') DEFAULT 'published'");
        echo "✔ blog_posts.status\n";
    }

    if (!columnExists($pdo, 'blog_sections', 'title_level')) {
        $pdo->exec("ALTER TABLE blog_sections ADD COLUMN title_level VARCHAR(5) DEFAULT 'h2' AFTER type");
        echo "✔ blog_sections.title_level\n";
    }
    if (!columnExists($pdo, 'blog_sections', 'image_alt_1')) {
        $pdo->exec('ALTER TABLE blog_sections ADD COLUMN image_alt_1 VARCHAR(255) DEFAULT NULL AFTER image_path_1');
        echo "✔ blog_sections.image_alt_1\n";
    }
    if (!columnExists($pdo, 'blog_sections', 'image_alt_2')) {
        $pdo->exec('ALTER TABLE blog_sections ADD COLUMN image_alt_2 VARCHAR(255) DEFAULT NULL AFTER image_path_2');
        echo "✔ blog_sections.image_alt_2\n";
    }

    $stmt = $pdo->query("SELECT id, title FROM blog_posts WHERE slug IS NULL OR slug = ''");
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($posts) > 0) {
        $updateSlug = $pdo->prepare('UPDATE blog_posts SET slug = ? WHERE id = ?');
        foreach ($posts as $post) {
            $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $post['title']), '-'));
            $updateSlug->execute([$slug, $post['id']]);
        }
        echo '✔ Slugs initialized for ' . count($posts) . " posts.\n";
    }

    echo "\nMigration completed successfully!\n";
} catch (PDOException $e) {
    http_response_code(500);
    echo 'ERROR: ' . $e->getMessage() . "\n";
    exit(1);
}
