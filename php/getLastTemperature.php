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
    $sql = "SELECT * FROM Temperature WHERE DeviceID ='" . $deviceId . "' ORDER BY Timestamp DESC LIMIT 1;";
    // echo $sql;

    $result = $conn->query($sql)->fetch_array();

    $deviceTemp = $result['DeviceTemp'];

    echo json_encode(array(
        "error" => false,
        "success" => (float) $deviceTemp
    ));
} else {
    echo json_encode(array(
        "error" => "Cannot get latest temperature",
        "success" => false
    ));
}

$conn->close();
?>

