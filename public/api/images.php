<?php
function convertToWebP($sourcePath, $destinationPath, $quality = 80) {
    if (!file_exists($sourcePath)) return false;
    
    $info = getimagesize($sourcePath);
    if (!$info) return false;

    $image = null;
    switch ($info['mime']) {
        case 'image/jpeg':
            $image = @imagecreatefromjpeg($sourcePath);
            break;
        case 'image/png':
            $image = @imagecreatefrompng($sourcePath);
            if ($image !== false) {
                imagepalettetotruecolor($image);
                imagealphablending($image, true);
                imagesavealpha($image, true);
            }
            break;
        case 'image/gif':
            $image = @imagecreatefromgif($sourcePath);
            if ($image !== false) {
                imagepalettetotruecolor($image);
            }
            break;
        case 'image/webp':
            $image = @imagecreatefromwebp($sourcePath);
            break;
        default:
            return false;
    }

    if (!$image) return false;

    $success = imagewebp($image, $destinationPath, $quality);
    imagedestroy($image);
    return $success;
}

function saveAsWebP($file, $uploadDir) {
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new Exception("Upload error: " . $file['error']);
    }

    $timestamp = time() . rand(100, 999);
    $originalName = pathinfo($file['name'], PATHINFO_FILENAME);
    $cleanBaseName = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $originalName));
    
    $fileName = "{$timestamp}-{$cleanBaseName}.webp";
    
    // Directorio publico de imagenes, relativo a api/
    $targetDir = dirname(__DIR__) . "/uploads/{$uploadDir}";
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }
    
    $destinationPath = $targetDir . '/' . $fileName;

    if (strpos($file['type'], 'image/') === 0) {
        $converted = convertToWebP($file['tmp_name'], $destinationPath);
        if (!$converted) {
            $fileName = "{$timestamp}-{$cleanBaseName}." . pathinfo($file['name'], PATHINFO_EXTENSION);
            $destinationPath = $targetDir . '/' . $fileName;
            move_uploaded_file($file['tmp_name'], $destinationPath);
        }
    } else {
        $fileName = "{$timestamp}-{$cleanBaseName}." . pathinfo($file['name'], PATHINFO_EXTENSION);
        $destinationPath = $targetDir . '/' . $fileName;
        move_uploaded_file($file['tmp_name'], $destinationPath);
    }

    return "/uploads/{$uploadDir}/{$fileName}";
}

function deleteLocalFile($urlPath) {
    if (empty($urlPath) || strpos($urlPath, 'http://') === 0 || strpos($urlPath, 'https://') === 0) {
        return;
    }

    $relativePath = ltrim($urlPath, '/');
    $fullPath = dirname(__DIR__) . "/" . $relativePath;
    
    if (file_exists($fullPath)) {
        @unlink($fullPath);
    }
}
