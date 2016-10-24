'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:ShowviewCtrl
 * @description
 * # ShowviewCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
    .controller('ShowviewCtrl', function (ShowService, $state) {
        var vm = this;
        vm.getShow = getShow;
        vm.loadPersonView = loadPersonView;
        vm.back = back;
        
    
        vm.queryResult = [];
        vm.show = {};
        vm.cast = {};
        vm.crew = {};
    
        activate();
        function activate(){
          getShow();
        }
    
        function getShow(){
            ShowService.get({id : $state.params.id}, function(show){
                vm.show = show;
            }, function(){
        
            });
        }
    
        function loadPersonView(id){
          $state.go('app.personView', {id : id});
        }
        
        function back(){
          $state.go('app.shows', {showsToShow : $state.params.showsToShow})
        }
    });
