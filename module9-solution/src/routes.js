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

    // Home view
    .state('home', {
      url: '/',
      templateUrl: 'src/home.template.html'
    })

    // Categories view
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/categories/categories.template.html',
      controller: 'CategoriesComponentController as categoriesCtrl',
      resolve: {
        categories: ['MenuDataService', function(MenuDataService) {
          return MenuDataService.getAllCategories().then(function(response) {
            return response.data;
          });
        }]
      }
    })

    // Items view
    .state('categories.items', {
      url: '/{category}/items',
      templateUrl: 'src/items/items.template.html',
      controller: 'ItemsComponentController as itemsCtrl',
      resolve: {
        items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.category).then(function(response) {
            return response.data.menu_items;
          });
        }]
      }
    });
  }
})();