'use strict';

/**
 * @ngdoc overview
 * @name dvdRentalFrontendApp
 * @description
 * # dvdRentalFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('dvdRentalFrontendApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngResource',
    'ngMaterial',
    'lub-tmdb-api']).value('lubTmdbApiKey','02995914fdeb3ab56aa5d4c1ea6e94aa')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl',
        controllerAs: 'movies'
      })
      .when('/shows', {
        templateUrl: 'views/shows.html',
        controller: 'ShowsCtrl',
        controllerAs: 'shows'
      })
      .when('/people', {
        templateUrl: 'views/people.html',
        controller: 'PeopleCtrl',
        controllerAs: 'people'
      })
      .when('/movieView/:id/', {
        templateUrl: 'views/movieview.html',
        controller: 'MovieviewCtrl',
        controllerAs: 'movieView',
        resolve : {
            showHeaderSlideshow : function(){
                return false;
            }
        }
      })
      .when('/showView/:id/', {
        templateUrl: 'views/showview.html',
        controller: 'ShowviewCtrl',
        controllerAs: 'showView'
      })
      .when('/personView/:id', {
        templateUrl: 'views/personview.html',
        controller: 'PersonviewCtrl',
        controllerAs: 'personView'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['$httpProvider', function($httpProvider) {

    $httpProvider.defaults.headers.common["Access-Control-Allow-Headers"] = "*";

    }
]);
