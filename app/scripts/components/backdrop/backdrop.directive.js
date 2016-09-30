// John Papa [Style Y070] One directive per file
(function(){
  'use strict';

  angular
    .module('dvdRentalFrontendApp')
    // John Papa [Style Y073] Unique directive prefix mdb
    .directive('mdbBackdrop', mdbBackdrop)
    .directive('backgroundImage', function(){
	return function(scope, element, attrs){
		restrict: 'A',
		attrs.$observe('backgroundImage', function(value) {
			element.css({
				'background': 'url(' +'https://image.tmdb.org/t/p/w1920' + value +')',
        'background-size': '100% 100%'
			});
		});
	};
});

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
