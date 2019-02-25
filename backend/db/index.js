const mongoose = require('mongoose');

const { userSchema } = require('./schemas/user');
const UsersSchema = mongoose.model('User', userSchema);

const { boardSchema } = require('./schemas/board');
const BoardsSchema = mongoose.model('Board', boardSchema);

const { listSchema } = require('./schemas/list');
const ListsSchema = mongoose.model('List', listSchema);

const { cardSchema } = require('./schemas/card');
const CardsSchema = mongoose.model('Card', cardSchema);

module.exports = {
    UsersSchema,
    BoardsSchema,
    ListsSchema,
    CardsSchema,
};
