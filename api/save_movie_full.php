<?php
header('Content-Type: application/json');
require_once __DIR__ . '/util/conec.php';

$data = json_decode(file_get_contents("php://input"), true);

try {
    $conexionObjeto = new ConexionBD();
    $db = $conexionObjeto->getConexion();
    $db->beginTransaction();

    // 1. Insertar datos básicos en 'movies'
    $sql = "INSERT INTO movies (title, description, summary, image, trailer) VALUES (?, ?, ?, ?, ?)";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(
        $data['title'], 
        $data['description'], 
        $data['summary'], 
        $data['image'], 
        $data['trailer']
    ));

    // Obtenemos el ID de la película recién creada
    $nuevoId = $db->lastInsertId();

    // 2. Insertar Director en 'movie_cast' (usando role_id = 2 como en tu update)
    if (!empty($data['director_id'])) {
        $sqlDir = "INSERT INTO movie_cast (movie_id, person_id, role_id) VALUES (?, ?, 2)";
        $db->prepare($sqlDir)->execute(array($nuevoId, $data['director_id']));
    }

    // 3. Insertar Género en 'movies_genres'
    if (!empty($data['genre_id'])) {
        $sqlGen = "INSERT INTO movies_genres (movie_id, genre_id) VALUES (?, ?)";
        $db->prepare($sqlGen)->execute(array($nuevoId, $data['genre_id']));
    }

    $db->commit();
    echo json_encode(array("status" => "success"));

} catch (Exception $e) {
    if(isset($db)) $db->rollBack();
    // No mandamos 500 para evitar que el navegador oculte el error tras una página HTML
    echo json_encode(array("status" => "error", "message" => $e->getMessage()));
}