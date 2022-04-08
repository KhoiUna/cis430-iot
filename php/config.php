<?php
$development = getenv('DEVELOPMENT');
if($development == "true") {
    header("Access-Control-Allow-Origin: *");
}

$servername = getenv('SERVERNAME');
$username = getenv('USERNAME');
$password = getenv('PASSWORD');
$dbname = getenv('DBNAME');

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    echo json_encode(array(
        "error" => "Connection failed",
        "success" => false
    ));
}
?>