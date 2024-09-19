const Teacher = require('../Models/ScheduleTeacherModel');

const schedueleTeacherController = {
    getAllTeacher: async (req, res, next) => {
        try {
            const teacher = await Teacher.getAllTeacher();
            res.status(200).json({
                status: 'success',
                data: teacher
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve classroom data',
                error: error.message
            });
        }
    },
    listScheduleTeacher: async (req, res, next) => {
        try {
            const date = req.body;
            const teacher = await Teacher.getScheduleTeacher({date});
            res.status(200).json({
                status: 'success',
                data: teacher
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve classroom data',
                error: error.message
            });
        }
    }
};

module.exports = schedueleTeacherController;
