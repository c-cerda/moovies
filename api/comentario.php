<?php
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
	$db = (new ConexionBD())->getConexion();

	// opciones
	if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
		$data = json_decode(file_get_contents("php://input"), true);

		$commentId = $data['comment_id'] ?? null;

		if (!$commentId) {
			throw new Exception("ID requerido");
		}

		// verify ownership
		$stmt = $db->prepare("
        SELECT user_id FROM comments WHERE id = ?
    ");
		$stmt->execute([$commentId]);
		$owner = $stmt->fetch();

		if (!$owner || $owner['user_id'] != $userId) {
			throw new Exception("No autorizado");
		}

		// delete (votes will cascade)
		$stmt = $db->prepare("
        DELETE FROM comments WHERE id = ?
    ");
		$stmt->execute([$commentId]);

		echo json_encode(["success" => true]);
		exit;
	} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
		$data = json_decode(file_get_contents("php://input"), true);

		$commentId = $data['comment_id'] ?? null;
		$content = trim($data['content'] ?? '');
		$rating = $data['rating'] ?? null;

		if (!$commentId || !$content || !$rating) {
			throw new Exception("Datos inválidos");
		}

		// verify ownership
		$stmt = $db->prepare("
        SELECT user_id FROM comments WHERE id = ?
    ");
		$stmt->execute([$commentId]);
		$owner = $stmt->fetch();

		if (!$owner || $owner['user_id'] != $userId) {
			throw new Exception("No autorizado");
		}

		// update
		$stmt = $db->prepare("
        UPDATE comments 
        SET content = ?, rating = ? 
        WHERE id = ?
    ");
		$stmt->execute([$content, $rating, $commentId]);

		echo json_encode(["success" => true]);
		exit;
	} else {

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
	}
} catch (Exception $e) {
	echo json_encode([
		"success" => false,
	]);
}
