class PhaseService {
	constructor(phaseEnum) {
		this._phaseEnum = phaseEnum;
		this._currentPhase = this._phaseEnum.SETUPI;
	}

	get currentPhase() {
		return this._currentPhase;
	}

	addPhaseCondition() {}

	isFactionSelectionPhase() {
		return this._currentPhase == this._phaseEnum.SETUPI;
	}
}

export {PhaseService}