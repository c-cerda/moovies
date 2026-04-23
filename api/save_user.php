<?php
// Reportar errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
    $conexionClase = new ConexionBD();
    $db = $conexionClase->getConexion();

    // Recibir datos del FormData del HTML
    $username = $_POST['username'];
    $name     = $_POST['name'];
    $email    = $_POST['email'];
    $password = $_POST['password']; // En un sistema real usa password_hash
    $milk     = $_POST['milk_type'];

    // 1. Insertar el usuario
    $sql = "INSERT INTO users (username, name, email, password) VALUES (?, ?, ?, ?)";
    $stmt = $db->prepare($sql);
    $stmt->execute(array($username, $name, $email, $password));
    
    // Obtener el ID del usuario recién creado
    $userId = $db->lastInsertId();

    // 2. Relacionar con la leche favorita
    // Primero buscamos el ID de la leche por su nombre
    $sqlMilk = "SELECT id FROM milks WHERE type = ?";
    $stmtM = $db->prepare($sqlMilk);
    $stmtM->execute(array($milk));
    $milkId = $stmtM->fetchColumn();

    if($milkId) {
        $sqlRel = "INSERT INTO users_milks (user_id, milk_id) VALUES (?, ?)";
        $stmtR = $db->prepare($sqlRel);
        $stmtR->execute(array($userId, $milkId));
    }

echo json_encode(array("success" => true));

} catch (PDOException $e) {
    // Capturamos errores de base de datos (como el usuario duplicado)
    $msg = ($e->getCode() == 23000) ? "El usuario o email ya existen." : $e->getMessage();
    echo json_encode(array("success" => false, "error" => "Error DB: " . $msg));
} catch (Exception $e) {
    // Capturamos cualquier otro error
    echo json_encode(array("success" => false, "error" => $e->getMessage()));
}