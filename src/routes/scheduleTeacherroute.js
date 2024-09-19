const express = require('express');
const router = express.Router();
const scheduleTeacherController = require('../../app/Controllers/ScheduleTeacherController');

router.get('/', scheduleTeacherController.getAllTeacher);

router.post('/schedule', scheduleTeacherController.listScheduleTeacher);

// router.get('/edit/:id', scheduleTeacherController.editDailySchedule);
// router.put('/edit/:id', scheduleTeacherController.updateDailySchedule);

// router.patch('/delete/:id', scheduleTeacherController.deleteScheduleDailyById);
// router.delete('/force-delete/:id', scheduleTeacherController.forceDeleteScheduleById);
// router.get('/deleted', scheduleTeacherController.getDeletedScheduleDaily);

// router.patch('/restore/:id', scheduleTeacherController.restoreScheduleDaily);


module.exports= router;
