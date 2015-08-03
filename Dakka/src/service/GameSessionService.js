
import {GameSession} from '../model/virtual/GameSession'
import {PlayerGameSession} from '../model/virtual/PlayerGameSession'
import {Player} from '../model/virtual/Player'

class GameSessionService { 
    constructor($q, $state, firebaseService, loginService, phaseEnum) {
        this._$q = $q;
        this._$state = $state;
		this._firebaseService = firebaseService;
		this._loginService = loginService;
		this._phaseEnum = phaseEnum;

		this._gameSessions = [];
		this._gameSessions.stale = true;

		this._currentGameSession = null;
    }

	get currentGameSession() {
		return this._currentGameSession;
	}

	continueGameSession(gameSession) {
		this._currentGameSession = gameSession;

		this._loginService.getLoggedInPlayer().
			then(() => { this._$state.go('dashboard.table.phaseSetup'); });	
	}

	createGameSession(game, players) {
		let _this = this;

		let addGameSessionToGameSessions = (gameSessionsRef, players) => {
			let playerList = [];
			players.forEach((player) => { playerList.push({ id: player.id, name: player.name }); });

			return gameSessionsRef.$add({ gameType: game.id, created: Date.now(), phase: _this._phaseEnum.SETUPI, players: playerList }).
				then((id) => { return _this._firebaseService.getGameSession(id.key()); }).
				then((gameSession) => { 
					_this._currentGameSession = gameSession; 
				});
		};
		
		let addTemplateCardAreasToGameSession = (game) => {	
			return (_this._firebaseService.getTemplateCardAreasRef(game).then(templateAreasRef => {
				// Clean out '$$'-variables
				let templateAreasRefCopy = angular.fromJson(angular.toJson(templateAreasRef));
				_this._currentGameSession.ref.cardAreas = { common: templateAreasRefCopy }; 
				return _this._currentGameSession.ref.$save(); 
			}));		
		};		
		
		let addTemplateCardAreaSettingsToGameSession = (game, players) => {	
			return (_this._firebaseService.getTemplateCardAreaSettingsRef(game).then(templateAreaSettingsRef => {
				_this._currentGameSession.ref.cardAreas.settings = {}; 				
				players.forEach((player) => { 
					// Clean out '$$'-variables
					let templateAreaSettingsRefCopy = angular.fromJson(angular.toJson(templateAreaSettingsRef));
					_this._currentGameSession.ref.cardAreas.settings[player.id] = templateAreaSettingsRefCopy;
					
				}); 
				return _this._currentGameSession.ref.$save(); 
			}));		
		};		
		
		let addGameSessionToPlayerGameSessions = () => {
			return _this._firebaseService.getPlayerGameSessionsRef(_this.loggedInPlayer).then((playerGameSessionsRef) => {
				 return playerGameSessionsRef.$add({ gameSessionId: _this._currentGameSession.id });
			});
		};

		let gameSessionsRef = null;

		this._firebaseService.getGameSessionsRef().
			then((ref) => { gameSessionsRef = ref; }).
			then(() => { return _this._loginService.getLoggedInPlayer(); }).
			then((loggedInPlayer) => {
				_this.loggedInPlayer = loggedInPlayer; 
				players.push(loggedInPlayer); 
			}).
			then(() => { return addGameSessionToGameSessions(gameSessionsRef, players); }).
			then(() => { return addTemplateCardAreasToGameSession(game); }).
			then(() => { return addTemplateCardAreaSettingsToGameSession(game, players); }).
			then(() => { return addGameSessionToPlayerGameSessions(); }).
										            
    		then(() => { this._$state.go('dashboard.table.phaseSetup'); });
	}

	gameSessions() {
		let _this = this;

		let addGameSessions = (loggedInPlayer) => {
			return _this._firebaseService.getPlayerGameSessionsRef(loggedInPlayer).then((playerGameSessionsRef) => {
					let sessionPromises = [];
					
					playerGameSessionsRef.forEach((playerGameSessionRef) => { 
						sessionPromises.push(_this._firebaseService.getGameSession(playerGameSessionRef.gameSessionId).
							then((gameSession) => { _this._gameSessions.push(gameSession); })		
					)});

					return _this._$q.all(sessionPromises);
				});
		};

		return _this._loginService.getLoggedInPlayer().then((player) => { 
			return addGameSessions(player).then(() => { return _this._gameSessions; }); }); 							
	}
}

export {GameSessionService}