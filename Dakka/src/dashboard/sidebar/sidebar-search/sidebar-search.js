'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('app')
  .directive('sidebarSearch',function() {
    return {
    	templateUrl: '/src/dashboard/sidebar/sidebar-search/sidebar-search.html',
		restrict: 'E',
		replace: true,
		scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'home';
      }
    }
  });
