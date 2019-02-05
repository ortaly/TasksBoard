const { Router } = require('express');

const { getCardsByListId } = require('./cards.controller');
const router = new Router();

router
  .route('/:listId')
  .get(getCardsByListId);


module.exports = router;