const { Router } = require('express');

const { getBoard } = require('./boards.controller');
const router = new Router();

router
  .route('/:boardId')
  .get(getBoard);


module.exports = router;