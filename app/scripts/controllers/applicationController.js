
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
            sourceProp: '',
            visible: 9,
            perspective: 1,
            startSlide: 0,
            border: 3,
            width: 500,
            dir:'ltr',
            height: 500,
            space: 500,
            clicking: true,
            loop : false
        }

       vm.selectedClick = selectedClick;
       vm.slideChanged = slideChanged;
       vm.beforeChange = beforeChange;
       vm.lastSlide = lastSlide;

        function exec (type, method, query) {
         lubTmdbApi[type][method]({
             query: query
         }).then(suc, err);
     }

  function  suc (result){
       angular.forEach(result.data.results, function(value){
            vm.slides.push(value);
        });
    };

  function err (results) {
    }

        function activate(){
           exec('movie','popular','');
           exec('tv','popular','');
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
    }
