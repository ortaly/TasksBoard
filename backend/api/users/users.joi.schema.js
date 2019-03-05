const Joi = require('joi');

const login = {
    body: 
        Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
        })
}

const createUser = {
    body: 
        Joi.object().keys({
            firstName: Joi.string().alphanum().required(),
            lastName: Joi.string().alphanum().required(),
            email: Joi.string().email().required(),
            avatar: Joi.string(),
            password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
        })
}

const getBoards = {
    params: {}
}

module.exports = {
    login,
    createUser,
    getBoards
}