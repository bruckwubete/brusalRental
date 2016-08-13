'use strict';

describe('Controller: ShowviewCtrl', function () {

  // load the controller's module
  beforeEach(module('dvdRentalFrontendApp'));

  var ShowviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowviewCtrl = $controller('ShowviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ShowviewCtrl.awesomeThings.length).toBe(3);
  });
});
