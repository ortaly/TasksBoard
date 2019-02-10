const { CardsSchema } = require('./card.schema');

const getCards = (req, res) => {
    const { listId } = req.body;
    return CardsSchema.find({"list" : listId}, (err, cards) => {
        if(err) {
            res.send(err);
        }
        res.json(cards);
        console.log("cards: " + JSON.stringify(cards));
    });
}

const createCard = (req, res) => {
    const newCard = req.body;

    return CardsSchema.create({...newCard}, (err, card) => {
        if(err) {
            res.send(err);
        }
        res.json(card);
        console.log("New List Created: " + JSON.stringify(card));
    });
}

//members array override (should get the members and merge first)
const updateCard = (req, res) => {
    const { cardId } = req.params;
    const cardPropsToUpdate = req.body;
    // boardToUpdate.upsert = true;
    return CardsSchema.update({_id: cardId}, {$set : cardPropsToUpdate}, (err, card) => { 
        if(err) {
            res.send(err);
        }
        res.json(card);
        console.log("card updated: " + JSON.stringify(card));

    });
}

const deleteCard = (req, res) => {
    const { cardId } = req.params;
    return CardsSchema.remove({"_id" : cardId}, (err, del) => { 
        if(err) {
            res.send(err);
        }
        res.json(del);
        console.log("card deleted: " + JSON.stringify(del));

    });
}

module.exports = {
    getCards,
    createCard,
    updateCard,
    deleteCard
}

