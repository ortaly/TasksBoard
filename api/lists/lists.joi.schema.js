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
            title: Joi.string().required()
        }),
    body:
        Joi.object().keys({
            boardId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
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