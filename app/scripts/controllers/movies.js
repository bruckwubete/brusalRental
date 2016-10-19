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
    .controller('MoviesCtrl', function (MovieService, $state, $mdMedia) {
        var vm = this;
        vm.popularMovies = [];
        vm.moviesToShow = [];
        vm.loadMovieView = loadMovieView;
        vm.formBusy = false;
        vm.calculateLimit = calculateLimit;
        vm.search = search;

        function activate(){
                vm.formBusy = true;
                vm.moviesToShow = vm.popularMovies = MovieService.queryAll();
                vm.formBusy = false;

        }
        activate();

        function loadMovieView(id){
            $state.go('movieView', {id : id});
        }
        
        function calculateLimit(){
            if($mdMedia('xs') || $mdMedia('sm')){
                return 18;
            }
            return 20;
        }

        function search(title){
            if(title){
            MovieService.search({title: title}, function(resp){
               vm.moviesToShow = resp.results;
            }, function(httpError){
                console.log(httpError);
                vm.moviesToShow = vm.popularMovies;
            });
        }else{
            console.log(title);
            vm.moviesToShow = vm.popularMovies;
        }
        }

    });
})()
