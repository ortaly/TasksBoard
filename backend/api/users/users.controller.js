const { UsersSchema, BoardsSchema } = require('../../db/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const TOKEN_EXPIRES_HOURS = 2;

const login = (req, res) => {
    const user = req.body;

    UsersSchema.findOne({"email" : user.email}).then((user) => {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err) {
               return res.status(401).json({
                  failed: 'Unauthorized Access'
               });
            }
            if(result) {
                createToken(user, res);
            }
            else {
                res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            }
        });
    })
};

const createToken = (user, res) => {
    const exp = moment().utc().add(TOKEN_EXPIRES_HOURS, 'hours').unix(); // expires in 2 hours
    const JWTToken = jwt.sign({
        exp,
        email: user.email,
        _id: user._id
    }, process.env.SUPER_SECRET);

    return res.status(200).json({
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            id: user._id
        },
        token:JWTToken
    });
}

const createUser = (req, res) => {
    const user = req.body;
    bcrypt.hash(req.body.password, 10, function(err, hashPass){
        if(err) {
           return res.status(500).json({
              error: err
           });
        }
        else {
            UsersSchema.create({...user, "password" : hashPass}, (err, user) => {
                if(err) {
                    res.json(err);
                    return;
                }
                res.json({user});
                createToken(user, res);
                console.log(" New user: " + JSON.stringify(user));
            })
        }
    });  
}


const getBoards = (req, res) => {
    BoardsSchema.find({"members": req.userId}, (err, boards) => {
        if(err) {
            res.send(err);
        }
        res.json(boards);
        console.log("lists: " + JSON.stringify(boards));
    });

}



module.exports = {
    login, 
    createUser,
    getBoards
}

