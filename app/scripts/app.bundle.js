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
    'ngResource',
    'ngMaterial',
    'ui.router',
    'jkAngularRatingStars',
    'angular-carousel-3d',
    'angularLazyImg',
    'lub-tmdb-api']).value('lubTmdbApiKey','02995914fdeb3ab56aa5d4c1ea6e94aa')
  .config(['$httpProvider', function($httpProvider) {

    $httpProvider.defaults.headers.common["Access-Control-Allow-Headers"] = "*"
    }
]);

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


    'use strict';
    angular.module('dvdRentalFrontendApp')
            .controller('applicaitonController',applicaitonController)
            ;
    function applicaitonController($state,lubTmdbApi){

        var vm = this;
        vm.showHeader = showHeader;
        vm.showSideNav = showSideNav;
        vm.loadView = loadView;
        vm.slides = [];
        vm.options = {
            sourceProp: '',
            visible: 9,
            perspective: 1,
            startSlide: 0,
            border: 3,
            width: 500,
            dir:'ltr',
            height: 500,
            space: 500,
            clicking: true,
            loop : true,
            autoRotationSpeed: 18000
        }

       vm.selectedClick = selectedClick;
       vm.slideChanged = slideChanged;
       vm.beforeChange = beforeChange;
       vm.lastSlide = lastSlide;

        function exec (type, method, query) {
         lubTmdbApi[type][method]({
             query: query
         }).then(suc, err);
     }

  function  suc (result){
       angular.forEach(result.data.results, function(value){
            vm.slides.push(value);
        });
    };

  function err (results) {
    }

        function activate(){
           exec('movie','popular','');
           exec('tv','popular','');
        }
        activate();

        function showHeader(){
          try {
              if(angular.isDefined($state.current.data) && angular.isDefined($state.current.data.showHeaderSlideshow)){
                  return $state.current.data.showHeaderSlideshow;
              }else{
                  return true;
              }
          }catch(error){
              return true;
          }
        }

        function showSideNav(){
          try {
              if(angular.isDefined($state.current.data) && angular.isDefined($state.current.data.showSideNav)){
                  return $state.current.data.showSideNav;
              }else{
                  return true;
              }
          }catch(error){
              return true;
          }
        }

        function loadView(view){
             $state.go(view);
        }

        function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

function lastSlide(index) {
  console.log('Last Slide Selected callback triggered. \n == Slide index is: ' + index + ' ==');
}

function beforeChange(index) {
   //console.log('Before Slide Change callback triggered. \n == Slide index is: ' + index + ' ==');
}

function selectedClick(index) {
//   console.log('Selected Slide Clicked callback triggered. \n == Slide index is: ' + index + ' ==');
}

function slideChanged(index) {
   //console.log('Slide Changed callback triggered. \n == Slide index is: ' + index + ' ==');
}
    }

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

(function(){
'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
    .controller('MoviesCtrl', function (MovieService, $state) {
        var vm = this;
        vm.popularMovies = [];
        vm.loadMovieView = loadMovieView;
        vm.formBusy = false;

        function activate(){
                vm.formBusy = true;
                vm.popularMovies = MovieService.queryAll(function(movie){

                }, function(){

                });
                vm.formBusy = false;

        }
        activate();

        function loadMovieView(id){
            $state.go('movieView', {id : id});
        }


    });
})()

'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:MovieviewCtrl
 * @description
 * # MovieviewCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('MovieviewCtrl', function ($state, lubTmdbApi) {
    var vm = this;
    vm.getMovie = getMovie;
    vm.loadPersonView = loadPersonView;
    vm.queryResult = [];
    vm.movie= {};
    vm.cast = {};
    vm.crew = {};
    activate();
    function activate(){
      getMovie();
    }

    function getMovie(){
        exec('movie','movie',$state.params.id)
        exec('movie','casts',$state.params.id);
    }

    function exec (type, method, query) {
        lubTmdbApi[type][method]({
            query: query
        }).then(suc, err);
    }

 function  suc (result){
       vm.queryResult.push(result.data);
       vm.movie = vm.queryResult[0];
       if(vm.queryResult[1]){
         vm.cast = vm.queryResult[1].cast;
         vm.crew = vm.queryResult[1].crew;
       }
};
   function loadPersonView(id){
       $state.go('personView',{id : id})
   }


 function err (results) {
   }

  });

'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('PeopleCtrl', function (lubTmdbApi, $state) {
    var vm = this;
    vm.peoples = [];
    vm.exec = exec;
    vm.loadPersonView = loadPersonView;

 function exec (type, method, query) {
     lubTmdbApi[type][method]({
         query: query
     }).then(suc, err);
 }

function  suc (result){
    for(var i=0; i<result.data.results.length;i++){
        vm.peoples.push(result.data.results[i]);
    }
    console.log(vm.peoples);
};

function err (results) {
}

    function activate(){

            exec('people','popular','');


    }
    activate();

    function loadPersonView(id){
      $state.go('personView', {id : id});
    }
  });

'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:PersonviewCtrl
 * @description
 * # PersonviewCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('PersonviewCtrl', function (lubTmdbApi, $state) {
    var vm = this;
    vm.getPerson  = getPerson;
    vm.person = {};
    activate();
    function activate(){
      getPerson();
    }

    function getPerson(){
        exec('people','person',$state.params.id)
    }

    function exec (type, method, query) {
        lubTmdbApi[type][method]({
            query: query
        }).then(suc, err);
    }

 function  suc (result){
       console.log(result);
       vm.person = result.data;
   };

 function err (results) {
   }
  });

'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('ShowsCtrl', function (ShowService,$state) {
    var vm = this
    vm.popularTvShows = [];
    vm.loadShowView = loadShowView;

////////////////////////////////
    activate();

    function activate(){
      vm.popularTvShows = ShowService.queryAll();
    }
    function loadShowView(id){
      $state.go('showView',{id : id});
    }
  });

'use strict';

/**
 * @ngdoc function
 * @name dvdRentalFrontendApp.controller:ShowviewCtrl
 * @description
 * # ShowviewCtrl
 * Controller of the dvdRentalFrontendApp
 */
angular.module('dvdRentalFrontendApp')
  .controller('ShowviewCtrl', function ($state, ShowService) {
    var vm = this;
    vm.loadPersonView = loadPersonView;
    activate();
    function activate(){
      vm.show = ShowService.get({id : $state.params.id});
    }

   function loadPersonView(id){
       $state.go('personView',{id : id})
   }
  });

(function(){
  'use strict';

  angular.module('dvdRentalFrontendApp')

      .directive('tabClickListener', function($state){
          return {
              restrict: 'A',
              link: function(scope, element, attrs, ctrl) {
                          element.bind('click', function(event) {
                              $state.go(attrs['tabClickListener']);
                    });
               }
          };
       });
})();

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
        return $resource('/api/v1/movies/popular', { id: '@_id' }, {
          'get': {
                   url: 'api/v1/movies/details/:id',
                   method: 'GET',
                },
          queryAll: {
                    url: 'api/v1/movies/popular',
                    method: 'GET',
                    isArray : true
          }
        });
    })
    .factory('ShowService',function($resource){
        return $resource('/api/v1/shows/popular', { id: '@_id'}, {
          'get': {
                   url: 'api/v1/shows/details/:id',
                   method: 'GET',
                },
          queryAll: {
                    url: 'api/v1/shows/popular',
                    method: 'GET',
                    isArray : true
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

/**
 * AngularJS Tmdb API
 * @version v0.3.0 - 2015-05-25
 * @link https://github.com/gnalFF/lub-tmbd
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

/**
 * Module configuring basic api setup
 */
angular.module('lub-tmdb-config', [])
    .value('lubTmdbBaseURL','http://api.themoviedb.org/3/')
    .value('lubTmdbApiKey','')
    .value('lubTmdbConnectionMethod','jsonp')
    .value('lubDefaultCache',true);

/**
 * Module dealing with configuration
 * http://docs.themoviedb.apiary.io/#configuration
 */
angular.module('lub-tmdb-api-configuration', ['lub-tmdb-config', 'lub-tmdb-http'])
    .factory('lubTmdbApiConfiguration', ["lubTmdbHTTP",function (lubTmdbHTTP) {
        return {
            get:function (options) {
                return lubTmdbHTTP(angular.extend({}, options, {
                    url:'configuration'
                }));
            }
        };
    }]);

angular.module('lub-tmdb-api-change', ['lub-tmdb-http', 'lub-tmdb-config'])
    .factory('lubTmdbApiChange', ["lubTmdbHTTP", function (lubTmdbHTTP) {
    return {
        movie:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:"movie/changes"
            }));
        },
        person:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:"person/changes"
            }));
        }
    };
}]);
/**
 * Created with JetBrains WebStorm.
 * User: gnalFF
 * Date: 15.01.13
 * Time: 10:32
 * To change this template use File | Settings | File Templates.
 */
angular.module('lub-tmdb-api-collection', ['lub-tmdb-config', 'lub-tmdb-http'])
    .factory('lubTmdbApiCollection', ["lubTmdbHTTP", function (lubTmdbHTTP) {
    return {
        collection:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:"collection/" + options.query
            }));
        },
        images:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:"collection/" + options.query + "/images"
            }));
        }
    };
}]);
angular.module('lub-tmdb-api-company', ['lub-tmdb-config', 'lub-tmdb-http'])
    .factory('lubTmdbApiCompany', ["lubTmdbHTTP", function (lubTmdbHTTP) {
    return {
        company:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:"company/" + options.query
            }));
        },
        movies:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:"company/" + options.query + "/movies"
            }));
        }
    };
}]);
angular.module('lub-tmdb-api-genre', ['lub-tmdb-config', 'lub-tmdb-http'])
    .factory('lubTmdbApiGenre', ["lubTmdbHTTP", function (lubTmdbHTTP) {
    return {
        list:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:"genre/list"
            }));
        },
        movies:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:"genre/" + options.query + "/movies"
            }));
        }
    };
}]);
angular.module('lub-tmdb-http', ['lub-tmdb-config'])
    .factory('lubTmdbHTTP', ["$http", "$q", "lubTmdbApiKey", "lubTmdbBaseURL", "lubTmdbConnectionMethod", "lubDefaultCache", function ($http, $q, lubTmdbApiKey, lubTmdbBaseURL, lubTmdbConnectionMethod, lubDefaultCache) {
    return function (options) {
        var url = lubTmdbBaseURL + options.url;
        var params = angular.extend({}, options.params, {
            api_key:lubTmdbApiKey,
            page : options.page
        });
        if (lubTmdbConnectionMethod === 'jsonp') {
            params.callback = 'JSON_CALLBACK';
        }
        return $http[lubTmdbConnectionMethod](url, {
            params:params,
            cache:angular.isDefined(options.cache) ? options.cache : lubDefaultCache
        });
    };
}]);
angular.module('lub-tmdb-api-keyword', ['lub-tmdb-config', 'lub-tmdb-http'])
    .factory('lubTmdbApiKeyword', ["lubTmdbHTTP", function (lubTmdbHTTP) {
    return {
        keyword:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:"keyword/" + options.query
            }));
        },
        movies:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:"keyword/" + options.query + "/movies"
            }));
        }
    };
}]);
angular.module('lub-tmdb-api-list', ['lub-tmdb-http'])
    .factory('lubTmdbApiList', ["lubTmdbHTTP", function (lubTmdbHTTP) {
    return {
        list:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:"list/" + options.query
            }));
        }
    };
}]);
/**
 * Module dealing with movie related stuff.
 * http://docs.themoviedb.apiary.io/#movies
 */
angular.module("lub-tmdb-api-movie", ['lub-tmdb-config', 'lub-tmdb-http'])
    .factory('lubTmdbApiMovie', ["$q", "lubTmdbHTTP", function ($q, lubTmdbHTTP) {
    var noQuery = ['latest', 'upcoming', 'now_playing', 'popular', 'top_rated'];
    var get = function (options, type) {
        var opts = options || {};
        var action = type === '' ? '' : ('/' + type);
        if (noQuery.indexOf(type) >= 0) {
            delete opts.query;
        }
        if (!opts.query) {
            if (noQuery.indexOf(type) < 0) {
                return $q.reject();
            }
        } else {
            action = '/' + opts.query + action;
        }
        return lubTmdbHTTP(angular.extend({}, opts, {
            url:'movie' + action
        }));
    };
    return {
        movie:function (options) {
            return get(options, '');
        },
        alternativeTitles:function (options) {
            return get(options, 'alternative_titles');
        },
        casts:function (options) {
            return get(options, 'casts');
        },
        images:function (options) {
            return get(options, 'images');
        },
        keywords:function (options) {
            return get(options, 'keywords');
        },
        releases:function (options) {
            return get(options, 'releases');
        },
        trailers:function (options) {
            return get(options, 'trailers');
        },
        translations:function (options) {
            return get(options, 'translations');
        },
        similarMovies:function (options) {
            return get(options, 'similar_movies');
        },
        lists:function (options) {
            return get(options, 'lists');
        },
        changes:function (options) {
            return get(options, 'changes');
        },
        latest:function (options) {
            return get(options, 'keywords');
        },
        upcoming:function (options) {
            return get(options, 'upcoming');
        },
        nowPlaying:function (options) {
            return get(options, 'now_playing');
        },
        popular:function (options) {
            return get(options, 'popular');
        },
        topRated:function (options) {
            return get(options, 'top_rated');
        }
    };
}]);
angular.module('lub-tmdb-api-people', ['lub-tmdb-http'])
    .factory('lubTmdbApiPeople', ["lubTmdbHTTP", function (lubTmdbHTTP) {
    return {
        person:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:'person/' + options.query
            }));
        },
        credits:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:'person/' + options.query + "/credits"
            }));
        },
        images:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:'person/' + options.query + "/images"
            }));
        },
        changes:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:'person/' + options.query + "/changes"
            }));
        },
        latest:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:'person/latest'
            }));
        },
        popular:function (options) {
            return lubTmdbHTTP(angular.extend({}, options, {
                url:'person/popular'
            }));
        }
    };
}]);
/**
 * Module dealing with search related stuff.
 * http://docs.themoviedb.apiary.io/#search
 */
angular.module('lub-tmdb-api-search', ['lub-tmdb-config', 'lub-tmdb-http'])
    .factory('lubTmdbApiSearch', ["lubTmdbHTTP", function (lubTmdbHTTP) {
    var get = function (type, options) {
        var opts = angular.extend({}, {
            params:{}
        }, options);
        opts.params.query = opts.query;
        return lubTmdbHTTP(angular.extend({}, opts, {
            url:'search/' + type
        }));
    };
    return {
        movie:function (options) {
            return get('movie', options);
        },
        collection:function (options) {
            return get('collection', options);
        },
        person:function (options) {
            return get('person', options);
        },
        list:function (options) {
            return get('list', options);
        },
        company:function (options) {
            return get('company', options);
        },
        keyword:function (options) {
            return get('keyword', options);
        },
        multi:function (options) {
            return get('multi', options);
        }
    };
}]);

/**
 * Module dealing with tv related stuff.
 * http://docs.themoviedb.apiary.io/#tv
 */
angular.module("lub-tmdb-api-tv", ['lub-tmdb-config', 'lub-tmdb-http'])
    .factory('lubTmdbApiTv', ["$q", "lubTmdbHTTP", function ($q, lubTmdbHTTP) {
    var noQuery = ['latest', 'airing_today', 'on_the_air', 'popular', 'top_rated'];

  /*var get = function (options, type) {
        var opts = options || {};
        var action = type === '' ? '' : ('/' + type);
        return lubTmdbHTTP(angular.extend({}, opts, {
            url:'tv/' + action
        }));*/
        var get = function (options, type) {
            var opts = options || {};
            var action = type === '' ? '' : ('/' + type);
            if (noQuery.indexOf(type) >= 0) {
                delete opts.query;
            }
            if (!opts.query) {
                if (noQuery.indexOf(type) < 0) {
                    return $q.reject();
                }
            } else {
                action = '/' + opts.query + action;
            }
            return lubTmdbHTTP(angular.extend({}, opts, {
                url:'tv' + action
            }));
    };
    return {
        tv:function (options) {
            return get(options, '');
        },
        alternativeTitles:function (options) {
            return get(options, 'alternative_titles');
        },
        images:function (options) {
            return get(options, 'images');
        },
        keywords:function (options) {
            return get(options, 'keywords');
        },
        videos:function (options) {
            return get(options, 'videos');
        },
        translations:function (options) {
            return get(options, 'translations');
        },
        similar:function (options) {
            return get(options, 'similar');
        },
        changes:function (options) {
            return get(options, 'changes');
        },
        latest:function (options) {
            return get(options, 'keywords');
        },
        airingToday:function (options) {
            return get(options, 'airing_today');
        },
        onTheAir:function (options) {
            return get(options, 'on_the_air');
        },
        popular:function (options) {
            return get(options, 'popular');
        },
        topRated:function (options) {
            return get(options, 'top_rated');
        },
        credits:function (options) {
            return get(options, 'credits');
        }
    };
}]);
angular.module('lub-tmdb-api', ['lub-tmdb-api-movie',
    'lub-tmdb-api-search',
    'lub-tmdb-api-configuration',
    'lub-tmdb-api-collection',
    'lub-tmdb-api-people',
    'lub-tmdb-api-list',
    'lub-tmdb-api-change',
    'lub-tmdb-api-keyword',
    'lub-tmdb-api-genre',
    'lub-tmdb-api-company',
    'lub-tmdb-api-tv'])
    .factory('lubTmdbApi', [
    "lubTmdbApiSearch",
    "lubTmdbApiConfiguration",
    "lubTmdbApiMovie",
    "lubTmdbApiCollection",
    "lubTmdbApiPeople",
    "lubTmdbApiList",
    "lubTmdbApiCompany",
    "lubTmdbApiGenre",
    "lubTmdbApiKeyword",
    "lubTmdbApiChange",
    "lubTmdbApiTv",
    function (lubTmdbApiSearch, lubTmdbApiConfiguration, lubTmdbApiMovie, lubTmdbApiCollection, lubTmdbApiPeople, lubTmdbApiList, lubTmdbApiCompany, lubTmdbApiGenre, lubTmdbApiKeyword, lubTmdbApiChange, lubTmdbApiTv) {
        return {
            search:lubTmdbApiSearch,
            configuration:lubTmdbApiConfiguration,
            movie:lubTmdbApiMovie,
            collection:lubTmdbApiCollection,
            people:lubTmdbApiPeople,
            list:lubTmdbApiList,
            company:lubTmdbApiCompany,
            genre:lubTmdbApiGenre,
            keyword:lubTmdbApiKeyword,
            change:lubTmdbApiChange,
            tv:lubTmdbApiTv
        };
    }]);

// John Papa [Style Y070] One directive per file
(function(){
  'use strict';

  angular
    .module('dvdRentalFrontendApp')
    // John Papa [Style Y073] Unique directive prefix mdb
    .directive('mdbBackdrop', mdbBackdrop);

  mdbBackdrop.$inject = []

  function mdbBackdrop() {
    // John Papa [Style Y075] Use controller as syntax with a directive to be consistent with using controller as with view and controller pairings
    var directive = {
      restrict    : 'E',
      link        : link,
      scope       : {
        path: '='
      },
      templateUrl : 'views/backdrop.directive.html'
    };
    /* jshint unused:false */
    function link(scope, element, attrs) {
      var img = angular.element(element[0].querySelector('img'));

      img.on('load', function(){
        scope.$apply(function(){
          scope.loaded = true;
        });
      });
    }

    return directive;
  }

})();
