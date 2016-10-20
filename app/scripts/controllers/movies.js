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
    .controller('MoviesCtrl', function (MovieService, FeedbackService, $state, $mdMedia) {
        var vm = this;
        vm.popularMovies = [];
        vm.moviesToShow = [];
        vm.genres = [];
        vm.loadMovieView = loadMovieView;
        vm.openMenu = openMenu;
        vm.getMoviesByGenre = getMoviesByGenre;
        vm.loadPage = loadPage;
        vm.formBusy = false;
        vm.calculateLimit = calculateLimit;
        vm.search = search;
        
        activate();

        function activate(){
                vm.formBusy = true;
                vm.moviesToShow = vm.popularMovies = MovieService.discover();
                vm.genres = MovieService.allGenres();
                vm.formBusy = false;

        }
        

        function loadMovieView(id){
            $state.go('app.movieView', {id : id});
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
               vm.moviesToShow = resp;
            }, function(httpError){
                console.log(httpError);
                FeedbackService.showSuccess("Welcome " + resp.email)
                vm.moviesToShow = vm.popularMovies;
            });
        }else{
            console.log(title);
            vm.moviesToShow = vm.popularMovies;
        }
        }
        
        function openMenu($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
            
        };
        
        function getMoviesByGenre(id){
            MovieService.discover({with_genres: id}, function(resp){
                console.log(resp);
                vm.moviesToShow = resp;
            }, function(httpError){
                console.log(httpError);
                FeedbackService.showError(httpError.status + ": " +httpError.statusText);
            })
        }
        
        function loadPage(newPage, oldPage){
            MovieService.discover({page: newPage}, function(resp){
                console.log(resp);
                vm.moviesToShow = resp;
            }, function(httpError){
                console.log(httpError);
                FeedbackService.showError(httpError.status + ": " +httpError.statusText);
            })
        }

    });
})()
