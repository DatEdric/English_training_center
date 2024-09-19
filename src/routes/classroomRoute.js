
const express = require('express');
const router = express.Router();
const classroomController = require('../../app/Controllers/ClassroomController');

router.get('/', classroomController.sendRequestGetData);
router.post('/data-classroom',classroomController.getDataroom);

router.get('/edit/:id', classroomController.editClassroom);
router.put('/edit/:id', classroomController.updateClassroom);

router.patch('/delete/:id', classroomController.deleteClassroom);
router.delete('/force-delete/:id', classroomController.forceDeleteClassroom);
router.get('/deleted', classroomController.getDeletedClassrooms);

router.patch('/restore/:id', classroomController.restoreClassroom);




module.exports = router;
