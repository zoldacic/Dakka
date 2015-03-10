import {TableController} from './table/TableController';
import {TableService} from './table/TableService';
import {SetupService} from './service/SetupService';
import {PlaygroundController} from './playground/PlaygroundController';
import {FirebaseService} from './service/FirebaseService';

angular
	.module('app', ['ngRoute', 'firebase', 'ngDragDrop', 'ngTouch', 'ngAnimate', 'angular-loading-bar',  'bootstrapLightbox'])
	.service('firebaseService', FirebaseService) 
	.service('tableService', TableService)
	.service('setupService', SetupService)
	.controller('tableController', TableController)
	.controller('playgroundController', PlaygroundController)
	.run(["setupService", function(setupService) {
		setupService.init();
	}])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/table', { templateUrl: '/src/table/table.html' });
		$routeProvider.when('/playground', { templateUrl: '/src/playground/playground.html' });
		$routeProvider.otherwise({ redirectTo: '/table' });
	}])
	.config(function (LightboxProvider) {
		LightboxProvider.getImageUrl = card => { return card.image; }
	});


