import {TableController} from './table/TableController';
import {PlaygroundController} from './playground/PlaygroundController';
import {FirebaseService} from './service/FirebaseService';

angular
	.module('app', ['ngRoute', 'firebase', 'ngDragDrop'])
	.service('firebaseService', FirebaseService) 
	.controller('tableController', TableController)
	.controller('playgroundController', PlaygroundController)
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/table', { templateUrl: '/src/table/table.html' });
		$routeProvider.when('/playground', { templateUrl: '/src/playground/playground.html' });
		$routeProvider.otherwise({ redirectTo: '/table' });
	}]);