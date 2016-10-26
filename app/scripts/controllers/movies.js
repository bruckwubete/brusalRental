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
    .controller('MoviesCtrl', function (MovieService, FeedbackService, $state, $mdMedia, $mdDialog) {
        var vm = this;
        vm.popularMovies = [];
        vm.moviesToShow = [];
        vm.genres = [];
        vm.selectedGenres = [];
        vm.years = [];
        vm.loadMovieView = loadMovieView;
        vm.showMenuDialog = showMenuDialog;
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
                vm.selectedGenres = vm.moviesToShow.selectedGenres;
                vm.selectedYear = vm.moviesToShow.selectedYear;
            }
            vm.genres = MovieService.allGenres();
            vm.formBusy = false;
            vm.years.push("NONE");
            for(var i=2016; i>=1900;i--){
                vm.years.push(i);
            }

        }
        

        function loadMovieView(id){
            vm.moviesToShow.searchInput = vm.searchInput;
            vm.moviesToShow.selectedGenres = vm.selectedGenres;
            vm.moviesToShow.selectedYear = vm.selectedYear;
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
        
        function showMenuDialog(ev) {
            $mdDialog.show({
                controller: this,
                contentElement: '#myDialog',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
            
        };
        

        
        function getMoviesByGenre(){
            var prom = new Promise(function(resolve, reject){
                var genreList="";
                if(vm.selectedGenres.length){
                    angular.forEach(vm.selectedGenres, function(genre, index){
                        genreList += genre;
                        if(index != vm.selectedGenres.length-1){genreList+=","}
                        if (index == vm.selectedGenres.length-1){resolve(genreList);}
                    })
                }else{
                    resolve(genreList);
                }
            })
            
            prom.then(function(genreList){
                if(vm.selectedYear=="NONE"){vm.selectedYear=""}
                MovieService.discover({with_genres: genreList, year : vm.selectedYear}, function(resp){
                vm.moviesToShow = resp;
            }, function(httpError){
                console.log(httpError);
                FeedbackService.showError(httpError.status + ": " +httpError.statusText);
            })
            }).catch(function(error){
                console.log(error);
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
