'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:PersonviewCtrl
 * @description
 * # PersonviewCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('PersonviewCtrl', function (PeopleService, $state) {
    var vm = this;
    vm.loadMovieView = loadMovieView;
    vm.loadShowView = loadShowView;
    vm.person = {};
    activate();
    function activate(){
      vm.person = PeopleService.get({id : $state.params.id})
    }

    function loadShowView(id){
      $state.go('showView', {id : id});
    }
    function loadMovieView(id){
      $state.go('movieView', {id : id});
    }
  });
