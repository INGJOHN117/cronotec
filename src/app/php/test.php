<?php


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