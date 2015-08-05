
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
	
	get player1() {
		return this._ref.player1;
	}
	
	set player1(value) {
		this._ref.player1 = value;
	}
	
	get player2() {
		return this._ref.player2;
	}
	
	set player2(value) {
		this._ref.player2 = value;
	}	
}

export {GameSession}