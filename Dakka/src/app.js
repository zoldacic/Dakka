import {MainController} from './dashboard/MainController';
import {TableController} from './table/TableController';
import {TableService} from './table/TableService';
import {SetupService} from './service/SetupService';
import {LoginService} from './login/LoginService';
import {PlaygroundController} from './playground/PlaygroundController';
import {FirebaseService} from './service/FirebaseService';
import {PersonaController} from './login/PersonaController';
import {CardFoldingEnum} from './enum/CardFoldingEnum';

angular
	.module('app', ['firebase', 'ngDragDrop', 'ngTouch', 'ngAnimate', 'ui.router',  'ui.bootstrap', 'angular-loading-bar',  'bootstrapLightbox'])
	.service('firebaseService', FirebaseService) 
	.service('tableService', TableService)
	.service('setupService', SetupService)
	.service('loginService', LoginService)
	.service('cardFoldingEnum', CardFoldingEnum)
	.controller('mainController', MainController)
	.controller('tableController', TableController)
	.controller('playgroundController', PlaygroundController)
	.controller('personaController', PersonaController)
	.run(["setupService", function(setupService) {
		setupService.init();
	}])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/dashboard/home');

		$stateProvider
			.state('table',			{ url:'/table', templateUrl: '/src/table/table.html'})
			.state('playground',	{ url:'/playground', templateUrl: '/src/playground/playground.html'})
			.state('dashboard',		{ url:'/dashboard', templateUrl: '/src/dashboard/main.html'})
		    .state('dashboard.home',{ url:'/home', controller: 'mainController', templateUrl:'/src/dashboard/home.html'})
			.state('dashboard.table',{ url:'/table', controller: 'tableController', templateUrl:'/src/table/table.html'})
			.state('dashboard.login',{ url:'/login', controller: 'personaController', templateUrl:'/src/login/personas.html'});
	}])
	.config(function (LightboxProvider) {
		LightboxProvider.getImageUrl = card => { return card.image; }
	});


