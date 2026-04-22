<?php
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    if (!$id) throw new Exception("ID no proporcionado");

    $conexionClase = new ConexionBD();
    $db = $conexionClase->getConexion();

    // Nota: Si hay comentarios del usuario, podrías necesitar borrarlos primero
    // o tener la relación en la DB como ON DELETE CASCADE.
    $stmt = $db->prepare("DELETE FROM users WHERE id = ?");
    $res = $stmt->execute(array($id));

    echo json_encode(array("success" => $res));
} catch (Exception $e) {
    echo json_encode(array("success" => false, "error" => $e->getMessage()));
}