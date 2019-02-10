const { Router } = require('express');
const schema = require('./users.joi.schema');
const { celebrate } = require('celebrate');
const { login, createUser} = require('./users.controller');
const router = new Router();

router
  .route('/login')
  .post(celebrate(schema.login), login);

router
    .route('/create')
    .post(createUser);

module.exports = router;