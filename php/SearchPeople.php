<?php

/* Created by Bradley McGinn 2016-2017 */



$returnInfo = array();
$returnInfo["sql"] = "";
$returnInfo["error"] = "none";
$returnInfo["results"] =  array();


	

$nature_reserves = $_POST['nature_reserves'];
$categories = $_POST['categories'];
$name = $_POST['name'];




include_once("ConfigKeyCodes.php");
$conn = new mysqli(NR_HOSTNAME, NR_USERNAME, NR_PASSWORD, NR_DATABASE);
// Check connection
if (mysqli_connect_errno()){
  	$returnInfo["error"] = "Failed to c-onnect to MySQL";
	printf(json_encode($returnInfo));
	return;
}



$sql = "SELECT * FROM `people` WHERE 1 " ;

if($name != ""){
	$sql .= " AND `name` LIKE '%".$name."%'";
}

if (($key = array_search("", $categories)) !== false) {
    unset($categories[$key]);
}

if(count($categories) != 0){
	$sql .= " AND (";
	$first = true;
	
	
	foreach ($categories as &$value) {
		if(!$first){
			$sql .= " OR";
		}
		$sql .= "  `category` LIKE '%".$value."%'";
		$first = false;
	}
	$sql .= ")";
	
}

if (($key = array_search("", $nature_reserves)) !== false) {
    unset($nature_reserves[$key]);
}
if(count($nature_reserves) != 0){
//	$sql .= " AND `nature_reserve` = '".$nature_reserve."'";
	$sql .= " AND (";
	$first = true;
	foreach ($nature_reserves as &$value) {
		if(!$first){
			$sql .= " OR";
		}
		$sql .= "  `nature_reserve` LIKE '%".$value."%'";
		$first = false;
	}
	$sql .= ")";
	
}
$returnInfo["sql"] = $sql;

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

