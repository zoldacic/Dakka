
class TableService {
	constructor(phaseService, factionEnum) {
		this._phaseService = phaseService;
		this._factionEnum = factionEnum;
		this._cardAreas = [];
    } 

	get cardAreas() {
		return this._cardAreas;
	}
	
	// set cardAreas(value) {
	// 	this._cardAreas = value;
	// }

	get currentPhase() {
		return this._phaseService.currentPhase;
	}

	clean() {
	    //this._cardAreas = [];
	}

	isFactionSelectionPhase() {
		return this._phaseService.isFactionSelectionPhase();
	}
}

export {TableService}