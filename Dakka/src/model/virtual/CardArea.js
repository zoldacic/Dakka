
class CardArea {
	constructor(ref, cardAreaSettings, cards) { 
		this._ref = ref;
		this._cards = cards;

		this._cardSize = new Array(100, 139);
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

		if (this.cards.length > 1) {
			width = this.getCardPositionLeft(this.cards.length-1) + this._cardSize[0];
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
	
	cardsFn() {
		return {
			getImage: (card) => { 
				let slashIndex = this._ref.imageBase.lastIndexOf("/");
				let filename = this._ref.imageBase.substring(slashIndex + 1);
				return "img/cards/wh40kc/" + filename + ".jpg"; 
			}
		};
	}
	
	set cards(value) {
		this.cards = value;
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
	
	save() {
		this._ref.$save();
	}

	watch(callback) {
		this._ref.$watch(callback);
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
	
	isHidden() {
		return this._cardAreaSettings.isHidden();
	}
}

export {CardArea}