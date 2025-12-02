<?php
// Bootstrap script: cria o database (se necessário) e aplica a migration SQL usando PDO
$host = getenv('DB_HOST') ?: '127.0.0.1';
$port = getenv('DB_PORT') ?: '5432';
$db   = getenv('DB_NAME') ?: 'passion_store';
$user = getenv('DB_USER') ?: 'postgres';
$pass = getenv('DB_PASS') ?: '';

function out($msg) { echo $msg . PHP_EOL; }

try {
    $dsnMaster = "pgsql:host={$host};port={$port};dbname=postgres";
    $pdo = new PDO($dsnMaster, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
} catch (PDOException $e) {
    out('ERROR: não foi possível conectar ao servidor Postgres: ' . $e->getMessage());
    exit(1);
}

// Verifica se o database já existe
try {
    $stmt = $pdo->prepare('SELECT 1 FROM pg_database WHERE datname = :name');
    $stmt->execute(['name' => $db]);
    $exists = (bool) $stmt->fetchColumn();
    if (!$exists) {
        out("Criando database: {$db}");
        $pdo->exec('CREATE DATABASE "' . $db . '"');
        out('Database criado com sucesso.');
    } else {
        out('Database já existe: ' . $db);
    }
} catch (PDOException $e) {
    out('ERROR: falha ao checar/criar database: ' . $e->getMessage());
    exit(1);
}

// Conecta ao database alvo e aplica a migration
try {
    $dsnTarget = "pgsql:host={$host};port={$port};dbname={$db}";
    $pdo2 = new PDO($dsnTarget, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
} catch (PDOException $e) {
    out('ERROR: não foi possível conectar ao database target: ' . $e->getMessage());
    exit(1);
}

$migration = __DIR__ . '/../migrations/20251127225404_fcf2c47e-1562-4c84-94bc-4ddf5934e1f4.sql';
if (!file_exists($migration)) {
    out('ERROR: arquivo de migration não encontrado: ' . $migration);
    exit(1);
}

$sql = file_get_contents($migration);
try {
    out('Aplicando migration...');
    $pdo2->exec($sql);
    out('Migration aplicada com sucesso.');
} catch (PDOException $e) {
    out('ERROR: falha ao aplicar migration: ' . $e->getMessage());
    exit(1);
}

out('Bootstrap finalizado.');
