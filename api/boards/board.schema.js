
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const boardSchema = Schema({
        name: {type: String, required: true},
        members: [{type: ObjectId}] //array of user id
    },
    {
        collection: "tasks.boards"
    }  
);

const BoardsSchema = mongoose.model('Board', boardSchema);

module.exports = {
    BoardsSchema
};
