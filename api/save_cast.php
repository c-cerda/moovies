<?php
header('Content-Type: application/json');
require_once __DIR__ . '/util/conec.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(array("status" => "error", "message" => "No se recibieron datos"));
    exit;
}

try {
    $conexionObjeto = new ConexionBD();
    $db = $conexionObjeto->getConexion();

    // SEGURIDAD: No permitir roles de director (ID 2) desde esta vista
    if (intval($data['role_id']) === 2) {
        echo json_encode(array("status" => "error", "message" => "El director debe asignarse desde la gestión de Películas."));
        exit;
    }

    // Insertar en la tabla relacional
    $sql = "INSERT INTO movie_cast (movie_id, person_id, role_id) VALUES (?, ?, ?)";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(
        $data['movie_id'],
        $data['person_id'],
        $data['role_id']
    ));

    echo json_encode(array("status" => "success"));

} catch (Exception $e) {
    http_response_code(500);
    // Si el error es por duplicado (misma persona, misma peli, mismo rol)
    if ($e->getCode() == 23000) {
        echo json_encode(array("status" => "error", "message" => "Esta persona ya tiene asignado ese rol en esta película."));
    } else {
        echo json_encode(array("status" => "error", "message" => $e->getMessage()));
    }
}