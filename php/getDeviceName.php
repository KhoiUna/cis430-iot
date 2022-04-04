<?php 
require_once 'config.php';

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

