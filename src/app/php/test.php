<?php
newSession("1","345");
echo "<br><br>";
searchSession("Mantenimiento Externo","1");


echo "<h3> PHP List All Session Variables</h3>";
echo $_SESSION['sessions']['1'];



function searchSession($user, $cedula){
    runSession();
    if($_SESSION['sessions'][$cedula] == $user){
        $data = array('estado'=>true);
        $data = array($data);
        echo json_encode($data);
    }else{
        $data = array('estado'=>false);
        $data = array($data);
        echo json_encode($data);
    }
}

function runSession(){
    if(!isset($_SESSION)){
        session_start();
    }
}

function newSession($user, $pwd){
    include 'conexion.php';
    $sql = "SELECT * FROM  sistemas WHERE cedula = '$user' and password = '$pwd'";
    $response = mysqli_query($con,$sql);
    $data = mysqli_fetch_assoc($response);
    if($data['cedula'] == $user and $data['password'] == $pwd){
        runSession();
        if(isset($_SESSION['sessions'])){
            /**agrega sessiones */
            $_SESSION['sessions'][$data['cedula']] = $data['nombre'];
            $data['estado'] = true;
            $data = array($data);
            echo json_encode($data);
        }else{
            $_SESSION['sessions'] = array();
            $_SESSION['sessions'][$data['cedula']] = $data['nombre'];
            $data['estado'] = true;
            $data = array($data);
            echo json_encode($data);
            /*crea la primera session sesion y la agrega una nueva*/
        }
    }else{
        /*los datos de la session solicitada no  se encuenta en la base de datos*/
        $error = array('error'=>'Error usuario no valido','estado'=>false);
        $error = array($error);
        echo json_encode($error);
    }
}

?>

