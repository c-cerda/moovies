<?php
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
	session_start();
	$userId = $_SESSION['user_id'] ?? null;

	if (!$userId) {
		throw new Exception("No autenticado");
	}

	$input = json_decode(file_get_contents("php://input"), true);

	$username = $input['username'] ?? null;
	$milkId = $input['milk_id'] ?? null;

	$db = (new ConexionBD())->getConexion();

	if ($username) {
		$stmt = $db->prepare("UPDATE users SET username = ? WHERE id = ?");
		$stmt->execute([$username, $userId]);
	}

	if ($milkId) {
		$stmt = $db->prepare("
            UPDATE users_milks 
            SET milk_id = ? 
            WHERE user_id = ?
        ");
		$stmt->execute([$milkId, $userId]);
	}

	echo json_encode(["success" => true]);
} catch (Exception $e) {
	echo json_encode([
		"success" => false,
		"error" => $e->getMessage()
	]);
}
