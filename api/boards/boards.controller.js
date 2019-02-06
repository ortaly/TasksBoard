const { BoardsSchema } = require('./board.schema');

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

const createBoard = (req, res) => {
    const {board, userId} = req.body;
    const members = board.members && board.members.isArray() ? members.push(userId) : [userId] 
    return BoardsSchema.create({"name": board.name, "members" : members}, (err, board) => {
        if(err) {
            res.send(err);
        }
        res.json(board);
        console.log("New Board Created: " + JSON.stringify(board));
    });
}

//members array override (should get the members and merge first)
const updateBoard = (req, res) => {
    const boardId = req.params.boardId;
    const boardPropsToUpdate = req.body;
    // boardToUpdate.upsert = true;
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
        console.log("board deleted: " + JSON.stringify(del));

    });
}

module.exports = {
    getBoard,
    createBoard,
    updateBoard,
    deleteBoard
}

