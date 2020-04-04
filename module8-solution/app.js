(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.controller('FoundItemsDirectiveController', FoundItemsDirectiveController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

	function FoundItemsDirectiveController() {
		var foundController = this;
	}

	function FoundItemsDirective() {
	  var ddo = {
	    templateUrl: 'foundItems.html',
	    scope: {
	      items: '<',
	      onRemove: '&'
	    },
	   controller: 'FoundItemsDirectiveController as foundController',
	    //controllerAs: 'list',
	   bindToController: true
	  };

	  return ddo;
	}

	NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
	function NarrowItDownController($scope, MenuSearchService) {
		var narrow = this;

		narrow.findItems = function (searchTerm) {
			if (searchTerm)
			{
				MenuSearchService.getMatchedMenuItems(narrow, searchTerm);
			}
		};

		narrow.removeItem = function (itemIndex) {
		    MenuSearchService.removeItem(narrow, itemIndex);
		};
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath) {
	  var service = this;

	  service.getMatchedMenuItems = function (callingController, searchTerm) {
	  	return $http({
		    url: (ApiBasePath + "/menu_items.json")
    	})
    	.then(function (response) {
    		// process result and only keep items that match
    		var foundItems = response.data.menu_items;
    		callingController.found = foundItems.filter(item => item.description.includes(searchTerm));
		})
		.catch(function (error) {
			console.log(error.message);
		});
	  }

	  service.removeItem = function (callingController, itemIndex) {
	  	callingController.found.splice(itemIndex, 1);
	  }
	}
})();