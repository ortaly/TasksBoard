
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const cardSchema = Schema({
        _id: {type: ObjectId, require: true},
        title: {type: String, require: true},
        dueDate: Date,
        list: {type: ObjectId, require: true},
        members: [{type: ObjectId, require: true}] //array of user id
    },{
        collection: "tasks.cards"    
    }
);

cardSchema.statics.getCardsByListId = function(listId){
    return this.find({"list" : listId});
}

module.exports = {
    cardSchema,
};
