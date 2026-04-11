<?php
require_once "ConexionBD.php";

$db = new ConexionBD();
$conn = $db->getConexion();

if ($conn) {
	echo "Conexion exitosa :)";
} else {
	echo $db->getMensaje();
}
