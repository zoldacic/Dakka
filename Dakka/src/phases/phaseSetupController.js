import {Card} from '../model/physical/card';

class PhaseSetupController {
	constructor($scope, $state, phaseService, phaseEnum, factionEnum, gameSessionService, setupService, firebaseService, tableService) {
		this._$scope = $scope;
		this._$state = $state;
		this._phaseEnum = phaseEnum;
		this._factionEnum = factionEnum;
		this._phaseService = phaseService;
		this._setupService = setupService;
		this._gameSessionService = gameSessionService;
		this._firebaseService = firebaseService;
		this._tableService = tableService;
	}

	get phase() {
		return this._phaseEnum._SETUPI;
	}

	get decks() {
		let _this = this;
		if (!_this._decks) {
			_this._decks = {};
			_this._firebaseService.getDecksRef().then((decksRef) => { 
				_this._decks = decksRef; 
			});
		}
		
		return _this._decks;
	}

	get deck() {
		return this._deck;
	}

	set deck(value) {
		this._deck = value;
	}

	_addCards() {
		let _this = this;
		
		return _this._firebaseService.getCardsRef().then((cardsRef) => {
				let cardArea = _this._tableService.cardAreas.filter((element) => { return element.id == "MyCardPile"; })[0];
				_this._gameSessionService.currentGameSession.deck.members.forEach((member) => {
					let filteredCards = cardsRef.filter((element) => { return element.id == member.cardId; });
					if (filteredCards.length > 0) {
						for (let i=0;i<member.quantity;i++) {
							// May not be needed
							let card = angular.fromJson(angular.toJson(filteredCards[0]));
							card.id += "-" + i;
							card.$id = card.id;
							cardArea.cards.push(new Card(card));
						}
					} else {
						//alert('Card with id: ' + member.cardId	 + " is not in card pool");
					}
					
				});	
			})
		
	}
	
	playerDoneWithPhase() {
		let _this = this;
		_this._phaseService.nextPhase();
		
		_this._setupService.init(_this._gameSessionService.currentGameSession)
			.then(() => { 
				_this._gameSessionService.currentGameSession.deck = _this._deck; 
				})
			.then(() => { return _this._addCards(); })
			.then(() => { _this._$state.go('dashboard.table') });
		
		// if (!this._$scope.$$phase) {
		// 	this._$scope.$apply();
		// }			
	}
}

export {PhaseSetupController}