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

const ListsSchema = mongoose.model('List', listSchema);

module.exports = {
    ListsSchema
};
