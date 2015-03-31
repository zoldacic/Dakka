
class GameSession {
	constructor(ref) {
		this._ref = ref;
	}

	get id() {
		return this._ref.$id;
	}

	get gameId() {
		return this._ref.gameId;
	}

	get created() {
		return this._ref.created;
	}

	get cardAreas() {
		return this._ref.cardAreas;
	}
}

export {GameSession}