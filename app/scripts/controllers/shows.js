'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('ShowsCtrl', function (lubTmdbApi,$state) {
    var vm = this
    vm.popularTvShows = [];
    vm.loadShowView = loadShowView;
    vm.exec = exec;

 function exec (type, method, queryBy,query) {
     var queries = {};
     queries[queryBy] = query;
     lubTmdbApi[type][method](queries).then(suc, err);
 }

function  suc (result){
  for(var i=0; i<=result.data.results.length;i++){
      vm.popularTvShows.push(result.data.results[i]);
  }
};

function err (results) {
}

    function activate(){
            exec('tv', 'popular','');
    }
    activate();

    function loadShowView(id){
      $state.go('showView',{id : id});
    }
  });
