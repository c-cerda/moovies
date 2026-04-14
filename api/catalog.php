<?php
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
	$db = (new ConexionBD())->getConexion();

	$stmt = $db->query("
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
        GROUP BY m.id
    ");

	$movies = $stmt->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode([
		"success" => true,
		"movies" => $movies
	]);
} catch (Exception $e) {
	echo json_encode([
		"success" => false,
		"message" => "Error al obtener películas"
	]);
}
