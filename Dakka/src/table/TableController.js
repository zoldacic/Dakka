import {Card} from '../model/physical/Card'
import {CardArea} from '../model/virtual/CardArea'

class TableController {
	constructor(firebaseService) {
		//this.cards = firebaseService.getRef('cards');
		let cardAreasDB = firebaseService.getRef('cardAreas');		

		this._cardAreas = [];
		cardAreasDB.$loaded(() => angular.forEach(cardAreasDB, (area, key) => {
			this._cardAreas.push(new CardArea(cardAreasDB[key].widthInCards, cardAreasDB[key].heightInCards))}
		));
	} 
	
	get cardAreas() {
		return this._cardAreas;
	}
}

export {TableController}