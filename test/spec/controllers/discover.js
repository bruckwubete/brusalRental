'use strict';

describe('Controller: DiscoverCtrl', function () {

  // load the controller's module
  beforeEach(module('dvdRentalFrontendApp'));

  var DiscoverCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DiscoverCtrl = $controller('DiscoverCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DiscoverCtrl.awesomeThings.length).toBe(3);
  });
});
