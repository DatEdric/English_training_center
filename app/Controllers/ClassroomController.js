const Classroom = require('../Models/ClassroomModel');

const classroomController = {
    sendRequestGetData: async (req, res, next) => {
        try {
            const classroom = await Classroom.getNameClass();
            res.status(200).json({
                status: 'success',
                data: classroom
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve classroom data',
                error: error.message
            });
        }
    },
    getDataroom: async (req, res, next) => {
        try {
            const { date, name: classroom_name } = req.body;
            const data = await Classroom.getClassAndShift(classroom_name, date);
            if (data.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No data found for the given classroom and date'
                });
            }
            res.status(200).json({
                status: 'success',
                data
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve data for the classroom',
                error: error.message
            });
        }
    },
    editClassroom: async (req, res, next) => {
        try {
            const { id } = req.params;
            const classroom = await Classroom.findById(id);
            if (!classroom) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Classroom not found'
                });
            }
            res.status(200).json({
                status: 'success',
                data: classroom
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve classroom for editing',
                error: error.message
            });
        }
    },
    updateClassroom: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { course_name, class_name, teaching_shift, start_date, end_date, type, schedule_date, capacity, classroom_name } = req.body;
            await Classroom.updateById(id, { course_name, class_name, teaching_shift, start_date, end_date, type, schedule_date, capacity, classroom_name });
            res.status(200).json({
                status: 'success',
                message: `Classroom with ID ${id} has been updated`
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to update classroom',
                error: error.message
            });
        }
    },
    deleteClassroom: async (req, res, next) => {
        try {
            const { id } = req.params;
            await Classroom.deleteById(id);
            res.status(200).json({
                status: 'success',
                message: `Classroom with ID ${id} has been soft-deleted`
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to soft-delete classroom',
                error: error.message
            });
        }
    },
    forceDeleteClassroom: async (req, res, next) => {
        try {
            const { id } = req.params;
            await Classroom.forceDeleteById(id);
            res.status(200).json({
                status: 'success',
                message: `Classroom with ID ${id} has been permanently deleted`
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to permanently delete classroom',
                error: error.message
            });
        }
    },
    restoreClassroom: async (req, res, next) => {
        try {
            const { id } = req.params;
            await Classroom.restoreById(id);
            res.status(200).json({
                status: 'success',
                message: `Classroom with ID ${id} has been restored`
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to restore classroom',
                error: error.message
            });
        }
    },
    getDeletedClassrooms: async (req, res, next) => {
        try {
            const deletedData = await Classroom.getDeletedClasses();
            if (deletedData.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No deleted classrooms found'
                });
            }
            res.status(200).json({
                status: 'success',
                data: deletedData
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve deleted classrooms',
                error: error.message
            });
        }
    }
};

module.exports = classroomController;
