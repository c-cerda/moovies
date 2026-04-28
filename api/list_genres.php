<?php
header('Content-Type: application/json');
require_once __DIR__ . '/util/conec.php';

try {
    // 1. Instancia por separado para evitar el error 'unexpected T_OBJECT_OPERATOR'
    $conexionObj = new ConexionBD();
    $db = $conexionObj->getConexion();
    
    // 2. Consulta a la tabla 'genres' usando la columna 'type'
    // Tal como vimos en tu base de datos, la columna de texto es 'type'
    $stmt = $db->query("SELECT id, type FROM genres ORDER BY type ASC");
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // 3. Enviamos el JSON
    echo json_encode($resultados);

} catch (Exception $e) {
    // 4. Usamos array() en lugar de [] para evitar el error 'unexpected ['
    http_response_code(500);
    echo json_encode(array(
        "error" => $e->getMessage()
    ));
}