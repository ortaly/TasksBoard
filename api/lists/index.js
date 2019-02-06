const { Router } = require('express');

const { getLists, createList, renameList, deleteList } = require('./lists.controller');
const router = new Router();

router
  .route('/:boardId')
  .get(getLists)
  .post(createList);

router
    .route('/:listId')
    .put(renameList)
    .delete(deleteList);


module.exports = router;