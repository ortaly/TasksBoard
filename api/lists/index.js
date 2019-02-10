const { Router } = require('express');
const schema = require('./lists.joi.schema');
const { celebrate } = require('celebrate');
const { createList, renameList, deleteList, getCards } = require('./lists.controller');
const router = new Router();

router
  .route('/')
  .post(celebrate(schema.createList), createList);

router
    .route('/:listId')
    .put(celebrate(schema.renameList), renameList)
    .delete(celebrate(schema.deleteList), deleteList);

router
    .route('/:listId/cards')
    .get(celebrate(schema.getCards), getCards)

module.exports = router;