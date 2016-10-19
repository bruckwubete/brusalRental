(function(){
    'use strict';
    angular.module('dvdRentalFrontendApp')
            .controller('applicaitonController',applicaitonController);
    function applicaitonController($state,PeopleService, MovieService, ShowService, $scope, $mdMedia, $mdSidenav){

        var vm = this;
        vm.state = $state;
        vm.showHeader = showHeader;
        vm.showSideNav = showSideNav;
        vm.loadView = loadView;
        vm.toggleSidenav = toggleSidenav;
        vm.slides = [];
        vm.options = {
            sourceProp: '',
            visible: 9,
            perspective: 1,
            startSlide: 0,
            border: 3,
            width: 400,
            dir:'ltr',
            height: 400,
            space: 400,
            clicking: true,
            loop : true,
            autoRotationSpeed: 18000
       };

       vm.selectedClick = selectedClick;
       vm.slideChanged = slideChanged;
       vm.beforeChange = beforeChange;
       vm.lastSlide = lastSlide;
/////////////////////////////////////////////////////////////////
          activate();

        function activate(){
            MovieService.queryAll(function(allMovies){
                angular.forEach(allMovies, function(movie){
                    vm.slides.push(movie);
                })
              });
            ShowService.queryAll(function(allShows){
                angular.forEach(allShows, function(show){
                    vm.slides.push(show);
              })
            });
        }
        
        function toggleSidenav(){
            $mdSidenav('kit-left-sidenav').toggle();
        }


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

        function shuffle(array) {
            var counter = array.length;

              // While there are elements in the array
            while (counter > 0) {
                  // Pick a random index
                var index = Math.floor(Math.random() * counter);

                // Decrease counter by 1
                counter--;

                // And swap the last element with it
                var temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array;
        }

        function lastSlide(index) {
          console.log('Last Slide Selected callback triggered. \n == Slide index is: ' + index + ' ==');
        }

        function beforeChange(index) {
          //console.log('Before Slide Change callback triggered. \n == Slide index is: ' + index + ' ==');
        }

        function selectedClick(index) {
          //   console.log('Selected Slide Clicked callback triggered. \n == Slide index is: ' + index + ' ==');
        }

        function slideChanged(index) {
          //console.log('Slide Changed callback triggered. \n == Slide index is: ' + index + ' ==');
        }

        $scope.$watch(function() { return $mdMedia('xs') || $mdMedia('gt-sm'); }, function() {
            if($mdMedia('xs')){
                vm.options.width = 200;
                vm.options.height = 250;
                vm.options.space = 200;
            }else if($mdMedia('gt-sm')){
                vm.options.width = 400;
                vm.options.height = 400;
                vm.options.space = 400;
            }
        });
    }
})();
