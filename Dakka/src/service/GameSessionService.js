
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

		this._loginService.getLoggedInPlayer().
			then((player) => { return this._firebaseService.getPlayerGameSession(player, gameSession) }).
			then((playerGameSession) => { 	this._currentPlayerGameSession = playerGameSession; }).
			then(() => { this._$state.go('dashboard.table.phaseSetup'); });	
	}

	createGameSession(game, players) {
		let _this = this;
		
		let addTemplateCardAreasToCommon = (templateAreasRef) => {
			_this._currentGameSession.ref.cardAreas = templateAreasRef; 
			return _this._currentGameSession.ref.$save();
		};

		let addCardAreaSettingsForPlayers = (templateAreaSettingsRef) => {
				
		    // Clean out '$$'-variables
			let templateAreaSettingsRefCopy = angular.fromJson(angular.toJson(templateAreaSettingsRef));

		    let savePromises = [];
            players.forEach((player) => {
            	savePromises.push(_this._firebaseService.getPlayerGameSessionRef(player, _this._currentGameSession).
					then((playerGameSessionRef) => { 
						//_this._currentPlayerGameSession = playerGameSession;
						playerGameSessionRef.cardAreaSettings = templateAreaSettingsRefCopy; 
						return playerGameSessionRef.$save();
					}));
            });

            return this._$q.all(savePromises);
        };	

		// Create card area for the current game session and player from templates
		let createCardAreasForPlayers = () => {
			let promises = [];

			promises.push(_this._firebaseService.getTemplateCardAreaSettingsRef(game));
			promises.push(_this._firebaseService.getTemplateCardAreasRef(game));

			return this._$q.all(promises).
				then((result) => { 
					let promises = [];
					promises.push(addCardAreaSettingsForPlayers(result[0])); 
					promises.push(addTemplateCardAreasToCommon(result[1]));

					return _this._$q.all(promises);
				});				
		}

		let addGameSessionToGameSessions = (gameSessionsRef, players) => {
			let playerList = [];
			players.forEach((player) => { playerList.push({ id: player.id, name: player.name }); });

			return gameSessionsRef.$add({ gameType: game.id, created: Date.now(), phase: _this._phaseEnum.SETUPI, players: playerList }).
				then((id) => { return _this._firebaseService.getGameSession(id.key()); }).
				then((gameSession) => { _this._currentGameSession = gameSession; });
		};

		let gameSessionsRef = null;

		this._firebaseService.getGameSessionsRef().
			then((ref) => { gameSessionsRef = ref; }).
			then(() => { return _this._loginService.getLoggedInPlayer(); }).
			then((loggedInPlayer) => { players.push(loggedInPlayer); }).
			then(() => { return addGameSessionToGameSessions(gameSessionsRef, players); }).
    		then(createCardAreasForPlayers).
            then(() => { return _this.addCardAreasToGameSession(this._currentGameSession); }).
    		then(() => { this._$state.go('dashboard.table.phaseSetup'); });
	}

	gameSessions() {
		let _this = this;

		let addGameSessions = (loggedInPlayer) => {
			return _this._firebaseService.getPlayerGameSessionsRef(loggedInPlayer).
				then((playerGameSessionsRef) => {
					let sessionPromises = [];
					
					playerGameSessionsRef.forEach((playerGameSessionRef) => { 
						sessionPromises.push(_this._firebaseService.getGameSession(playerGameSessionRef.$id).
							then((gameSession) => { return _this.addCardAreasToGameSession(gameSession); }).
							then((gameSession) => { _this._gameSessions.push(gameSession); })		
					)});

					return _this._$q.all(sessionPromises);
				});
		};

		return _this._loginService.getLoggedInPlayer().then((player) => { return addGameSessions(player).then(() => { return _this._gameSessions; }); }); 							
	}

	addCardAreasToGameSession(gameSession) {	
		return this.loadCardAreas(gameSession.id).then(cardAreas => { 
			gameSession.cardAreas = cardAreas; 
			return gameSession;
		});		
	}

	loadCardAreas(gameSessionId) {
		return this._loginService.getLoggedInPlayer().then((player) => {
			return this._firebaseService.getCardAreas(player, gameSessionId);
		});
	}
}

export {GameSessionService}