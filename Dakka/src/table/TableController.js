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
		$(ui.draggable).css({top: 0, left: 0});
	} 

	//stopDraggingCard(event, ui, {card: card}) {
			
	//}.bind(this);

	openLightboxModal(cards, index) {
		if (!cards[index].isDragging) {
			this._lightbox.openModal(cards, index);
		}
	};

	get verifyCardDrop()  {
		let returnFunction = (dragElement) => {
			if (dragElement[0].classList.contains('card')) {
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