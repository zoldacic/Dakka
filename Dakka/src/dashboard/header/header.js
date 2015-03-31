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
			link: function (scope) {

				var setUsername = function (authData) {
					if (authData != null) {
						scope.playerName = authData.password.email;
					} else {
						scope.playerName = "";
					}					
				}

				loginService.onAuth(setUsername);
			}
    	}
	}]);


