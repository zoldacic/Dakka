
import {Game} from '../model/virtual/Game'

class GameSetupController {
    constructor(personaService, loginService, gameSessionService, gameTypeEnum) { 
		this._personaService = personaService;
		this._loginService = loginService;
		this._gameSessionService = gameSessionService;

		this._games = [new Game(gameTypeEnum.WH40kC, "Warhammer 40k Conquest"), new Game(gameTypeEnum.AGoT, "A Game of Thrones")];
		this._gameSessions = [];
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
		this._gameSessionService.gameSessions().then((gameSessions) => {
			this._gameSessions = gameSessions;
		});		

		return this._gameSessions;
	}

	isLoggedIn() {
		return this._loginService.isLoggedIn();
	}

	createGameSession() {
		this._gameSessionService.createGameSession(this.game, [this.player]);
	}
}

export {GameSetupController}