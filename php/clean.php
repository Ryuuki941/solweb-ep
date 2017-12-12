<?php

$fp = fopen("/Library/WebServer/documents/maps/sptrans_api/stopsTest.txt","rw");

$re = '/(?:^|,)(?=[^"]|(")?)"?((?(1)[^"]*|[^,"]*))"?(?=,|$)/';


var_dump($matches);
function clean($fp) {
   while( $line = fgets($fp)){
    preg_match_all($re, $line, $matches, PREG_SET_ORDER, 0);
    var_dump($matches);
   }
   fclose($fp);
}
?>