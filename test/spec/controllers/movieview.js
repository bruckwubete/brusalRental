'use strict';

describe('Controller: MovieviewCtrl', function () {

  // load the controller's module
  beforeEach(module('dvdRentalFrontendApp'));

  var MovieviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MovieviewCtrl = $controller('MovieviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MovieviewCtrl.awesomeThings.length).toBe(3);
  });
});
