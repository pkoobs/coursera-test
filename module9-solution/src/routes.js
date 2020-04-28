(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
      url: '/',
      templateUrl: 'src/home.template.html'
    })

    // Categories page
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/categories/categories.template.html',
      controller: 'CategoriesComponentController as categoriesCtrl',
      resolve: {
        categories: ['MenuDataService', function(MenuDataService) {
          console.log("Getting data... (in routes.js)");
          return MenuDataService.getAllCategories().then(function(response) {
            console.log("Returning data... (in routes.js)");
            console.log("Data = \n" + response.data[1].name + "\n(in routes.js)");
            return response.data;
          });
        }]
      }
    });
  }
})();