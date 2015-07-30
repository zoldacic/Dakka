import {GameSession} from '../model/virtual/GameSession'
import {PlayerGameSession} from '../model/virtual/PlayerGameSession'
import {Player} from '../model/virtual/Player'

class FirebaseService {
	constructor($firebase, $firebaseAuth) {
		this._$firebase = $firebase;
		this._$firebaseAuth = $firebaseAuth;

		this._baseUrl = "https://dakka.firebaseio.com/";
	}
	
	getRef(entity) {
		let ref = new Firebase(this._baseUrl + entity);
		let sync = this._$firebase(ref);		
		
		return sync.$asArray().$loaded().
			then((data) => { 
				return data; 
			}).
			catch((error) => { 
				console.error("Error:", error); 
				throw new Error(error);
			});			
	}

	getObjectRef(entity) {
		let ref = new Firebase(this._baseUrl + entity);
		let sync = this._$firebase(ref);		
		return sync.$asObject().$loaded().
			then((data) => { 
				return data; 
			}).
			catch((error) => { 
				console.error("Error:", error); 
				throw new Error(error);
			});		
	}

	getAuthRef() {
		let ref = new Firebase(this._baseUrl);
		let authObj = this._$firebaseAuth(ref);
		return authObj;
	}

	getCardArea(gameSessionId, cardAreaRef) {
		return this.getObjectRef("gameSessions/" + gameSessionId + "/cardAreas/" + cardAreaRef.$id);
	}

	getCardAreas(player, gameSessionId) {		
		return this.getCardAreasRef(gameSessionId).then((cardAreasRef) => { 
			let cardAreas = [];
			cardAreasRef.forEach((cardAreaRef) => {
				let cardAreaSettingsRef = cardAreaRef.settings[player.id];
				let cardAreaSettings = new CardAreaSettings(cardAreaSettingsRef, this._cardFoldingEnum);
				cardAreas.push(new CardArea(cardAreaSettings, cardAreaRef));	
							
				//let promises = [];
				//promises.push(this.getCardAreaSettings(player, gameSessionId, cardAreaRef));
				//promises.push(this.getCardArea(player, gameSessionId, cardAreaRef));
							
// 				return this._$q.all(promises).then((result) => { 
// 					let cardAreaSettings = new CardAreaSettings(result[0], this._cardFoldingEnum); 
// 					cardAreas.push(new CardArea(result[1], cardAreaSettings));
// 
// 					return cardAreas;
// 				});
			});
			
			return cardAreas;
		});
	}

	getCardAreasRef(gameSessionId) {
		return this._firebaseService.getRef("gameSessions/" + gameSessionId + "/cardAreas");
	}

	getCardAreaSettings(player, gameSessionId, cardAreaRef) {
		return this.getObjectRef("players/" + player.id + "/gameSessions/" + gameSessionId + "/cardAreaSettings/" + cardAreaRef.$id);
	}

	getGameSessionsRef() {
		return this.getRef("gameSessions"); 
	}

	getGameSession(gameSessionId) {
		return this.getObjectRef("gameSessions/" + gameSessionId).then((ref) => { 
			return new GameSession(ref); 
			}); 
	}

	getPlayersRef() {
		return this.getRef("players"); 
	}	

	getPlayerGameSessionRef(player, gameSession) {
		return this.getObjectRef("players/" + player.id + "/gameSessions/" + gameSession.id);
	}

	getPlayerGameSessionsRef(player) {
		return this.getRef("players/" + player.id + "/gameSessions");
	}
	
	getTemplateCardAreaSettingsRef(game) {
		return this.getObjectRef("templates/" + game.id + '/cardAreaSettings'); 
	}

	getTemplateCardAreasRef(game) {
		return this.getObjectRef("templates/" + game.id + '/cardAreas'); 
	}
}

export {FirebaseService} 