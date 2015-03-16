import {Card} from '../model/Card'
import {AgotCard} from '../model/AgotCard'

class HomeController {
	constructor(firebaseService) {
		this.cards = firebaseService.getRef('cards');
		this.agotcards = firebaseService.getRef('agotcards');
        
		let card0 = new Card();
		this.addCard(card0);

        this.addAgotCards();
	} 

	addCard(card) {
		this.cards.$add({ title: card.title, text: card.text});
	}

    addAgotCards() {
        let agotCard = new AgotCard('The Red Viper', 
            'The Red Viper does not kneel to attack an opponent who controls more characters than you.',
            5,
            'character',
            true,
            'Princes of the Sun',
            'F1');

        var exists = false;
        console.log(this.agotcards);
        for (var i = 0; i < this.agotcards.length; i++) {
            console.log(this.agotcards[i].id);
            if (this.agotcards[i].id == 'F1') {
                exists = true;
                break;
            }
        }
        //this.child('agotcards').once('id', function(snapshot) {
        //    var exists = (snapshot.val() !== null);
        //    if (exists) {
        //        alert('card  exists!');
        //    } else {
        //        alert('card  does not exist!');
        //    }
        //});

        if(!exists) {
            this.agotcards.$add({
                title: agotCard.title, 
                text: agotCard.text,
                cost: agotCard.cost,
                type: agotCard.type,
                unique: agotCard.unique,
                expansion: agotCard.expansion,
                id: agotCard.id,
            });
        }
    }
 
}

export {HomeController}