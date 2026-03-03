<?php
require_once 'config.php';
require_once 'images.php';

// Verificación de sesión sólo para mutaciones
function checkAuth() {
    if (!isset($_SESSION['user_id'])) {
        sendJson(["success" => false, "error" => "Unauthorized"], 401);
    }
}

$action = $_GET['action'] ?? '';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if ($action === 'list') {
            $stmt = $pdo->query("SELECT * FROM cabinets ORDER BY created_at DESC");
            sendJson(["success" => true, "data" => $stmt->fetchAll()]);
        } elseif ($action === 'get') {
            $id = $_GET['id'] ?? null;
            if (!$id) sendJson(["success" => false, "error" => "ID is required"], 400);
            
            $stmt = $pdo->prepare("SELECT * FROM cabinets WHERE id = ?");
            $stmt->execute([$id]);
            $cabinet = $stmt->fetch();
            
            if (!$cabinet) sendJson(["success" => false, "error" => "Not found"], 404);
            sendJson(["success" => true, "data" => $cabinet]);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        checkAuth();
        
        if ($action === 'create') {
            $name = $_POST['name'] ?? '';
            $brand = $_POST['brand'] ?? 'BA Kitchen & Bath';
            $description = $_POST['description'] ?? '';
            $series = $_POST['series'] ?? '';
            $specifications = $_POST['specifications'] ?? '';
            $tag = $_POST['tag'] ?? 'White';
            
            $imagePath = "";
            if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                $imagePath = saveAsWebP($_FILES['image'], "cabinets");
            }

            $stmt = $pdo->prepare("INSERT INTO cabinets (name, brand, image, description, series, specifications, tag) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $brand, $imagePath, $description, $series, $specifications, $tag]);
            
            sendJson(["success" => true]);
        } elseif ($action === 'update') {
            $id = $_POST['id'] ?? '';
            if (!$id) sendJson(["success" => false, "error" => "ID required"], 400);
            
            $name = $_POST['name'] ?? '';
            $brand = $_POST['brand'] ?? 'BA Kitchen & Bath';
            $description = $_POST['description'] ?? '';
            $series = $_POST['series'] ?? '';
            $specifications = $_POST['specifications'] ?? '';
            $tag = $_POST['tag'] ?? 'White';

            $imagePath = "";
            if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                $imagePath = saveAsWebP($_FILES['image'], "cabinets");
                
                // Borrar foto vieja
                $stmt = $pdo->prepare("SELECT image FROM cabinets WHERE id = ?");
                $stmt->execute([$id]);
                $oldCab = $stmt->fetch();
                if ($oldCab && $oldCab['image']) {
                    deleteLocalFile($oldCab['image']);
                }
            }

            if ($imagePath) {
                $stmt = $pdo->prepare("UPDATE cabinets SET name=?, brand=?, image=?, description=?, series=?, specifications=?, tag=? WHERE id=?");
                $stmt->execute([$name, $brand, $imagePath, $description, $series, $specifications, $tag, $id]);
            } else {
                $stmt = $pdo->prepare("UPDATE cabinets SET name=?, brand=?, description=?, series=?, specifications=?, tag=? WHERE id=?");
                $stmt->execute([$name, $brand, $description, $series, $specifications, $tag, $id]);
            }
            
            sendJson(["success" => true]);
        } elseif ($action === 'delete') {
            // Delete via POST for form simplicity
            $id = $_POST['id'] ?? (json_decode(file_get_contents('php://input'), true)['id'] ?? null);
            if (!$id) sendJson(["success" => false, "error" => "ID required"], 400);

            $stmt = $pdo->prepare("SELECT image FROM cabinets WHERE id = ?");
            $stmt->execute([$id]);
            $oldCab = $stmt->fetch();
            if ($oldCab && $oldCab['image']) {
                deleteLocalFile($oldCab['image']);
            }

            $stmt = $pdo->prepare("DELETE FROM cabinets WHERE id = ?");
            $stmt->execute([$id]);
            
            sendJson(["success" => true]);
        }
    }
} catch (Exception $e) {
    sendJson(["success" => false, "error" => $e->getMessage()], 500);
}

sendJson(["success" => false, "error" => "Invalid action"], 400);
