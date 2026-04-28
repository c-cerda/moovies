<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
    // Paso 1: Instanciación compatible (evita el T_OBJECT_OPERATOR)
    $conexionClase = new ConexionBD(); 
    $db = $conexionClase->getConexion();

    $sql = "SELECT 
                c.id, 
                u.username, 
                m.title AS movie_title, 
                c.content AS comment, 
                c.rating 
            FROM comments c
            JOIN users u ON c.user_id = u.id
            JOIN movies m ON c.movie_id = m.id
            ORDER BY c.id DESC";

    $stmt = $db->query($sql);
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Paso 2: Envío de JSON
    echo json_encode($resultados);

} catch (Exception $e) {
    // Paso 3: Arreglo compatible (usa array() en lugar de [])
    echo json_encode(array("error" => $e->getMessage()));
}