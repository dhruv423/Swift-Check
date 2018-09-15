<?php

/* Created by Sujeethan Vigneswaran 2018 */

$returnInfo = array();
$returnInfo["sql"] = "";
$returnInfo["error"] = "none";
$returnInfo["results"] =  array();

//Post Variables from Tract.js in the directive
$tax_program = $_POST['tax_programs'];
$conservation_agreement = $_POST['conservation_agreements'];
$acquisition_type = $_POST['acquisition_types'];
$reserve_name = $_POST['nature_reserves'];
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
	$sql .= " AND `alias` LIKE '%".$alias."%'";
}

/*
TEMPLATE, must copy and paste code to use for some weird reason?
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
		foreach ($tempCategory as &$value) {
			if(!$first){
				$sql .= " OR";
			}
			$sql .= "  `COLUMN TITLE` LIKE '%".$value."%'";
			$first = false;
		}
		$sql .= ")";	
	}
}

//Add the catagories to the query

/*RESERVE NAME*/
//check and remove empty space in the categories array
	if (($key = array_search("", $reserve_name)) !== false) {
		unset($reserve_name[$key]);
	}
	//Run to add queries to the search per drop down menu
	if(count($reserve_name) != 0){
		$sql .= " AND (";
		$first = true;
		foreach ($reserve_name as &$value) {
			if(!$first){
				$sql .= " OR";
			}
			$sql .= "  `nature_reserve` LIKE '%".$value."%'";
			$first = false;
		}
		$sql .= ")";	
	}

/*ACQUISITION TYPE*/
//check and remove empty space in the categories array
	if (($key = array_search("", $acquisition_type)) !== false) {
		unset($acquisition_type[$key]);
	}
	//Run to add queries to the search per drop down menu
	if(count($acquisition_type) != 0){
		$sql .= " AND (";
		$first = true;
		foreach ($acquisition_type as &$value) {
			if(!$first){
				$sql .= " OR";
			}
			$sql .= "  `acquisition_type` LIKE '%".$value."%'";
			$first = false;
		}
		$sql .= ")";	
	}

/*CONSERVATION AGREEMENT*/
//check and remove empty space in the categories array
	if (($key = array_search("", $conservation_agreement)) !== false) {
		unset($conservation_agreement[$key]);
	}
	//Run to add queries to the search per drop down menu
	if(count($conservation_agreement) != 0){
		$sql .= " AND (";
		$first = true;
		foreach ($conservation_agreement as &$value) {
			if(!$first){
				$sql .= " OR";
			}
			$sql .= "  `conservation_agreement` LIKE '%".$value."%'";
			$first = false;
		}
		$sql .= ")";	
	}

/*TAX PROGRAM*/
//check and remove empty space in the categories array
	if (($key = array_search("", $tax_program)) !== false) {
		unset($tax_program[$key]);
	}
	//Run to add queries to the search per drop down menu
	if(count($tax_program) != 0){
		$sql .= " AND (";
		$first = true;
		foreach ($tax_program as &$value) {
			if(!$first){
				$sql .= " OR";
			}
			$sql .= "  `tax_program` LIKE '%".$value."%'";
			$first = false;
		}
		$sql .= ")";	
	}


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