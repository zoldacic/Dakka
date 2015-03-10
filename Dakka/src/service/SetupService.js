import {FirebaseService} from '../service/FirebaseService'
import {TableService} from '../table/TableService'
import {CardArea} from '../model/virtual/CardArea'
import {Planet} from '../model/physical/Planet'

class SetupService {
	constructor($q, firebaseService, tableService) { 
		this._$q = $q;
		this._firebaseService = firebaseService;
		this._tableService = tableService;			
	}

	init() {
		let cardAreasDB = this._firebaseService.getRef('cardAreas');
		let planetsDB = this._firebaseService.getRef('cards/planets');
		let planetsDB0 = new Array(
			{ name: 'Atrox', image: '/img/cards/planets/atroxprime.png' },
			{ name: 'Atrox', image: '/img/cards/planets/carnath.jpg' }
			);

		this._$q.all([cardAreasDB.$loaded(), planetsDB.$loaded()]).then(() => angular.forEach(cardAreasDB, (area, key) => {
			let cardArea = new CardArea(area.name, area.widthInCards, area.heightInCards);

			if (cardArea.name == 'Planets') {
				cardArea.rotatedCards = true;
				angular.forEach(planetsDB0, (planetDB, key) => {
					cardArea.cards.push(new Planet(planetDB.name, '', planetDB.image));	
				});
				
			}

			this._tableService.cardAreas.push(cardArea);
		}));
	}
}

export {SetupService}