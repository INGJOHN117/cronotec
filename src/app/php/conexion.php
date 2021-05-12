<?php

$hostname ="localhost";
$database ="cronotec";
$username ="root";
$password ="";

/*
$hostname = "162.241.61.240";
$database = "cuisoftc_cronotec";
$username = "cuisoftc";
$password = "jE-5TZ19Ae6th(";
*/

$con = mysqli_connect($hostname,$username, $password, $database);
if(!$con){
	echo "error de conexion message by johnny";
	exit();
}else{
	//echo "<p style='color:#3f3'>conectado</p>";
	//echo "<br>";
}

?>
