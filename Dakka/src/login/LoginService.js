class LoginService {
	constructor($firebaseAuth, firebaseService) { 
		this._$firebaseAuth = $firebaseAuth;
		this._firebaseService = firebaseService;
		this._authRef = firebaseService.getAuthRef();

		
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