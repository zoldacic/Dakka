import {Player} from '../model/virtual/Player'

class LoginService {
	constructor($filter, firebaseService) { 
		this._firebaseService = firebaseService;
		this._authRef = firebaseService.getAuthRef();
		this._$filter = $filter;	
	}

	login(player) {		
		this._authRef.$authWithPassword({email: player.email, password: player.password}).then(() => {
			this._loggedInPlayer = player;	
		});
	} 

	isLoggedIn() {
		return this._authRef.$getAuth() != null;
	}

	getLoggedInPlayer() {
		let promise;
		if (!this._loggedInPlayer && this.isLoggedIn()) {
			let players = this._firebaseService.getRef("players");
			promise = players.$loaded().
				then(() => {
					let authData = this._authRef.$getAuth();
					this._loggedInPlayer = this._$filter('filter')(players, {email: authData.password.email})[0];
					return new Player(this._loggedInPlayer);
				}.bind(this));

		} else if (this._loggedInPlayer && this.isLoggedIn()) {
			promise = new Promise((resolve, reject) => { resolve(new Player(this._loggedInPlayer));	});		
		} else {
			promise = new Promise((resolve, reject) => { resolve(null); })
		}
	
		return promise;
	}

	onAuth(callback) {
		this._authRef.$onAuth(callback);
	}
}

export {LoginService}