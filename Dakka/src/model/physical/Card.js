class Card {
	constructor(title, text, image) {
		this._title = title;
		this._text = text;
		this._image = image;
		
		this._draggable = true;
		this._dragging = false;
	}

	get title() {
		return this._title;
	}

	get text() {
		return this._text;
	}

	get image() {
		return this._image;
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