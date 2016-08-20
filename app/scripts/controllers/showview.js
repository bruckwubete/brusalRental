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
    vm.show = {};
    activate();
    function activate(){
      getShow();
    }

    function getShow(){
        exec('tv','tv',$state.params.id)
    }

    function exec (type, method, query) {
        lubTmdbApi[type][method]({
            query: query
        }).then(suc, err);
    }

 function  suc (result){
       console.log(result);
       vm.show = result.data;
   };

 function err (results) {
   }
  });
