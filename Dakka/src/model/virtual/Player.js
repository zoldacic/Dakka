class Player {
	constructor(playerRef) { 
		this._ref = playerRef;
	}

	get id() { return this._ref.$id; }
	get name() { return this._ref.name; }
	get src() { return this._ref.src; }
	get email() { return this._ref.email; }
	get password() { return this._ref.password; }
}

export {Player}
