<?php
require 'public/api/config.php';
$stmt = $pdo->prepare('SELECT * FROM blog_sections WHERE post_id = 1 ORDER BY order_index ASC');
$stmt->execute();
$sections = $stmt->fetchAll(PDO::FETCH_ASSOC);
file_put_contents('post_1_sections.json', json_encode($sections, JSON_PRETTY_PRINT));
echo "Done. Saved to post_1_sections.json";
