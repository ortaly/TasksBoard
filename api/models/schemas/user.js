const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = Schema({
        _id: {type: ObjectId, require: true},
        name: {type: String, require: true},
        email: {type: String, require: true},
        boards: [{type: ObjectId, require: true}],
        avatar: String,
        pass: {type: String, require: true}
    },
    {
        collection: "tasks.users"
    }    
);

userSchema.statics.authUser = function(email, pass){
    return this.find({"email": email, "pass": pass});
}

module.exports = {
    userSchema,
};

