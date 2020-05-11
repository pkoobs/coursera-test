describe("Sign-up Controller: validateMenuItem()", function() {
  var $httpBackend;
  var $controller;
  var MenuService;
  var DataService;
  var SignUpComponentController;
  var ApiPath;
  var validItem;
  var invalidItem;

  beforeEach(function () {
    module('restaurant');

    var validItem = "L22";
    var invalidItem = "HFG45";

    inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      MenuService = $injector.get('MenuService');
      DataService = $injector.get('DataService');
      ApiPath = $injector.get('ApiPath');
    });

    inject(function (_$controller_, DataService, MenuService) {
      $controller = _$controller_;

      SignUpComponentController =
        $controller('SignUpComponentController',
          {DataService: DataService, MenuService: MenuService});
    });

    SignUpComponentController.user = {invalidItem: false};

    $httpBackend.expectGET("src/public/public.html").respond('');
    $httpBackend.expectGET("src/public/home/home.html").respond('');
  });

  it('Valid item should return false', function() {
    $httpBackend.whenGET(ApiPath + "/menu_items/" + validItem + ".json").respond(200, ['L22']);

    SignUpComponentController.validateMenuItem(validItem);
    expect(SignUpComponentController.user.invalidItem).toBe(false);

    $httpBackend.flush();
  });

  it('Invalid item should return true', function() {
    $httpBackend.whenGET(ApiPath + "/menu_items/" + invalidItem + ".json").respond(500, '');

    SignUpComponentController.validateMenuItem(invalidItem);
    expect(SignUpComponentController.user.invalidItem).toBe(true);

    $httpBackend.flush();
  });
});