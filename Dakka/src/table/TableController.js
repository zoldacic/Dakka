import {TableService} from './TableService';

class TableController {
	constructor(tableService, Lightbox) { 
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

	startDragging(event, ui, {card: card}) {
		card.startDragging();
	}

	stopDragging(event, ui, {card: card}) {
		card.stopDragging();
	}

	beforeCardAreaDrop(a,b,c) {
		let i = 0;
	}

	openLightboxModal(cards, index) {
		if (!cards[index].isDragging) {
			this._lightbox.openModal(cards, index);
		}
	};

	// Limit items to be dropped in list1
	get verifyCardAreaDrop()  {
		return {
			accept: function(dragElement) {
				return dragElement[0].classList.contains('cardArea');
			}
		}
	}

	getTimes(times) {
		return new Array(times);
	}
}

export {TableController}