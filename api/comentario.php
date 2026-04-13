<?php
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
	$db = (new ConexionBD())->getConexion();

	// get POST data
	$input = json_decode(file_get_contents("php://input"), true);


	session_start();
	$userId = $_SESSION['user_id'] ?? null;
	if (!$userId) {
		throw new Exception("Usuario no autenticado");
	}

	$movieId = $input['movie_id'] ?? null;
	$content = trim($input['content'] ?? '');
	$rating = $input['rating'] ?? null;

	if (!$movieId || !$content || !$rating) {
		throw new Exception("Datos incompletos");
	}

	$stmt = $db->prepare("
        INSERT INTO comments (movie_id, user_id, content, rating, date)
        VALUES (?, ?, ?, ?, NOW())
    ");

	$stmt->execute([$movieId, $userId, $content, $rating]);

	echo json_encode([
		"success" => true
	]);
} catch (Exception $e) {
	echo json_encode([
		"success" => false,
	]);
}
