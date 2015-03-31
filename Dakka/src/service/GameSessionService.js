
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
		this._setupService.init(gameSession);
		this._$state.go('dashboard.table'); 
	}

	createGameSession(game, players) {
		let gameSessionRef = null;

		// Reset list with game sessions
		this._gameSessions.stale = true;
		
		let addCardAreasForPlayers = (templateAreas) => {
				
		    // Clean out '$$'-variables
		    templateAreas = angular.fromJson(angular.toJson(templateAreas));

		    let savePromises = [];

		    let commonCardAreas = this._firebaseService.getObjectRef("common/gameSessions/" + gameSessionRef);
			commonCardAreas.$loaded().
					then((commonCardAreas) => { commonCardAreas.cardAreas = templateAreas; }).
		    		then(() => { savePromises.push(commonCardAreas.$save()); });

            players.forEach((player) => {
            	let playerCardAreas = this._firebaseService.getObjectRef("players/" + player.id + "/gameSessions/" + gameSessionRef);
            	playerCardAreas.$loaded().
					then((playerCardAreas) => { playerCardAreas.cardAreas = templateAreas; }).
		    		then(() => { savePromises.push(playerCardAreas.$save()); });
            });

            return this._$q.all(savePromises);
        };	

		// Create card area for the current game session and player from templates
		let createCardAreasForPlayers = (ref) => {
			gameSessionRef = ref.key();

			// Add current player to list with players
			return this._loginService.getLoggedInPlayer().
				then((loggedInPlayer) => { players.push(loggedInPlayer); }).
				then(() => {
					let templateAreas = this._firebaseService.getObjectRef("templates/" + game.id + '/cardAreas');
					return templateAreas.$loaded().then(addCardAreasForPlayers);				
				});
		}

		let addGameSessionToGameSessions = (gameSessions, players) => {
			return gameSessions.$add({ gameType: game.id, created: Date.now()});
		};

		let gameSessions = this._firebaseService.getRef("common/gameSessions");

		gameSessions.$loaded().
			then(() => { return addGameSessionToGameSessions(gameSessions, players); }).
    		then(createCardAreasForPlayers).
            then(() => { return this._setupService.init(gameSessionRef); }).
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
				playerGameSessionsRef.forEach((playerGameSessionRef) => { 
					let gameSessionsRef = _this._firebaseService.getObjectRef("common/gameSessions/" + playerGameSessionRef.$id);
					sessionPromises.push(gameSessionsRef.$loaded().then((gameSessionsRef) => {
						_this._gameSessions.push(new GameSession(gameSessionsRef)); 
					}));					
				});

				return _this._$q.all(sessionPromises);
			});
		};

		//if (_this._gameSessions.stale) {
		return _this._loginService.getLoggedInPlayer().
				then((player) => { 
					if (player) {
						return addGameSessions(player).then(() => { return _this._gameSessions; });		
					} else {
						return null;
					}
				});		
							
	
		//} else {
		//	return new Promise((resolve, reject) => { resolve(_this._gameSessions);	});		
		//} 


		
	}
}

export {GameSessionService}