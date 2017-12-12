<?php
    $host = "127.0.0.1";
    $dbusername = "root";
    $dbpassword = "1234";
    $dbname = "sptrans";
    
    //teste de conexao
    $conn1 = new mysqli($host, $dbusername, $dbpassword, $dbname);

    $sql =  "DELETE FROM `stops`";
    if($conn1->query($sql)){
        echo "new record is inserted sucessfully";
    }else{
        echo "error:". $sql ."<br>". $conn1->error;
    }