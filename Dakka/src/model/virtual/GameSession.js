
class GameSession {
	constructor(game) {
		this._game = game;
		this._created = Date.now();
	}

	get gameId() {
		return this._game.id;
	}

	get created() {
		return this._created;
	}
}

export {GameSession}