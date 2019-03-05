const { ListsSchema, CardsSchema } = require('../../db/index');

const createList = (req, res) => {
    const newList = req.body;
    return ListsSchema.create({...newList, "cards": []}, (err, list) => {
        if(err) {
            res.send(err);
        }
        res.json(list);
        console.log("New List Created: " + JSON.stringify(list));
    });
}

const renameList = (req, res) => {
    const { listId } = req.params;
    const newName = req.body;
    return ListsSchema.update({_id: listId}, {$set : newName}, (err, list) => { 
        if(err) {
            res.send(err);
        }
        res.json(list);
        console.log("list renamed updated: " + JSON.stringify(list));
    });
}

const deleteList = (req, res) => {
    const { listId } = req.params;
    return ListsSchema.remove({"_id" : listId}, (err, del) => { 
        if(err) {
            res.send(err);
        }
        res.json(del);
        console.log("num of lists deleted: " + JSON.stringify(del.n));

    });
}

const getCards = (req, res) => {
    const { listId } = req.params;
    return CardsSchema.find({"listId" : listId}, (err, cards) => {
        if(err) {
            res.send(err);
        }
        res.json(cards);
        console.log(`cards for ${listId}: ` + JSON.stringify(cards));
    });
}

module.exports = {
    createList,
    renameList,
    deleteList,
    getCards
}