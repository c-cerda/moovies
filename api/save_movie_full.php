<?php
header('Content-Type: application/json');
require_once __DIR__ . '/util/conec.php';

// Importante: No usamos json_decode porque el Admin envía FormData
try {
    $conexionObjeto = new ConexionBD();
    $db = $conexionObjeto->getConexion();
    $db->beginTransaction();

    // Recogemos los datos desde $_POST (lo que manda el Admin)
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $name     = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email    = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $milk     = isset($_POST['milk_type']) ? trim($_POST['milk_type']) : '';

    if (empty($username) || empty($email) || empty($password)) {
        throw new Exception("Faltan datos obligatorios.");
    }

    // Hash de la contraseña (estándar de seguridad)
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // 1. Insertar Usuario
    $sql = "INSERT INTO users (username, name, email, password) VALUES (?, ?, ?, ?)";
    $stmt = $db->prepare($sql);
    $stmt->execute(array($username, $name, $email, $hashedPassword));
    
    $user_id = $db->lastInsertId();

    // 2. Buscar ID de la leche (Igual que el flujo de personas/géneros en movies)
    $sqlMilk = "SELECT id FROM milks WHERE type = ?";
    $stmtM = $db->prepare($sqlMilk);
    $stmtM->execute(array($milk));
    $milkId = $stmtM->fetchColumn();

    // 3. Insertar Relación
    if ($milkId) {
        $sqlRel = "INSERT INTO users_milks (user_id, milk_id) VALUES (?, ?)";
        $stmtR = $db->prepare($sqlRel);
        $stmtR->execute(array($user_id, $milkId));
    }

    $db->commit();
    echo json_encode(array("success" => true));

} catch (Exception $e) {
    if(isset($db)) $db->rollBack();
    // No enviamos código 500 para que el JS pueda leer el mensaje de error en el alert
    echo json_encode(array(
        "success" => false, 
        "error" => $e->getMessage()
    ));
}