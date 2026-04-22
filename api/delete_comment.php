<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
    // Verificar que el ID existe en la URL
    $id = isset($_GET['id']) ? $_GET['id'] : null;

    if (!$id) {
        throw new Exception("ID de comentario no proporcionado.");
    }

    // Instanciación compatible con versiones antiguas de PHP
    $conexionClase = new ConexionBD();
    $db = $conexionClase->getConexion();

    // Preparar la sentencia para evitar inyecciones SQL
    $stmt = $db->prepare("DELETE FROM comments WHERE id = ?");
    $res = $stmt->execute(array($id));

    if ($res) {
        echo json_encode(array("success" => true));
    } else {
        throw new Exception("No se pudo eliminar el registro.");
    }

} catch (Exception $e) {
    echo json_encode(array(
        "success" => false, 
        "error" => $e->getMessage()
    ));
}