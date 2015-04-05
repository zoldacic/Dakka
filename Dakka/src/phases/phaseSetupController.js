class PhaseSetupController {
	constructor(phaseService, phaseEnum, factionEnum, gameSessionService) {
		this._phaseEnum = phaseEnum;
		this._factionEnum = factionEnum;
		this._phaseService = phaseService;
		this._sessionService = gameSessionService;
	}

	get phase() {
		return this._phaseEnum._SETUPI;
	}

	get factions() {
		return this._factionEnum.all;
	}

	get faction() {
		return this._faction;
	}

	set faction(value) {
		this._faction = value;
	}

	setFaction() {
		this._sessionService.currentPlayerGameSession.faction = faction;
	}
}

export {PhaseSetupController}