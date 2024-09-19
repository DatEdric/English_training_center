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
                message: 'Failed to find schedule teacher data',
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
                message: 'Failed to find schedule teacher data',
                error: error.message
            });
        }
    },
    getScheduleTeacherById: async (req, res, next) => {
        try {
            const id = req.params;
            const teacher = await Teacher.findScheduleTeacherById(id);
            res.status(200).json({
                status: 'success',
                data: teacher
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to find schedule teacher data',
                error: error.message
            });
        }
    },
    updateScheduleTeacherById: async (req, res, next) => {
        try {
            const data = {
                main_teacher: req.body.main_teacher,
                sub_teacher: req.body.sub_teacher,
                course: req.body.course,
                capacity: req.body.capacity,
                type: req.body.type,
                shift: req.body.shift,
                level: req.body.level,
                room: req.body.room,
                attendance: req.body.attendance,
                schedule_date: req.body.schedule_date,
                main_teacher_id: req.params.id
            };
            await Teacher.updateScheduleById(data);
            res.status(200).json({
                status: 'success',
                message: `Schedule teacher with ID ${data.main_teacher_id} has been updated`
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to update Schedule teacher',
                error: error.message
            });
        }
    },
    deleteScheduleTeacherById: async (req, res, next) => {
        try {
            const { id } = req.params;
            await Teacher.deleteScheduleTeacherById(id);
            res.status(200).json({
                status: 'success',
                message: `Schedule Teacher with ID ${id} has been soft-deleted`
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to soft-delete Schedule Teacher',
                error: error.message
            });
        }
    },
    forceDeleteScheduleTeacherById: async (req, res, next) => {
        try {
            const { id } = req.params;
            await Day.forceDeleteScheduleTeacherById(id);
            res.status(200).json({
                status: 'success',
                message: `Schedule Teacher with ID ${id} has been soft-deleted`
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to soft-delete Schedule Teacher',
                error: error.message
            });
        }
    },
    getDeletedScheduleTeacher: async (req, res, next) => {
        try {
          const deletedData = await Teacher.deletedScheduleTeacher();
            if (deletedData.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No deleted Schedule Teacher found'
                });
            }
            res.status(200).json({
                status: 'success',
                data: deletedData
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to get all deleted Schedule Teacher',
                error: error.message
            });
        }
    },
    restoreScheduleTeacher: async (req, res, next) => {
        try {
            const { id } = req.params;
            await Teacher.restoreScheduleTeacherById(id);
            res.status(200).json({
                status: 'success',
                message: `Schedule Teacher with ID ${id} has been restored`
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to restore Schedule Teacher',
                error: error.message
            });
        }
    }

};

module.exports = schedueleTeacherController;
