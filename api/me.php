<?php
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
	session_start();

	if (!isset($_SESSION['user_id'])) {
		echo json_encode([
			"logged" => false
		]);
		exit;
	}

	$db = (new ConexionBD())->getConexion();

	$stmt = $db->prepare("
        SELECT id, username, name 
        FROM users 
        WHERE id = ?
    ");
	$stmt->execute([$_SESSION['user_id']]);

	$user = $stmt->fetch(PDO::FETCH_ASSOC);

	echo json_encode([
		"logged" => true,
		"user" => $user
	]);
} catch (Exception $e) {
	echo json_encode([
		"logged" => false
	]);
}
