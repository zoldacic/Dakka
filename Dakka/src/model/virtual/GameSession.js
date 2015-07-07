
class GameSession {
	constructor(ref) {
		this._ref = ref;
		this._cardAreas = [];
	}

	get ref() {
		return this._ref;
	}

	get phase() {
		return this._ref.phase;
	}

	get id() {
		return this._ref.$id;
	}

	get gameType() {
		return this._ref.gameType;
	}

	get created() {
		return this._ref.created;
	}

	get cardAreas() {
		return this._ref.cardAreas;
	}

	set cardAreas(value) {
		this._cardAreas = value;
	}
}

export {GameSession}