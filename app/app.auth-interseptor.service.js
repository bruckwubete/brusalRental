  angular.module('dvdRentalFrontendApp').factory('authInterceptor', ['$q', 'ipCookie', '$location',  function($q, ipCookie, $location) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
    
      if (ipCookie('auth_headers') && !config.headers["access-token"]) {
        config.headers['Access-Token'] = ipCookie('auth_headers')['access-token'] ;
        config.headers['Client'] = ipCookie('auth_headers')['client'];
        config.headers['Expiry'] = ipCookie('auth_headers')['expiry'];
        config.headers['Uid']  =  ipCookie('auth_headers')['uid'];
      }
      return config;
    },
    response : function(response){

      if(response.headers('access-token') && ipCookie('auth_headers')){
        ipCookie('auth_headers', {'access-token' : response.headers('access-token'), 
                                  'client' : response.headers('client'),
                                  'uid' : response.headers('uid'),
                                  'expiry' : response.headers('expiry')
        });
      }
      return response;
    
    },
    responseError: function(response) {
      if (response.status === 401) {
        $location.path('/signin');
        ipCookie.remove('access-token');
      }
      return $q.reject(response);
    }
  };
}])