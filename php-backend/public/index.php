<?php
require __DIR__ . '/../src/db.php';
require __DIR__ . '/../src/products.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$parts = array_values(array_filter(explode('/', $uri)));

header('Content-Type: application/json');

if (count($parts) >= 1 && $parts[0] === 'products') {
    if ($method === 'GET') {
        if (isset($parts[1]) && $parts[1] !== '') {
            getProductById($parts[1]);
        } else {
            listProducts();
        }
        exit;
    }
}

http_response_code(404);
echo json_encode(['error' => 'Not found']);
