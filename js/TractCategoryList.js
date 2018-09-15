/*
	Created by Sujeethan Vigneswaran
	sujeethan.vigneswaran@gmail.com
	2018
*/

//constructor function for tract categories
function init_TractCategories(scope){
	
	//array for holding category groups
	scope.tract_category_groups = [];
	
	//function that takes a category title and sub-categories, adds it to the main holder
	function CatagoryGroup(title,options){
		var object_options = [];
		for(var i=0;i<options.length;i++){
			var option = options[i];
			object_options.push({value:option,label:option});
		}
		scope.tract_category_groups.push({value:object_options,label:title});
	}

	//Construct the Aquisition Type Category
	CatagoryGroup("Acquisition Type",[
		"Fee Simple",
		"Donation",
		"Split Reciept",
		"EcoGift",
		"Easement",
		"American Friends"]);
		
	//Construct the Conservation Agreement Category
	CatagoryGroup("Conservation Agreement",[
		"Yes",
		"No"]);
		
	//Construct the Tax Program Category
	CatagoryGroup("Tax Program",[
		"CLTIP",
		"MFTIP"]);
}