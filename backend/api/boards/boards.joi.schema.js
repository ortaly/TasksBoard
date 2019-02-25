const Joi = require('joi');

const createBoard = {
    body: 
        Joi.object().keys({
            userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            name: Joi.string().required()
        })
}

const getBoard = {
    params:
        Joi.object().keys({
            boardId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
}

const updateBoard = {
    body: 
        Joi.object().keys({
            name: Joi.string(),
            members: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
        })
}

const deleteBoard = {
    params:
        Joi.object().keys({
            boardId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
}

const getLists = {
    params:
        Joi.object().keys({
            boardId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
}

module.exports = {
    createBoard,
    getBoard,
    updateBoard,
    deleteBoard,
    getLists
}