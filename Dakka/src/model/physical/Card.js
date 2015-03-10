class Card {
	constructor(title, text, image) {
		this._title = title;
		this._text = text;
		this._image = image;
		
		this._drag = true;
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

	set drag(value) {
		this._drag = value;
	}

	get drag() {
		return true;
	}

	get isDragging() {
		return this._dragging;
	}

	startDragging() {
		this._dragging = true;
	}
}

export {Card}