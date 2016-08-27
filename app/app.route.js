(function(){
  'use strict';
  angular.module('dvdRentalFrontendApp')
         .config(function($stateProvider, $urlRouterProvider) {
           //
          // For any unmatched url, redirect to /state1
          $urlRouterProvider.otherwise("/discover");
          //
          // Now set up the states
          $stateProvider
          .state('discover', {
            url : '/discover',
            templateUrl: 'views/discover.html',
            controller: 'DiscoverCtrl',
            controllerAs: 'discoverCtrl',
            data : {
                showSideNav : false
            }
          })
          .state('movies', {
            url : '/movies',
            templateUrl: 'views/movies.html',
            controller: 'MoviesCtrl',
            controllerAs: 'movies',
            data : {
                showSideNav : true
            }
          })
          .state('shows', {
            url : '/shows',
            templateUrl: 'views/shows.html',
            controller: 'ShowsCtrl',
            controllerAs: 'shows',
            data : {
                showSideNav : true
            }
          })
          .state('people', {
            url : '/people',
            templateUrl: 'views/people.html',
            controller: 'PeopleCtrl',
            controllerAs: 'people',
            data : {
                showSideNav : true
            }
          })
          .state('movieView', {
            url : '/movieView/:id/',
            templateUrl: 'views/movieview.html',
            controller: 'MovieviewCtrl',
            controllerAs: 'movieView',
            data : {
                showHeaderSlideshow : true,
                showSideNav : false
            }
          })
          .state('showView', {
            url : '/showView/:id/',
            templateUrl: 'views/showview.html',
            controller: 'ShowviewCtrl',
            controllerAs: 'showView',
            data : {
                showHeaderSlideshow : true,
                showSideNav : false
            }
          })
          .state('personView', {
            url : '/personView/:id/',
            templateUrl: '/views/personview.html',
            controller: 'PersonviewCtrl',
            controllerAs: 'personView',
            data : {
                showHeaderSlideshow : true,
                showSideNav : false
            }
          })
      });
})()
