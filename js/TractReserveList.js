/*
	Created by Sujeethan Vigneswaran
	sujeethan.vigneswaran@gmail.com
	2018
*/

/*
     <option value="Altberg Wetland">Altberg Wetland</option>
     <option value="Altberg Wildlife Sanctuary">Altberg Wildlife Sanctuary</option>
     <option value="Baptist Harbour">Baptist Harbour</option>
     <option value="Bruce Alvar">Bruce Alvar</option>
     <option value="Cawthra Mulock">Cawthra Mulock</option>
     <option value="George G. Newton">George G. Newton</option>
     <option value="H. N. Crossley">H. N. Crossley</option>
     <option value="Harold Mitchell">Harold Mitchell</option>
     <option value="Hay Marsh">Hay Marsh</option>
     <option value="Kinghurst Forest">Kinghurst Forest</option>
     <option value="Lawson">Lawson</option>
     <option value="Lost Bay">Lost Bay</option>
     <option value="Lyal Island">Lyal Island</option>
     <option value="Malcolm Bluff Shores">Malcolm Bluff Shores</option>
     <option value="Malcolm Kirk">Malcolm Kirk</option>
     <option value="Petrel Point">Petrel Point</option>
     <option value="Quarry Bay">Quarry Bay</option>
     <option value="Reilly Bird">Reilly Bird</option>
     <option value="Sauble Dunes">Sauble Dunes</option>
     <option value="Stewartville Swamp">Stewartville Swamp</option>
     <option value="Stone Road Alvar">Stone Road Alvar</option>
     <option value="Sydenham River">Sydenham River</option>
     <option value="Wallwork">Wallwork</option>
     <option value="Wilfrid G. Crozier">Wilfrid G. Crozier</option>
     "Willoughby"
	 */

//constructor function for tract categories
/*
var tractArray = ["Lawson","Test","Blah","Blah"];
*/

function init_TractReserves(scope){
	
	//array for holding category groups
	scope.tract_reserve_groups = [];
	
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
	CatagoryGroup("Reserve List",[
		"Lawson",
		"Etc",
		"Blah",
		"Blahhh"]);
}