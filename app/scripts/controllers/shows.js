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
                vm.shosTos = $state.params.showsToShow;
                vm.searchInput = vm.showsToShow.searchInput;
            }
            vm.genres = ShowService.allGenres();
            vm.formBusy = false;

        }
        

        function loadShowView(id){
            vm.showsToShow.searchInput = vm.searchInput;
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
            vm.showsToShow = vm.popularMovies;
        }
        }
        
        function openMenu($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
            
        };
        
        function getShowsByGenre(id){
            ShowService.discover({with_genres: id}, function(resp){
                vm.showsToShow = resp;
            }, function(httpError){
                console.log(httpError);
                FeedbackService.showError(httpError.status + ": " +httpError.statusText);
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
