<?php

/* Created by Sujeethan Vigneswaran 2018 */

$returnInfo = array();
$returnInfo["sql"] = "";
$returnInfo["error"] = "none";
$returnInfo["insert_id"] = "-1";
$returnInfo["results"] =  array();
$returnInfo["success"] = false;

$tract_id = $_POST['id'];
$tract_name = $_POST['tract_name'];
$alias = $_POST['alias'];
$nature_reserve = $_POST['nature_reserve'];
$acquisition_date = $_POST['acquisition_date'];
$acquisition_type = $_POST['acquisition_type'];
$tract_size_acres = $_POST['tract_size_acres'];
$tract_size_hectares = $_POST['tract_size_hectares'];
$conservation_agreement = $_POST['conservation_agreement'];
$tax_program = $_POST['tax_program'];
$township = $_POST['township'];
$concession_number = $_POST['concession_lot_number'];
$assessment_number = $_POST['assessment_number'];
$our_lawyer = $_POST['our_lawyer'];
$their_lawyer = $_POST['their_lawyer'];
$previous_owner = $_POST['previous_owner'];
$legal_description = $_POST['legal_description'];


include_once("ConfigKeyCodes.php");
$conn = new mysqli(NR_HOSTNAME, NR_USERNAME, NR_PASSWORD, NR_DATABASE);
// Check connection
if (mysqli_connect_errno()){
  	$returnInfo["error"] = "Failed to connect to MySQL";
	printf(json_encode($returnInfo));
	return;
}


$sql = "INSERT INTO tract_info (tract_name, nature_reserve, acquisition_date, acquisition_type, tract_size_acres, tract_size_hectares, conservation_agreement, tax_program, township, concession_number, assessment_number, our_lawyer, their_lawyer, previous_owner, legal_description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ";

$returnInfo["sql"] =$sql;

$returnInfo["VALUES"] =$tract_name.", ".$nature_reserve.", ".$acquisition_date.", ".$acquisition_type.", ".$tract_size_acres.", ".$tract_size_hectares.", ".$conservation_agreement.", ".$tax_program.", ".$township.", ".$concession_number.", ".$assessment_number.", ".$our_lawyer.", ".$their_lawyer.", ".$previous_owner.", ". $legal_description;

$query = $conn->prepare($sql);
$query->bind_param("sssssssssssssss",$tract_name,$nature_reserve,$acquisition_date,$acquisition_type,$tract_size_acres,$tract_size_hectares,$conservation_agreement,$tax_program,$township,$concession_number,$assessment_number,$our_lawyer,$their_lawyer,$previous_owner,$legal_description);

if($query->execute()){
	$returnInfo["success"] = true;
	$returnInfo["insert_id"] = $conn->insert_id;
	$returnInfo["insert_id2"] = $conn->insert_id;
}else{
	$returnInfo["error"] = $conn->error;
}
	
$conn->close();



print_r(json_encode($returnInfo));


?>

