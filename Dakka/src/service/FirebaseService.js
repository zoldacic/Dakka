class FirebaseService {
	constructor($firebase) {
		this.$firebase = $firebase;
	}
	
	getRef(entity) {
		let ref = new Firebase("https://dakka.firebaseio.com/" + entity);
		let sync = this.$firebase(ref);		
		return sync.$asArray();
	}	
}

export {FirebaseService} 