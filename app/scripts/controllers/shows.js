'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('ShowsCtrl', function (ShowService, FeedbackService, $state, $mdMedia) {
        var vm = this;
        vm.popularTvShows = [];
        vm.showsToShow = [];
        vm.genres = [];
        vm.selectedGenres = [];
        vm.years = [];
        vm.loadShowView = loadShowView;
        vm.openMenu = openMenu;
        vm.getShowsByGenre = getShowsByGenre;
        vm.loadPage = loadPage;
        vm.formBusy = false;
        vm.calculateLimit = calculateLimit;
        vm.search = search;
        
        activate();

        function activate(){
            vm.formBusy = true;
            vm.popularTvShows = ShowService.discover();
            if(!$state.params.showsToShow){
                vm.showsToShow = vm.popularTvShows;
            }else{
                vm.showsToShow = $state.params.showsToShow;
                vm.searchInput = vm.showsToShow.searchInput;
                vm.selectedGenres = vm.showsToShow.selectedGenres;
                vm.selectedYear = vm.showsToShow.selectedYear;
            }
            vm.genres = ShowService.allGenres();
            vm.formBusy = false;
            
            vm.years.push("NONE");
            for(var i=2016; i>=1900;i--){
                vm.years.push(i);
            }
            

        }
        

        function loadShowView(id){
            vm.showsToShow.searchInput = vm.searchInput;
            vm.showsToShow.selectedGenres = vm.selectedGenres;
            vm.showsToShow.selectedYear = vm.selectedYear;
            $state.go('app.showView', {id : id, showsToShow : vm.showsToShow});
        }
        
        function calculateLimit(){
            if($mdMedia('xs') || $mdMedia('sm')){
                return 18;
            }
            return 20;
        }

        function search(title){
        if(title){
            ShowService.search({title: title}, function(resp){
               vm.showsToShow = resp;
            }, function(httpError){
                console.log(httpError);
                FeedbackService.showError(httpError.status + ": " +httpError.statusText);
                vm.showsToShow = vm.popularMovies;
            });
        }else{
            vm.showsToShow = vm.popularTvShows;
        }
        }
        
        function openMenu($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
            
        };
        
        function getShowsByGenre(){
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
                ShowService.discover({with_genres: genreList, first_air_date_year : vm.selectedYear}, function(resp){
                vm.showsToShow = resp;
            }, function(httpError){
                console.log(httpError);
                FeedbackService.showError(httpError.status + ": " +httpError.statusText);
            })
            }).catch(function(error){
                console.log(error);
            })
            
            
        }
        
        function loadPage(newPage, oldPage){
            ShowService.discover({page: newPage}, function(resp){
                vm.showsToShow = resp;
            }, function(httpError){
                console.log(httpError);
                FeedbackService.showError(httpError.status + ": " +httpError.statusText);
            })
        }
  });
