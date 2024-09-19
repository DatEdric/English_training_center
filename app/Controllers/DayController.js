const Day = require('../Models/DayModel');

const dayController = {
    getDailySchedule: async (req, res, next) => {
        try {
            const schedule = await Day.getDailySchedule();
            res.status(200).json({
                status: 'success',
                data: schedule
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve classroom data',
                error: error.message
            });
        }
    },
    sendRequestGetSchedule: async (req,res,next) => {
        try {
            const {schedule_date} = req.body;
            const data = await Day.getDataDailySchedule(schedule_date);
            console.log(data);
            
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
                message: 'Failed to retrieve classroom data',
                error: error.message
            });
        }
    },
    editDailySchedule: async (req,res,next) => {
        try {
            const {id} = req.params;
            const data = await Day.findDailyScheduleById(id);
            console.log(data);
            if (!data) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No data found for the given Schedule id'
                });
            }
            res.status(200).json({
                status: 'success',
                data
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve classroom data',
                error: error.message
            });
        }
    },
    updateDailySchedule: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { date, shift, classrooms_in_use, teachers_in_shift, classes_in_shift } = req.body;
            await Day.updateDailyScheduleById(id, { date, shift, classrooms_in_use, teachers_in_shift, classes_in_shift });
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
    deleteScheduleDailyById: async (req, res, next) => {
        try {
            const { id } = req.params;
            await Day.deleteScheduleDailyById(id);
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
    forceDeleteScheduleById : async (req, res, next) => {
        try {
            const { id } = req.params;
            await Day.forceDeleteSchedule(id);
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
    getDeletedScheduleDaily: async (req, res, next) => {
        try {
            const deletedData = await Day.getDeletedSchedule();
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
                message: 'Failed to get all deleted schedule daily',
                error: error.message
            });
        }
    },
    restoreScheduleDaily: async (req, res, next) => {
        try {
            const { id } = req.params;
            await Day.restoreScheduleDailyById(id);
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
    }

}

module.exports = dayController;
