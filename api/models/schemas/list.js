const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const listSchema = Schema({
        _id: {type: ObjectId, require: true},
        title: {type: String, require: true},
        boardId: [{type: ObjectId, require: true}],
    },{
        collection: "tasks.lists"
    }
);

listSchema.statics.getListsByBoardId = function(boardId) {
    return this.find({"boardId" : boardId});
}

module.exports = {
    listSchema
};
