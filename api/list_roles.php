<?php
// api/list_roles.php
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
    $conexionObjeto = new ConexionBD();
    $db = $conexionObjeto->getConexion();

    // Seleccionamos id y name tal como se ve en tu tabla de roles
    $sql = "SELECT id, name FROM roles ORDER BY name ASC";

    $stnm = $db->prepare($sql);
    $stnm->execute();
    $roles = $stnm->fetchAll(PDO::FETCH_ASSOC);

    // Retornamos el JSON para que el JS lo procese
    echo json_encode($roles);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("error" => $e->getMessage()));
}