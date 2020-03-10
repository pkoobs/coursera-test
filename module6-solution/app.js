(function () {
	'use strict';

	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope) {
	  $scope.input = "";
	  $scope.output = "";
	  $scope.status = ""; // Determines if output is good or bad (affects css)

	  $scope.checkInput = function () {
	  	var input = $scope.input;
	  	// Split the array based on commas and then remove any empty strings
	    var array = input.split(',').filter(word => word.length > 0);

	    if (array.length <= 0) {
	    	$scope.output = "Please enter data first.";
	    	$scope.status = "bad";
	    }
	    else if (array.length <= 3) {
	    	$scope.output = "Enjoy!";
	    	$scope.status = "good";
	    }
	    else {
	    	$scope.output = "Too much!";
	    	$scope.status = "good";
	    }
	  };
	}
})();