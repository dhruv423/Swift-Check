/*
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
	
	_app.gotoPage = function(page){
		_app.page = page;
		$('.navbar-collapse').collapse('hide');
	}
	
	_app.loadedNavbar = function(){
		var navbar = document.getElementById("navbar");
		if(navbar){
			document.getElementById("body").style.marginTop = (navbar.offsetHeight+ 10) +"px";
		}
		new ResizeSensor(jQuery('#navbar'), function(){ 
			var body = document.getElementById("body");
			document.getElementById("body").style.marginTop = (navbar.offsetHeight+ 10) +"px";
		});
		
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