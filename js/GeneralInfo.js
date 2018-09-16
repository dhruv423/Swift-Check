/*
	Maintained by Sujeethan Vigneswaran
	sujeethan.vigneswaran@gmail.com
	2018

*/


function init_GeneralInfo(){
	
	$.ajax({
		url: 'php/PullGeneralInfo.php',
		method: 'POST',
		dataType: 'json',
		data:{},
		success: gotGeneralInfo,
		error:function (){
			//var result = confirm("Database Connect Error!\nTry again?");
			if(result){
				lookup_NatureReserves();
			}
		}
	});
	
	
	_app.selected_NR = function(){
		if(_app.selected_nature_reserve.welcome_screen == 'true'){
			return;
		}
		_app.selected_nature_reserve.editing = false;
		_app.selected_nature_reserve.saving = false;
		$('.navbar-collapse').collapse('hide'); 
		setTimeout(center_map,10);
		if(map){
			map.panTo({
				  lat: Number(_app.selected_nature_reserve.latitude)
				, lng: Number(_app.selected_nature_reserve.longitude)
			})
			map.setZoom(13)
		}
	}
	
	_app.edit_genral_info = function(nature_reserve){
		nature_reserve.editing = true;
		
		_app.selected_nature_reserve.property_name_edit = _app.selected_nature_reserve.property_name;
		_app.selected_nature_reserve.acronym_edit = _app.selected_nature_reserve.acronym;
		_app.selected_nature_reserve.property_owner_edit = _app.selected_nature_reserve.property_owner;
		_app.selected_nature_reserve.land_tenure_edit = _app.selected_nature_reserve.land_tenure;
		_app.selected_nature_reserve.acquisition_date_edit = _app.selected_nature_reserve.acquisition_date;
		_app.selected_nature_reserve.property_size_hectares_edit = _app.selected_nature_reserve.property_size_hectares;
		_app.selected_nature_reserve.property_size_acres_edit = _app.selected_nature_reserve.property_size_acres;
		_app.selected_nature_reserve.legal_description_edit = _app.selected_nature_reserve.legal_description;
		_app.selected_nature_reserve.atlas_square_edit = _app.selected_nature_reserve.atlas_square;
		_app.selected_nature_reserve.nhic_id_number_edit = _app.selected_nature_reserve.nhic_id_number;
		_app.selected_nature_reserve.county_edit = _app.selected_nature_reserve.county;
		_app.selected_nature_reserve.municipality_edit = _app.selected_nature_reserve.municipality;
		_app.selected_nature_reserve.township_edit = _app.selected_nature_reserve.township;
		_app.selected_nature_reserve.ecoregion_edit =_app.selected_nature_reserve.ecoregion;
		_app.selected_nature_reserve.ecodistrict_edit = _app.selected_nature_reserve.ecodistrict;
		_app.selected_nature_reserve.mnrf_region_edit = _app.selected_nature_reserve.mnrf_region;
		_app.selected_nature_reserve.mnrf_district_edit = _app.selected_nature_reserve.mnrf_district;
		_app.selected_nature_reserve.tertiary_watershed_edit = _app.selected_nature_reserve.tertiary_watershed;
		_app.selected_nature_reserve.environmental_designations_edit = _app.selected_nature_reserve.environmental_designations;
		_app.selected_nature_reserve.latitude_edit = _app.selected_nature_reserve.latitude;
		_app.selected_nature_reserve.longitude_edit = _app.selected_nature_reserve.longitude;
		_app.selected_nature_reserve.directions_edit = _app.selected_nature_reserve.directions;
		_app.selected_nature_reserve.feature_image_edit = _app.selected_nature_reserve.feature_image;
		/*person.name_edit = person.name;
		person.nature_reserve_edit = person.nature_reserve;
		person.category_edit = person.category;
		person.email_edit = person.email;
		person.phone_number_edit = person.phone_number;
		person.notes_edit = person.notes;*/
	}
	
	_app.cancel_edit_genral_info = function(nature_reserve){
		nature_reserve.editing = false;
	}
	
	_app.save_edit_genral_info = function(nature_reserve){
		if(nature_reserve.saving){
			return;
		}
		nature_reserve.saving = true;
		$.ajax({
			url: 'php/UpdateGeneralInfo.php',
			method: 'POST',
			dataType: 'json',
			data:{
				property_id:nature_reserve.property_id,
				property_name:_app.selected_nature_reserve.property_name_edit,
				acronym:_app.selected_nature_reserve.acronym_edit,
				property_owner:_app.selected_nature_reserve.property_owner_edit,
				land_tenure:_app.selected_nature_reserve.land_tenure_edit,
				acquisition_date:_app.selected_nature_reserve.acquisition_date_edit,
				property_size_hectares:_app.selected_nature_reserve.property_size_hectares_edit,
				property_size_acres:_app.selected_nature_reserve.property_size_acres_edit,
				legal_description:_app.selected_nature_reserve.legal_description_edit,
				atlas_square:_app.selected_nature_reserve.atlas_square_edit,
				nhic_id_number:_app.selected_nature_reserve.nhic_id_number_edit,
				county:_app.selected_nature_reserve.county_edit,
				municipality:_app.selected_nature_reserve.municipality_edit,
				township:_app.selected_nature_reserve.township_edit,
				ecoregion:_app.selected_nature_reserve.ecoregion_edit,
				ecodistrict:_app.selected_nature_reserve.ecodistrict_edit,
				mnrf_region:_app.selected_nature_reserve.mnrf_region_edit,
				mnrf_district:_app.selected_nature_reserve.mnrf_district_edit,
				tertiary_watershed:_app.selected_nature_reserve.tertiary_watershed_edit,
				environmental_designations:_app.selected_nature_reserve.environmental_designations_edit,
				latitude:_app.selected_nature_reserve.latitude_edit,
				longitude:_app.selected_nature_reserve.longitude_edit,
				directions:_app.selected_nature_reserve.directions_edit,
				feature_image:_app.selected_nature_reserve.feature_image_edit
			},
			success: genral_info_saved,
			error:function (){
			}
		});
		
	}
	
	function genral_info_saved(data){
		console.log(data);
		_app.selected_nature_reserve.editing = false;
		_app.selected_nature_reserve.property_name = _app.selected_nature_reserve.property_name_edit;
		_app.selected_nature_reserve.acronym = _app.selected_nature_reserve.acronym_edit;
		_app.selected_nature_reserve.property_owner = _app.selected_nature_reserve.property_owner_edit;
		_app.selected_nature_reserve.land_tenure = _app.selected_nature_reserve.land_tenure_edit;
		_app.selected_nature_reserve.acquisition_date = _app.selected_nature_reserve.acquisition_date_edit;
		_app.selected_nature_reserve.property_size_hectares = _app.selected_nature_reserve.property_size_hectares_edit;
		_app.selected_nature_reserve.property_size = _app.selected_nature_reserve.property_size_acres_edit_acres;
		_app.selected_nature_reserve.legal_description = _app.selected_nature_reserve.legal_description_edit;
		_app.selected_nature_reserve.atlas_square = _app.selected_nature_reserve.atlas_square_edit;
		_app.selected_nature_reserve.nhic_id_number = _app.selected_nature_reserve.nhic_id_number_edit;
		_app.selected_nature_reserve.county = _app.selected_nature_reserve.county_edit;
		_app.selected_nature_reserve.municipality = _app.selected_nature_reserve.municipality_edit;
		_app.selected_nature_reserve.township = _app.selected_nature_reserve.township_edit;
		_app.selected_nature_reserve.ecoregion =_app.selected_nature_reserve.ecoregion_edit;
		_app.selected_nature_reserve.ecodistrict = _app.selected_nature_reserve.ecodistrict_edit;
		_app.selected_nature_reserve.mnrf_region = _app.selected_nature_reserve.mnrf_region_edit;
		_app.selected_nature_reserve.mnrf_district = _app.selected_nature_reserve.mnrf_district_edit;
		_app.selected_nature_reserve.tertiary_watershed = _app.selected_nature_reserve.tertiary_watershed_edit;
		_app.selected_nature_reserve.environmental_designations = _app.selected_nature_reserve.environmental_designations_edit;
		_app.selected_nature_reserve.latitude = _app.selected_nature_reserve.latitude_edit;
		_app.selected_nature_reserve.longitude = _app.selected_nature_reserve.longitude_edit;
		_app.selected_nature_reserve.directions = _app.selected_nature_reserve.directions_edit;
		_app.selected_nature_reserve.feature_image = _app.selected_nature_reserve.feature_image_edit;
		_app.selected_nature_reserve.saving = false;
		_app.applyScope();
	}
	
	
}

function gotGeneralInfo(data){
	_app.nature_reserves = data.results;
	

	
	_app.nature_reserves.unshift({property_name:"- None -",welcome_screen:'true'});
	_app.selected_nature_reserve = _app.nature_reserves[0];
	
	
	
	if(url_choosen_reserve != undefined){
		for(var i=1;i<_app.nature_reserves.length;i++){
			_app.nature_reserves[i].editing = false;
			_app.nature_reserves[i].saving = false;
			if(_app.nature_reserves[i].acronym.toLowerCase() == url_choosen_reserve){
				_app.selected_nature_reserve = _app.nature_reserves[i];
				_app.selected_NR();
			}
		}
	}
	_app.applyScope();
}



/**
The directive creates an html script function that can be activated through 
the use of <general-info-people-search-bar></general-info-people-search-bar>
Use it to quickly post the template for the search, it is manipulated from the
original People.js directive 
**/

app.directive('testingThis', function(){
	return {
		restrict: 'EA',
		
		controller: function($scope){
		$scope.selected_nature_reserves;	
		}
	};
});

app.directive('generalInfoPeopleSearchBar', function () {
    return {
        restrict: 'EA',
        controller: function ($scope) {
			$scope.options = [''];
			$scope.selected_nature_reserves = [''];
			$scope.search_text = '';
			//$scope.select_nature_reserve_filter = "";
			$scope.serching_for_people = false;
		
			var search_timeout = undefined;
			$scope.start_timeout_update_people_search = function(){
				if(search_timeout){
					clearTimeout(search_timeout);
				}
				search_timeout = setTimeout($scope.update_people_search,750);
				
			}
			
			$scope.update_people_search = function(){
				$scope.serching_for_people = true;
				$.ajax({
					url: 'php/GeneralInfoSearchPeople.php',
					method: 'POST',
					dataType: 'json',
					data:{nature_reserves:$scope.selected_nature_reserves,
						  categories:$scope.options,
						  name:$scope.search_text },
					success: gotPeopleSearch,
					error:function (){
						$scope.serching_for_people = false;
					}
				});
			}
			
	
        },
        templateUrl: 'html/Acquisition/GeneralInfoPeopleSearchBar.html'
    };
});


app.directive('generalInfoPersonCard', function () {
	// PER PERSON CARD
    return {
        restrict: 'EA',
		scope:{
			person: '='
		},
        controller: function ($scope) {
			init_Categories($scope)

			$scope.applyScope = function(){
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			}
		
			$scope.clear_person = function(){
				$scope.person.name_edit = "";
				$scope.person.category_edit = "";
				$scope.person.email_edit = "";
				$scope.person.phone_number_edit = "";
				$scope.person.notes_edit = "";
				$scope.person.nature_reserves = [""];
				$scope.person.category_options = [""];
				
			}
			
			$scope.edit_person = function(){
				$scope.person.editing = true;
				$scope.person.compact = false;
				$scope.person.name_edit = $scope.person.name;
				
				$scope.person.email_edit = $scope.person.email;
				$scope.person.phone_number_edit = $scope.person.phone_number;
				$scope.person.notes_edit = $scope.person.notes;
				
				if($scope.person.new_person){
					$scope.clear_person();
				}
			
				$scope.person.nature_reserves_edit = [];
				for(var i=0;i<$scope.person.nature_reserves.length;i++){
					$scope.person.nature_reserves_edit.push(String($scope.person.nature_reserves[i]));
				};
				
				$scope.person.category_options_edit = [];
				
				var values = [];
					for(var i=0;i<$scope.person.category_options.length;i++){
						$scope.person.category_options_edit.push("");
						values.push(String($scope.person.category_options[i]));
					}
				
				setTimeout(function(){
					for(var i=0;i<$scope.person.category_options.length;i++){
						$scope.person.category_options_edit[i] = (values[i]);
					};
					_app.applyScope();
					},1);
				
				
			}
			$scope.cancel_edit_person= function(){
				$scope.person.editing = false;
			}
			$scope.add_nature_reserve_on_person= function(){
				$scope.person.nature_reserves_edit.push("");
			}
			$scope.remove_nature_reserve_on_person= function(index){
				$scope.person.nature_reserves_edit.splice(index,1);
				
			}
			$scope.add_category_on_person= function(){
				$scope.person.category_options_edit.push("");
			}
			$scope.remove_category_on_person= function(index){
				$scope.person.category_options_edit.splice(index,1);
				
			}
			
			$scope.save_edit_person= function(){
				
				
				if($scope.person.saving){
					return;
				}
				$scope.person.saving =true;
				var php_url = "php/UpdatePerson.php";
				if($scope.person.id == "-1"){
					php_url = "php/AddPerson.php";
				}
				
				var nature_reserves_string = "";
				for (var i=0;i<$scope.person.nature_reserves_edit.length;i++){
					var nature_reserve = $scope.person.nature_reserves_edit[i];
					if(i!=0){
						nature_reserves_string += "; ";
					}
					nature_reserves_string += nature_reserve;
				}
				////
				var category_options_string = "";
				for (var i=0;i<$scope.person.category_options_edit.length;i++){
					var category = $scope.person.category_options_edit[i];
					if(i!=0){
						category_options_string += "; ";
					}
					category_options_string += category;
				}
				
				// Compress category_options_edit array into string with "; ".
				
				
				$.ajax({
					url: php_url,
					method: 'POST',
					dataType: 'json',
					data:{
						name:$scope.person.name_edit,
						nature_reserve:nature_reserves_string,
						category:category_options_string,
						email:$scope.person.email_edit,
						phone_number:$scope.person.phone_number_edit,
						notes:$scope.person.notes_edit,
						id:$scope.person.id
					},
					success: function(data){
						console.log(data);
						$scope.person.saving = false;
						$scope.person.editing = false;
						$scope.person.compact = true;
						$scope.person.name = $scope.person.name_edit;
						$scope.person.nature_reserves = $scope.person.nature_reserves_edit;
						$scope.person.category_options = $scope.person.category_options_edit;
						$scope.person.email = $scope.person.email_edit;
						$scope.person.phone_number = $scope.person.phone_number_edit;
						$scope.person.notes =$scope.person.notes_edit;
						
						
						
						if(data.insert_id != "-1"){
							$scope.person.id = data.insert_id;
							
							var new_person = {// Dupicate person ofbect not to screw with new person button being the same aobject.
								compact:true,
								editing:false,
								saving:false,
								new_person:false,
								id:String($scope.person.id),
								name:String($scope.person.name),
								nature_reserves:[],
								category_options:[],
								email:String($scope.person.email),
								phone_number:String($scope.person.phone_number),
								notes:String($scope.person.phone_number)
							};
							for(var i=0;i<$scope.person.nature_reserves.length;i++){
								new_person.nature_reserves.push($scope.person.nature_reserves[i]);
							}
							for(var i=0;i<$scope.person.category_options.length;i++){
								new_person.category_options.push($scope.person.category_options[i]);
							}
							_app.people_found.push(new_person);
							$scope.clear_person();
						}
						$scope.applyScope();
					},
					error:function (){
					}
				});
				
			}
		
		
	
        },
        templateUrl: 'html/Acquisition/GeneralInfoPeopleCard.html'
    };
});