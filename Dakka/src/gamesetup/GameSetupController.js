
import {Game} from '../model/virtual/Game'

class GameSetupController {
	constructor(personaService, loginService, gameSessionService) { 
		this._personaService = personaService;
		this._loginService = loginService;
		this._gameSessionService = gameSessionService;

		this._games = [new Game("WH40kC", "Warhammer 40k Conquest"), new Game("AGoT", "A Game of Thrones")];
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

	isLoggedIn() {
		return this._loginService.isLoggedIn();
	}

	createGameSession() {
		this._gameSessionService.createGameSession(this.game, [this.player]);
	}
}

export {GameSetupController}