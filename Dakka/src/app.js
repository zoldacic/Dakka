import {MainController} from './model/Main';
import {HomeController} from './home/HomeController';
import {PlaygroundController} from './playground/PlaygroundController';
import {FirebaseService} from './service/FirebaseService';

angular
	.module('app', ['ngRoute', 'firebase', 'ngDragDrop'])
	.service('firebaseService', FirebaseService) 
	.controller('mainController', MainController)
	.controller('homeController', HomeController)
	.controller('playgroundController', PlaygroundController)
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', { templateUrl: '/src/home/home.html' });
		$routeProvider.when('/playground', { templateUrl: '/src/playground/playground.html' });
		$routeProvider.otherwise({ redirectTo: '/playground' });
	}]);