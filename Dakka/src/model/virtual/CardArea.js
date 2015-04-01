
class CardArea {
	constructor(ref, cardAreaSettings) { 
		this._ref = ref;

		this._cardSize = new Array(100, 139);
		this._cards = [];
		this._cardPadding = 2;	

		this._cardAreaSettings = cardAreaSettings;
	}

	get id() {
		return this._ref.$id;
	}

	get name() {
		return this._cardAreaSettings.name;
	}
		
	get widthInPixels() {
		let width = this._cardSize[0];

		if (this._cards.length > 1) {
			width = this.getCardPositionLeft(this._cards.length-1) + this._cardSize[0];
		}			
			
		return width + this._cardPadding * 2;
	}

	get heightInPixels() {
		let height = this._rotatedCards ? this._cardSize[0]: this._cardSize[1];
		return height + this._cardPadding * 2;
	}

	get cards() {
		return this._cards;
	}

	get left() {
		return this._cardAreaSettings.left;
	}

	set left(value) {
		this._cardAreaSettings.left = value;
	}

	get top() {
		return this._cardAreaSettings.top;
	}

	set top(value) {
		this._cardAreaSettings.top = value;			
	}

	changeCardDisplay() {
		return this._cardAreaSettings.changeCardDisplay();
	}

	getCardPositionLeft(index) {
		return this._cardAreaSettings.getCardPositionLeft(index);
	}

	isExpandable() {
		return this._cardAreaSettings.isExpandable();
	}
}

export {CardArea}