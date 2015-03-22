﻿import {FirebaseService} from '../service/FirebaseService'
import {TableService} from '../table/TableService'
import {CardArea} from '../model/virtual/CardArea'
import {Planet} from '../model/physical/Planet'
import {Card} from '../model/physical/Card'

class SetupService {
	constructor($q, firebaseService, tableService, cardFoldingEnum) { 
		this._$q = $q;
		this._firebaseService = firebaseService;
		this._tableService = tableService;			
		this._cardFoldingEnum = cardFoldingEnum;
	}

	init() {
		let cardAreasDB = this._firebaseService.getRef('cardAreas');
		let planetsDB = this._firebaseService.getRef('cards/planets');
		let planetsDB0 = new Array(
			{ name: 'Atrox', image: '/img/cards/planets/atroxprime.png' },
			{ name: 'Atrox', image: '/img/cards/planets/carnath.jpg' }
			);

		this._$q.all([cardAreasDB.$loaded(), planetsDB.$loaded()]).then(() => angular.forEach(cardAreasDB, (area, key) => {
			let cardArea = new CardArea(cardAreasDB, area, this._cardFoldingEnum);

			if (cardArea.name == 'Planets') {
				angular.forEach(planetsDB0, (planetDB, key) => {
					cardArea.cards.push(new Planet(planetDB.name, '', planetDB.image));	
				});				
			}

			if (cardArea.name == 'My HQ') {
				cardArea.cards.push(new Card("Card0", "", "/img/cards/033-attack-squig-herd.jpg"));
				cardArea.cards.push(new Card("Card1", "", "/img/cards/068-zogworts-runtherders.jpg"));
				cardArea.cards.push(new Card("Card2", "", "/img/cards/069-zogworts-hovel.jpg"));
				cardArea.cards.push(new Card("Card3", "", "/img/cards/070-wyrdboy-stikk.jpg"));
				cardArea.cards.push(new Card("Card4", "", "/img/cards/071-launch-da-snots.jpg"));
			}

			this._tableService.cardAreas.push(cardArea);
			//this._tableService.cardAreas.ref = cardAreasDB;
		}));
	}
}

export {SetupService}