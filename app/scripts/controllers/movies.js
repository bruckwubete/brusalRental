(function(){
'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
    .controller('MoviesCtrl', function (lubTmdbApi, $state) {
        var vm = this;
        vm.popularMovies = [];
        vm.exec = exec;
        vm.loadMovieView = loadMovieView;

     function exec (type, method, query) {
         lubTmdbApi[type][method]({
             query: query
         }).then(suc, err);
     }

  function  suc (result){
        for(var i=0; i<=result.data.results.length;i++){
            vm.popularMovies.push(result.data.results[i]);
        }
    };

  function err (results) {
    }

        function activate(){

                exec('movie','popular','');

        }
        activate();

        function loadMovieView(id){
            $state.go('movieView', {id : id});
        }
    });
})()
