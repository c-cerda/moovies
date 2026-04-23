<?php
// api/update_cast.php
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(array("status" => "error", "message" => "No hay datos"));
    exit;
}

try {
    $conexionObjeto = new ConexionBD();
    $db = $conexionObjeto->getConexion();

    // REGLA DE ORO: No permitir actualizar al rol de director (ID 2)
    if (isset($data['role_id']) && intval($data['role_id']) === 2) {
        echo json_encode(array("status" => "error", "message" => "No puedes asignar el rol de Director desde esta vista."));
        exit;
    }

    // La tabla movie_cast usa llave compuesta (movie_id + person_id)
    $sql = "UPDATE movie_cast SET role_id = ? WHERE movie_id = ? AND person_id = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        $data['role_id'],
        $data['movie_id'],
        $data['person_id']
    ]);

    echo json_encode(array("status" => "success"));

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("status" => "error", "message" => $e->getMessage()));
}