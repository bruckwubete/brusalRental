'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('ShowsCtrl', function (ShowService,$state) {
    var vm = this
    vm.popularTvShows = [];
    vm.loadShowView = loadShowView;

////////////////////////////////
    activate();

    function activate(){
      vm.popularTvShows = ShowService.queryAll();
    }
    function loadShowView(id){
      $state.go('showView',{id : id});
    }
  });
