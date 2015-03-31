import {FirebaseService} from '../service/FirebaseService'
import {TableService} from '../table/TableService'
import {CardArea} from '../model/virtual/CardArea'
import {Player} from '../model/virtual/Player'
import {Planet} from '../model/physical/Planet'
import {Card} from '../model/physical/Card'

class SetupService {
    constructor($q, $filter, firebaseService, tableService, loginService, cardFoldingEnum, gameTypeEnum) { 
    	this._$q = $q;
    	this._$filter = $filter;
		this._firebaseService = firebaseService;
		this._tableService = tableService;			
		this._cardFoldingEnum = cardFoldingEnum;
		this._gameTypeEnum = gameTypeEnum;
        this._loginService = loginService;
    }

	initTest() {
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

	init(gameSession) {
		let _this = this;
		_this._tableService.clean();

		//let listCardAreas = (gameSessionRef) => {
		//	let cardAreas = _this._firebaseService.getRef("common/gameSessions/" + gameSessionRef + "/cardAreas");
		//	return cardAreas.$loaded();
		//}

		//let listCardAreaStyles = (player, gameSession) => {
		//	let  cardAreaStyles = _this._firebaseService.getRef("players/" + player.id + "/gameSessions/" + gameSession.id + "/cardAreaStyles");
		//	return cardAreaStyles.$loaded();
		//}

		//let addCardAreaStyleToCardArea = (cardArea, cardAreaStyles) => {
		//	let cardAreaStyle = _this._$filter('filter')(cardAreaStyles, { $id: cardArea.id }, true);
		//	cardArea.style = cardAreaStyle;
		//}

		//let addCardAreaStylesToCardAreas = (cardAreas, cardAreaStyles) => {
		//	cardAreas.forEach((cardArea) => addCardAreaStyleToCardArea(cardArea, cardAreaStyles));		
		//}

		_this._loginService.getLoggedInPlayer().
			then((player) => {
				return listCardAreaStyles(player, gameSession).
					then((cardAreaStyles) => { 
						angular.forEach(gameSession.cardAreas, (area) => {
							let cardArea;
							let cardAreaStyle;
							let promises = [];

							promises.push(_this._firebaseService.getObjectRef("common/gameSessions/" + gameSession.id + "/cardAreas/" + area.id).$loaded().
								then((cd) => { cardArea = new CardArea(cd, this._cardFoldingEnum); }));

							promises.push(_this._firebaseService.getObjectRef("players/" + player.id + "/gameSessions/" + gameSession.id + "/cardAreaStyles/" + area.id).$loaded().
								then((style) => { cardAreaStyle = new CardAreaStyle(style); }));

							_this._$q.all(promises).then(() => { cardArea.style = cardAreaStyle; });
							this._tableService.cardAreas.push(cardArea);
						});
					});
			});

            //let exec = (gameRef) => {
            //	this._tableService.clean();

            //	return this._loginService.getLoggedInPlayer().
			//		then((loggedInPlayer) => { return this._firebaseService.getRef("players/" + loggedInPlayer.id + "/gameSessions/" + gameRef + '/cardAreas');	}).
			//		then((playerCardAreas) => {
			//			return playerCardAreas.$loaded().then(() => {
			//				playerCardAreas.forEach((area) => {
			//					let cardArea = new CardArea(playerCardAreas, area, this._cardFoldingEnum);
			//					this._tableService.cardAreas.push(cardArea);
			//				}.bind(this));
			//			});		
			//		});
			//}.bind(this);

           // exec(gameRef);
    }
}

export {SetupService}