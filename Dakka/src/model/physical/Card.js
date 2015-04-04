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
		return this._ref._imageBase;
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