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
            $category = $_GET['category'] ?? null;
            if ($category) {
                $stmt = $pdo->prepare("SELECT * FROM projects WHERE category = ? ORDER BY created_at ASC, id ASC");
                $stmt->execute([$category]);
            } else {
                $stmt = $pdo->query("SELECT * FROM projects ORDER BY created_at ASC, id ASC");
            }
            sendJson(["success" => true, "data" => $stmt->fetchAll()]);
        } elseif ($action === 'get') {
            $id = $_GET['id'] ?? null;
            if (!$id) sendJson(["success" => false, "error" => "ID is required"], 400);
            
            $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ?");
            $stmt->execute([$id]);
            $project = $stmt->fetch();
            
            if (!$project) sendJson(["success" => false, "error" => "Not found"], 404);

            $stmt = $pdo->prepare("SELECT * FROM project_images WHERE project_id = ? ORDER BY id ASC");
            $stmt->execute([$id]);
            $images = $stmt->fetchAll();

            sendJson(["success" => true, "data" => $project, "images" => $images]);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        checkAuth();
        
        if ($action === 'create') {
            $name = $_POST['name'] ?? '';
            $category = $_POST['category'] ?? 'Kitchen';
            
            $mainImagePath = "";
            if (isset($_FILES['mainImage']) && $_FILES['mainImage']['error'] === UPLOAD_ERR_OK) {
                $mainImagePath = saveAsWebP($_FILES['mainImage'], "projects");
            }

            $logoOverlayPath = null;
            if (isset($_FILES['logoOverlay']) && $_FILES['logoOverlay']['error'] === UPLOAD_ERR_OK) {
                $logoOverlayPath = saveAsWebP($_FILES['logoOverlay'], "projects");
            }

            $stmt = $pdo->prepare("INSERT INTO projects (name, main_image, logo_overlay, category) VALUES (?, ?, ?, ?)");
            $stmt->execute([$name, $mainImagePath, $logoOverlayPath, $category]);
            $projectId = $pdo->lastInsertId();

            if (isset($_FILES['gallery'])) {
                $total = count($_FILES['gallery']['name']);
                for ($i = 0; $i < $total; $i++) {
                    if ($_FILES['gallery']['error'][$i] === UPLOAD_ERR_OK) {
                        $file = [
                            'name' => $_FILES['gallery']['name'][$i],
                            'type' => $_FILES['gallery']['type'][$i],
                            'tmp_name' => $_FILES['gallery']['tmp_name'][$i],
                            'error' => $_FILES['gallery']['error'][$i],
                            'size' => $_FILES['gallery']['size'][$i]
                        ];
                        $galleryPath = saveAsWebP($file, "projects");
                        $stmt = $pdo->prepare("INSERT INTO project_images (project_id, image_path) VALUES (?, ?)");
                        $stmt->execute([$projectId, $galleryPath]);
                    }
                }
            }

            sendJson(["success" => true]);

        } elseif ($action === 'update') {
            $id = $_POST['id'] ?? '';
            if (!$id) sendJson(["success" => false, "error" => "ID required"]);

            $name = $_POST['name'] ?? '';
            $category = $_POST['category'] ?? 'Kitchen';

            $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ?");
            $stmt->execute([$id]);
            $project = $stmt->fetch();
            if (!$project) sendJson(["success" => false, "error" => "Not found"]);

            $mainImagePath = $project['main_image'];
            $logoOverlayPath = $project['logo_overlay'];

            if (isset($_FILES['mainImage']) && $_FILES['mainImage']['error'] === UPLOAD_ERR_OK) {
                $mainImagePath = saveAsWebP($_FILES['mainImage'], "projects");
                deleteLocalFile($project['main_image']);
            }

            if (isset($_FILES['logoOverlay']) && $_FILES['logoOverlay']['error'] === UPLOAD_ERR_OK) {
                $logoOverlayPath = saveAsWebP($_FILES['logoOverlay'], "projects");
                if ($project['logo_overlay']) deleteLocalFile($project['logo_overlay']);
            }

            $stmt = $pdo->prepare("UPDATE projects SET name=?, main_image=?, logo_overlay=?, category=? WHERE id=?");
            $stmt->execute([$name, $mainImagePath, $logoOverlayPath, $category, $id]);

            if (isset($_FILES['gallery'])) {
                $total = count($_FILES['gallery']['name']);
                for ($i = 0; $i < $total; $i++) {
                    if ($_FILES['gallery']['error'][$i] === UPLOAD_ERR_OK) {
                        $file = [
                            'name' => $_FILES['gallery']['name'][$i],
                            'type' => $_FILES['gallery']['type'][$i],
                            'tmp_name' => $_FILES['gallery']['tmp_name'][$i],
                            'error' => $_FILES['gallery']['error'][$i],
                            'size' => $_FILES['gallery']['size'][$i]
                        ];
                        $galleryPath = saveAsWebP($file, "projects");
                        $stmt = $pdo->prepare("INSERT INTO project_images (project_id, image_path) VALUES (?, ?)");
                        $stmt->execute([$id, $galleryPath]);
                    }
                }
            }

            sendJson(["success" => true]);

        } elseif ($action === 'delete') {
            $id = $_POST['id'] ?? json_decode(file_get_contents('php://input'), true)['id'] ?? null;
            if (!$id) sendJson(["success" => false, "error" => "ID required"], 400);

            $stmt = $pdo->prepare("SELECT main_image, logo_overlay FROM projects WHERE id = ?");
            $stmt->execute([$id]);
            $project = $stmt->fetch();

            if ($project) {
                if ($project['main_image']) deleteLocalFile($project['main_image']);
                if ($project['logo_overlay']) deleteLocalFile($project['logo_overlay']);

                $stmt = $pdo->prepare("SELECT image_path FROM project_images WHERE project_id = ?");
                $stmt->execute([$id]);
                $images = $stmt->fetchAll();
                foreach($images as $img) {
                    deleteLocalFile($img['image_path']);
                }
            }

            $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
            $stmt->execute([$id]);
            sendJson(["success" => true]);

        } elseif ($action === 'deleteImage') {
            $imageId = $_POST['imageId'] ?? json_decode(file_get_contents('php://input'), true)['imageId'] ?? null;
            if (!$imageId) sendJson(["success" => false, "error" => "ID required"]);

            $stmt = $pdo->prepare("SELECT image_path FROM project_images WHERE id = ?");
            $stmt->execute([$imageId]);
            $img = $stmt->fetch();
            if ($img && $img['image_path']) {
                deleteLocalFile($img['image_path']);
            }

            $stmt = $pdo->prepare("DELETE FROM project_images WHERE id = ?");
            $stmt->execute([$imageId]);
            sendJson(["success" => true]);

        } elseif ($action === 'deleteLogoOverlay') {
            $projectId = $_POST['projectId'] ?? json_decode(file_get_contents('php://input'), true)['projectId'] ?? null;
            if (!$projectId) sendJson(["success" => false, "error" => "ID required"]);

            $stmt = $pdo->prepare("SELECT logo_overlay FROM projects WHERE id = ?");
            $stmt->execute([$projectId]);
            $project = $stmt->fetch();

            if ($project && $project['logo_overlay']) {
                deleteLocalFile($project['logo_overlay']);
                $stmt = $pdo->prepare("UPDATE projects SET logo_overlay=NULL WHERE id=?");
                $stmt->execute([$projectId]);
            }
            sendJson(["success" => true]);
        }
    }
} catch (Exception $e) {
    sendJson(["success" => false, "error" => $e->getMessage()], 500);
}

sendJson(["success" => false, "error" => "Invalid action"], 400);
