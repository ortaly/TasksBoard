const Joi = require('joi');

const createCard = {
    body: 
        Joi.object().keys({
            title: Joi.string().required().allow(""),
            dueDate: Joi.date(),
            listId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            members: [Joi.string().regex(/^[0-9a-fA-F]{24}$/)]
        })
}

const updateCard = {
    params:
        Joi.object().keys({
            cardId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
    body:
        Joi.object().keys({
            title: Joi.string(),
            dueDate: Joi.date(),
            listId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            members: [Joi.string().regex(/^[0-9a-fA-F]{24}$/)]
        })
}

const deleteCard = {
    params:
        Joi.object().keys({
            cardId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
}

module.exports = {
    createCard,
    updateCard,
    deleteCard
}