<?php
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
	session_start();

	$db = (new ConexionBD())->getConexion();

	$userId = $_SESSION['user_id'] ?? null;
	if (!$userId) {
		throw new Exception("Usuario no autenticado");
	}

	if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
		$data = json_decode(file_get_contents("php://input"), true);
		$commentId = $data['comment_id'] ?? null;

		if (!$commentId) {
			throw new Exception("ID requerido");
		}

		$stmt = $db->prepare("SELECT user_id FROM comments WHERE id = ?");
		$stmt->execute([$commentId]);
		$owner = $stmt->fetch(PDO::FETCH_ASSOC);

		if (!$owner || $owner['user_id'] != $userId) {
			throw new Exception("No autorizado");
		}

		$stmt = $db->prepare("DELETE FROM comments WHERE id = ?");
		$stmt->execute([$commentId]);

		echo json_encode(["success" => true]);
		exit;
	}

	if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
		$data = json_decode(file_get_contents("php://input"), true);

		$commentId = $data['comment_id'] ?? null;
		$content = trim($data['content'] ?? '');
		$rating = $data['rating'] ?? null;

		if (!$commentId || !$content || $rating === null) {
			throw new Exception("Datos inválidos");
		}

		if ($rating < 1 || $rating > 5) {
			throw new Exception("Rating inválido");
		}

		$stmt = $db->prepare("SELECT user_id FROM comments WHERE id = ?");
		$stmt->execute([$commentId]);
		$owner = $stmt->fetch(PDO::FETCH_ASSOC);

		if (!$owner || $owner['user_id'] != $userId) {
			throw new Exception("No autorizado");
		}

		$stmt = $db->prepare("
            UPDATE comments 
            SET content = ?, rating = ? 
            WHERE id = ?
        ");
		$stmt->execute([$content, $rating, $commentId]);

		echo json_encode(["success" => true]);
		exit;
	}

	$input = json_decode(file_get_contents("php://input"), true);

	$movieId = $input['movie_id'] ?? null;
	$content = trim($input['content'] ?? '');
	$rating = $input['rating'] ?? null;

	if (!$movieId || !$content || $rating === null) {
		throw new Exception("Datos incompletos");
	}

	if ($rating < 1 || $rating > 5) {
		throw new Exception("Rating inválido");
	}

	// ❗ evitar doble comentario
	$stmt = $db->prepare("
        SELECT id FROM comments 
        WHERE movie_id = ? AND user_id = ?
    ");
	$stmt->execute([$movieId, $userId]);

	if ($stmt->fetch()) {
		throw new Exception("Ya comentaste esta película");
	}

	$stmt = $db->prepare("
        INSERT INTO comments (movie_id, user_id, content, rating, date)
        VALUES (?, ?, ?, ?, NOW())
    ");
	$stmt->execute([$movieId, $userId, $content, $rating]);

	echo json_encode(["success" => true]);
} catch (Exception $e) {
	echo json_encode([
		"success" => false,
		"error" => $e->getMessage()
	]);
}
