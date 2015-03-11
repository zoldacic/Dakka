import {TableService} from './TableService';

class TableController {
	constructor(tableService, Lightbox) { 
		this._tableService = tableService;
		this._lightbox = Lightbox;
	}

	get cardAreas() {
		return this._tableService.cardAreas;
	}

	startDragging(event, ui, {card: card}) {
		card.startDragging();
	}

	stopDragging(event, ui, {card: card}) {
		card.stopDragging();
	}

	openLightboxModal(cards, index) {
		if (!cards[index].isDragging) {
			this._lightbox.openModal(cards, index);
		}
	};
}

export {TableController}