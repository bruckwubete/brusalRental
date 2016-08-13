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
        return $resource('https://api.themoviedb.org/3/discover/movie/?api_key=02995914fdeb3ab56aa5d4c1ea6e94aa&page=:id', { id: '@_id' }, {
          'get': {
                   method: 'GET',
                   headers: {
                   'Content-Type': 'application/jsonp',
                   'Access-Control-Allow-Headers':'*',
                'Access-Control-Allow-Headers'  : 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
        });
    })
    .factory('ShowService',function($resource){
        return $resource('https://api.themoviedb.org/3/discover/tv/?api_key=02995914fdeb3ab56aa5d4c1ea6e94aa&page=:id', {path: '@_path'});
    })
    .factory('PeopleService',function($resource){
        return $resource('https://api.themoviedb.org/3/person/:id?api_key=02995914fdeb3ab56aa5d4c1ea6e94aa', {id: '@_id'});
    })
    .factory('PosterService',function($resource){
        return $resource('http://image.tmdb.org/t/p/w500/:path', {path: '@_path'});
    })

    .factory('getMovie', function ($http){
      var factory = {getMovies : getMovies};
      function getMovies(options){
      var url = 'https://api.themoviedb.org/3/discover/tv/?api_key=02995914fdeb3ab56aa5d4c1ea6e94aa&page=' + options.id;

      return $http.get(url, {

        })
        .success(onMovieSuccess)
        .error(onMovieError);

        function onMovieSuccess(data, status, headers, config) {
        data.directors  = _.where(data.credits.crew, { job: 'Director' });
        data.writers    = _.where(data.credits.crew, { department: 'Writing' });

        return data;
      }

      function onMovieError(error) {
        return error;
      }

    }
    return factory;
  });
