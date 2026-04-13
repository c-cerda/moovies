<?php
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
	$db = (new ConexionBD())->getConexion();

	$id = $_GET['id'];

	$stmt = $db->prepare("
        SELECT 
            m.id,
            m.title,
            m.description,
            m.summary,
            m.image,
            m.trailer,
            GROUP_CONCAT(DISTINCT g.type) AS genres
        FROM movies m
        LEFT JOIN movies_genres mg ON m.id = mg.movie_id
        LEFT JOIN genres g ON mg.genre_id = g.id
        WHERE m.id = ?
        GROUP BY m.id
    ");

	$stmt->execute([$id]);
	$movie = $stmt->fetch(PDO::FETCH_ASSOC);

	$stmt = $db->prepare("CALL get_movie_cast(?)");
	$stmt->execute([$id]);

	$cast = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$stmt->closeCursor();

	$castFormatted = [];
	foreach ($cast as $row) {
		$role = strtolower($row['role']); // actor, director, etc
		$people = explode(',', $row['people']);

		$castFormatted[$role] = $people;
	}

	echo json_encode([
		"success" => true,
		"movie" => $movie,
		"cast" => $castFormatted
	]);
} catch (Exception $e) {
	echo json_encode([
		"success" => false
	]);
}
