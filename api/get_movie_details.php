<?php
header('Content-Type: application/json');
require_once __DIR__ . '/util/conec.php';

try {
    $conexionObj = new ConexionBD();
    $db = $conexionObj->getConexion();
    $id = $_GET['id'];

    $sql = "SELECT m.*, mc.person_id as director_id, mg.genre_id 
            FROM movies m
            LEFT JOIN movie_cast mc ON m.id = mc.movie_id AND mc.role_id = 2
            LEFT JOIN movies_genres mg ON m.id = mg.movie_id
            WHERE m.id = ?";
    
    $stmt = $db->prepare($sql);
    $stmt->execute(array($id));
    $movie = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($movie);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("error" => $e->getMessage()));
}