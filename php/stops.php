<?php
    $host = "127.0.0.1";
    $dbusername = "root";
    $dbpassword = "1234";
    $dbname = "sptrans";
    
    //teste de conexao
    //$conn1 = new mysqli($host, $dbusername, $dbpassword, $dbname);
    $conn1 = mysql_connect($host, $dbusername, $dbpassword);

    
    if (mysqli_connect_error()){
        echo "no connection";
        die();
    }else{
        $fp = fopen("../sptrans_api/stops.txt","r");
        while($rows = fgetcsv($fp)){
            $sql =  "INSERT INTO `stops` (`stop_id`, `stop_name`, `stop_desc`, `stop_lat`, `stop_lon`) VALUES (".$rows[0].",'".mysql_real_escape_string($rows[1], $conn1)."','".mysql_real_escape_string($rows[2], $conn1)."',".$rows[3].",".$rows[4].")";
            if(mysql_db_query($dbname, $sql, $conn1)){
                echo ".";
            }else{
                echo "error:". $sql ."<br>". $conn1->error;
            }
        }
        fclose($fp);
    }
    mysql_close();
?>