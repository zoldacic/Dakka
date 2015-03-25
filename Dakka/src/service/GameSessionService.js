
import {GameSession} from '../model/virtual/GameSession'
import {Player} from '../model/virtual/Player'

class GameSessionService { 
	constructor($q, firebaseService, loginService) {
		this._$q = $q;
		this._firebaseService = firebaseService;
		this._loginService = loginService;
	}

	createGameSession(game, players) {
		let loggedInPlayer = new Player(this._loginService.getLoggedInPlayer());
		
		// Create card area for the current game session and player from templates
		let createCardAreasForPlayers = (ref) => {
            let gameRef = ref.key();

			// Add current player to list with players
			players.push(loggedInPlayer);

			let templateAreas = this._firebaseService.getObjectRef("templates/" + game.id + '/cardAreas');
			templateAreas.$loaded().then((templateAreas) => {
				
				// Clean out '$$'-variables
				templateAreas = angular.fromJson(angular.toJson(templateAreas));

				players.forEach((player) => {
					let playerCardAreas = this._firebaseService.getObjectRef("players/" + player.id + "/gameSessions/" + gameRef);
					playerCardAreas.$loaded().then((playerCardAreas) => {
						playerCardAreas.cardAreas = templateAreas;
						playerCardAreas.$save();
					});
				});

			});	
		}

		let addGameSessionToGameSessions = (gameSessions, players) => {
			return gameSessions.$add({ gameId: gameSession.gameId });
		};

		let gameSession = new GameSession(game);
		let gameSessions = this._firebaseService.getRef("gameSessions");

		gameSessions.$loaded().
			then(() => { return addGameSessionToGameSessions(gameSessions, players); }).
			then(createCardAreasForPlayers);	
	}
}

export {GameSessionService}