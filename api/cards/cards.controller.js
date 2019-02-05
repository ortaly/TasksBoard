const { CardsSchema } = require('./card.schema');

const getCardsByListId = function(req, res){
    const listId = req.params.listId;
    return CardsSchema.find({"list" : listId}, function(err, cards){
        if(err) {
            res.send(err);
        }
        res.json(cards);
        console.log("cards: " + JSON.stringify(cards));
    });
}

module.exports = {
    getCardsByListId
}

