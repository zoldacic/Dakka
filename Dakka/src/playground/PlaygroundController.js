import {Card} from '../model/Card'

class PlaygroundController {
	constructor() { 
		this.card0 = new Card("Card0", "", "/img/cards/033-attack-squig-herd.jpg");
		this.card1 = new Card("Card1", "", "/img/cards/033-attack-squig-herd.jpg");
	}

	get cardlist() { 
		return new Array(this.card0, this.card1); //[ new Card(), new Card() ];
	}
}

export {PlaygroundController}