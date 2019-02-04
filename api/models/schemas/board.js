
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const boardSchema = Schema({
        _id: {type: ObjectId, require: true},
        name: {type: String, require: true},
        members: [{type: ObjectId, require: true}] //array of user id
    },
    {
        collection: "tasks.boards"
    }  
);

boardSchema.statics.getBoard = function(boardId){
    return this.findById(boardId);
}

module.exports = {
    boardSchema
};
