<?php
require_once __DIR__ . '/util/conec.php';

header('Content-Type: application/json');

try {
	$db = (new ConexionBD())->getConexion();

	// Get JSON input
	$data = json_decode(file_get_contents("php://input"), true);

	$username = trim($data['username']);
	$name = trim($data['name']);
	$email = trim($data['email']);
	$milk = trim($data['milk']);
	$password = $data['password'];

	// Basic validation
	if (strlen($username) < 3) {
		echo json_encode(["success" => false, "message" => "Usuario muy corto"]);
		exit;
	}
	if (strlen($password) < 4) {
		echo json_encode(["success" => false, "message" => "Contraseña muy corta"]);
		exit;
	}

	// Check duplicates
	// # REPLACE 
	$stmt = $db->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
	$stmt->execute([$username, $email]);

	if ($stmt->fetch()) {
		echo json_encode(["success" => false, "message" => "Usuario o correo ya existe"]);
		exit;
	}

	// Hash password 
	$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

	// Insert user
	$stmt = $db->prepare("
        INSERT INTO users (username, name, email, password)
        VALUES (?, ?, ?, ?)
    ");
	$stmt->execute([$username, $name, $email, $hashedPassword]);

	$user_id = $db->lastInsertId();

	// Handle milk (lookup id)
	$stmt = $db->prepare("SELECT id FROM milks WHERE type = ?");
	$stmt->execute([$milk]);
	$milkRow = $stmt->fetch();

	if ($milkRow) {
		$milk_id = $milkRow['id'];

		$stmt = $db->prepare("
            INSERT INTO users_milks (user_id, milk_id)
            VALUES (?, ?)
        ");
		$stmt->execute([$user_id, $milk_id]);
	}

	echo json_encode(["success" => true]);
} catch (Exception $e) {
	echo json_encode([
		"success" => false,
		"message" => "Error del servidor"
	]);


	// REMPLAZAR CON:
	/*
try {
    $stmt = $db->prepare("CALL register_user(?, ?, ?, ?, ?)");
    $stmt->execute([$username, $name, $email, $hashedPassword, $milk]);

    echo json_encode(["success" => true]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}

	*/
}
