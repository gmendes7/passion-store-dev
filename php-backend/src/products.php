<?php
require_once __DIR__ . '/db.php';

function listProducts() {
    global $pdo;
    $stmt = $pdo->query('SELECT id, name, description, price, image, created_at, updated_at FROM public.products ORDER BY created_at DESC');
    $rows = $stmt->fetchAll();
    echo json_encode($rows);
}

function getProductById($id) {
    global $pdo;
    $stmt = $pdo->prepare('SELECT id, name, description, price, image, created_at, updated_at FROM public.products WHERE id = :id');
    $stmt->execute(['id' => $id]);
    $row = $stmt->fetch();
    if ($row) {
        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Product not found']);
    }
}
