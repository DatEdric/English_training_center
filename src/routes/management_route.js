const express = require('express');
const router = express.Router();
const studentController = require('../../app/Controllers/studentController');

router.get('/students', studentController.listStudents);

module.exports = router;
