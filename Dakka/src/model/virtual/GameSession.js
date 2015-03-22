
class GameSession {
	constructor(game) {
		this._game = game;
	}

	get gameId() {
		return this._game.id;
	}
}

export {GameSession}