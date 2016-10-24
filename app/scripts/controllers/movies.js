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
            vm.popularMovies = MovieService.discover();
            if(!$state.params.moviesToShow){
                vm.moviesToShow = vm.popularMovies;
            }else{
                vm.moviesToShow = $state.params.moviesToShow;
                vm.searchInput = vm.moviesToShow.searchInput;
            }
            vm.genres = MovieService.allGenres();
            vm.formBusy = false;

        }
        

        function loadMovieView(id){
            vm.moviesToShow.searchInput = vm.searchInput;
            $state.go('app.movieView', {id : id, moviesToShow : vm.moviesToShow});
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
                FeedbackService.showError(httpError.status + ": " +httpError.statusText);
                vm.moviesToShow = vm.popularMovies;
            });
        }else{
            vm.moviesToShow = vm.popularMovies;
        }
        }
        
        function openMenu($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
            
        };
        
        function getMoviesByGenre(id){
            MovieService.discover({with_genres: id}, function(resp){
                vm.moviesToShow = resp;
            }, function(httpError){
                console.log(httpError);
                FeedbackService.showError(httpError.status + ": " +httpError.statusText);
            })
        }
        
        function loadPage(newPage, oldPage){
            MovieService.discover({page: newPage}, function(resp){
                vm.moviesToShow = resp;
            }, function(httpError){
                console.log(httpError);
                FeedbackService.showError(httpError.status + ": " +httpError.statusText);
            })
        }

    });
})()
