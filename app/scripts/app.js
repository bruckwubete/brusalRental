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
    'ui.router',
    'angular-carousel-3d',
    'lub-tmdb-api']).value('lubTmdbApiKey','02995914fdeb3ab56aa5d4c1ea6e94aa')
  .config(['$httpProvider', function($httpProvider) {

    $httpProvider.defaults.headers.common["Access-Control-Allow-Headers"] = "*"
    }
]);
