
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
		let gameRef = null;
		
		// Create card area for the current game session and player from templates
		let createCardAreasForPlayers = () => {		
			
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

		let addGameSessionToPlayer = (playerGameSessions) => {
			return playerGameSessions.$add({ gameRef: gameRef });
		}

		let addGameSessionToPlayers = (players, ref) => {
			// Set global game ref
			gameRef = ref;

			// Add current player to list with players
			players.push(loggedInPlayer);

			// Add current game session to each participating player
			let playersGameSessionsPromises = [];
			players.forEach((player) => {object
				let playerGameSessions = this._firebaseService.getRef("players/" + player.id + "/gameSessions");
				playersGameSessionsPromises.push(playerGameSessions.$loaded().then(() => { return addGameSessionToPlayer(playerGameSessions); })); 
			});	

			return this._$q.all(playersGameSessionsPromises);
		}

		let addGameSessionToGameSessions = (gameSessions, players) => {
			return gameSessions.$add({ gameId: gameSession.gameId });
		};

		let gameSession = new GameSession(game);
		let gameSessions = this._firebaseService.getRef("gameSessions");

		gameSessions.$loaded().
			then(() => { return addGameSessionToGameSessions(gameSessions, players); }).
			then((ref) => { return addGameSessionToPlayers(players, ref.key());	}).
			then(createCardAreasForPlayers);	
	}
}

export {GameSessionService}