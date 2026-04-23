<?php
require_once __DIR__ . '/util/conec.php';
header('Content-Type: application/json');

try {
    $conexionObjeto = new ConexionBD();
    $db = $conexionObjeto->getConexion();

    // Seleccionamos los campos principales para la gestión administrativa
    $stnm = $db->prepare("SELECT id, title, description, summary, image, trailer FROM movies");
    $stnm->execute();
    $peliculas = $stnm->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($peliculas);

} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}