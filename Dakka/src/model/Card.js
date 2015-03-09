class Card {
	constructor(title, text, image) {
		this._title = title;
		this._text = text;
		this._image = image;
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

	get drag() {
		return true;
	}
}

export {Card}