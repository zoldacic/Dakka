import {Persona} from './Persona'
import {LoginService} from './LoginService';

class PersonaController {
	constructor(loginService) { 
		this._loginService = loginService;
		this._personas = [
			new Persona("Commander Shadowsun", "img/cards/007-commander-shadowsun.jpg", "shadowsun@dakka.firebaseio.com", "shadowsun"),
			new Persona("Eldorath Starbane", "img/cards/006-eldorath-starbane.jpg", "starbane@dakka.firebaseio.com", "starbane"),
			new Persona("Arya Stark", "img/cards/got/ffg_gallery_11_44722.jpg", "arya@dakka.firebaseio.com", "arya"),
			new Persona("Daenerys Targaryen", "img/cards/got/ffg_gallery_11_125982.jpg", "daenerys@dakka.firebaseio.com", "daenerys")
		];
	}

	get personas() {
		return this._personas;
	}

	login(persona) {
		this._loginService.login(persona.email, persona.password);
	}
}

export {PersonaController}