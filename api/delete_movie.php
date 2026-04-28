<?php
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
    $conexionObjeto = new ConexionBD();
    $db = $conexionObjeto->getConexion();

    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        
        // Iniciamos transacción para borrar en las 3 tablas
        $db->beginTransaction();

        // 1. Borrar de movies_genres
        $st1 = $db->prepare("DELETE FROM movies_genres WHERE movie_id = ?");
        $st1->execute(array($id));

        // 2. Borrar de movie_cast
        $st2 = $db->prepare("DELETE FROM movie_cast WHERE movie_id = ?");
        $st2->execute(array($id));

        // 3. Borrar de la tabla principal movies
        $st3 = $db->prepare("DELETE FROM movies WHERE id = ?");
        $st3->execute(array($id));

        $db->commit();

        echo json_encode(array("success" => true, "message" => "Película y relaciones eliminadas"));
    } else {
        echo json_encode(array("success" => false, "message" => "Falta el ID"));
    }

} catch (Exception $e) {
    if(isset($db)) $db->rollBack();
    http_response_code(500);
    echo json_encode(array("success" => false, "error" => $e->getMessage()));
}