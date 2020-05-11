(function () {
  'use strict';

  angular.module('public')
  .component('myInfo', {
    templateUrl: 'src/public/my-info/my-info.component.template.html',
    controller: 'MyInfoComponentController as myInfoCtrl'
  });
})();