const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.getBoard(id);
  if (board) {
    res.json(board);
  } else {
    res.sendStatus(404);
  }
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const board = await boardsService.createBoard({ title, columns });
  res.status(201).json(board);
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const board = await boardsService.updateBoard(id, body);
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const result = await boardsService.deleteBoard(id);
  if (result) {
    res.sendStatus(204);
  } else {
    res.status(404).json('Not Found');
  }
});

module.exports = router;
