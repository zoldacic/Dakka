
import {GameSession} from '../model/virtual/GameSession'
import {PlayerGameSession} from '../model/virtual/PlayerGameSession'
import {Player} from '../model/virtual/Player'

class GameSessionService { 
    constructor($q, $state, firebaseService, loginService, setupService, phaseEnum) {
        this._$q = $q;
        this._$state = $state;
		this._firebaseService = firebaseService;
		this._loginService = loginService;
		this._setupService = setupService;
		this._phaseEnum = phaseEnum;

		this._gameSessions = [];
		this._gameSessions.stale = true;

		this._currentGameSession = null;
		this._currentPlayerGameSession = null;
    }

	get currentGameSession() {
		return this._currentGameSession;
	}

	get currentPlayerGameSession() {
		return this._currentPlayerGameSession;
	}

	continueGameSession(gameSession) {
		this._currentGameSession = gameSession;
		this._setupService.init(gameSession.id);

		this._loginService.getLoggedInPlayer().
			then((player) => { return this._firebaseService.getObjectRef("players/" + player.id + "/gameSessions/" + gameSessionRef).$loaded(); }).
			then((playerGameSession) => { 	this._currentPlayerGameSession = new PlayerGameSession(playerGameSession); }).
			then(() => { this._$state.go('dashboard.table.phaseSetup'); });	
	}

	createGameSession(game, players) {
		let _this = this;
		let gameSessionRef = null;
		
		let addTemplateCardAreasToCommon = (templateAreas) => {
			let gameSession = _this._firebaseService.getObjectRef("common/gameSessions/" + gameSessionRef);
			gameSession.$loaded().
					then((gameSession) => { 
						_this._currentGameSession = new GameSession(gameSession);
						gameSession.cardAreas = templateAreas; }).
		    		then(() => { return gameSession.$save(); });
		};

		let addCardAreaSettingsForPlayers = (templateAreaSettings) => {
				
		    // Clean out '$$'-variables
			templateAreaSettings = angular.fromJson(angular.toJson(templateAreaSettings));

		    let savePromises = [];
            players.forEach((player) => {
            	let playerGameSession = _this._firebaseService.getObjectRef("players/" + player.id + "/gameSessions/" + gameSessionRef);
            	playerGameSession.$loaded().
					then((playerGameSession) => { 
						_this._currentPlayerGameSession = new PlayerGameSession(playerGameSession);
						playerGameSession.cardAreaSettings = templateAreaSettings; }).
		    		then(() => { savePromises.push(playerGameSession.$save()); });
            });

            return this._$q.all(savePromises);
        };	

		// Create card area for the current game session and player from templates
		let createCardAreasForPlayers = (ref) => {
			gameSessionRef = ref.key();

			let promises = [];

			promises.push(_this._firebaseService.getObjectRef("templates/" + game.id + '/cardAreaSettings').$loaded());
			promises.push(_this._firebaseService.getObjectRef("templates/" + game.id + '/cardAreas').$loaded());

			return this._$q.all(promises).
				then((result) => { 
					let promises = [];
					promises.push(addCardAreaSettingsForPlayers(result[0])); 
					promises.push(addTemplateCardAreasToCommon(result[1]));

					return _this._$q.all(promises);
				});				
		}

		let addGameSessionToGameSessions = (gameSessions, players) => {
			let playerList = [];
			players.forEach((player) => {
				playerList.push({ id: player.id, name: player.name });
			});

			return gameSessions.$add({ gameType: game.id, created: Date.now(), phase: _this._phaseEnum.SETUPI, players: playerList });
		};

		let gameSessions = this._firebaseService.getRef("common/gameSessions");

		gameSessions.$loaded().
			then(() => { return _this._loginService.getLoggedInPlayer(); }).
			then((loggedInPlayer) => { players.push(loggedInPlayer); }).
			then(() => { return addGameSessionToGameSessions(gameSessions, players); }).
    		then(createCardAreasForPlayers).
            then(() => { return _this._setupService.init(gameSessionRef); }).
    		then(() => { this._$state.go('dashboard.table.phaseSetup'); });
	}

	gameSessions() {
		let _this = this;

		let addGameSessions = (loggedInPlayer) => {
			let playerGameSessionsRef = _this._firebaseService.getRef("players/" + loggedInPlayer.id + "/gameSessions");

			_this._gameSessions = [];
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

		return _this._loginService.getLoggedInPlayer().
			then((player) => { 
				if (player) {
					return addGameSessions(player).then(() => { return _this._gameSessions; });		
				} else {
					return null;
				}
			});									
	}
}

export {GameSessionService}