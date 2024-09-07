const Student = require('../Models/studentModel');

const studentController = {
    listStudents: async (req, res) => {
        try {
            const students = await Student.getAll();
            
            res.render('students', { students });
        } catch (error) {
            res.status(500).send('Error retrieving students');
        }
    }
};

module.exports = studentController;
