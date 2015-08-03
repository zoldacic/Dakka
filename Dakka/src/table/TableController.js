import {TableService} from './TableService';

class TableController {
	constructor($filter, $timeout, tableService, Lightbox) { 
		this._$filter = $filter;
		this._$timeout = $timeout;

		this._tableService = tableService;
		this._lightbox = Lightbox;
		this._positionedCardAreas = [];

		this.stopDraggingCard = (event, ui, {card: card}) => { this._$timeout(() => { card.stopDragging(); }, 500); }.bind(this);
	}

	get cardAreas() {
		return this._tableService.cardAreas;
	}

	get positionedCardAreas() {
		return this._positionedCardAreas;
	}

	get verifyCardDrop()  {
		let returnFunction = (dragElement) => {
			if (dragElement[0].classList.contains('card')) {
				
				// Make frame smaller
				let cardsInStack = $(dragElement[0]).parent().children().length - 1;

				if (cardsInStack == 0) {
					cardsInStack = 1;
				}
				
				return true;
			} else {
				return false;
			}				
		}

		return {
			accept: returnFunction
		};
	}

	get verifyCardAreaDrop()  {
		let _this = this;
		let returnFunction = (dragElement) => {
			if (dragElement[0].classList.contains('cardArea')) {
				let cardAreaName = $(dragElement[0]).find("label")[0].textContent.trim();
				let cardArea = _this._$filter('filter')(_this.cardAreas, {name: cardAreaName}, true)[0];
					
				cardArea.top = dragElement[0].style.top;
				cardArea.left = dragElement[0].style.left;

				return true;
			} else {
				return false;
			}				
		}

		return {
			accept: returnFunction
		};
	}

	isFactionSelectionPhase() {
		return this._tableService.isFactionSelectionPhase();
	}

	startDraggingCard(event, ui, {card: card}) {
		card.startDragging();
	}


	stopDraggingCard(event, ui, {card: card}) {
		let a = 0;
	}

	onCardDrop(event, ui, {cardAreas: cardAreas}) {

		// Start: Silly workaround because I couldnt get ng-model in draggable to work together with manually setting left/top
		// TODO: Optimize all searches, e.g. with for-loop

		// Get card id
		let cardId = ui.draggable.attr('id');

		// Find old card area
		let areaFound = false;

		let findCardAndCardArea = (cardId) => {
			cardAreas.forEach((cardArea) => {

				// There is no "break" in forEach...
				if (!areaFound) {	
					cardArea.cards.forEach((c) => {
						if (c.id == cardId) {
							card = c; 
						}
					});

					if (card) {
						oldCardArea = cardArea;						
						areaFound = true;
					}
				}
			});

			return { cardArea: oldCardArea, card: card };
		}
		
		let { cardArea: oldCardArea, card: card } = findCardAndCardArea(cardId);

		// Move card from old cardArea to new cardArea
		oldCardArea.cards.splice(oldCardArea.cards.indexOf(card), 1);

		let newCardAreaId = $(event.target).parent().attr('id')
		let cardArea = null;
		cardAreas.forEach((c) => {
			if (c.id == newCardAreaId) {
				cardArea = c; 
			}
		});

		cardArea.cards.push(card);

		// Start: Move card in UI
		$(event.target).append(ui.draggable[0]);


		// TODO: GET CARDSIZE FROM ??
		let cardSize = 100;
		let cardsInStack = $(event.target).children().length - 1;
		let left = cardsInStack * 20;
		$(ui.draggable).css({top: '20px', left: left + 'px'});

		// Make frame wider
		if (cardsInStack < 0) {
			cardsInStack = 0;
		}
	
		// End: Move card in UI		

		// End: Silly workaround
	}

	openLightboxModal(cards, index) {
		if (!cards[index].isDragging) {
			this._lightbox.openModal(cards, index);
		}
	};

	getTimes(times) {
		return new Array(times);
	}
}

export {TableController}