<?php
$xml = '<?xml version="1.0" encoding="UTF-8" ?><data>';
$name = isset($_GET["name"]) ? $_GET["name"] : "";

if ($name == "Ruben") {
    $xml .= '<lang name="Javascript" icon="medal_silver_1.png"></lang>';
}
else if ($name == "Mike") {
    $xml .= '<lang name="PHP" icon="medal_silver_1.png"></lang>';
}
echo $xml.'</data>';
?>