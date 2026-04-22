<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
    $conexionClase = new ConexionBD();
    $db = $conexionClase->getConexion();

    $sql = "SELECT u.id, u.username, u.name, u.email, m.type as milk_type 
            FROM users u
            LEFT JOIN users_milks um ON u.id = um.user_id
            LEFT JOIN milks m ON um.milk_id = m.id";

    $stmt = $db->query($sql);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}