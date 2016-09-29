'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:ShowviewCtrl
 * @description
 * # ShowviewCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('ShowviewCtrl', function ($state, ShowService) {
    var vm = this;
    vm.loadPersonView = loadPersonView;
    activate();
    function activate(){
      vm.show = ShowService.get({id : $state.params.id});
    }

   function loadPersonView(id){
       $state.go('personView',{id : id})
   }
  });
