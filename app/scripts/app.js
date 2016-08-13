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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/people', {
        templateUrl: 'views/people.html',
        controller: 'PeopleCtrl',
        controllerAs: 'people'
      })
      .when('/movieView/:id/', {
        templateUrl: 'views/movieview.html',
        controller: 'MovieviewCtrl',
        controllerAs: 'movieView'
      })
      .when('/showView', {
        templateUrl: 'views/showview.html',
        controller: 'ShowviewCtrl',
        controllerAs: 'showView'
      })
      .when('/personView', {
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
