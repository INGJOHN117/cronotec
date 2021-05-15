<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
$myarray = array("nombre"=>"johnny", "apellido"=>"acosta");
$aarray[] = $myarray;
$myarray['nombre'] = "MARTIN";
$aarray[] = $myarray;
$myarray['nombre'] = "SARA";
$aarray[] = $myarray;
echo json_encode($aarray); 

?>