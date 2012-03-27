<?php
if (file_exists('phpxmlconverter.class.php')) {
    require_once('phpxmlconverter.class.php');
}
else {
    echo "phpxmlconverter.class.php doesn't exist.";
}

$conv = new phpxmlconverter();
$conv->setPath('skins');
$conv->setProhibitedDir('.svn');
$conv->run();


?>