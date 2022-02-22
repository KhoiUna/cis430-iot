<?php 
header("Access-Control-Allow-Origin: *");

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

$deviceId = $_GET["deviceID"];
if(isset($deviceId)) {
    $sql = "SELECT * FROM Device WHERE DeviceID ='" . $deviceId . "';";
    // echo $sql;

    $result = $conn->query($sql)->fetch_array();    
    echo json_encode(array(
        "error" => false,
        "success" => $result['Name']
    ));
} else {
    echo json_encode(array(
        "error" => "Cannot get device name",
        "success" => false
    ));
}

$conn->close();
?>

