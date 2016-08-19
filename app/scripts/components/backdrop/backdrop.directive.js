// John Papa [Style Y070] One directive per file
(function(){
  'use strict';

  angular
    .module('dvdRentalFrontendApp')
    // John Papa [Style Y073] Unique directive prefix mdb
    .directive('mdbBackdrop', mdbBackdrop);

  mdbBackdrop.$inject = []

  function mdbBackdrop() {
    // John Papa [Style Y075] Use controller as syntax with a directive to be consistent with using controller as with view and controller pairings
    var directive = {
      restrict    : 'E',
      link        : link,
      scope       : {
        path: '='
      },
      templateUrl : 'views/backdrop.directive.html'
    };
    /* jshint unused:false */
    function link(scope, element, attrs) {
      console.log('here');
      var img = angular.element(element[0].querySelector('img'));

      img.on('load', function(){
        scope.$apply(function(){
          scope.loaded = true;
        });
      });
    }

    return directive;
  }

})();
