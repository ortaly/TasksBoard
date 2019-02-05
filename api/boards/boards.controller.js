const { BoardsSchema } = require('./board.schema');

const getBoard = function(req, res){
    const boardId = req.params.boardId;
    return BoardsSchema.findById(boardId, function(err, board){
        if(err) {
            res.send(err);
        }
        res.json(board);
        console.log("Board: " + JSON.stringify(board));
    });
}

module.exports = {
    getBoard
}

