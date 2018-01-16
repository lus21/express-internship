const Router = require('express').Router;
const path = require('path');
const glob = require('glob');
const apiRouter = Router();

function initApi(app) {


    glob('**/*.router.js', (err, files) => {
        files.forEach(file => {
            const route = require(path.join(process.cwd(), file));
            apiRouter.use(route);
        });
    });

    app.use('/api', apiRouter);
};

module.exports = initApi;