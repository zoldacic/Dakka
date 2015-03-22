import {Persona} from './Persona'

class PersonaService {
	constructor() { 
		this._personas = [
			new Persona("CommanderShadowsun", "Commander Shadowsun", "img/cards/007-commander-shadowsun.jpg", "shadowsun@dakka.firebaseio.com", "shadowsun"),
			new Persona("EldorathStarbane", "Eldorath Starbane", "img/cards/006-eldorath-starbane.jpg", "starbane@dakka.firebaseio.com", "starbane"),
			new Persona("AryaStark", "Arya Stark", "img/cards/got/ffg_gallery_11_44722.jpg", "arya@dakka.firebaseio.com", "arya"),
			new Persona("DaenerysTargaryen", "Daenerys Targaryen", "img/cards/got/ffg_gallery_11_125982.jpg", "daenerys@dakka.firebaseio.com", "daenerys")
		];
	}

	get personas() {
		return this._personas;
	}
}

export {PersonaService}