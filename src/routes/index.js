const classroomRouter = require('./classroomRoute');
const dayRouter = require('./dayRouter');
const schedueleTeacherRouter = require('./scheduleTeacherroute');



function route(app) {
    app.use('/classroom',classroomRouter);
    app.use('/day',dayRouter);
    app.use('/teacher',schedueleTeacherRouter);
}

module.exports = route;