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
        vm.submitLogin = submitLogin;
        vm.omniauthLogin = omniauthLogin;


/////////////////////////////////////////////////////
        activate();

        function activate(){

        }

        function submitLogin(){
          $auth.submitLogin(vm.registrationForm)
              .then(function(resp) {
                   // handle success response
                   FeedbackService.showSuccess("Welcome " + resp.data.name)

                   $state.go('app.movies', {user : resp}, {reload : true});
              }, function(resp) {
                  // handle error response
                  console.log(resp)
                  FeedbackService.showError(resp.reason.toUpperCase() +": " + resp.errors[0]);
              });
        };
        
        function omniauthLogin(appName){
          $auth.authenticate(appName, {
            
          }).then(function(resp){

             FeedbackService.showSuccess("Welcome " + resp.name)
            
             $state.go('app.movies', {user : resp}, {reload:true});
          }).catch(function(resp){
              console.log("in" + appName + " error funciton");
          });
        }
        
       function submitRegistration(){
          $auth.submitRegistration(vm.registrationForm)
              .then(function(resp) {
                   // handle success response
                   //console.log(resp);
                   FeedbackService.showSuccess("SUCCESS! Please Verify your email address to continue")
                   //FeedbackService.showSuccess("Welcome ")
                   $state.go('signIn', {user : resp}, {reload : true});
              }, function(resp) {
                  // handle error response
                  console.log(resp)
                  FeedbackService.showError(resp.statusText.toUpperCase() +": " + resp.data.errors.full_messages[0]);
              });
        };
        
    });
})()
