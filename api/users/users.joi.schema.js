const Joi = require('joi');

const login = {
    body: 
        Joi.object().keys({
            email: Joi.string().email().required(),
            pass: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
        })
}

const create = {
    body: 
        Joi.object().keys({
            name: Joi.string().alphanum().required(),
            email: Joi.string().email().required(),
            boards: [Joi.string()],
            avatar: Joi.string(),
            pass: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
        })
}

module.exports = {
    login,
    create
}