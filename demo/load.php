<?php
$name = isset($_GET["name"]) ? $_GET["name"] : null;
$result = "";

if ($name) {
    switch($name) {
        case "Arnold":
        case "Ruben":
            $result .= "Daniels";
            break;
        case "Mike":
            $result .= "de Boer";
            break;
        case "Rik":
            $result .= "Arends";
            break;
        case "Giannis":
            $result .= "Panagiotou";
            break;
        case "Carmen":
            $result .= "Popescu";
            break;
        default:
            $result .= "Unknown";
    }
}
else {
    $result .= "No results";
}

echo '<data>
        <surname surname="'.$result.'"></surname>
    </data>';
?>