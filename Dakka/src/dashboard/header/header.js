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
					scope.playerName = authData.password.email;
				}

				loginService.onAuth(setUsername);

				//if (loginService.isLoggedIn()) {
				//	var player = loginService.getLoggedInPlayer();
					
					
				//}
			}
    	}
	}]);


