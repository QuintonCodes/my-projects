<?php
header('Content-Type: application/json');

// Helper function to load environment variables
function loadEnv($path) {
  if (!file_exists($path)) {
    return;
  }

  $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  foreach ($lines as $line) {
    if (strpos(trim($line), '#') === 0) {
      continue;
    }

    list($name, $value) = explode('=', $line, 2);
    $name = trim($name);
    $value = trim($value);

    $value = trim($value, "\"'");

    putenv("$name=$value");
    $_ENV[$name] = $value;
    $_SERVER[$name] = $value;
  }
}

loadEnv(__DIR__ . '/../../../.env');

// Configure your Neon (PostgreSQL) connection details
$host     = getenv('DB_HOST');
$port     = '5432';
$dbname   = getenv('DB_NAME');
$user     = getenv('DB_USER');
$password = getenv('DB_PASSWORD');

try {
    // Establish PDO connection to PostgreSQL
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    error_log('DB Connection failed: ' . $e->getMessage());
    echo json_encode([
        'error' => 'Internal Server Error',
    ]);
    exit;
}

try {
    // Query: Number of users in "user" table
    $stmtUsers = $pdo->query('SELECT COUNT(*) AS userCount FROM "user"');
    $userCountRow = $stmtUsers->fetch();
    $userCount = (int) ($userCountRow['usercount'] ?? 0);

    // Query: Number of products in "product" table
    $stmtProducts = $pdo->query('SELECT COUNT(*) AS productCount FROM product');
    $productCountRow = $stmtProducts->fetch();
    $productCount = (int) ($productCountRow['productcount'] ?? 0);

    // Query: Highest-priced product(s) in "product" table
    $stmtMaxPrice = $pdo->query('SELECT MAX(price) AS maxPrice FROM product');
    $maxPriceRow = $stmtMaxPrice->fetch();
    $maxPrice = $maxPriceRow['maxprice'];

    if ($maxPrice !== null) {
        $stmtHighest = $pdo->prepare('SELECT id, name, price FROM product WHERE price = :maxPrice');
        $stmtHighest->execute([':maxPrice' => $maxPrice]);
        $highestPricedProducts = $stmtHighest->fetchAll();
    } else {
        $highestPricedProducts = [];
    }

    // Query: Number of payments in "payment" table
    $stmtPayments = $pdo->query('SELECT COUNT(*) AS paymentCount FROM payment');
    $paymentCountRow = $stmtPayments->fetch();
    $paymentCount = (int) ($paymentCountRow['paymentcount'] ?? 0);

    // Response
    $responseData = [
        'userCount'              => $userCount,
        'productCount'           => $productCount,
        'highestPricedProducts'  => $highestPricedProducts,
        'paymentCount'           => $paymentCount
    ];

    echo json_encode($responseData);
} catch (PDOException $e) {
    http_response_code(500);
    error_log('Analytics query failed: ' . $e->getMessage());
    echo json_encode([
        'error' => 'Internal Server Error',
    ]);
    exit;
}