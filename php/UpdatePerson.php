<?php

/* Created by Bradley McGinn 2016-2017 */





$returnInfo = array();
$returnInfo["sql"] = "";
$returnInfo["error"] = "none";
$returnInfo["insert_id"] = "-1";
$returnInfo["results"] =  array();

$id = $_POST['id'];
$name = $_POST['name'];
$nature_reserve = $_POST['nature_reserve'];
$category = $_POST['category'];
$email = $_POST['email'];
$phone_number = $_POST['phone_number'];
$notes = $_POST['notes'];



include_once("ConfigKeyCodes.php");
$conn = new mysqli(NR_HOSTNAME, NR_USERNAME, NR_PASSWORD, NR_DATABASE);
// Check connection
if (mysqli_connect_errno()){
  	$returnInfo["error"] = "Failed to connect to MySQL";
	printf(json_encode($returnInfo));
	return;
}


$sql = "UPDATE people SET name = ?, nature_reserve = ?, category = ?, email = ?, phone_number = ?, notes = ? WHERE id = ?";
$returnInfo["sql"] =$sql;
$query = $conn->prepare($sql);
$query->bind_param("ssssssi",$name,$nature_reserve,$category,$email,$phone_number, $notes, $id);

if($query->execute()){
	$returnInfo["success"] = true;
}
$conn->close();



print_r(json_encode($returnInfo));


?>

