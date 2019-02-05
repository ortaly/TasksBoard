
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

const BoardsSchema = mongoose.model('Board', boardSchema);

module.exports = {
    BoardsSchema
};
