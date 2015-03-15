import {TableService} from './TableService';

class TableController {
	constructor($filter, tableService, Lightbox) { 
		this._$filter = $filter;
		this._tableService = tableService;
		this._lightbox = Lightbox;
		this._positionedCardAreas = [];
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

	stopDraggingCard(event, ui, {card: card}) {
		card.stopDragging();
	}

	stopDraggingCardArea(event, ui, {cardArea: cardArea}) {
		card.stopDragging();
	}

	openLightboxModal(cards, index) {
		if (!cards[index].isDragging) {
			this._lightbox.openModal(cards, index);
		}
	};

	get verifyCardAreaDrop()  {
		let filter = 5;
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
		}
	}

	getTimes(times) {
		return new Array(times);
	}
}

export {TableController}