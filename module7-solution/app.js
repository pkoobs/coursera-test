(function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.filter('price', PriceFilter)
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
	  var buyer = this;
	  buyer.items = ShoppingListCheckOffService.getToBuyItems();

	  buyer.markAsBought = function (itemIndex) {
	  	ShoppingListCheckOffService.boughtItem(itemIndex);
	  }
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'priceFilter'];
	function AlreadyBoughtController(ShoppingListCheckOffService, PriceFilter) {
		var bought = this;
		bought.items = ShoppingListCheckOffService.getBoughtItems();
	}

	function ShoppingListCheckOffService() {
	  var service = this;
	  var boughtItems = [];
	  var toBuyItems = [];

	  service.makeItem = function (itemName, itemQuantity, itemPrice) {
	  	var item = {
	      name: itemName,
	      quantity: itemQuantity,
	      pricePerItem: itemPrice
	    };

	    return item;
	  }

	  service.boughtItem = function (itemIndex) {
	    boughtItems.push(toBuyItems[itemIndex]);
	    toBuyItems.splice(itemIndex, 1);
	  };

	  service.getBoughtItems = function () {
	    return boughtItems;
	  }

	  service.getToBuyItems = function () {
	    return toBuyItems;
	  }

	  service.populateInitialArray = function () {
	  	var items = [];
	  	items.push(service.makeItem("Cookies", 10, 0.50));
	  	items.push(service.makeItem("Snickers", 3, 1.50));
	  	items.push(service.makeItem("Milk Jug", 1, 3.50));
	  	items.push(service.makeItem("Yogurts", 2, 0.25));
	  	items.push(service.makeItem("Bananas", 12, 0.33));

	  	return items;
	  }
	  // Populate the initial array
	  toBuyItems = service.populateInitialArray();
	}

	PriceFilter.$inject = ['$filter'];
	function PriceFilter($filter) {
  		return function (quantity, pricePerItem) {
  			var input = quantity * pricePerItem;
    		var result = $filter('currency')(input, '$$$$$$');
    		return result;
  		};
	}
})();