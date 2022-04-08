<?php
require_once 'config.php';

// Get query 
$deviceId = $_GET["deviceID"];

$sql = "SELECT `Timestamp`, DeviceTemp FROM Temperature WHERE DeviceID = '" . $deviceId . "'";
$sql = $sql . " ORDER BY `Timestamp` DESC LIMIT 30;";
// echo $sql;

$data = [];
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  $count = 0;
  while ($row = $result->fetch_assoc()) {
    $data[$count] = $row;
    $count += 1;  
  }

  echo json_encode(array(
    "error" => false,
    "success" => json_encode(array_reverse($data))
  ));  
} else {
    echo json_encode(array(
        "error" => "Cannot get temperature over time",
        "success" => false
    ));
}

$conn->close();
?>