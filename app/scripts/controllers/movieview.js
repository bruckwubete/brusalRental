'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:MovieviewCtrl
 * @description
 * # MovieviewCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
    .controller('MovieviewCtrl', function (MovieService, $state) {
        var vm = this;
        vm.getMovie = getMovie;
        vm.loadPersonView = loadPersonView;
        vm.back = back;
        
    
        vm.queryResult = [];
        vm.movie= {};
        vm.cast = {};
        vm.crew = {};
    
        activate();
        function activate(){
          getMovie();
        }
    
        function getMovie(){
            MovieService.get({id : $state.params.id}, function(movie){
                vm.movie = movie;
                console.log(movie);
            }, function(){
        
            });
            
            MovieService.watch({id : $state.params.id}, function(movie){
                vm.hls = movie.hls
                console.log(movie)
                var video = document.getElementById('video');
                var hls = new Hls();
                hls.loadSource(movie.hls);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED,function() {
                  video.play();
                });
            
            }, function(){
        
            });
        }
    
        function loadPersonView(id){
          $state.go('app.personView', {id : id});
        }
        
        function back(){
          $state.go('app.movies', {moviesToShow : $state.params.moviesToShow})
        }
        
        function playMovie () {
            if(Hls.isSupported()) {
                var video = document.getElementById('video');
                var hls = new Hls();
                hls.loadSource(movie.hls);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED,function() {
                  video.play();
                });
            }
        }

  });
