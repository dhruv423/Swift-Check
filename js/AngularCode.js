/*
 Created by Bradley McGinn. 
 2017
 brad.mcginn@gmail.com 
 
 Maintained by Sujeethan Vigneswaran
 2018
 sujeethan.vigneswaran@gmail.com
 */



var app = angular.module('App', []);
var _app; 






app.controller('App',function($scope,$rootScope){
	
	
	_app = this;// Global refrence;
	_app.scope = $scope;
	_app.applyScope = function(){
		if(!_app.scope.$$phase) {
			_app.scope.$apply();
		}
	}
	
	_app.page = "home";
	_app.nature_reserves = [{property_name:"Loading Data... ",welcome_screen:'true'}];
	_app.selected_nature_reserve = _app.nature_reserves[0];
	
	
	_app.gotoPage = function(page){
		if(_app.page == "add-person"){
			 _app.people_found =_app.people_storage;
		}
		_app.page = page;
		$('.navbar-collapse').collapse('hide');
		if(page == "maps"){
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize"); 
			map.setCenter(center);
		}
	}
	

	//
	
	
	
	_app.loadedNavbar = function(){
		var navbar = document.getElementById("navbar");
		if(navbar){
			document.getElementById("body").style.marginTop = (navbar.offsetHeight+ 10) +"px";
		}
		new ResizeSensor(jQuery('#navbar'), function(){ 
			var body = document.getElementById("body");
			document.getElementById("body").style.marginTop = (navbar.offsetHeight+ 10) +"px";
			if(_app.page == "maps"){
				var map_canvas = document.getElementById("google-map");
				if(map_canvas && navbar){
					map_canvas.style.height = (window.innerHeight - navbar.offsetHeight)+"px"
					map_canvas.style.top = navbar.offsetHeight+"px"
					map_canvas.style.position = "fixed";
					var center = map.getCenter();
					google.maps.event.trigger(map, "resize"); 
					map.setCenter(center);
				}
			}
		});
		init_GeneralInfo();
		load_google_maps();
		init_People();
		init_Tract();
		
	}

});



function getUrlVars() {
	// Javasctipt GET
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	vars[key] = value;
	});
	return vars;
}

var url_choosen_reserve = undefined;
urlVars =  getUrlVars();
if(urlVars != undefined){
	if(urlVars["acronym"] != undefined){
		url_choosen_reserve =urlVars["acronym"].toLowerCase();
	}
}