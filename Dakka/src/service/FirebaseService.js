class FirebaseService {
	constructor($firebase, $firebaseAuth) {
		this._$firebase = $firebase;
		this._$firebaseAuth = $firebaseAuth;
		this._baseUrl = "https://dakka.firebaseio.com/";
	}
	
	getRef(entity) {
		let ref = new Firebase(this._baseUrl + entity);
		let sync = this._$firebase(ref);		
		return sync.$asArray();
	}
	
	getAuthRef() {
		let ref = new Firebase(this._baseUrl);
		let authObj = this._$firebaseAuth(ref);
		return authObj;
	}
}

export {FirebaseService} 