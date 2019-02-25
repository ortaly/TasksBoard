const { Router } = require('express');
const schema = require('./boards.joi.schema');
const { celebrate } = require('celebrate');
const { getBoard, createBoard, updateBoard, deleteBoard, getLists } = require('./boards.controller');
const router = new Router();

router
    .route('/')
    .post(celebrate(schema.createBoard), createBoard);

router
  .route('/:boardId')
  .get(celebrate(schema.getBoard), getBoard)
  .put(celebrate(schema.updateBoard), updateBoard)
  .delete(celebrate(schema.deleteBoard), deleteBoard);
  
router.route('/:boardId/lists')
    .get(celebrate(schema.getLists), getLists);

module.exports = router;