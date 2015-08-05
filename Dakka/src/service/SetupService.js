import {FirebaseService} from '../service/FirebaseService'
import {TableService} from '../table/TableService'
import {CardArea} from '../model/virtual/CardArea'
import {CardAreaSettings} from '../model/virtual/CardAreaSettings'
import {Player} from '../model/virtual/Player'
import {Planet} from '../model/physical/Planet'
import {Card} from '../model/physical/Card'

class SetupService {
    constructor(firebaseService, tableService, loginService) { 
		this._firebaseService = firebaseService;
		this._tableService = tableService;			
        this._loginService = loginService;
    }

	init(currentGameSession) {
		let _this = this;
		_this._tableService.clean();

		return _this._loginService.getLoggedInPlayer().
			then((player) => { return _this._firebaseService.getCardAreas(player, currentGameSession.id); }).
			then((cardAreas) => { 
				cardAreas.forEach((cardArea) => {
					// event = child_added, child_removed, child_moved or child_changed 		
					// cardArea.watch((event, key, prevChild) => {
					// 	switch(event) {
					// 		case "child_added": ca
					// 	}
					// });			
					_this._tableService.cardAreas.push(cardArea); 
				});				
			});			
    }
}

export {SetupService}