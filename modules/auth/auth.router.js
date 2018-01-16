const Router = require('express').Router;
const {
    signIn,
    signUp,
} = require('./auth.controller');

const router = Router();

router.post('/auth/signin', signIn);

module.exports = router;