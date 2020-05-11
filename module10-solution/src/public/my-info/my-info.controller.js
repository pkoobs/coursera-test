(function () {
	'use strict';

	angular.module('public')
	.controller('MyInfoComponentController', MyInfoComponentController);

	MyInfoComponentController.$inject = ['DataService', 'ApiPath'];
	function MyInfoComponentController(DataService, ApiPath) {
	  var myInfoCtrl = this;
	  myInfoCtrl.apiPath = ApiPath;
	  
	  myInfoCtrl.getInfo = function () {
	  	myInfoCtrl.user = DataService.getInfo();
	  }
	}
})();