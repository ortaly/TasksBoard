const { Router } = require('express');
const schema = require('./users.joi.schema');
const { celebrate } = require('celebrate');
const { login, createUser, getBoards} = require('./users.controller');
const router = new Router();

router
  .route('/login')
  .post(celebrate(schema.login), login);

router
    .route('/create')
    .post(celebrate(schema.createUser), createUser);

router
    .route('/boards')
    .get(celebrate(schema.getBoards), getBoards);

module.exports = router;