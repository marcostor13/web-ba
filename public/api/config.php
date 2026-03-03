<?php
// Muestra errores solo en modo desarrollo o para debugear, en producción poner a 0
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Empezar la sesión para autenticación
session_start([
    'cookie_httponly' => true,
    'cookie_secure' => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on',
    'cookie_samesite' => 'Lax',
]);

function loadEnv($path) {
    if(!file_exists($path)) {
        return false;
    }
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $_ENV[trim($name)] = trim($value);
    }
    return true;
}

// Intentar cargar .env desde 2 niveles arriba dado que la API estara en public/api
$envPath = dirname(__DIR__, 2) . '/.env';
if (!loadEnv($envPath)) {
    // Si no encuentra .env, intentar en la raiz directamente (comun en cPanel)
    $envPath = dirname(__DIR__) . '/.env';
    loadEnv($envPath);
}

// Si las variables no estan en $_ENV, usar getenv o valores por defecto
$dbHost = $_ENV['DATABASE_HOST'] ?? getenv('DATABASE_HOST') ?: 'localhost';
$dbUser = $_ENV['DATABASE_USER'] ?? getenv('DATABASE_USER') ?: 'root';
$dbPass = $_ENV['DATABASE_PASSWORD'] ?? getenv('DATABASE_PASSWORD') ?: '';
$dbName = $_ENV['DATABASE_NAME'] ?? getenv('DATABASE_NAME') ?: 'ba_remodeling';

try {
    $pdo = new PDO("mysql:host=" . $dbHost . ";dbname=" . $dbName . ";charset=utf8mb4", $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Database connection failed"]);
    exit();
}

// Funcion utilitaria para enviar respuestas JSON
function sendJson($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}
