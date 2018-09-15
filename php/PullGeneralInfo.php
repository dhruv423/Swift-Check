<?php

/* Created by Bradley McGinn 2016-2017 */



$returnInfo = array();
$returnInfo["sql"] = "";
$returnInfo["error"] = "none";
$returnInfo["results"] =  array();



include_once("ConfigKeyCodes.php");
$conn = new mysqli(NR_HOSTNAME, NR_USERNAME, NR_PASSWORD, NR_DATABASE);
// Check connection
if (mysqli_connect_errno()){
  	$returnInfo["error"] = "Failed to connect to MySQL";
	printf(json_encode($returnInfo));
	return;
}



$sql = "SELECT * FROM  `general_info` " ;

$result = $conn->query($sql);
	/*i - integer
d - double
s - string
b - BLOB*/
	/*$sql->bind_param('siiiiissssiddddisssssssssssssssssissssssssssi',
$observation_common_name, .... */
//$query = $conn -> prepare($sql);
//$query->bind_param("");
//$result = $query->execute();


$conn->close();



//if($result){echo "Success";}
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {	
		$databaseObject = array();
		foreach ($row as $name => $value) {
			$databaseObject[$name] =utf8_encode($value); //
			
		}
	
		array_push($returnInfo["results"], $databaseObject);
	}
}	

print_r(json_encode($returnInfo));


?>

