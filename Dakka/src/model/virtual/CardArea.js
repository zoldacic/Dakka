class CardArea {
	constructor(containerRef, cardAreaDB) { 
		this._containerRef = containerRef;
		this._cardAreaDB = cardAreaDB;

		this._cardSize = new Array(100, 139);
		this._cards = [];
		this._rotatedCards = false;
		this._cardPadding = 2;
	}

	get name() {
		return this._cardAreaDB.name;
	}
		
	get widthInPixels() {
		let width = this._rotatedCards ? this._cardSize[1] * this.widthInCards: this._cardSize[0] * this.widthInCards;
		return width + this._cardPadding * 2;
	}

	get widthInCards() {
		return this._cardAreaDB.widthInCards;
	}

	get heightInPixels() {
		let height = this._rotatedCards ? this._cardSize[0] * this.heightInCards: this._cardSize[1] * this.heightInCards;
		return height + this._cardPadding * 2;
	}

	get heightInCards() {
		return this._cardAreaDB.heightInCards;
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

	get left() {
		return this._cardAreaDB.left;
	}

	set left(value) {
		if (this._cardAreaDB.left != value) {
			this._cardAreaDB.left = value;
			this._containerRef.$save(this._cardAreaDB);
		}
	}

	get top() {
		return this._cardAreaDB.top;
	}

	set top(value) {
		if (this._cardAreaDB.top != value) {
			this._cardAreaDB.top = value;
			this._containerRef.$save();
		}	
	}
}

export {CardArea}