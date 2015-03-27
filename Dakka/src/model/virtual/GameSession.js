
class GameSession {
	constructor(gameId, created) {
		this._gameId = gameId;
		this._created = created;
	}

	get gameId() {
		return this._gameId;
	}

	get created() {
		return this._created;
	}
}

export {GameSession}