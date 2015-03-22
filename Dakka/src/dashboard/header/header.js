'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('app')
	.directive('header',['loginService', function(loginService){
		return {
			templateUrl: '/src/dashboard/header/header.html',
			restrict: 'E',
			replace: true,
			controller: function ($scope) {
				if (loginService.isLoggedIn()) {
					$scope.playerName = loginService.getLoggedInPlayerName();
				}
			}
    	}
	}]);


