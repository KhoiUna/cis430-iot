<?php 
$servername = getenv('SERVERNAME');
$username = getenv('USERNAME');
$password = getenv('PASSWORD');
$dbname = getenv('DBNAME');

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$deviceId = $_GET["deviceId"];


$sql = "SELECT * FROM Temperature WHERE DeviceID ='" . $deviceId . "' ORDER BY Timestamp DESC LIMIT 1;";
// echo $sql;

$result = $conn->query($sql)->fetch_array();
$deviceTemp = $result['DeviceTemp'];

$conn->close();
?>

