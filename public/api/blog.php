<?php
require_once 'config.php';
require_once 'images.php';

function checkAuth() {
    if (!isset($_SESSION['user_id'])) {
        sendJson(["success" => false, "error" => "Unauthorized"], 401);
    }
}

$action = $_GET['action'] ?? '';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if ($action === 'list') {
            $stmt = $pdo->query("SELECT * FROM blog_posts ORDER BY created_at DESC");
            sendJson(["success" => true, "data" => $stmt->fetchAll()]);
        } elseif ($action === 'get') {
            $slug = $_GET['slug'] ?? null;
            if ($slug) {
                $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE slug = ?");
                $stmt->execute([$slug]);
            } else {
                $id = $_GET['id'] ?? null;
                if (!$id) sendJson(["success" => false, "error" => "Slug or ID required"], 400);
                $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE id = ?");
                $stmt->execute([$id]);
            }
            
            $post = $stmt->fetch();
            if (!$post) sendJson(["success" => false, "error" => "Not found"], 404);

            $stmt = $pdo->prepare("SELECT * FROM blog_sections WHERE post_id = ? ORDER BY order_index ASC");
            $stmt->execute([$post['id']]);
            $sections = $stmt->fetchAll();

            sendJson(["success" => true, "data" => $post, "sections" => $sections]);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        checkAuth();
        
        if ($action === 'create') {
            $title = $_POST['title'] ?? '';
            $short_desc = $_POST['short_description'] ?? '';
            $sectionsStr = $_POST['sections'] ?? '[]';
            $sections = json_decode($sectionsStr, true);
            
            $mainImagePath = "";
            if (isset($_FILES['main_image']) && $_FILES['main_image']['error'] === UPLOAD_ERR_OK) {
                $mainImagePath = saveAsWebP($_FILES['main_image'], "blog");
            } else {
                sendJson(["success" => false, "error" => "Main image is required"]);
            }

            $baseSlug = strtolower(trim(preg_replace('/[^a-z0-9]+/', '-', $title), '-'));
            $slug = $baseSlug . '-' . substr(time(), -4);

            $pdo->beginTransaction();

            try {
                $stmt = $pdo->prepare("INSERT INTO blog_posts (title, slug, short_description, main_image) VALUES (?, ?, ?, ?)");
                $stmt->execute([$title, $slug, $short_desc, $mainImagePath]);
                $postId = $pdo->lastInsertId();

                $orderIndex = 0;
                foreach ($sections as $section) {
                    $imagePath1 = null;
                    $imagePath2 = null;

                    if (!empty($section['image_1_key']) && isset($_FILES[$section['image_1_key']]) && $_FILES[$section['image_1_key']]['error'] === UPLOAD_ERR_OK) {
                        $imagePath1 = saveAsWebP($_FILES[$section['image_1_key']], "blog");
                    }
                    if (!empty($section['image_2_key']) && isset($_FILES[$section['image_2_key']]) && $_FILES[$section['image_2_key']]['error'] === UPLOAD_ERR_OK) {
                        $imagePath2 = saveAsWebP($_FILES[$section['image_2_key']], "blog");
                    }

                    $stmt = $pdo->prepare("INSERT INTO blog_sections (post_id, type, content_text, image_path_1, image_path_2, order_index) VALUES (?, ?, ?, ?, ?, ?)");
                    $stmt->execute([$postId, $section['type'], $section['content'] ?? null, $imagePath1, $imagePath2, $orderIndex]);
                    $orderIndex++;
                }

                $pdo->commit();
                sendJson(["success" => true]);
            } catch (Exception $e) {
                $pdo->rollBack();
                throw $e;
            }

        } elseif ($action === 'update') {
            $id = $_POST['id'] ?? '';
            if (!$id) sendJson(["success" => false, "error" => "ID required"]);

            $title = $_POST['title'] ?? '';
            $short_desc = $_POST['short_description'] ?? '';
            $sectionsStr = $_POST['sections'] ?? '[]';
            $sections = json_decode($sectionsStr, true);

            $pdo->beginTransaction();

            try {
                $stmt = $pdo->prepare("SELECT main_image FROM blog_posts WHERE id = ?");
                $stmt->execute([$id]);
                $oldPost = $stmt->fetch();

                $mainImagePath = $oldPost ? $oldPost['main_image'] : null;

                if (isset($_FILES['main_image']) && $_FILES['main_image']['error'] === UPLOAD_ERR_OK) {
                    $mainImagePath = saveAsWebP($_FILES['main_image'], "blog");
                    if ($oldPost && $oldPost['main_image']) deleteLocalFile($oldPost['main_image']);
                }

                $stmt = $pdo->prepare("UPDATE blog_posts SET title=?, short_description=?, main_image=? WHERE id=?");
                $stmt->execute([$title, $short_desc, $mainImagePath, $id]);

                // Delete old sections data
                $stmt = $pdo->prepare("DELETE FROM blog_sections WHERE post_id=?");
                $stmt->execute([$id]);

                $orderIndex = 0;
                foreach ($sections as $section) {
                    $imagePath1 = $section['existing_image_1'] ?? null;
                    $imagePath2 = $section['existing_image_2'] ?? null;

                    if (!empty($section['image_1_key']) && isset($_FILES[$section['image_1_key']]) && $_FILES[$section['image_1_key']]['error'] === UPLOAD_ERR_OK) {
                        $imagePath1 = saveAsWebP($_FILES[$section['image_1_key']], "blog");
                    }
                    if (!empty($section['image_2_key']) && isset($_FILES[$section['image_2_key']]) && $_FILES[$section['image_2_key']]['error'] === UPLOAD_ERR_OK) {
                        $imagePath2 = saveAsWebP($_FILES[$section['image_2_key']], "blog");
                    }

                    $stmt = $pdo->prepare("INSERT INTO blog_sections (post_id, type, content_text, image_path_1, image_path_2, order_index) VALUES (?, ?, ?, ?, ?, ?)");
                    $stmt->execute([$id, $section['type'], $section['content'] ?? null, $imagePath1, $imagePath2, $orderIndex]);
                    $orderIndex++;
                }

                $pdo->commit();
                sendJson(["success" => true]);
            } catch (Exception $e) {
                $pdo->rollBack();
                throw $e;
            }

        } elseif ($action === 'delete') {
            $id = $_POST['id'] ?? json_decode(file_get_contents('php://input'), true)['id'] ?? null;
            if (!$id) sendJson(["success" => false, "error" => "ID required"], 400);

            $stmt = $pdo->prepare("SELECT main_image FROM blog_posts WHERE id = ?");
            $stmt->execute([$id]);
            $post = $stmt->fetch();

            if ($post && $post['main_image']) {
                deleteLocalFile($post['main_image']);
            }

            $stmt = $pdo->prepare("SELECT image_path_1, image_path_2 FROM blog_sections WHERE post_id = ?");
            $stmt->execute([$id]);
            $sections = $stmt->fetchAll();
            foreach ($sections as $sec) {
                if ($sec['image_path_1']) deleteLocalFile($sec['image_path_1']);
                if ($sec['image_path_2']) deleteLocalFile($sec['image_path_2']);
            }

            $stmt = $pdo->prepare("DELETE FROM blog_posts WHERE id = ?");
            $stmt->execute([$id]);

            sendJson(["success" => true]);
        }
    }
} catch (Exception $e) {
    sendJson(["success" => false, "error" => $e->getMessage()], 500);
}

sendJson(["success" => false, "error" => "Invalid action"], 400);
