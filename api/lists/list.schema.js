const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const listSchema = Schema({
        title: {type: String, required: true},
        boardId: {type: ObjectId, required: true},
    },{
        collection: "tasks.lists"
    }
);

const ListsSchema = mongoose.model('List', listSchema);

module.exports = {
    ListsSchema
};
