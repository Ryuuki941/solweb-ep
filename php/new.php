<?php
    $host = "127.0.0.1";
    $dbusername = "root";
    $dbpassword = "1234";
    $dbname = "sptrans";
    
    //teste de conexao
    $conn1 = new mysqli($host, $dbusername, $dbpassword, $dbname);
    
    if (mysqli_connect_error()){
        echo "no connection";
        die();
    }else{
            $sql = "INSERT INTO `paradas` (`id_parada`, `nome`, `destino`, `lat`, `lon`) VALUES (null, 'ÇÕáá´éà', 'Õáá´éà', '-46.655728', '-46.655728')";
            if($conn1->query($sql)){
                echo "new record is inserted sucessfully";
            }else{
                echo "error:". $sql ."<br>". $conn1->error;
            }
    }
    echo"okay";
    $conn1->close();
?>