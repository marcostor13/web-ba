<?php
require_once 'config.php';

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'login') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    // Fallback para FormData
    $username = $data['username'] ?? $_POST['username'] ?? '';
    $password = $data['password'] ?? $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        sendJson(["success" => false, "error" => "Username and password are required"], 400);
    }

    $stmt = $pdo->prepare("SELECT * FROM user WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user) {
        sendJson(["success" => false, "error" => "Invalid username or password"], 401);
    }

    if (!password_verify($password, $user['password_hash'])) {
        sendJson(["success" => false, "error" => "Invalid username or password"], 401);
    }

    // Login successful
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];

    sendJson(["success" => true]);

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'register') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $username = $data['username'] ?? $_POST['username'] ?? '';
    $password = $data['password'] ?? $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        sendJson(["success" => false, "error" => "Username and password are required"], 400);
    }
    if (strlen($username) < 3 || strlen($password) < 6) {
        sendJson(["success" => false, "error" => "Invalid username or password length"], 400);
    }

    $passwordHash = password_hash($password, PASSWORD_BCRYPT);
    $userId = bin2hex(random_bytes(8));

    try {
        $stmt = $pdo->prepare("INSERT INTO user (id, username, password_hash) VALUES (?, ?, ?)");
        $stmt->execute([$userId, $username, $passwordHash]);
        
        // Auto-login after register
        $_SESSION['user_id'] = $userId;
        $_SESSION['username'] = $username;
        sendJson(["success" => true]);
    } catch (PDOException $e) {
        if ($e->getCode() == '23000' || $e->getCode() == '1062') {
            sendJson(["success" => false, "error" => "Username already exists"], 400);
        }
        sendJson(["success" => false, "error" => "Database error"], 500);
    }

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'logout') {
    session_unset();
    session_destroy();
    sendJson(["success" => true]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'check') {
    if (isset($_SESSION['user_id'])) {
        sendJson([
            "success" => true,
            "session" => [
                "user_id" => $_SESSION['user_id'],
                "username" => $_SESSION['username']
            ]
        ]);
    } else {
        sendJson(["success" => false, "session" => null], 401);
    }
} else {
    sendJson(["success" => false, "error" => "Invalid action"], 400);
}
