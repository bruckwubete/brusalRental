(function(){
  'use strict';

  angular.module('dvdRentalFrontendApp')

      .directive('tabClickListener', function(){
          return {
              restrict: 'A',
              link: function(scope, element, attrs) {
                        console.log(element);
                        console.log(scope);
                        console.log(attrs);

                          element.bind('click', function(event) {
                               console.log(element);
                               console.log(scope);
                               console.log(attrs);
                              $state.go('movies');
                    });
               }
          };
       });
})();
