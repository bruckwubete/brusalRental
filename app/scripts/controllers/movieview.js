'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:MovieviewCtrl
 * @description
 * # MovieviewCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('MovieviewCtrl', function ($state, lubTmdbApi) {
    var vm = this;
    vm.getMovie = getMovie;
    vm.loadPersonView = loadPersonView;
    vm.queryResult = [];
    vm.movie= {};
    vm.cast = {};
    vm.crew = {};
    activate();
    function activate(){
      getMovie();
    }

    function getMovie(){
        exec('movie','movie',$state.params.id)
        exec('movie','casts',$state.params.id);
    }

    function exec (type, method, query) {
        lubTmdbApi[type][method]({
            query: query
        }).then(suc, err);
    }

 function  suc (result){
       vm.queryResult.push(result.data);
       vm.movie = vm.queryResult[0];
       if(vm.queryResult[1]){
         vm.cast = vm.queryResult[1].cast;
         vm.crew = vm.queryResult[1].crew;
       }
};
   function loadPersonView(id){
       $state.go('personView',{id : id})
   }


 function err (results) {
   }

  });
