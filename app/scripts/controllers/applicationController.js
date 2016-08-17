(function(){
    'use strict';
    angular.module('dvdRentalFrontendApp')
            .controller('applicaitonController',applicaitonController)
            ;
    function applicaitonController($state){

        var vm = this;
        vm.showHeader = showHeader;
        vm.loadView = loadView;

        function showHeader(){
          try {
              if(angular.isDefined($state.current.data) && angular.isDefined($state.current.data.showHeaderSlideshow)){
                  return false;
              }else{
                  return true;
              }
          }catch(error){
              return true;
          }
        }
        
        function loadView(view){
             console.log("here");
            $state.go(view);
        }
    }
})();
