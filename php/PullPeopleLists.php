<?php

/* Created by Bradley McGinn 2016-2017 */



$returnInfo = array();
$returnInfo["sql"] = "";
$returnInfo["error"] = "none";
$returnInfo["categories"] =  array();
$returnInfo["property_name"] =  array();


include_once("ConfigKeyCodes.php");
$conn = new mysqli(NR_HOSTNAME, NR_USERNAME, NR_PASSWORD, NR_DATABASE);
// Check connection
if (mysqli_connect_errno()){
  	$returnInfo["error"] = "Failed to connect to MySQL";
	printf(json_encode($returnInfo));
	return;
}



$sql = "SELECT DISTINCT(`category`) FROM `people` WHERE 1 " ;
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {	
		$databaseObject = array();
		foreach ($row as $name => $value) {
			$databaseObject[$name] =utf8_encode($value); //	
		}
		array_push($returnInfo["categories"], $databaseObject);
	}
}

$sql = "SELECT DISTINCT(`nature_reserve`) FROM `people` WHERE 1 " ;
$result = $conn->query($sql);
$conn->close();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {	
		$databaseObject = array();
		foreach ($row as $name => $value) {
			$databaseObject["property_name"] =utf8_encode($value); //	
		}
		array_push($returnInfo["property_name"], $databaseObject);
	}
}	

print_r(json_encode($returnInfo));


?>

