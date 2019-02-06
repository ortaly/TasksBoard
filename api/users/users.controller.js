// const mongoose = require('mongoose');
const { UsersSchema } = require('./user.schema');

const login = (req, res) => {
    const user = req.body;
    UsersSchema.findOne({"email" : user.email, "pass" : user.pass}, (err, user) => {
        if(err) {
            res.send(err);
        }
        res.json(user);
        console.log("USER LOGEDIN: " + JSON.stringify(user));
    })
};

const createUser = (req, res) => {
    const user = req.body;
    UsersSchema.create(user, (err, user) => {
        if(err) {
            res.send(err);
        }
        res.json(user);
        console.log(" New user: " + JSON.stringify(user));
    })
}

module.exports = {
    login, 
    createUser
}

