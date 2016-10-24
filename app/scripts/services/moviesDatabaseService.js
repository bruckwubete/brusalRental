'use strict';

/**
 * @ngdoc service
 * @name dvdRentalFrontendApp.factory:MovieService
 * @description
 * # MovieService
 * Service for serving movies from the movie database api
 */
angular.module('dvdRentalFrontendApp')
    .factory('MovieService', function($resource,$http) {
        return $resource('/api/v1/movies/popular', { id: '@_id', title: '@_title', with_genres: '@_with_genres', page: '@_page' }, {
          'get': {
                   url: 'api/v1/movies/details/:id',
                   method: 'GET',
                },
          queryAll: {
                    url: 'api/v1/movies/popular',
                    method: 'GET',
                    isArray : true
          },
          search: {
                 url: 'api/v1/movies/search/:title',
                 method: 'GET'
          },
          allGenres: {
                url: 'api/v1/movies/genres',
                method: 'GET',
                isArray: true
          },
          discover: {
              url: 'api/v1/movies/discover',
              with_genres: ':with_genres',
              page: ':page',
              method: 'GET'
          }
        });
    })
    .factory('ShowService',function($resource){
        return $resource('/api/v1/shows/popular', { id: '@_id', title: '@_title', with_genres: '@_with_genres', page: '@_page'}, {
          'get': {
                   url: 'api/v1/shows/details/:id',
                   method: 'GET',
                },
          queryAll: {
                    url: 'api/v1/shows/popular',
                    method: 'GET',
                    isArray : true
          },
          search: {
                 url: 'api/v1/shows/search/:title',
                 method: 'GET'
          },
          allGenres: {
                url: 'api/v1/shows/genres',
                method: 'GET',
                isArray: true
          },
          discover: {
              url: 'api/v1/shows/discover',
              with_genres: ':with_genres',
              page: ':page',
              method: 'GET'
          }
        });
    })
    .factory('PeopleService',function($resource){
      return $resource('/api/v1/people/popular', { id: '@_id'}, {
        'get': {
                 url: 'api/v1/people/details/:id',
                 method: 'GET',
              },
        queryAll: {
                  url: 'api/v1/people/popular',
                  method: 'GET',
                  isArray : true
        }
      });
    });
