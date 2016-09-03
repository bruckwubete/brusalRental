'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:ShowviewCtrl
 * @description
 * # ShowviewCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('ShowviewCtrl', function ($state, lubTmdbApi) {
    var vm = this;
    vm.getShow = getShow;
    vm.queryResult = [];
    activate();
    function activate(){
      getShow();
    }

    function getShow(){
        exec('tv','tv',$state.params.id)
        exec('tv','credits',$state.params.id)
    }

    function exec (type, method, query) {
        lubTmdbApi[type][method]({
            query: query
        }).then(suc, err);
    }

 function  suc (result){
   vm.queryResult.push(result.data);
   vm.show = vm.queryResult[0];
   if(vm.queryResult[1]){
     vm.cast = vm.queryResult[1].cast;
     vm.crew = vm.queryResult[1].crew;
   }
   };

 function err (results) {
   console.log(results);
   }
  });
