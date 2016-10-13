  angular.module('dvdRentalFrontendApp').run(function($rootScope){
    

    $rootScope.$on('auth:invalid', function(e, $state){
         console.log(e);
        $state.go('signIn', {}, {reload : true});
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
