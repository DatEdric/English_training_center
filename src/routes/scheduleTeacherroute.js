const express = require('express');
const router = express.Router();
const scheduleTeacherController = require('../../app/Controllers/ScheduleTeacherController');

router.get('/', scheduleTeacherController.getAllTeacher);

router.post('/schedule', scheduleTeacherController.listScheduleTeacher);

router.get('/edit/:id', scheduleTeacherController.getScheduleTeacherById);
router.put('/update/:id', scheduleTeacherController.updateScheduleTeacherById);

router.patch('/delete/:id', scheduleTeacherController.deleteScheduleTeacherById);
router.delete('/force-delete/:id', scheduleTeacherController.forceDeleteScheduleTeacherById);
router.get('/deleted', scheduleTeacherController.getDeletedScheduleTeacher);

router.patch('/restore/:id', scheduleTeacherController.restoreScheduleTeacher);


module.exports= router;
