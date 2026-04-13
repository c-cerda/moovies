<?php
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
	$db = (new ConexionBD())->getConexion();

	$id = $_GET['id'];

	$stmt = $db->prepare("CALL get_full_movie(?)");
	$stmt->execute([$id]);

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
