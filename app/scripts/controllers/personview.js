'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:PersonviewCtrl
 * @description
 * # PersonviewCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('PersonviewCtrl', function (lubTmdbApi, $state) {
    var vm = this;
    vm.getPerson  = getPerson;
    vm.person = {};
    activate();
    function activate(){
      getPerson();
    }

    function getPerson(){
        exec('people','person',$state.params.id)
    }

    function exec (type, method, query) {
        lubTmdbApi[type][method]({
            query: query
        }).then(suc, err);
    }

 function  suc (result){
       console.log(result);
       vm.person = result.data;
   };

 function err (results) {
   }
  });
