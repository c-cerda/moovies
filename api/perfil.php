<?php
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
	session_start();

	$userId = $_SESSION['user_id'] ?? null;
	if (!$userId) {
		throw new Exception("No autenticado");
	}

	$db = (new ConexionBD())->getConexion();

	// USER INFO
	$stmt = $db->prepare("
        SELECT 
            u.id,
            u.username,
            m.type AS milk
        FROM users u
        LEFT JOIN users_milks um ON u.id = um.user_id
        LEFT JOIN milks m ON um.milk_id = m.id
        WHERE u.id = ?
    ");
	$stmt->execute([$userId]);
	$user = $stmt->fetch(PDO::FETCH_ASSOC);

	// USER REVIEWS
	$stmt = $db->prepare("
        SELECT 
            c.id,
            c.content,
            c.rating,
            mv.title AS movie_title,
            mv.id AS movie_id
        FROM comments c
        JOIN movies mv ON c.movie_id = mv.id
        WHERE c.user_id = ?
        ORDER BY c.date DESC
    ");
	$stmt->execute([$userId]);
	$reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode([
		"success" => true,
		"user" => $user,
		"reviews" => $reviews
	]);
} catch (Exception $e) {
	echo json_encode([
		"success" => false,
		"error" => $e->getMessage()
	]);
}
