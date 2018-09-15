<?php

/* Created by Sujeethan Vigneswaran 2018 */

$returnInfo = array();
$returnInfo["sql"] = "";
$returnInfo["error"] = "none";
$returnInfo["results"] =  array();

//Post Variables from GeneralInfo.js in the Directive generalInfoTractSearchBar
$nature_reserve = $_POST['nature_reserve'];
$tract_categories = $_POST['tract_categories'];
$alias = $_POST['alias'];

//Configure Connection to the database
include_once("ConfigKeyCodes.php");
$conn = new mysqli(NR_HOSTNAME, NR_USERNAME, NR_PASSWORD, NR_DATABASE);
if (mysqli_connect_errno()){
  	$returnInfo["error"] = "Failed to c-onnect to MySQL";
	printf(json_encode($returnInfo));
	return;
}

/*
Create variable sql to store the query for the phpMyAdmin
Select all information from the tract_info sheet
*/
$sql = "SELECT * FROM `tract_info` WHERE 1 " ;

//if an alias is typed it will search if the alias text is anywhere in the database
if($alias != ""){
	$sql .= " AND `name` LIKE '%".$alias."%'";
}

/*
Function addCatagoryToQuery, pass an array in the variable parameter
adds the sql content to the string for query
*/
function addCatagoryToQuery($tempCategory){
	//check and remove empty space in the categories array
	if (($key = array_search("", $tempCategory)) !== false) {
		unset($tempCategory[$key]);
	}
	//Run to add queries to the search per drop down menu
	if(count($tempCategory) != 0){
		$sql .= " AND (";
		$first = true;
		foreach ($tempCategory as &$tempValue) {
			if(!$first){
				$sql .= " OR";
			}
			$sql .= "  `category` LIKE '%".$tempValue."%'";
			$first = false;
		}
		$sql .= ")";	
	}
}

//Add the catagories to the query
addCatagoryToQuery($nature_reserve);
addCatagoryToQuery($tract_categories);

//return info array for sql given the query
$returnInfo["sql"] = $sql;

//ask the connection the sql query
$result = $conn->query($sql);

//Close connection to database
$conn->close();

/*
Push the results into the array for the return info
*/
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {	
		$databaseObject = array();
		foreach ($row as $name => $value) {
			$databaseObject[$name] =utf8_encode($value);
		}	
		array_push($returnInfo["results"], $databaseObject);
	}
}	

//prints the content of the JSON (java object) of the returned information
print_r(json_encode($returnInfo));

?>