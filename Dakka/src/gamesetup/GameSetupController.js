
import {Game} from '../model/virtual/Game'

class GameSetupController {
	constructor($scope, personaService, loginService, gameSessionService, gameTypeEnum) { 
		this._$scope = $scope;

		this._loadingGameSessions = false;
		this._personaService = personaService;
		this._loginService = loginService;
		this._gameSessionService = gameSessionService;

		this._games = [new Game(gameTypeEnum.WH40kC, "Warhammer 40k Conquest"), new Game(gameTypeEnum.AGoT, "A Game of Thrones")];
		this._gameSessionsInfo = { stale: true, list: [] };
	}

	get games() {
		return this._games;
	}

	get players() {
		return this._personaService.personas;
	}

	get game() {
		return this._game;
	}

	set game(value) {
		this._game = value;
	}

	get player() {
		return this._player;
	}

	set player(value) {
		this._player = value;
	}

	get gameSessions() {
		let _this = this;

		if (!_this._loadingGameSessions) {
			_this._loadingGameSessions = true;
			if (_this._gameSessionsInfo.stale) {
				_this._gameSessionService.gameSessions().then((gameSessions) => {
					_this._gameSessionsInfo.list = gameSessions;
					_this._gameSessionsInfo.stale = false;
					_this._loadingGameSessions = false;
					if(!_this._$scope.$$phase) {
						_this._$scope.$apply();
					}
				});
			}	
		}
			
		return _this._gameSessionsInfo.list;
	}

	isLoggedIn() {
		return this._loginService.isLoggedIn();
	}

	createGameSession() {
		this._gameSessionService.createGameSession(this.game, [this.player]);
	}


	continueGameSession(gameSession) {
		this._gameSessionService.continueGameSession(gameSession);
	}
}

export {GameSetupController}