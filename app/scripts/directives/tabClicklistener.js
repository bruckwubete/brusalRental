(function(){
  'use strict';

  angular.module('dvdRentalFrontendApp')

      .directive('tabClickListener', function($state){
          return {
              restrict: 'A',
              link: function(scope, element, attrs, ctrl) {
                          element.bind('click', function(event) {
                              $state.go(attrs['tabClickListener'], {}, {notify : true});
                    });
               }
          };
       });
})();
