<?php
header('Content-Type: application/json');
require_once __DIR__ . '/util/conec.php'; 

try {
    $conexionObj = new ConexionBD();
    $db = $conexionObj->getConexion();
    
    // Usamos DISTINCT para evitar nombres duplicados si alguien dirigió varias películas
    $sql = "SELECT DISTINCT p.id, p.name 
            FROM people p
            INNER JOIN movie_cast mc ON p.id = mc.person_id
            WHERE mc.role_id = 2 
            ORDER BY p.name ASC";
            
    $stmt = $db->query($sql);
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($resultados);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("error" => $e->getMessage()));
}