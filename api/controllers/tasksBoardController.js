const mongoose = require('mongoose');
const tasksDB = require('../../api/models/index.js');

exports.login = function(req, res) {
    const user = req.body;
    console.log(JSON.stringify(user));
    tasksDB.Users.findOne({"email" : user.email, "pass" : user.pass}, function(err, user){
        if(err) {
            res.send(err);
        }
        res.json(user);
        console.log("USER LOGEDIN: " + JSON.stringify(user));
    })
}

