<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
	$db = (new ConexionBD())->getConexion();

	session_start();
	$userId = $_SESSION['user_id'] ?? null;

	if (!$userId) {
		throw new Exception("User not logged in");
	}

	$data = json_decode(file_get_contents("php://input"), true);

	$commentId = $data['comment_id'] ?? null;
	$vote = $data['vote'] ?? null;

	if (!$commentId || !in_array($vote, [1, -1])) {
		throw new Exception("Invalid data");
	}

	// check existing vote
	$stmt = $db->prepare("
		SELECT vote FROM comment_votes 
		WHERE user_id = ? AND comment_id = ?
	");
	$stmt->execute([$userId, $commentId]);
	$existing = $stmt->fetch();

	if ($existing) {
		if ($existing['vote'] == $vote) {
			$stmt = $db->prepare("
				DELETE FROM comment_votes 
				WHERE user_id = ? AND comment_id = ?
			");
			$stmt->execute([$userId, $commentId]);
		} else {
			$stmt = $db->prepare("
				UPDATE comment_votes 
				SET vote = ? 
				WHERE user_id = ? AND comment_id = ?
			");
			$stmt->execute([$vote, $userId, $commentId]);
		}
	} else {
		$stmt = $db->prepare("
			INSERT INTO comment_votes (user_id, comment_id, vote)
			VALUES (?, ?, ?)
		");
		$stmt->execute([$userId, $commentId, $vote]);
	}

	echo json_encode(["success" => true]);
} catch (Exception $e) {
	echo json_encode([
		"success" => false,
		"error" => $e->getMessage()
	]);
}
