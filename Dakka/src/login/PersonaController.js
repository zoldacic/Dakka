import {Persona} from './Persona'
import {LoginService} from './LoginService';

class PersonaController {
	constructor(loginService, personaService) { 
		this._loginService = loginService;
		this._personaService = personaService;

	}

	get personas() {
		return this._personaService.personas;
	}

	login(persona) {
		this._loginService.login(persona);
	}
}

export {PersonaController}