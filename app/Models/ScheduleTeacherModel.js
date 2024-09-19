const { result, reject } = require('lodash');
const db = require('../../db-connect');

const scheduleTeacherModel = { 
    getAllTeacher: () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM teachers`;
            db.query(query,(error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },
    getScheduleTeacher: ({ date }) => {
        const actualDate = date.date;        
        return new Promise((resolve, reject) => {
            const query = `
            SELECT
                t_main.id AS id,
                t_main.teacher_name AS main_teacher,
                t_sub.teacher_name AS sub_teacher,
                co.course_name AS course,
                r.capacity,
                r.type,
                sh.teaching_shift AS shift,
                tl.level_name AS level,
                r.classroom_name AS room,
                s.attendance,
                s.schedule_date
            FROM
                classes c
            LEFT JOIN
                schedules s ON c.schedules_id = s.id
            LEFT JOIN
                classrooms r ON c.classroom_id = r.id
            LEFT JOIN
                shifts sh ON s.shift_id = sh.id
            LEFT JOIN
                courses co ON c.course_id = co.id
            LEFT JOIN
                teachers t_main ON c.cm_main = t_main.id
            LEFT JOIN
                teachers t_sub ON c.cm_sub = t_sub.id
            LEFT JOIN
                teacher_level tl ON t_main.id = tl.teacher_id
            WHERE
                s.schedule_date BETWEEN DATE_SUB(?, INTERVAL (DAYOFWEEK(?) - 1) DAY)
                AND DATE_ADD(?, INTERVAL (7 - DAYOFWEEK(?)) DAY)
                AND t_main.deleted_at IS NULL;
            `;
            db.query(query, [actualDate, actualDate, actualDate, actualDate], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },
        findScheduleTeacherById: (data) => {
            const id = data.id
            return new Promise((resolve, reject) => {
                const query = `
               SELECT
            t_main.id AS main_teacher_id,
            t_main.teacher_name AS main_teacher,
            t_sub.teacher_name AS sub_teacher,
            co.course_name AS course,
            r.capacity,
            r.type,
            sh.teaching_shift AS shift,
            tl.level_name AS level,
            r.classroom_name AS room,
            s.attendance,
            s.schedule_date
        FROM
            classes c
        LEFT JOIN
            schedules s ON c.schedules_id = s.id
        LEFT JOIN
            classrooms r ON c.classroom_id = r.id
        LEFT JOIN
            shifts sh ON s.shift_id = sh.id
        LEFT JOIN
            courses co ON c.course_id = co.id
        LEFT JOIN
            teachers t_main ON c.cm_main = t_main.id
        LEFT JOIN
            teachers t_sub ON c.cm_sub = t_sub.id
        LEFT JOIN
            teacher_level tl ON t_main.id = tl.teacher_id
        WHERE
            t_main.id = ?
        AND t_main.deleted_at IS NULL;
                            `;
                db.query(query,[id],(error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results[0]);
                });
            });
        },
    updateScheduleById: (data) => {
        return new Promise((resolve, reject) => {
            const query = `
                    UPDATE
                        classes c
                    LEFT JOIN
                        schedules s ON c.schedules_id = s.id
                    LEFT JOIN
                        classrooms r ON c.classroom_id = r.id
                    LEFT JOIN
                        shifts sh ON s.shift_id = sh.id
                    LEFT JOIN
                        courses co ON c.course_id = co.id
                    LEFT JOIN
                        teachers t_main ON c.cm_main = t_main.id
                    LEFT JOIN
                        teachers t_sub ON c.cm_sub = t_sub.id
                    LEFT JOIN
                        teacher_level tl ON t_main.id = tl.teacher_id
                    SET
                        t_main.teacher_name = ?,
                        t_sub.teacher_name = ?,
                        co.course_name = ?,
                        r.capacity = ?,
                        r.type = ?,
                        sh.teaching_shift = ?,
                        tl.level_name = ?,
                        r.classroom_name = ?,
                        s.attendance = ?,
                        s.schedule_date = ?
                    WHERE
                        t_main.id = ?
                        AND t_main.deleted_at IS NULL;
            `;
            const values = [
                data.main_teacher,
                data.sub_teacher,
                data.course,
                data.capacity,
                data.type,
                data.shift,
                data.level,
                data.room,
                data.attendance,
                data.schedule_date,
                data.main_teacher_id
            ];
            db.query(query, values, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },
    deleteScheduleTeacherById: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
            UPDATE teachers
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
    forceDeleteScheduleTeacherById: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                 DELETE FROM teachers WHERE id = ?;
            `;
            db.query(query, [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },
    deletedScheduleTeacher: () => {
        return new Promise((resolve, reject) =>{
            const query = `
                    SELECT
                    t_main.id AS main_teacher_id,
                    t_main.teacher_name AS main_teacher,
                    t_sub.teacher_name AS sub_teacher,
                    co.course_name AS course,
                    r.capacity,
                    r.type,
                    sh.teaching_shift AS shift,
                    tl.level_name AS level,
                    r.classroom_name AS room,
                    s.attendance,
                    s.schedule_date
                    FROM
                        classes c
                    LEFT JOIN
                        schedules s ON c.schedules_id = s.id
                    LEFT JOIN
                        classrooms r ON c.classroom_id = r.id
                    LEFT JOIN
                        shifts sh ON s.shift_id = sh.id
                    LEFT JOIN
                        courses co ON c.course_id = co.id
                    LEFT JOIN
                        teachers t_main ON c.cm_main = t_main.id
                    LEFT JOIN
                        teachers t_sub ON c.cm_sub = t_sub.id
                    LEFT JOIN
                        teacher_level tl ON t_main.id = tl.teacher_id
                    WHERE
                        t_main.deleted_at IS NOT NULL;
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
    restoreScheduleTeacherById: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE teachers
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

module.exports = scheduleTeacherModel;
