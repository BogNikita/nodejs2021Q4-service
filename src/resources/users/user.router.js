const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUser(id);
  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.sendStatus(404);
  }
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const user = await usersService.createUser({ name, login, password });
  res.status(201).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const user = await usersService.updateUser(id, body);
  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const result = await usersService.deleteUser(id);
  if (result) {
    res.sendStatus(204);
  } else {
    res.status(404).json('Not Found');
  }
});

module.exports = router;
