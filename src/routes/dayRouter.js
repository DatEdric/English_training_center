const express = require('express');
const router = express.Router();
const dayController = require('../../app/Controllers/DayController');

router.get('/', dayController.getDailySchedule);

router.post('/daily-schedule', dayController.sendRequestGetSchedule);

router.get('/edit/:id', dayController.editDailySchedule);
router.put('/edit/:id', dayController.updateDailySchedule);

router.patch('/delete/:id', dayController.deleteScheduleDailyById);
router.delete('/force-delete/:id', dayController.forceDeleteScheduleById);
router.get('/deleted', dayController.getDeletedScheduleDaily);

router.patch('/restore/:id', dayController.restoreScheduleDaily);


module.exports= router;
