const { result, reject } = require('lodash');
const db = require('../../db-connect');

const daily = { 
    getDailySchedule: () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT schedule_date FROM schedules`;
            db.query(query, (error,results) =>{
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },
    getDataDailySchedule: (schedule_date) => {
        return new Promise((resolve, reject) => {
            const query = `
                            SELECT
                                s.id,
                                s.schedule_date AS date,
                                sh.teaching_shift AS shift,
                                COUNT(DISTINCT s.id) AS total_classes,
                                GROUP_CONCAT(DISTINCT c.classroom_name) AS classrooms_in_use,
                                GROUP_CONCAT(DISTINCT t.teacher_name) AS teachers_in_shift,
                                GROUP_CONCAT(DISTINCT cl.class_name) AS classes_in_shift
                            FROM
                                schedules s
                            JOIN
                                shifts sh ON s.shift_id = sh.id
                            JOIN
                                classes cl ON s.id = cl.schedules_id
                            JOIN
                                classrooms c ON cl.classroom_id = c.id
                            JOIN
                                teachers t ON cl.teacher_id = t.id
                            WHERE
                                s.schedule_date = ?
                                AND s.deleted_at IS NULL
                            GROUP BY
                                s.schedule_date, sh.teaching_shift
                            LIMIT 0, 25;
                        `;
            db.query(query,[schedule_date],(error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },
    findDailyScheduleById: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                                SELECT
                                    s.id,
                                    s.schedule_date AS date,
                                    sh.teaching_shift AS shift,
                                    COUNT(DISTINCT s.id) AS total_classes,
                                    GROUP_CONCAT(DISTINCT c.classroom_name) AS classrooms_in_use,
                                    GROUP_CONCAT(DISTINCT t.teacher_name) AS teachers_in_shift,
                                    GROUP_CONCAT(DISTINCT cl.class_name) AS classes_in_shift
                                FROM
                                    schedules s
                                JOIN
                                    shifts sh ON s.shift_id = sh.id
                                JOIN
                                    classes cl ON s.id = cl.schedules_id
                                JOIN
                                    classrooms c ON cl.classroom_id = c.id
                                JOIN
                                    teachers t ON cl.teacher_id = t.id
                                WHERE
                                    s.id =?
                                    AND s.deleted_at IS NULL
                                GROUP BY
                                    s.schedule_date, sh.teaching_shift
                                LIMIT 0, 25;
                        `;
            db.query(query,[id],(error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0]);
            });
        });
    },
    updateDailyScheduleById: (id, dataUpdate) => {
        return new Promise((resolve, reject) => {
            const query = `
                    UPDATE
                        schedules s
                    JOIN
                        shifts sh ON s.shift_id = sh.id
                    JOIN
                        classes cl ON s.id = cl.schedules_id
                    JOIN
                        classrooms c ON cl.classroom_id = c.id
                    JOIN
                        teachers t ON cl.teacher_id = t.id
                    SET
                        s.schedule_date = ?,
                        sh.teaching_shift = ?,
                        c.classroom_name = ?,
                        t.teacher_name = ?,
                        cl.class_name = ?
                    WHERE
                        s.id = ?
                        AND s.deleted_at IS NULL;
            `;
            const {  date, shift, classrooms_in_use, teachers_in_shift, classes_in_shift  } = dataUpdate;
            
            const values = [ date, shift, classrooms_in_use, teachers_in_shift, classes_in_shift , id];
            db.query(query, values, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },
    deleteScheduleDailyById: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
            UPDATE schedules
            SET deleted_at = NOW()
            WHERE id = ?;
            `;
            db.query(query, [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

    },
    forceDeleteSchedule: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                 DELETE FROM schedules WHERE id = ?;
            `;
            db.query(query, [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },
    getDeletedSchedule: () => {
        return new Promise((resolve, reject) =>{
            const query = `
             SELECT
                    s.id,
                    s.schedule_date AS date,
                    sh.teaching_shift AS shift,
                    COUNT(DISTINCT s.id) AS total_classes,
                    GROUP_CONCAT(DISTINCT c.classroom_name) AS classrooms_in_use,
                    GROUP_CONCAT(DISTINCT t.teacher_name) AS teachers_in_shift,
                    GROUP_CONCAT(DISTINCT cl.class_name) AS classes_in_shift
                    FROM
                        schedules s
                    JOIN
                        shifts sh ON s.shift_id = sh.id
                    JOIN
                        classes cl ON s.id = cl.schedules_id
                    JOIN
                        classrooms c ON cl.classroom_id = c.id
                    JOIN
                        teachers t ON cl.teacher_id = t.id
                    WHERE
                        s.deleted_at IS NOT NULL
                    GROUP BY
                        s.schedule_date, sh.teaching_shift
                    LIMIT 0, 25;
            `;
            db.query(query, (error, results) => {
                if (error) {
                    console.log(error);
                    
                    return reject(error);
                }
                resolve(results);
            });
        });
    },
    restoreScheduleDailyById: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE schedules
                SET deleted_at = NULL
                WHERE id = ?;
            `;
    
            db.query(query, [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }
};

module.exports = daily;
