
import {GameSession} from '../model/virtual/GameSession'

class GameSessionService { 
	constructor(firebaseService) {
		this._firebaseService = firebaseService;
	}

	createGameSession(game, players) {
	
		let addGameSessionToPlayer = (playerGameSessions, ref) => {
			playerGameSessions.$add({ gameRef: ref.key() });
		}

		let addGameSessionToPlayers = (players, ref) => {
			players.forEach((player) => {
				let playerGameSessions = this._firebaseService.getRef("players/" + player.id + "/gameSessions");
				playerGameSessions.$loaded().then(addGameSessionToPlayer(playerGameSessions, ref));
			});	
		}

		let addGameSessionToGameSessions = (gameSessions, player) => {
			let gameRef = gameSessions.$add({ gameId: gameSession.gameId }).then((ref) => addGameSessionToPlayers(players, ref));
		};

		let gameSession = new GameSession(game);
		let gameSessions = this._firebaseService.getRef("gameSessions");
		gameSessions.$loaded().then(addGameSessionToGameSessions(gameSessions, players));
	}
}

export {GameSessionService}