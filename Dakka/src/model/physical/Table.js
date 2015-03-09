class Table {
	constructor(cardAreas) { 
		this._cardAreas = cardAreas;
	}

	get cardAreas() {
		return this._cardAreas;
	}
}

export {Table}