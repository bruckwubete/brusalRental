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
        vm.loadMovieView = loadMovieView;
        vm.formBusy = false;
        vm.calculateLimit = calculateLimit;

        function activate(){
                vm.formBusy = true;
                vm.popularMovies = MovieService.queryAll();
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

    });
})()
