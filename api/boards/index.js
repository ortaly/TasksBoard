const { Router } = require('express');

const { getBoard, createBoard, updateBoard, deleteBoard } = require('./boards.controller');
const router = new Router();

router
    .route('/')
    .post(createBoard);

router
  .route('/:boardId')
  .get(getBoard)
  .put(updateBoard)
  .delete(deleteBoard);


module.exports = router;