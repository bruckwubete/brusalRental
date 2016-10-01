'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:MovieviewCtrl
 * @description
 * # MovieviewCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('MovieviewCtrl', function ($state, MovieService) {
    var vm = this;
    vm.getMovie = getMovie;
    vm.getTrailer = getTrailer;

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
        });

    }

    function getTrailer(){
       return 'https://www.youtube.com/embed/' + vm.movie.videos[0].key;
    }

  });
