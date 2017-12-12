<?php
class point{
    public $stop_id;
    public $stop_lat;
    public $stop_lon;
}

$data = json_decode(file_get_contents('php://input'), true);
$received = json_decode($data);



$host = "127.0.0.1";
$dbusername = "root";
$dbpassword = "1234";
$dbname = "sptrans";

$lon_min = file_get_contents['lon_min'];
$lon_max = $_GET['lon_max'];
$lat_min = $_GET['lat_min'];
$lat_max = $_GET['lat_max'];

//open connection
$conn1 = mysql_connect($host, $dbusername, $dbpassword);

//write query to get from DB the info FROM lat_min, lat_max, lon_min and lon_max
$sql = "SELECT `stop_id`, `stop_lat`, `stop_lon` FROM `stops` WHERE (`stop_lat` BETWEEN '$lat_max' AND '$lat_min') AND (`stop_lon` BETWEEN '$lon_max' AND '$lon_min' GROUP BY `stop_id`";


$result = mysql_query($sql);
if(!$result){
    echo "error:". $sql ."<br>". $conn1->error;
}else{
    echo "ok";
}
//transform the resource type variable into a array (stop_id, stop_lat, stop_lon, stop_id, stop_lat, stop_lon...)
$row = mysql_fetch_row($result);
$obj = mysql_fetch_object($row,'point');

$myJSON = json_encode($myArr);

//close connection
mysql_close();

echo $myJSON;

?>
