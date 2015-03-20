class LoginService {
	constructor($firebaseAuth, firebaseService) { 
		this.$firebaseAuth = $firebaseAuth;
		this.firebaseService = firebaseService;
		this.authRef = firebaseService.getAuthRef();
	}

	login(email, password, callback) {
		if (!callback) callback = (authData) => {}
		this.authRef.$authWithPassword({email: email, password: password}).then(callback);
	} 
}

export {LoginService}