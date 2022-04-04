<?php
require_once "config.php";

$deviceId = $_POST["deviceID"];
$deviceTemp = $_POST["deviceTemp"];
$apiKey = $_POST["apiKey"];
if(isset($deviceId) && isset($deviceTemp)) {
    $apiKeyValue = "tPmAT5Ab3j7F9";

    if($apiKey == $apiKeyValue) {    
        //TODO get Timestamp
        $timestamp = (new DateTime())->format('Y-m-d H:i:s');
        $sql = "INSERT INTO Temperature (`Timestamp`, DeviceTemp, DeviceID) VALUES ('".$timestamp."', ".$deviceTemp.", ".$deviceId.")";
        // echo $sql;

        $result = $conn->query($sql);

        echo json_encode(array(
            "error" => false,
            "success" => "Post temperature successfully"
        ));
    }
} else {
    echo json_encode(array(
        "error" => "Cannot post temperature",
        "success" => false
    ));
}

$conn->close();
?>
