<?php 
require_once 'config.php';

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

