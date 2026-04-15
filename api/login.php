<?php
require_once __DIR__ . '/util/conec.php';

header('Content-Type: application/json');

try {
	$db = (new ConexionBD())->getConexion();

	// Get JSON input
	$data = json_decode(file_get_contents("php://input"), true);

	$email = trim($data['email']);
	$password = $data['password'];

	// Check 
	$stmt = $db->prepare("SELECT id, username, name, email, password FROM users WHERE email = ?");
	$stmt->execute([$email]);

	$user = $stmt->fetch(PDO::FETCH_ASSOC);

	if (!$user) {
		echo json_encode([
			"success" => false,
			"message" => "Correo o contraseña incorrectos"
		]);
		exit;
	}

	// Verify password
	if (!password_verify($password, $user['password'])) {
		echo json_encode([
			"success" => false,
			"message" => "Correo o contraseña incorrectos"
		]);
		exit;
	}

	// start session
	session_start();
	$_SESSION['user_id'] = $user['id'];
	$_SESSION['username'] = $user['username'];

	echo json_encode([
		"success" => true,
		"user" => [
			"id" => $user['id'],
			"username" => $user['username'],
			"name" => $user['name']
		]
	]);
} catch (Exception $e) {
	echo json_encode([
		"success" => false,
		"message" => "Error del servidor"
	]);


	// REMPLAZAR CON (proced):
	/*
	*/
}
