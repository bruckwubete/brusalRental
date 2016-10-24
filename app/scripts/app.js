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
    'ngCookies',,
    'ipCookie',
    'ng-token-auth',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngResource',
    'ngMaterial',
    'ui.router',
    'jkAngularRatingStars',
    'angularUtils.directives.dirPagination',
    'angular-carousel-3d',
    'angularLazyImg',
    'youtube-embed',]).config(function($authProvider) {
        $authProvider.configure({
            apiUrl: 'http://angularmaterial-bruck.c9users.io/api/v1',
            tokenValidationPath: '/auth/validate_token',
             signOutUrl: '/auth/sign_out',
  emailSignInPath: '/auth/sign_in',
  storage: 'cookies',
  tokenFormat: {
    "access-token": "{{ token }}",
    "token-type": "Bearer",
    "client": "{{ clientId }}",
    "expiry": "{{ expiry }}",
    "uid": "{{ uid }}"
  },
  authProviderPaths: {
        github:   '/auth/github',
        facebook: '/auth/facebook',
        twitter:   '/auth/twitter',
        google:   '/auth/google_oauth2'
      },
  omniauthWindowType : 'newWindow'
        });
    });
