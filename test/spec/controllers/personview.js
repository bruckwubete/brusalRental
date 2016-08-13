'use strict';

describe('Controller: PersonviewCtrl', function () {

  // load the controller's module
  beforeEach(module('dvdRentalFrontendApp'));

  var PersonviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonviewCtrl = $controller('PersonviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PersonviewCtrl.awesomeThings.length).toBe(3);
  });
});
