class Card {
	constructor(title, text, image) {
		//this._containerRef = containerRef;
		//this._ref = ref;

		this._title = title;
		this._text = text;
		this._image = image;
		
		this._draggable = true;
		this._dragging = false;
	}

	get id() {
		return this._title;
		//return this._ref.$id;
	}

	get title() {
		return this._title;
		//return this._ref.title;
	}

	get text() {
		return this._text;
		//return this._ref._text;
	}

	get image() {
		return this._image;
		//return this._ref._image;
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