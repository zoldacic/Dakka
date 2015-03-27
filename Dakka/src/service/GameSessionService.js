
import {GameSession} from '../model/virtual/GameSession'
import {Player} from '../model/virtual/Player'

class GameSessionService { 
    constructor($q, $state, firebaseService, loginService, setupService) {
        this._$q = $q;
        this._$state = $state;
		this._firebaseService = firebaseService;
		this._loginService = loginService;
		this._setupService = setupService;

		this._gameSessions = [];
		this._gameSessions.stale = true;
    }

	continueGameSession(gameSession) {
		this._setupService.init(gameSession.gameId);
		this._$state.go('dashboard.table'); 
	}

	createGameSession(game, players) {
		let gameRef = null;

		// Reset list with game sessions
		this._gameSessions.stale = true;
		
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
			return this._loginService.getLoggedInPlayer().
				then((loggedInPlayer) => { 
					players.push(loggedInPlayer); 
				}).
				then(() => {
					let templateAreas = this._firebaseService.getObjectRef("templates/" + game.id + '/cardAreas');
					return templateAreas.$loaded().then(addCardAreasForPlayers);				
				});
		}

		let addGameSessionToGameSessions = (gameSessions, players) => {
			return gameSessions.$add({ gameId: gameSession.gameId, created: gameSession.created });
		};

		let gameSession = new GameSession(game.id, Date.now());
		let gameSessions = this._firebaseService.getRef("gameSessions");

		gameSessions.$loaded().
			then(() => { return addGameSessionToGameSessions(gameSessions, players); }).
    		then(createCardAreasForPlayers).
            then(() => { return this._setupService.init(gameRef); }).
    		then(() => { this._$state.go('dashboard.table'); });
	}

	gameSessions() {
		let _this = this;

		let addGameSessions = (loggedInPlayer) => {
			let playerGameSessionsRef = _this._firebaseService.getRef("players/" + loggedInPlayer.id + "/gameSessions");

			_this._gameSessions = [];
			_this._gameSessions.stale = false;
			return playerGameSessionsRef.$loaded().then((playerGameSessionsRef) => {
				let sessionPromises = [];
				angular.forEach((playerGameSessionRef, sessionKey) => { 
					let gameSessionsRef = _this._firebaseService.getObjectRef("gameSessions/" + sessionKey);
					sessionPromises.push(gameSessionsRef.$loaded().then((gameSessionsRef) => {
						_this._gameSessions.push(new GameSession(gameSessionsRef.gameId, gameSessionsRef.created)); 
					}));					
				});

				return _this._$q.all(sessionPromises);
			});
		};

		//if (_this._gameSessions.stale) {
			return _this._loginService.getLoggedInPlayer().
				then(addGameSessions).
				then(() => { return _this._gameSessions; });					
	
		//} else {
		//	return new Promise((resolve, reject) => { resolve(_this._gameSessions);	});		
		//} 


		
	}
}

export {GameSessionService}