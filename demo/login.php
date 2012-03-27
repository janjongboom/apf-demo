<?php
$username = isset($_POST["username"]) ? $_POST["username"] : null;
$password = isset($_POST["password"]) ? $_POST["password"] : null;

if ($username && $password) {
    if ($username == "TestUser" && $password == "open") {
        session_start();
        session_register("login");
        
        $_SESSION["login"] = "TestUser";
        
        header("Status: 200", true, 200);
    }
    else {
        header("Status: 401", true, 401);
        echo "Login failed";
    }
}
else {
    header("Status: 401", true, 401);
    echo "Username and password are not correct";
}
?>