
const { ListsSchema } = require('./list.schema');

const getListsByBoardId = function(req, res){
    const boardId = req.params.boardId;
    return ListsSchema.find({"boardId" : boardId}, function(err, lists){
        if(err) {
            res.send(err);
        }
        res.json(lists);
        console.log("lists: " + JSON.stringify(lists));
    });
}

module.exports = {
    getListsByBoardId
}