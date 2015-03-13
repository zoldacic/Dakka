'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('app')
	.directive('headerNotification',function(){
		return {
			templateUrl: '/src/dashboard//header/header-notification/header-notification.html',
			restrict: 'E',
			replace: true,
    	}
	});


