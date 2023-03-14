const homeRouter = require('./home');
const crudRouter = require('./crud');

function route(app) {

    app.use('/crud', crudRouter);
    app.use('/', homeRouter);

}

module.exports = route;