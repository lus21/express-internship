const Router = require('express').Router;
const handlers = require('../handlers/users');

const router = Router();

router.get('/users', handlers.getUsers);
router.delete('/users/:userId', handlers.deleteUsers);

module.exports = router;