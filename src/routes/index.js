const managementRouter = require('./management_route');


function route(app) {
    app.use('/',managementRouter);
}

module.exports = route;