class Persona {
	constructor(id, name, src, email, password) {
		this._id = id;
		this._name = name;
		this._src = src;
		this._email = email;
		this._password = password;
	}

	get id() { return this._id; }
	get name() { return this._name; }
	get src() { return this._src; }
	get email() { return this._email; }
	get password() { return this._password; }
}

export {Persona}