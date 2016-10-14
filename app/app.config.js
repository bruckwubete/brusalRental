  angular.module('dvdRentalFrontendApp').run(function($rootScope, $state){
    

    $rootScope.$on('auth:invalid', function(e){
         console.log(e);
         console.log($state);
         $state.go('signIn', {reason : e.name});
        }
    )

    $rootScope.$on('auth:session-expired', function(e, $state){
      console.log('2')
       $state.go('signIn', {}, {reload : true});
        }
    )
})
.config(['$httpProvider', function($httpProvider){
     $httpProvider.interceptors.push('authInterceptor');
}])
