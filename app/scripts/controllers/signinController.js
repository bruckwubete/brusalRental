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
    .controller('SigninController', function ($state, $auth, FeedbackService) {
        var vm = this;
        vm.submitRegistration = submitRegistration;
        vm.omniauthLogin = omniauthLogin;


/////////////////////////////////////////////////////
        activate();

        function activate(){

        }

        function submitRegistration(){
          $auth.submitLogin(vm.registrationForm)
        .then(function(resp) {
          // handle success response
          FeedbackService.showSuccess("Welcome " + resp.email);
          $state.go('app.movies', {user : resp}, {reload : true});
        })
        .catch(function(resp) {
          // handle error response
          FeedbackService.showSuccess(resp.reason.toUpperCase() +": " + resp.errors[0]);
          console.log(resp);
        });
        };
        
        function omniauthLogin(appName){
          $auth.authenticate(appName, {
            
          }).then(function(resp){
          	console.log(resp);
             FeedbackService.showSuccess("Welcome " + resp.email);
             $state.go('app.movies', {user : resp}, {reload:true});
          }).catch(function(resp){
          });
        }
        
    });
})()
