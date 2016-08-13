'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('AboutCtrl', function (lubTmdbApi,$location) {
    var vm = this
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    vm.tvShows = [];
    vm.loadMovieView = loadMovieView;
    vm.exec = exec;
    console.log(lubTmdbApi);

 function exec (type, method, query) {
     lubTmdbApi[type][method]({
         query: query
     }).then(suc, err);
 }

function  suc (result){
    vm.tvShows.push(result);
};

function err (results) {
}

    function activate(){
        for(var i= 1; i<=20; i ++){
            exec('tv','tv',i);
         }
    }
    activate();

    function loadMovieView(id){
      $location.path('/movieView/'+id+'/');
    }
  });
