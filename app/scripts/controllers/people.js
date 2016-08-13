'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('PeopleCtrl', function (lubTmdbApi, PeopleService) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    vm.peoples = [];
    vm.exec = exec;

 function exec (type, method, query) {
     lubTmdbApi[type][method]({
         query: query
     }).then(suc, err);
 }

function  suc (result){
    for(var i=0; i<=result.data.results.length;i++){
        vm.peoples.push(result.data.results[i]);
    }
};

function err (results) {
}

    function activate(){

            exec('people','popular','');

    }
    activate();
  });
