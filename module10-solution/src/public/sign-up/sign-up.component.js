(function () {
  'use strict';

  angular.module('public')
  .component('signUp', {
    templateUrl: 'src/public/sign-up/sign-up.component.template.html',
    controller: 'SignUpComponentController as signUpCtrl'
  });
})();