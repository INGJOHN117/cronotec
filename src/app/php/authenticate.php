<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
searchSession("Mantenimiento Externo","1");


if(isset($_POST['user']) and isset($_POST['password'])){
    newSession($_POST['user'], $_POST['password']);
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


if(isset($_POST['user']) and isset($_POST['cedula'])){
    searchSession( $_POST['user'], $_POST['cedula']);
}

function searchSession( $user, $cedula){
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

function searchSessionServer( $user, $cedula){
    runSession();
    if($_SESSION['sessions'][$cedula] == $user){
        return true;
    }else{
        return false;
    }
}

function runSession(){
    if(!isset($_SESSION)){
        session_start();
    }
}

?>
