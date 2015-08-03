class Card {
	constructor(ref) {
		this._ref = ref;
		
		this._draggable = true;
		this._dragging = false;
	}

	get id() {
		return this._ref.$id;
	}

	get name() {
		return this._ref.name;
	}

	get image() {
		let slashIndex = this._ref.imageBase.lastIndexOf("/");
		let filename = this._ref.imageBase.substring(slashIndex + 1);
		return "img/cards/wh40kc/" + filename + ".jpg";
	}

	set draggable(value) {
		this._draggable = value;
	}

	get draggable() {
		return this._draggable;
	}

	get isDragging() {
		return this._dragging;
	}

	startDragging() {
		this._dragging = true;
	}

	stopDragging() {
		this._dragging = false;
	}
}

export {Card}