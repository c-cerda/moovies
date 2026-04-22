<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
    $conexionClase = new ConexionBD();
    $db = $conexionClase->getConexion();

    $id       = $_POST['id'];
    $username = $_POST['username'];
    $name     = $_POST['name'];
    $email    = $_POST['email'];
    $password = $_POST['password'];
    $milk     = $_POST['milk_type'];

    // 1. Actualizar datos básicos del usuario
    if (!empty($password)) {
        // Si el usuario escribió algo en el campo de contraseña, la actualizamos
        $sql = "UPDATE users SET username = ?, name = ?, email = ?, password = ? WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute(array($username, $name, $email, $password, $id));
    } else {
        // Si dejó la contraseña vacía, solo actualizamos el resto
        $sql = "UPDATE users SET username = ?, name = ?, email = ? WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute(array($username, $name, $email, $id));
    }

    // 2. Actualizar la relación con la leche
    // Buscamos el ID de la leche elegida
    $sqlMilk = "SELECT id FROM milks WHERE type = ?";
    $stmtM = $db->prepare($sqlMilk);
    $stmtM->execute(array($milk));
    $milkId = $stmtM->fetchColumn();

    if ($milkId) {
        // Intentamos actualizar; si no existe la relación, la creamos
        $sqlCheck = "SELECT COUNT(*) FROM users_milks WHERE user_id = ?";
        $stmtCheck = $db->prepare($sqlCheck);
        $stmtCheck->execute(array($id));
        
        if ($stmtCheck->fetchColumn() > 0) {
            $sqlUpdMilk = "UPDATE users_milks SET milk_id = ? WHERE user_id = ?";
            $stmtUM = $db->prepare($sqlUpdMilk);
            $stmtUM->execute(array($milkId, $id));
        } else {
            $sqlInsMilk = "INSERT INTO users_milks (user_id, milk_id) VALUES (?, ?)";
            $stmtUM = $db->prepare($sqlInsMilk);
            $stmtUM->execute(array($id, $milkId));
        }
    }

 echo json_encode(array("success" => true));

} catch (PDOException $e) {
    $msg = ($e->getCode() == 23000) ? "El nombre de usuario o email ya están en uso por otro perfil." : $e->getMessage();
    echo json_encode(array("success" => false, "error" => "Error DB: " . $msg));
} catch (Exception $e) {
    echo json_encode(array("success" => false, "error" => $e->getMessage()));
}