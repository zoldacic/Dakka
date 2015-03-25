
import {GameSession} from '../model/virtual/GameSession'
import {Player} from '../model/virtual/Player'

class GameSessionService { 
    constructor($q, $state, firebaseService, loginService, setupService) {
        this._$q = $q;
        this._$state = $state;
		this._firebaseService = firebaseService;
		this._loginService = loginService;
        this._setupService = setupService;
    }

	createGameSession(game, players) {
	    let gameRef = null;
		let loggedInPlayer = new Player(this._loginService.getLoggedInPlayer());
		
		let addCardAreasForPlayers = (templateAreas) => {
				
		    // Clean out '$$'-variables
		    templateAreas = angular.fromJson(angular.toJson(templateAreas));

            let savePromises = [];
		    players.forEach((player) => {
		        let playerCardAreas = this._firebaseService.getObjectRef("players/" + player.id + "/gameSessions/" + gameRef);
		        playerCardAreas.$loaded().then((playerCardAreas) => {
		            playerCardAreas.cardAreas = templateAreas;
                    savePromises.push(playerCardAreas.$save());
                });
            });

            return this._$q.all(savePromises);
        };	

		// Create card area for the current game session and player from templates
		let createCardAreasForPlayers = (ref) => {
            gameRef = ref.key();

			// Add current player to list with players
			players.push(loggedInPlayer);

			let templateAreas = this._firebaseService.getObjectRef("templates/" + game.id + '/cardAreas');
            return templateAreas.$loaded().then(addCardAreasForPlayers);
}

		let addGameSessionToGameSessions = (gameSessions, players) => {
			return gameSessions.$add({ gameId: gameSession.gameId, created: gameSession.created });
		};

		let gameSession = new GameSession(game);
		let gameSessions = this._firebaseService.getRef("gameSessions");

		gameSessions.$loaded().
			then(() => { return addGameSessionToGameSessions(gameSessions, players); }).
    		then(createCardAreasForPlayers).
            then(() => { return this._setupService.init(game, gameRef); }).
    		then(() => { this._$state.go('dashboard.table'); });
	}

	gameSessions() {
		return this._loginService.getLoggedInPlayer().
			then((playerRef) => {
				let loggedInPlayer = new Player(playerRef);
				let gameSessions = this._firebaseService.getRef("players/" + loggedInPlayer.id + "/gameSessions");

				return gameSessions.$loaded();
			});
	}
}

export {GameSessionService}