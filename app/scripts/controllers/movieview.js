'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:MovieviewCtrl
 * @description
 * # MovieviewCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('MovieviewCtrl', function ($state, lubTmdbApi) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    vm.getMovie = getMovie;
    vm.movie = {};
    activate();
    function activate(){
      getMovie();
    }

    function getMovie(){
        exec('movie','movie',$state.params.id)
    }

    function exec (type, method, query) {
        lubTmdbApi[type][method]({
            query: query
        }).then(suc, err);
    }

 function  suc (result){
       vm.movie = result.data;
   };

 function err (results) {
   }

  });
