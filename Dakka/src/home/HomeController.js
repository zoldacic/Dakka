import {Card} from '../model/Card'

class HomeController {
	constructor(firebaseService) {
		this.cards = firebaseService.getRef('cards');

		let card0 = new Card();
		this.addCard(card0);
	} 

	addCard(card) {
		this.cards.$add({ title: card.title, text: card.text});
	}
}

export {HomeController}