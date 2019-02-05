const { Router } = require('express');

const { getListsByBoardId } = require('./lists.controller');
const router = new Router();

router
  .route('/:boardId')
  .get(getListsByBoardId);


module.exports = router;