class FactionEnum {
	constructor() {
		this._ORKS  = { name: "Orks", text: "Orks" };
		this._SPACEMARINES = { name: "SpaceMarines", text: "Space Marines" };
	}

	get ORKS() { return this._ORKS; }
	get SPACEMARINES() { return this._SPACEMARINES; }

	get all() {
		return [this.ORKS, this.SPACEMARINES];
	}
}

export {FactionEnum}
