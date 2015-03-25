class GameTypeEnum {
	constructor() {
		this._AGoT = "AGoT";
		this._WH40kC = "WH40kC";
	}

	get AGoT() { return this._AGoT; }
	get WH40kC() { return this._WH40kC; }
}

export {GameTypeEnum}
