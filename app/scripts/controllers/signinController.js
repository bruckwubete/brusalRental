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
    .controller('SigninController', function ($state, $auth) {
        var vm = this;
        vm.submitRegistration = submitRegistration;


/////////////////////////////////////////////////////
        activate();

        function activate(){

        }

        function submitRegistration(){
        	console.log(vm.registrationForm);
          $auth.submitLogin(vm.registrationForm)
        .then(function(resp) {
          // handle success response
          $state.go('app.movies');
        })
        .catch(function(resp) {
          // handle error response
          console.log(resp);
        });
    };
        
    });
})()
