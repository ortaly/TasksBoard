const { Router } = require('express');

const { getUser } = require('./users.controller');
const router = new Router();

router
  .route('/')
  .post(getUser);


module.exports = router;