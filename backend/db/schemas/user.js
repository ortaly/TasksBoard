const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = Schema({
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        boards: [{type: ObjectId}],
        avatar: String,
        password: {type: String, required: true}
    },
    {
        collection: "tasks.users"
    }    
);

module.exports = {
    userSchema,
};

