class CardFoldingEnum {
	constructor() {
		this._TOGETHER = Symbol();
		this._OVERLAPPING = Symbol();
		this._FULL = Symbol();
	}

	get TOGETHER() { return this._TOGETHER; }
	get OVERLAPPING() { return this._OVERLAPPING; }
	get FULL() { return this._FULL; }
}

export {CardFoldingEnum}
