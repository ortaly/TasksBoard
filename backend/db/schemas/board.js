const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const boardSchema = Schema({
        name: {type: String, required: true},
        members: [{type: ObjectId}]
    },
    {
        collection: "tasks.boards"
    }  
);


module.exports = {
    boardSchema
};
