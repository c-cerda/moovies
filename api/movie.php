<?php
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
	$db = (new ConexionBD())->getConexion();

	session_start();

	$currentUserId = $_SESSION['user_id'] ?? null;
	$id = $_GET['id'] ?? null;

	if (!$id) {
		throw new Exception("Missing movie ID");
	}

	$stmt = $db->prepare("CALL get_full_movie(?,?)");
	$stmt->execute([$id, $currentUserId]);

	// FIRST result (movie)
	$movie = $stmt->fetch(PDO::FETCH_ASSOC);

	// move to next result
	$stmt->nextRowset();

	// SECOND result (comments)
	$comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode([
		"success" => true,
		"movie" => $movie,
		"comments" => $comments
	]);
} catch (Exception $e) {
	echo json_encode([
		"success" => false,
		"error" => $e->getMessage()
	]);
}
