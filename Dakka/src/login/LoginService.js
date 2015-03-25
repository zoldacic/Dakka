class LoginService {
	constructor($filter, firebaseService) { 
		this._firebaseService = firebaseService;
		this._authRef = firebaseService.getAuthRef();
		this._$filter = $filter;	
		
		if (!this._loggedInPlayer && this.isLoggedIn()) {
			let players = this._firebaseService.getRef("players");
			players.$loaded().then(() => {
				let authData = this._authRef.$getAuth();
				this._loggedInPlayer = this._$filter('filter')(players, {email: authData.password.email})[0];
			}.bind(this));
		}
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
		return this._loggedInPlayer;
	}

	onAuth(callback) {
		this._authRef.$onAuth(callback);
	}
}

export {LoginService}