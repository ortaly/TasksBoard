const mongoose = require('mongoose');

const { userSchema } = require('./schemas/user');
const Users = mongoose.model('User', userSchema);

const { boardSchema } = require('./schemas/board');
const Boards = mongoose.model('Board', boardSchema);

const { listSchema } = require('./schemas/list');
const Lists = mongoose.model('List', listSchema);

const { cardSchema } = require('./schemas/card');
const Cards = mongoose.model('Card', cardSchema);



module.exports = {
    Users,
    Boards,
    Lists,
    Cards,
};