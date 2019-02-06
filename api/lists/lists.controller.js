const { ListsSchema } = require('./list.schema');

const getLists = (req, res) => {
    const boardId = req.params.boardId;
    return ListsSchema.find({"boardId" : boardId}, (err, lists) => {
        if(err) {
            res.send(err);
        }
        res.json(lists);
        console.log("lists: " + JSON.stringify(lists));
    });
}

const createList = (req, res) => {
    const { boardId } = req.params;
    const newList = req.body;

    return ListsSchema.create({...newList, "boardId" : boardId}, (err, list) => {
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
        console.log("list deleted: " + JSON.stringify(del));

    });
}

module.exports = {
    getLists,
    createList,
    renameList,
    deleteList
}