import {Card} from '../model/physical/card';

class PhaseSetupController {
	constructor($q, $scope, $state, phaseService, phaseEnum, factionEnum, gameSessionService, setupService, firebaseService, tableService, loginService) {
		this._$q = $q;
		this._$scope = $scope;
		this._$state = $state;
		this._phaseEnum = phaseEnum;
		this._factionEnum = factionEnum;
		this._phaseService = phaseService;
		this._setupService = setupService;
		this._gameSessionService = gameSessionService;
		this._firebaseService = firebaseService;
		this._tableService = tableService;
		this._loginService = loginService;
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
		
		let promises = [];
		promises.push(_this._loginService.getLoggedInPlayer());
		promises.push(_this._firebaseService.getCardsRef());
		
		return _this._$q.all(promises).then((result) => {
			let player = result[0];
			let cardsRef = result[1];
			
			let prefix = "Player1";
			if (player.id != _this._gameSessionService.currentGameSession.player1) prefix = "Player2"; 
			
			let cardArea = _this._tableService.cardAreas.filter((element) => { return element.id == prefix + "CardPile"; })[0];
			
			_this._gameSessionService.currentGameSession.deck.members.forEach((member) => {
				let filteredCards = cardsRef.filter((element) => { return element.id == member.cardId; });
				if (filteredCards.length > 0) {
					for (let i=0;i<member.quantity;i++) {
						// May not be needed
						let card = angular.fromJson(angular.toJson(filteredCards[0]));
						card.id += "-" + i;
						card.$id = card.id;
						card.draggable = true;
						if (!card.left) {
							card.left = 0;
							card.top = 0;
						}
						//cardArea.cards.push(new Card(card));
						cardArea.cards.$add(card);
					}
				} else {
					//alert('Card with id: ' + member.cardId	 + " is not in card pool");
				}					
			});	
			
			cardArea.save();
		});		
	}
	
	playerDoneWithPhase() {
		let _this = this;
		_this._phaseService.nextPhase();
		
		_this._setupService.init(_this._gameSessionService.currentGameSession)
			.then(() => { _this._gameSessionService.currentGameSession.deck = _this._deck; return _this._gameSessionService.currentGameSession.deck; })
			.then(() => { return _this._addCards(); })
			.then(() => { _this._$state.go('dashboard.table'); });
		
		// if (!this._$scope.$$phase) {
		// 	this._$scope.$apply();
		// }			
	}
}

export {PhaseSetupController}