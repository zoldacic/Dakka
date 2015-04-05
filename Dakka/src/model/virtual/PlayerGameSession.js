
class PlayerGameSession {
	constructor(ref) {
		this._ref = ref;
	}

	get id() {
		return this._ref.$id;
	}

	get faction() {
		return this._ref.faction;
	}

	set faction(value) {
		this._ref.faction = value;
		this._ref.$save();
	}
}

export {PlayerGameSession}