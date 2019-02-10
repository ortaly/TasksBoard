const { BoardsSchema } = require('./board.schema');
const { ListsSchema } = require('../lists/list.schema');


const getBoard = (req, res) => {
    const boardId = req.params.boardId;
    return BoardsSchema.findById(boardId, (err, board) => {
        if(err) {
            res.send(err);
        }
        res.json(board);
        console.log("Board: " + JSON.stringify(board));
    });
}

//create board with current user id as member. add member in deferent rest call
const createBoard = (req, res) => {
    const {name, userId} = req.body;
    return BoardsSchema.create({"name" : name, "members" : [userId]}, (err, board) => {
        if(err) {
            res.send(err);
        }
        res.json(board);
        console.log("New Board Created: " + JSON.stringify(board));
    });
}

//for add new member - get members, merge the array and only then update the board with new array
const updateBoard = (req, res) => {
    const boardId = req.params.boardId;
    const boardPropsToUpdate = req.body;
    return BoardsSchema.update({_id: boardId}, {$set : boardPropsToUpdate}, (err, board) => { 
        if(err) {
            res.send(err);
        }
        res.json(board);
        console.log("board updated: " + JSON.stringify(board));
    });
}

const deleteBoard = (req, res) => {
    const boardId = req.params.boardId;
    return BoardsSchema.remove({"_id" : boardId}, (err, del) => { 
        if(err) {
            res.send(err);
        }
        res.json(del);
        console.log("num of boards deleted: " + JSON.stringify(del.n));
    });
}


const getLists = (req, res) => {
    const boardId = req.params;
    return ListsSchema.find(boardId, (err, lists) => {
        if(err) {
            res.send(err);
        }
        res.json(lists);
        console.log("lists: " + JSON.stringify(lists));
    });
}

module.exports = {
    getBoard,
    createBoard,
    updateBoard,
    deleteBoard,
    getLists
}

