'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('PeopleCtrl', function (PeopleService, $state) {
    var vm = this;
    vm.peoples = [];
    vm.loadPersonView = loadPersonView;



    function activate(){
      vm.peoples = PeopleService.queryAll();
    }
    activate();

    function loadPersonView(id){
      $state.go('personView', {id : id});
    }
  });
