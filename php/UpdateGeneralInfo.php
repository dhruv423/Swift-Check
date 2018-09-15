<?php

/* Created by Bradley McGinn 2016-2017 */





$returnInfo = array();
$returnInfo["sql"] = "";
$returnInfo["error"] = "none";
$returnInfo["results"] =  array();


$property_id = $_POST['property_id'];
$property_name = $_POST['property_name'];
$acronym = $_POST['acronym'];
$property_owner = $_POST['property_owner'];
$land_tenure = $_POST['land_tenure'];
$acquisition_date = $_POST['acquisition_date'];
$property_size_hectares = $_POST['property_size_hectares'];
$property_size_acres = $_POST['property_size_acres'];
$legal_description = $_POST['legal_description'];
$atlas_square = $_POST['atlas_square'];
$nhic_id_number = $_POST['nhic_id_number'];
$county = $_POST['county'];
$municipality = $_POST['municipality'];
$township = $_POST['township'];
$ecoregion = $_POST['ecoregion'];
$ecodistrict = $_POST['ecodistrict'];
$mnrf_region = $_POST['mnrf_region'];
$mnrf_district = $_POST['mnrf_district'];
$tertiary_watershed = $_POST['tertiary_watershed'];
$environmental_designations = $_POST['environmental_designations'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$directions = $_POST['directions'];
$feature_image = $_POST['feature_image'];



include_once("ConfigKeyCodes.php");
$conn = new mysqli(NR_HOSTNAME, NR_USERNAME, NR_PASSWORD, NR_DATABASE);
// Check connection
if (mysqli_connect_errno()){
  	$returnInfo["error"] = "Failed to connect to MySQL";
	printf(json_encode($returnInfo));
	return;
}



$sql = "UPDATE general_info SET property_name = ?, acronym = ?, property_owner = ?, land_tenure = ?, acquisition_date = ?, property_size_hectares = ?, property_size_acres = ?, legal_description = ?, atlas_square = ?, nhic_id_number = ?, county = ?, municipality = ?, township = ?, ecoregion = ?, ecodistrict = ?, mnrf_region = ?, mnrf_district = ?, tertiary_watershed = ?, environmental_designations = ?, latitude = ?, longitude = ?, directions = ?, feature_image = ? WHERE property_id = ?";
$returnInfo["sql"] =$sql;



$query = $conn->prepare($sql);
$query->bind_param("sssssssssssssssssssssssi",$property_name, $acronym,$property_owner, $land_tenure, $acquisition_date, $property_size_hectares, $property_size_acres, $legal_description, $atlas_square, $nhic_id_number, $county, $municipality, $township, $ecoregion, $ecodistrict, $mnrf_region, $mnrf_district, $tertiary_watershed, $environmental_designations, $latitude, $longitude, $directions, $feature_image, $property_id);

if($query->execute()){
	$returnInfo["success"] = true;
}
$conn->close();



print_r(json_encode($returnInfo));


?>

