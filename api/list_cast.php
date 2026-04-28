<?php
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
    $conexionObjeto = new ConexionBD();
    $db = $conexionObjeto->getConexion();

    $sql = "SELECT 
                mc.movie_id,
                mc.person_id,
                mc.role_id, 
                m.title AS movie_title, 
                p.name AS person_name, 
                r.name AS role_name 
            FROM movie_cast mc
            JOIN movies m ON mc.movie_id = m.id
            JOIN people p ON mc.person_id = p.id
            JOIN roles r ON mc.role_id = r.id
            ORDER BY m.title ASC, r.name ASC";

    $stnm = $db->prepare($sql);
    $stnm->execute();
    $elenco = $stnm->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($elenco);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("error" => $e->getMessage()));
}