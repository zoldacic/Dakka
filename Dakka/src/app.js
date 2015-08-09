import {MainController} from './dashboard/MainController';
import {TableController} from './table/TableController';
import {TableService} from './table/TableService';
import {SetupService} from './service/SetupService';
import {LoginService} from './login/LoginService';
import {PersonaService} from './login/PersonaService';
import {FirebaseService} from './service/FirebaseService';
import {GameSessionService} from './service/GameSessionService';
import {PhaseService} from './service/PhaseService';
import {PlaygroundController} from './playground/PlaygroundController';
import {PersonaController} from './login/PersonaController';
import {GameSetupController} from './gamesetup/GameSetupController';
import {PhaseSetupController} from './phases/PhaseSetupController';

import {CardFoldingEnum} from './enum/CardFoldingEnum';
import {GameTypeEnum} from './enum/GameTypeEnum';
import {PhaseEnum} from './enum/PhaseEnum';
import {FactionEnum} from './enum/FactionEnum';

window.onerror = function(msg, url, line, col, error) {
	var extra = !col ? '' : '\ncolumn: ' + col;
	extra += !error ? '' : '\nerror' + error;
	
	alert("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);
}


angular
	.module('app', ['firebase', 'ngDragDrop', 'ngTouch', 'ngAnimate', 'ui.router',  'ui.bootstrap', 'angular-loading-bar',  'bootstrapLightbox'])
	.service('firebaseService', FirebaseService) 
	.service('tableService', TableService)
	.service('setupService', SetupService)
	.service('loginService', LoginService)
	.service('personaService', PersonaService)
	.service('gameSessionService', GameSessionService)
	.service('phaseService', PhaseService)
	.service('cardFoldingEnum', CardFoldingEnum)
    .service('gameTypeEnum', GameTypeEnum)
	.service('phaseEnum', PhaseEnum)
	.service('factionEnum', FactionEnum)
	.controller('mainController', MainController)
	.controller('tableController', TableController)
	.controller('playgroundController', PlaygroundController)
	.controller('personaController', PersonaController)
	.controller('gameSetupController', GameSetupController)
	.controller('phaseSetupController', PhaseSetupController)
	.run(["setupService", function(setupService) {
		//setupService.initTest();
	}])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/dashboard/home');

		$stateProvider
			.state('table',			{ url:'/table', templateUrl: '/src/table/table.html'})
			.state('playground',	{ url:'/playground', templateUrl: '/src/playground/playground.html'})
			.state('dashboard',		{ url:'/dashboard', templateUrl: '/src/dashboard/main.html'})
		    .state('dashboard.home',{ url:'/home', controller: 'mainController', templateUrl:'/src/dashboard/home.html'})
			.state('dashboard.table',{ url:'/table', controller: 'tableController', templateUrl:'/src/table/table.html'})
			.state('dashboard.table.phaseSetup',{ url:'/phasesetup', controller: 'phaseSetupController', templateUrl:'/src/phases/phaseSetup.html'})
			.state('dashboard.login',{ url:'/login', controller: 'personaController', templateUrl:'/src/login/personas.html'})
			.state('dashboard.gamesetup',{ url:'/gamesetup', controller: 'gameSetupController', templateUrl:'/src/gamesetup/gamesetup.html'});
	}])
	.config(function (LightboxProvider) {
		LightboxProvider.getImageUrl = card => {
			let slashIndex = card.imageBase.lastIndexOf("/");
			let filename = card.imageBase.substring(slashIndex + 1);
			return "img/cards/wh40kc/" + filename + ".jpg";  
		}
	});


