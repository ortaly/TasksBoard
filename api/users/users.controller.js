// const mongoose = require('mongoose');
const { UsersSchema } = require('./user.schema');

const getUser = function(req, res) {
    const user = req.body;
    console.log(JSON.stringify(user));
    UsersSchema.findOne({"email" : user.email, "pass" : user.pass}, function(err, user){
        if(err) {
            res.send(err);
        }
        res.json(user);
        console.log("USER LOGEDIN: " + JSON.stringify(user));
    })
};

module.exports = {
    getUser
}

