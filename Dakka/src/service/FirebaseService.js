import {GameSession} from '../model/virtual/GameSession'
import {PlayerGameSession} from '../model/virtual/PlayerGameSession'
import {Player} from '../model/virtual/Player'
import {CardArea} from '../model/virtual/CardArea'
import {CardAreaSettings} from '../model/virtual/CardAreaSettings'

class FirebaseService {
	constructor($firebase, $firebaseAuth, $q, cardFoldingEnum) {
		this._$firebase = $firebase;
		this._$firebaseAuth = $firebaseAuth;
		this._$q = $q;
		this._cardFoldingEnum = cardFoldingEnum;

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
	
	getCardsRef() {
		return this.getRef("cards");
	}

	getCardAreasRef(gameSessionId) {
		return this.getRef("gameSessions/" + gameSessionId + "/cardAreas/common");
	}

	getCardArea(gameSessionId, cardAreaRef) {
		return this.getObjectRef("gameSessions/" + gameSessionId + "/cardAreas/common/" + cardAreaRef.$id);
	}
	
	getCardAreaSettings(player, gameSessionId, cardAreaRef) {
		return this.getObjectRef("gameSessions/" + gameSessionId + "/cardAreas/settings/" + player.id + "/" + cardAreaRef.$id);
	}	

	getCardAreas(player, gameSessionId) {		
		return this.getCardAreasRef(gameSessionId).then((cardAreasRef) => { 
			let cardAreas = [];
			let cardAreaPromises = [];
			cardAreasRef.forEach((cardAreaRef) => {
							
				let promises = [];
				promises.push(this.getCardArea(gameSessionId, cardAreaRef));
				promises.push(this.getCardAreaSettings(player, gameSessionId, cardAreaRef));				
							
				cardAreaPromises.push(this._$q.all(promises).then((result) => { 
					let cardAreaSettings = new CardAreaSettings(result[1], this._cardFoldingEnum); 
					cardAreas.push(new CardArea(result[0], cardAreaSettings));
				}));
			});
		
			return this._$q.all(cardAreaPromises).then(() => { return cardAreas; });
		});
	}

	getDecksRef() {
		return this.getRef("decks/public");
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