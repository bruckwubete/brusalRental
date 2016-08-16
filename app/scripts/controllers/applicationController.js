(
    'use strict';
    angular.module('dvdRentalFrontendApp')
            .controller('applicaitonController',applicaitonController)
            ;
    function applicationCache(showHeaderSlideshow){
        
        var vm = this;
        vm.showHeader = showHeader;
        
        function showHeader(){
            return $scope.showHeaderSlideshow;
        }
          
    })();