(function () {
  "use strict";

  angular.module('common')
  .service('DataService', DataService);

  function DataService() {
    var service = this;
    service.user = {};

    this.saveInfo = function (userInfo) {
      service.user.firstName = userInfo.firstName;
      service.user.email = userInfo.email;
      service.user.phone = userInfo.phone;
      service.user.menuNumber = userInfo.menuNumber;
      service.user.validForm = userInfo.validForm;
    }

    this.getInfo = function () {
      return service.user;
    }
  }
})();