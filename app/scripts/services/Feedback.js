'use strict';

/**
 * @ngdoc service
 * @name dvdRentalFrontendApp.factory:MovieService
 * @description
 * # MovieService
 * Service for serving movies from the movie database api
 */
angular.module('dvdRentalFrontendApp')
    .service('FeedbackService', function($mdToast) {
        var vm = this;
        vm.showError =  showError;
        vm.showSuccess = showSuccess;
        
        function showError(message){
            $mdToast.show(
                $mdToast.simple()
                        .textContent(message)
                        
            );
        }
        
        function showSuccess(message){
            $mdToast.show(
                $mdToast.simple()
                        .textContent(message)
                        
            );
        }
      
    });
