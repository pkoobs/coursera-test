(function () {
	'use strict';

	angular.module('public')
	.controller('SignUpComponentController', SignUpComponentController);

	SignUpComponentController.$inject = ['DataService', 'MenuService'];
	function SignUpComponentController(DataService, MenuService) {
	  var signUpCtrl = this;
	  
	  signUpCtrl.validateMenuItem = function (shortName) {
  		MenuService.getMenuItem(shortName).then(
  			function successCallback(response) {
  				console.log("Menu item is valid...\n response: " + response.status);
  				signUpCtrl.user.invalidItem = false;
			}, 
			function errorCallback(response) {
				console.log("Uh oh... error...\n response: " + response);
  				signUpCtrl.user.invalidItem = true;
			}
		);
  	  }

	  signUpCtrl.submit = function () {
	  	signUpCtrl.user.validForm = !signUpCtrl.user.invalidItem;
	  	DataService.saveInfo(signUpCtrl.user);
	  }
	}
})();