
class CardAreaSettings {
	constructor(ref, cardFoldingEnum) { 
		this._ref = ref;

		this._cardSize = new Array(100, 139);
		this._cardPadding = 2;
		
		this._cardFoldingEnum = cardFoldingEnum;
		this._cardFolding = this._cardFoldingEnum.OVERLAPPING;

	}

	get id() {
		return this._ref.$id;
	}

	get name() {
		return this._ref.name;
	}	

	get left() {
		return this._ref.left;
	}

	set left(value) {
		if (this._ref.left != value) {
			this._ref.left = value;
			this._ref.$save();
		}
	}

	get top() {
		return this._ref.top;
	}

	set top(value) {
		if (this._ref.top != value) {
			this._ref.top = value;
			this._ref.$save();
		}	
	}

	changeCardDisplay() {
		switch(this._cardFolding) {
			case this._cardFoldingEnum.TOGETHER: 
				this._cardFolding = this._cardFoldingEnum.OVERLAPPING;
				break;
			case this._cardFoldingEnum.OVERLAPPING:
				this._cardFolding = this._cardFoldingEnum.FULL;
				break;
			case this._cardFoldingEnum.FULL:
				this._cardFolding = this._cardFoldingEnum.TOGETHER;
				break;
		}
	}

	getCardPositionLeft(index) {
		let offset = 0;		
		switch(this._cardFolding) {
			case this._cardFoldingEnum.TOGETHER: 
				offset = 0;
				break;
			case this._cardFoldingEnum.OVERLAPPING:
				offset = 20;
				break;
			case this._cardFoldingEnum.FULL:
				offset = this._cardSize[0] + this._cardPadding;
				break;
		}
		return index * offset;
	}

	isExpandable() {
		return this._cardFolding != this._cardFoldingEnum.FULL;
	}
}

export {CardAreaSettings}