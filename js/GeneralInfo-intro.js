// JavaScript Document







function init_GeneralInfoIntro(){
	
	$.ajax({
		url: 'php/PullGeneralInfo.php',
		method: 'POST',
		dataType: 'json',
		data:{},
		success: gotGeneralInfo,
		error:function (){
			var result = confirm("Database Connect Error!\nTry again?");
			if(result){
				lookup_NatureReserves();
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





