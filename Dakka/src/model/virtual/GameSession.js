
class GameSession {
	constructor(ref) {
		this._ref = ref;
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
}

export {GameSession}