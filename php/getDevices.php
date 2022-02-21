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
        "error" => true,
        "success" => false
    ));
}

$sql = "SELECT DeviceID, `Name` FROM Device;";
// echo $sql;

$result = $conn->query($sql);
$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
       array_push($data, $row);   
    }
    echo json_encode(array(
        "error" => false,
        "success" => $data
    ));
} else {
    echo json_encode(array(
        "error" => false,
        "success" => $data
    ));
}

$conn->close();
?>

