const { Router } = require('express');

const { login, createUser} = require('./users.controller');
const router = new Router();

router
  .route('/login')
  .post(login);

router
    .route('/create')
    .post(createUser);


module.exports = router;