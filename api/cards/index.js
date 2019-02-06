const { Router } = require('express');

const { getCards, createCard, updateCard, deleteCard } = require('./cards.controller');
const router = new Router();

router
    .route('/:listId')
    .get(getCards)
    .post(createCard);

router
    .route('/:cardId')
    .put(updateCard)
    .delete(deleteCard)


module.exports = router;