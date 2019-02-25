const { Router } = require('express');
const schema = require('./cards.joi.schema');
const { celebrate } = require('celebrate');
const { createCard, updateCard, deleteCard } = require('./cards.controller');
const router = new Router();

router
    .route('/')
    .post(celebrate(schema.createCard), createCard);

router
    .route('/:cardId')
    .put(celebrate(schema.updateCard), updateCard)
    .delete(celebrate(schema.deleteCard), deleteCard);

module.exports = router;