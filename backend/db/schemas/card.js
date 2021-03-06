
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const cardSchema = Schema({
        title: {type: String, required: true},
        dueDate: Date,
        listId: {type: ObjectId, required: true},
        members: [{type: ObjectId}] //array of user id
    },{
        collection: "tasks.cards"    
    }
);

module.exports = {
    cardSchema,
};
