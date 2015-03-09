class CardArea {
	constructor(widthInCards, heightInCards) { 
		this._widthInCards = widthInCards;
		this._heightInCards = heightInCards;

		this._cardSize = new Array(100, 140);
	}

	get widthInPixels() {
		return this._cardSize[0] * this._widthInCards;
	}

	get widthInCards() {
		return this._widthInCards;
	}

	get heightInPixels() {
		return this._cardSize[1] * this._heightInCards;
	}

	get heightInCards() {
		return this._heightInCards;
	}
}

export {CardArea}