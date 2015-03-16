class CardArea {
	constructor(containerRef, ref) { 
		this._containerRef = containerRef;
		this._ref = ref;

		this._cardSize = new Array(100, 139);
		this._cards = [];
		this._rotatedCards = false;
		this._cardPadding = 2;
	}

	get name() {
		return this._ref.name;
	}
		
	get widthInPixels() {
		let width = this._rotatedCards ? this._cardSize[1] * this.widthInCards: this._cardSize[0] * this.widthInCards;
		return width + this._cardPadding * 2;
	}

	get widthInCards() {
		return this._ref.widthInCards;
	}

	get heightInPixels() {
		let height = this._rotatedCards ? this._cardSize[0] * this.heightInCards: this._cardSize[1] * this.heightInCards;
		return height + this._cardPadding * 2;
	}

	get heightInCards() {
		return this._ref.heightInCards;
	}

	get cards() {
		return this._cards;
	}

	get rotatedCards() {
		return this._ref.rotatedCards;
	}

	get left() {
		return this._ref.left;
	}

	set left(value) {
		if (this._ref.left != value) {
			this._ref.left = value;
			this._containerRef.$save(this._ref);
		}
	}

	get top() {
		return this._ref.top;
	}

	set top(value) {
		if (this._ref.top != value) {
			this._ref.top = value;
			this._containerRef.$save(this._ref);
		}	
	}
}

export {CardArea}