const Joi = require('joi');

const createList = {
    body:
        Joi.object().keys({
            title: Joi.string().required(),
            boardId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
}

const renameList = {
    params: 
        Joi.object().keys({
            listId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
    body:
        Joi.object().keys({
            title: Joi.string(),
        })
}

const deleteList = {
    params: 
        Joi.object().keys({
            listId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
}

const getCards = {
    params: 
        Joi.object().keys({
            listId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
}

module.exports = {
    createList,
    renameList,
    deleteList,
    getCards
}