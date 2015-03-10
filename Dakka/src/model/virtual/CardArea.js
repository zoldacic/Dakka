class CardArea {
	constructor(name, widthInCards, heightInCards) { 
		this._name = name;
		this._widthInCards = widthInCards;
		this._heightInCards = heightInCards;

		this._cardSize = new Array(100, 140);
		this._cards = [];
		this._rotatedCards = false;
	}

	get name() {
		return this._name;
	}
		
	get widthInPixels() {
		return this._rotatedCards ? this._cardSize[1] * this._widthInCards : this._cardSize[0] * this._widthInCards;
	}

	get widthInCards() {
		return this._widthInCards;
	}

	get heightInPixels() {
		return this._rotatedCards ? this._cardSize[0] * this._heightInCards : this._cardSize[1] * this._heightInCards;
	}

	get heightInCards() {
		return this._heightInCards;
	}

	get cards() {
		return this._cards;
	}

	get rotatedCards() {
		return this._rotatedCards;
	}


	set rotatedCards(value) {
		this._rotatedCards = value;
	}
}

export {CardArea}