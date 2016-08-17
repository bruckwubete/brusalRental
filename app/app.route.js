(function(){
  'use strict';
  angular.module('dvdRentalFrontendApp')
         .config(function($stateProvider, $urlRouterProvider) {
           //
          // For any unmatched url, redirect to /state1
          $urlRouterProvider.otherwise("/movies");
          //
          // Now set up the states
          $stateProvider
          .state('movies', {
            url : '/movies',
            templateUrl: 'views/movies.html',
            controller: 'MoviesCtrl',
            controllerAs: 'movies'
          })
          .state('shows', {
            url : '/shows',
            templateUrl: 'views/shows.html',
            controller: 'ShowsCtrl',
            controllerAs: 'shows'
          })
          .state('people', {
            url : '/people',
            templateUrl: 'views/people.html',
            controller: 'PeopleCtrl',
            controllerAs: 'people'
          })
          .state('movieView', {
            url : '/movieView/:id/',
            templateUrl: 'views/movieview.html',
            controller: 'MovieviewCtrl',
            controllerAs: 'movieView',
            data : {
                showHeaderSlideshow : false
            }
          })
          .state('showView', {
            url : '/showView/:id/',
            templateUrl: 'views/showview.html',
            controller: 'ShowviewCtrl',
            controllerAs: 'showView',
            data : {
                showHeaderSlideshow : false
            }
          })
          .state('personView', {
            url : '/personView/:id/',
            templateUrl: '/views/personview.html',
            controller: 'PersonviewCtrl',
            controllerAs: 'personView',
            data : {
                showHeaderSlideshow : false
            }
          })
      });
})()
