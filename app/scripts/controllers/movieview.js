'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:MovieviewCtrl
 * @description
 * # MovieviewCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('MovieviewCtrl', function ($state, MovieService, $scope) {
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

      MovieService.get({id : $state.params.id}, function(movie){
          vm.movie = movie;
        }, function(){
  
        });

    }

    function loadPersonView(id){
      $state.go('personView', {id : id});
    }

  });
