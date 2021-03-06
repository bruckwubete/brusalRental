'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:DiscoverCtrl
 * @description
 * # DiscoverCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('DiscoverCtrl', function (lubTmdbApi, $state) {
    var vm = this;
    vm.popularItems = [];
    vm.exec = exec;
    vm.loadMovieView = loadMovieView;

 function exec (type, method, query) {
     lubTmdbApi[type][method]({
         query: query
     }).then(suc, err);
 }

function  suc (result){
    for(var i=0; i<result.data.results.length;i++){
        vm.popularItems.push(result.data.results[i]);
    }
};

function err (results) {
}

    function activate(){

            exec('movie','popular','');
            exec('tv','popular','');
            console.log(vm.popularItems);

    }
    activate();

    function loadMovieView(id){
        $state.go('movieView', {id : id});
    }

  });
