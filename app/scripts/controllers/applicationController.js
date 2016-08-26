(function(){
    'use strict';
    angular.module('dvdRentalFrontendApp')
            .controller('applicaitonController',applicaitonController)
            ;
    function applicaitonController($state,lubTmdbApi){

        var vm = this;
        vm.showHeader = showHeader;
        vm.showSideNav = showSideNav;
        vm.loadView = loadView;
        vm.slides = [];
         vm.options = {
            visible: 5,
            perspective: 35,
            startSlide: 0,
            border: 3,
            dir: 'ltr',
            width: 360,
            height: 270,
            space: 220,
            autoRotationSpeed: 2500,
            loop: true,

        }
        
        function exec (type, method, query) {
         lubTmdbApi[type][method]({
             query: query
         }).then(suc, err);
     }

  function  suc (result){
        for(var i=0; i<=result.data.results.length;i++){
            vm.slides.push(result.data.results[i]);
        }
    };

  function err (results) {
    }

        function activate(){

                exec('movie','popular','');


        }
        activate();

        function showHeader(){
          try {
              if(angular.isDefined($state.current.data) && angular.isDefined($state.current.data.showHeaderSlideshow)){
                  return $state.current.data.showHeaderSlideshow;
              }else{
                  return true;
              }
          }catch(error){
              return true;
          }
        }

        function showSideNav(){
          try {
              if(angular.isDefined($state.current.data) && angular.isDefined($state.current.data.showSideNav)){
                  return $state.current.data.showSideNav;
              }else{
                  return true;
              }
          }catch(error){
              return true;
          }
        }

        function loadView(view){
             $state.go(view);
        }
    }
})();
