'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('PeopleCtrl', function (PeopleService, FeedbackService, $state, $mdMedia) {
        var vm = this;
        vm.popularPeople = [];
        vm.peopleToShow = [];
        vm.loadPersonView = loadPersonView;
        vm.openMenu = openMenu;
        vm.loadPage = loadPage;
        vm.formBusy = false;
        vm.calculateLimit = calculateLimit;
        vm.search = search;
        
        activate();

        function activate(){
            vm.formBusy = true;
            vm.popularPeople = PeopleService.queryAll(function(response){
                vm.popularPeople = response;
            }, function(httpError){
                console.log(httpError);
                FeedbackService.showError(httpError.data.error);
            });

            if(!$state.params.peopleToShow){
                vm.peopleToShow = vm.popularPeople;
            }else{
                vm.peopleToShow = $state.params.peopleToShow;
                vm.searchInput = vm.peopleToShow.searchInput;
            }
            vm.formBusy = false;

        }
        

        function loadPersonView(id){
            vm.peopleToShow.searchInput = vm.searchInput;
            $state.go('app.personView', {id : id, peopleToShow : vm.peopleToShow});
        }
        
        function calculateLimit(){
            if($mdMedia('xs') || $mdMedia('sm')){
                return 18;
            }
            return 20;
        }

        function search(title){
        if(title){
            PeopleService.search({title: title}, function(resp){
               vm.peopleToShow = resp;
            }, function(httpError){
                console.log(httpError);
                FeedbackService.showError(httpError.status + ": " +httpError.statusText);
                vm.peopleToShow = vm.popularMovies;
            });
        }else{
            vm.peopleToShow = vm.popularTvShows;
        }
        }
        
        function openMenu($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
            
        };
        
        function loadPage(newPage, oldPage){
            PeopleService.queryAll({page: newPage}, function(resp){
                vm.peopleToShow = resp;
                console.log(resp);
            }, function(httpError){
                console.log(httpError);
                FeedbackService.showError(httpError.status + ": " +httpError.statusText);
            })
        }
  });
