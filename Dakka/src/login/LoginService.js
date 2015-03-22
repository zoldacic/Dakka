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

	getLoggedInPlayerName() {
		return this._loggedInPlayer ? this._loggedInPlayer.name : "";
	}
}

export {LoginService}