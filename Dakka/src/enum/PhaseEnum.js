class PhaseEnum {
	constructor() {
		this._SETUPI  = { name: "SetupI", text: "Setup phase I : Faction selection" };
		this._SETUPII = { name: "SetupII", text: "" };;
	}

	get SETUPI() { return this._SETUPI; }
	get SETUPII() { return this._SETUPII; }
}

export {PhaseEnum}
