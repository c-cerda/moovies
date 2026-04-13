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

	echo json_encode(["success" => true]);
} catch (Exception $e) {
	echo json_encode([
		"success" => false,
		"message" => "Error del servidor"
	]);
}
