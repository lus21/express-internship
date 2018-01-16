const Router = require('express').Router;
const userRouter = require('./users');


module.exports = function(app) {
    const apiRouter = Router();

    apiRouter.use(userRouter);

    app.use('/api', apiRouter);
};