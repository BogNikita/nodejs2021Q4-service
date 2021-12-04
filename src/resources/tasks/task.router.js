const router = require('express').Router();
const tasksService = require('./task.service');

router.route('/:boardId/tasks/').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAll(boardId);
  res.json(tasks);
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
  const { id } = req.params;
  const task = await tasksService.getTask(id);
  if (task) {
    res.json(task);
  } else {
    res.sendStatus(404);
  }
});

router.route('/:boardId/tasks/').post(async (req, res) => {
  const { boardId } = req.params;
  const { title, order, description, userId, columnId } = req.body;
  const task = await tasksService.createTask({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  res.status(201).json(task);
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const task = await tasksService.updateTask(id, body);
  res.json(task);
});

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  const { id } = req.params;
  const result = await tasksService.deleteTask(id);
  if (result) {
    res.sendStatus(204);
  } else {
    res.status(404).json('Not Found');
  }
});

module.exports = router;
