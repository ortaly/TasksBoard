const { Router } = require('express');
const users = require('./users');
const boards = require('./boards');
const lists = require('./lists');
const cards = require('./cards');
const router = new Router();

router.use('/login', users);
router.use('/board', boards);
router.use('/list', lists);
router.use('/card', cards);

module.exports = router;