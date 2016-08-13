'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('PeopleCtrl', function (PeopleService) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    vm.peoples = [];
    function activate(){
       for (var i = 0; i<20; i++){
           PeopleService.get({id: i }, function(person){
               vm.peoples.push(person);
               console.log(vm.peoples);
           })
       }
    }
    activate();
  });
