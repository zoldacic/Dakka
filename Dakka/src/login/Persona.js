class Persona {
	constructor(name, src, email, password) {
		this._name = name;
		this._src = src;
		this._email = email;
		this._password = password;
	}

	get name() { return this._name; }
	get src() { return this._src; }
	get email() { return this._email; }
	get password() { return this._password; }
}

export {Persona}