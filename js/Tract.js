/*
	Created by Sujeethan Vigneswaran
	sujeethan.vigneswaran@gmail.com
	2018

*/

app.directive('tractSearchBar', function () {
    return {
        restrict: 'EA',
		scope:{
			
		},
        controller: function ($scope) {
			
			$scope.selected_acquisitions = [''];
			$scope.selected_conservation_agreements = [''];
			$scope.selected_nature_reserves = [''];
			$scope.selected_tax_programs = [''];
			$scope.search_alias = '';
			
			$scope.searching_for_tracts = false;
			
			$scope.addNatureReserve = function(){
				$scope.selected_nature_reserves.push('');
			}
			$scope.removeNatureReserve = function(index){
				$scope.selected_nature_reserves.splice(index,1);
				$scope.update_tract_search();
			}
			
			$scope.addAcquisitions = function(){
				$scope.selected_acquisitions.push('');
			}
			
			$scope.removeAcquisitions = function(index){
				$scope.selected_acquisitions.splice(index,1);
				$scope.update_tract_search();
			}
			
			$scope.addAgreements = function(){
				$scope.selected_conservation_agreements.push('');
			}
			
			$scope.removeAgreements = function(index){
				$scope.selected_conservation_agreements.splice(index,1);
				$scope.update_tract_search();
			}
			
			$scope.addTaxPrograms = function(){
				$scope.selected_tax_programs.push('');
			}
			
			$scope.removeTaxPrograms = function(index){
				$scope.selected_tax_programs.splice(index,1);
				$scope.update_tract_search();
			}
			
			var search_timeout = undefined;
			$scope.start_timeout_update_tract_search = function(){
				if(search_timeout){
					clearTimeout(search_timeout);
				}
				search_timeout = setTimeout($scope.update_tract_search,750);
			}
			
			$scope.update_tract_search = function(){
				$scope.searching_for_tracts = true;
				$.ajax({
					url: 'php/SearchTract.php',
					method: 'POST',
					dataType: 'json',
					data:{
						nature_reserves:$scope.selected_nature_reserves,
						tax_programs:$scope.selected_tax_programs,
						conservation_agreements:$scope.selected_conservation_agreements,
						acquisition_types:$scope.selected_acquisitions,
						alias:$scope.search_alias
					},
					success: gotTractSearch,
					error:function (){
						$scope.searching_for_tracts = false;
					}
				});
			}
        },
        templateUrl: 'html/Tract/TractSearchBar.html'
    };
});

function gotTractSearch(data){
	_app.searching_for_tracts = false;
	_app.tracts_found = data.results;
	for(var i=0;i<_app.tracts_found.length;i++){
		var tract = _app.tracts_found[i];
		//console.log(tract);
		tract.compact = true;
		tract.editing = false;
		tract.saving = false;
		tract.new_tract = false;
		tract.nature_reserve = tract.nature_reserve.split("; ");
		tract.acquisition_type = tract.acquisition_type.split("; ");
		tract.conservation_agreement = tract.conservation_agreement.split("; ");
		tract.tax_program = tract.tax_program.split("; ");
	}
	_app.applyScope();
	
}

function init_Tract(){
	
	_app.tracts_found = [];
	
	_app.new_tract = [{
		editing:false,
		compact:true,
		saving:false,
		new_tract:true,
		id:"-1",
		tract_name_edit:"",
		alias_edit:"",
		nature_reserve_edit:"",
		acquisition_date_edit:"",
		acquisition_type_edit:"",
		tract_size_acres_edit:"",
		tract_size_hectares_edit:"",
		conservation_agreement_edit:"",
		concession_number_edit:"",
		tax_program_edit:"",
		township_edit:"",
		assessment_number_edit:"",
		their_lawyer_edit:"",
		our_lawyer_edit:"",
		previous_owner_edit:"",
		legal_description_edit:""
	}]
	
}


app.directive('tractCard', function () {
	// PER tract CARD
    return {
        restrict: 'EA',
		scope:{
			tract: '='
		},
        controller: function ($scope) {

			$scope.applyScope = function(){
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			}
		
			$scope.clear_tract = function(){
				$scope.tract.tract_name_edit = "";
				$scope.tract.alias_edit = "";
				$scope.tract.nature_reserve_edit = [""];
				$scope.tract.acquisition_date_edit = "";
				$scope.tract.acquisition_type_edit = [""];
				$scope.tract.tract_size_acres_edit = "";
				$scope.tract.tract_size_hectares_edit = "";
				$scope.tract.conservation_agreement_edit = [""];
				$scope.tract.concession_number_edit = "";
				$scope.tract.tax_program_edit = [""];
				$scope.tract.township_edit = "";
				$scope.tract.assessment_number_edit = "";
				$scope.tract.their_lawyer_edit = "";
				$scope.tract.our_lawyer_edit = "";
				$scope.tract.previous_owner_edit = "";
				$scope.tract.legal_description_edit = "";
			}
			
			$scope.edit_tract = function(){
				$scope.tract.editing = true;
				$scope.tract.compact = false;
				$scope.tract.tract_name_edit = $scope.tract.tract_name;
				$scope.tract.alias_edit = $scope.tract.alias;
				//$scope.tract.nature_reserve_edit = $scope.tract.nature_reserve;
				$scope.tract.acquisition_date_edit = $scope.tract.acquisition_date;
				//$scope.tract.acquisition_type_edit = $scope.tract.acquisition_type;
				$scope.tract.tract_size_acres_edit = $scope.tract.tract_size_acres;
				$scope.tract.tract_size_hectares_edit = $scope.tract.tract_size_hectares;
				$scope.tract.concession_number_edit = $scope.tract.concession_number;
				$scope.tract.township_edit = $scope.tract.township;
				$scope.tract.assessment_number_edit = $scope.tract.assessment_number;
				$scope.tract.their_lawyer_edit = $scope.tract.their_lawyer;
				$scope.tract.our_lawyer_edit = $scope.tract.our_lawyer;
				$scope.tract.previous_owner_edit = $scope.tract.previous_owner;
				$scope.tract.legal_description_edit = $scope.tract.legal_description;
				
				if($scope.tract.new_tract){
					$scope.clear_tract();
				}
			
				$scope.tract.nature_reserve_edit = [];
				for(var i=0;i<$scope.tract.nature_reserve.length;i++){
					$scope.tract.nature_reserve_edit.push(String($scope.tract.nature_reserve[i]));
				};
				
				$scope.tract.acquisition_type_edit = [];
				for(var i=0;i<$scope.tract.acquisition_type.length;i++){
					$scope.tract.acquisition_type_edit.push(String($scope.tract.acquisition_type[i]));
				};
				
				$scope.tract.conservation_agreement_edit = [];
				for(var i=0;i<$scope.tract.conservation_agreement.length;i++){
					$scope.tract.conservation_agreement_edit.push(String($scope.tract.conservation_agreement[i]));
				};
				
				$scope.tract.tax_program_edit = [];
				for(var i=0;i<$scope.tract.tax_program.length;i++){
					$scope.tract.tax_program_edit.push(String($scope.tract.tax_program[i]));
				};
				
				setTimeout(function(){
					for(var i=0;i<$scope.tract.tax_program.length;i++){
						$scope.tract.tax_program_edit[i] = (values[i]);
					};
					_app.applyScope();
					},1);
				
			}
			
			$scope.cancel_edit_tract= function(){
				$scope.tract.editing = false;
			}
			
			/*
			$scope.add_nature_reserve_on_tract= function(){
				$scope.tract.nature_reserve_edit.push("");
			}
			$scope.remove_nature_reserve_on_tract= function(index){
				$scope.tract.nature_reserve_edit.splice(index,1);
				
			}
			*/
			
			/*EXPANSION AVAILABLE HERE*/
			
			$scope.save_edit_tract= function(){
				
				//don't run if currently saving
				if($scope.tract.saving){
					return;
				}
				
				$scope.tract.saving = true;
				
				var php_url = "";
				
				//checks if it is an edit or a new tract
				if($scope.tract.id == "-1"){
					php_url = "php/AddTract.php";
				} else {
					php_url = "php/UpdateTract.php";
				}
				
				console.log(php_url);
				
				var nature_reserves_string = "";
				for (var i=0;i<$scope.tract.nature_reserve_edit.length;i++){
					var nature_res = $scope.tract.nature_reserve_edit[i];
					if(i!=0){
						nature_reserves_string += "; ";
					}
					nature_reserves_string += nature_res;
				}
				
				var acquisition_type_string = "";
				for (var i=0;i<$scope.tract.acquisition_type_edit.length;i++){
					var acquisition_type = $scope.tract.acquisition_type_edit[i];
					if(i!=0){
						acquisition_type_string += "; ";
					}
					acquisition_type_string += acquisition_type;
				}
				
				var conservation_agreement_string = "";
				for (var i=0;i<$scope.tract.conservation_agreement_edit.length;i++){
					var conservation_agreement = $scope.tract.conservation_agreement_edit[i];
					if(i!=0){
						conservation_agreement_string += "; ";
					}
					conservation_agreement_string += conservation_agreement;
				}
				
				var tax_program_string = "";
				for (var i=0;i<$scope.tract.tax_program_edit.length;i++){
					var tax_program = $scope.tract.tax_program_edit[i];
					if(i!=0){
						tax_program_string += "; ";
					}
					tax_program_string += tax_program;
				}
				
				/*console.log($scope.tract.id,$scope.tract.tract_name_edit,$scope.tract.alias_edit,nature_reserves_string,$scope.tract.acquisition_date_edit,acquisition_type_string,$scope.tract.tract_size_acres_edit,$scope.tract.tract_size_hectares_edit,conservation_agreement_string,tax_program_string,$scope.tract.concession_number_edit,$scope.tract.township_edit,$scope.tract.assessment_number_edit,$scope.tract.their_lawyer_edit,$scope.tract.our_lawyer_edit,$scope.tract.previous_owner_edit,$scope.tract.legal_description_edit);
				*/
				
				$.ajax({
					url: php_url,
					method: 'POST',
					dataType: 'json',
					data:{
						tract_id:$scope.tract.id,
						tract_name:$scope.tract.tract_name_edit,
						alias:$scope.tract.alias_edit,
						nature_reserve:nature_reserves_string,
						acquisition_date:$scope.tract.acquisition_date_edit,
						acquisition_type:acquisition_type_string,
						tract_size_acres:$scope.tract.tract_size_acres_edit,
						tract_size_hectares:$scope.tract.tract_size_hectares_edit,
						conservation_agreement:conservation_agreement_string,
						tax_program:tax_program_string,
						concession_number:$scope.tract.concession_number_edit,
						township:$scope.tract.township_edit,
						assessment_number:$scope.tract.assessment_number_edit,
						their_lawyer:$scope.tract.their_lawyer_edit,
						our_lawyer:$scope.tract.our_lawyer_edit,
						previous_owner:$scope.tract.previous_owner_edit,
						legal_description:$scope.tract.legal_description_edit
					},
					success: function(data){
						console.log(data);
						$scope.tract.saving = false;
						$scope.tract.editing = false;
						$scope.tract.conpact = true;
						$scope.tract.tract_name = $scope.tract.tract_name_edit;
						$scope.tract.alias = $scope.tract.alias_edit;
						$scope.tract.nature_reserve = $scope.tract.nature_reserve_edit;
						$scope.tract.acquisition_date = $scope.tract.acquisition_date_edit;
						$scope.tract.acquisition_type = $scope.tract.acquisition_type_edit;
						$scope.tract.tract_size_acres = $scope.tract.tract_size_acres_edit;
						$scope.tract.tract_size_hectares = $scope.tract.tract_size_hectares_edit;
						$scope.tract.conservation_agreement = $scope.tract.conservation_agreement_edit;
						$scope.tract.tax_program = $scope.tract.tax_program_edit;
						$scope.tract.concession_number = $scope.tract.concession_number_edit;
						$scope.tract.township = $scope.tract.township_edit;
						$scope.tract.assessment_number = $scope.tract.assessment_number_edit;
						$scope.tract.their_lawyer = $scope.tract.their_lawyer_edit;
						$scope.tract.our_lawyer = $scope.tract.our_lawyer_edit;
						$scope.tract.previous_owner = $scope.tract.previous_owner_edit;
						$scope.tract.legal_description = $scope.tract.legal_description_edit;
						
						if(data.insert_id != "-1"){
							$scope.tract.id = data.insert_id;
							
							var new_tract = {
							// Duplicate tract object not to screw with new tract button being the same object.
								editing:false,
								compact:true,
								saving:false,
								new_tract:false,
								id:String($scope.tract.id),
								tract_name:String($scope.tract.tract_name),
								alias:String($scope.tract.alias),
								nature_reserve:[],
								acquisition_date:String($scope.tract.acquisition_date),
								acquisition_type:[],
								tract_size_acres:String($scope.tract.tract_size_acres),
								tract_size_hectares:String($scope.tract.tract_size_hectares),
								conservation_agreement:[],
								concession_number:String($scope.tract.concession_number),
								tax_program:[],
								township:String($scope.tract.township),
								assessment_number:String($scope.tract.assessment_number),
								their_lawyer_edit:String($scope.tract.their_lawyer),
								our_lawyer_edit:String($scope.tract.our_lawyer),
								previous_owner_edit:String($scope.previous_owner),
								legal_description:String($scope.tract.legal_description)
							};
							
							for(var i=0;i<$scope.tract.nature_reserve.length;i++){
								new_tract.nature_reserve.push($scope.tract.nature_reserve[i]);
							}
							
							for(var i=0;i<$scope.tract.conservation_agreement.length;i++){
								new_tract.conservation_agreement.push($scope.tract.conservation_agreement[i]);
							}
							
							for(var i=0;i<$scope.tract.tax_program.length;i++){
								new_tract.tax_program.push($scope.tract.tax_program[i]);
							}
							
							for(var i=0;i<$scope.tract.conservation_agreement.length;i++){
							new_tract.conservation_agreement.push($scope.tract.conservation_agreement[i]);
							}
							
							_app.tracts_found.push(new_tract);
							$scope.clear_tract();
						}
						$scope.applyScope();
						//_app.tract_saving = undefined;
					},
					error:function (data){
					}
				});
				
			}
		
		
	
        },
        templateUrl:'html/Tract/TractCard.html'
    };
});