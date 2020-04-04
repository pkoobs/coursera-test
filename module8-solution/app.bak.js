(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

	NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
	function NarrowItDownController($scope, MenuSearchService) {
		var narrow = this;

		narrow.found = function (searchTerm) {
			MenuSearchService.getMatchedMenuItems(narrow, searchTerm);
		}
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath) {
	  var service = this;
	  var boughtItems = [];
	  var toBuyItems = [];

	  service.getMatchedMenuItems = function (callingController, searchTerm) {
	  	return $http({
		    url: (ApiBasePath + "/menu_items.json")
    	})
    	.then(function (response) {
    		// process result and only keep items that match
    		var foundItems = response.data.menu_items;
    		callingController.foundItems = foundItems.filter(item => item.description.includes(searchTerm));
		})
		.catch(function (error) {
			console.log(error.message);
		});
	  }
	}
})();