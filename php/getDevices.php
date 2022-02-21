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
}

$sql = "SELECT DeviceID, `Name` FROM Device;";
// echo $sql;

$result = $conn->query($sql);
$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
       array_push($data, $row);
    }
} else {
    $data = [];
}

echo json_encode($data);
$conn->close();
?>

