import {Card} from '../model/physical/Card'
import {CardArea} from '../model/virtual/CardArea'
import {SetupService} from '../service/SetupService'

class TableService {
	constructor() {
	    this._cardAreas = [];
    } 

	get cardAreas() {
		return this._cardAreas;
	}

	clean() {
	    this._cardAreas = [];
    }
}

export {TableService}