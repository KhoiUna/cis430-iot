<?php 
require_once 'config.php';

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

