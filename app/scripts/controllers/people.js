'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('PeopleCtrl', function (lubTmdbApi, $state) {
    var vm = this;
    vm.peoples = [];
    vm.exec = exec;
    vm.loadPersonView = loadPersonView;

 function exec (type, method, query) {
     lubTmdbApi[type][method]({
         query: query
     }).then(suc, err);
 }

function  suc (result){
    for(var i=0; i<result.data.results.length;i++){
        vm.peoples.push(result.data.results[i]);
    }
    console.log(vm.peoples);
};

function err (results) {
}

    function activate(){

            exec('people','popular','');


    }
    activate();

    function loadPersonView(id){
      $state.go('personView', {id : id});
    }
  });
