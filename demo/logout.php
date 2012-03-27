<?php
session_start();
unset($_SESSION["login"]);
header("Status: 200", true, 200);
?>