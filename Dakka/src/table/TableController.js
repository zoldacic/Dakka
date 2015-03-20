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

	startDraggingCard(event, ui, {card: card}) {
		card.startDragging();
	}

	onCardDrop(event, ui) {
		$(event.target).append(ui.draggable[0]);

		// TODO: GET THIS FROM ??
		let cardSize = 100;
		let cardsInStack = $(event.target).children().length - 1;
		let left = -cardsInStack * cardSize + cardsInStack * 20;
		$(ui.draggable).css({top: 0, left: left + 'px'});

		// Make frame wider
		if (cardsInStack < 0) {
			cardsInStack = 0;
		}

		let frameWidth = 104 + cardsInStack * 20;
		$(event.target).css({'min-width':frameWidth + 'px','max-width':frameWidth + 'px'});
	} 

	openLightboxModal(cards, index) {
		if (!cards[index].isDragging) {
			this._lightbox.openModal(cards, index);
		}
	};

	get verifyCardDrop()  {
		let returnFunction = (dragElement) => {
			if (dragElement[0].classList.contains('card')) {
				
				// Make frame smaller
				let cardsInStack = $(dragElement[0]).parent().children().length - 1;

				if (cardsInStack == 0) {
					cardsInStack = 1;
				}

				let frameWidth = 84 + cardsInStack * 20;
				$(dragElement[0]).parent().css({'min-width':frameWidth + 'px','max-width':frameWidth + 'px'});

				// Recalculate positions of remaining cards
				let index = 0;
				angular.forEach($(dragElement[0]).parent().children(), (card, indexWithDraggable) => {

					if (dragElement[0] != card) {
						// TODO: GET THIS FROM ??
						let cardSize = 100;
						let left = -index * cardSize + index * 20;
						$(card).css({top: 0, left: left + 'px'});

						index++;
					}
				});
				
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
		let returnFunction = (dragElement) => {
			if (dragElement[0].classList.contains('cardArea')) {
				let cardAreaName = $(dragElement[0]).find("label")[0].textContent.trim();
				let cardArea = this._$filter('filter')(this.cardAreas, {name: cardAreaName}, true)[0];
					
				cardArea.top = dragElement[0].style.top;
				cardArea.left = dragElement[0].style.left;

				return true;
			} else {
				return false;
			}				
		}.bind(this);

		return {
			accept: returnFunction
		};
	}

	getTimes(times) {
		return new Array(times);
	}
}

export {TableController}