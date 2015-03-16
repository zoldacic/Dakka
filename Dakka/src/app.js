import {MainController} from './model/Main';
import {HomeController} from './home/HomeController';
import {FirebaseService} from './service/FirebaseService';

angular
	.module('app', ['ngRoute', 'firebase'])
	.service('firebaseService', FirebaseService) 
	.controller('mainController', MainController)
	.controller('homeController', HomeController)
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', { templateUrl: '/src/home/home.html' });
		$routeProvider.otherwise({ redirectTo: '/home' });
	}]);