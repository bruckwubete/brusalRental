  angular.module('dvdRentalFrontendApp').run(function($rootScope, $state, $auth){
    $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams, options){
            if(toState.name != 'signIn'){
                $auth.validateUser().catch(function(resp){
                event.preventDefault();
                $state.go('signIn', {}, {reload : true});
            });
                
            }
    })
})
.config(['$httpProvider', function($httpProvider){
     $httpProvider.interceptors.push('authInterceptor');
}])
