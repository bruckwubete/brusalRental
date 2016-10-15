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
        vm.Facebooklogin = Facebooklogin;


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
        
        function Facebooklogin(){
          console.log('here');
          $auth.authenticate('facebook', {
            
          }).then(function(resp){
             console.log(resp);
             $state.go('signIn');
          }).catch(function(resp){
             console.log(resp);
          });
        }
        
    });
})()
