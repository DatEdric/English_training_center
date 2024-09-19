const { reject } = require('lodash');
const db = require('../../db-connect');

const classroom = {
    getNameClass: () =>{
        return new Promise((resolve, reject) => {
            const query = ` SELECT * FROM classrooms `;
            db.query(query, (error, results) => {
                if (error) {
                    return reject(error); // Nếu có lỗi, từ chối promise
                }
                resolve(results); // Nếu thành công, trả về kết quả
            });
        });
    },

    getClassAndShift: (classroom_name, date) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT
                    c.id,
                    c.class_name,
                    co.course_name,
                    c.start_date,
                    c.end_date,
                    r.capacity,
                    r.type,
                    sh.teaching_shift,
                    t.teacher_name,
                    s.schedule_date,
                    r.classroom_name
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
                    teachers t ON c.teacher_id = t.id
                WHERE
                    r.classroom_name = ?
                    AND s.schedule_date = ?
                    AND c.deleted_at IS NULL;
            `;

            db.query(query, [classroom_name, date], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },
    findById: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT
                    c.id,
                    c.class_name,
                    co.course_name,
                    c.start_date,
                    c.end_date,
                    r.capacity,
                    r.type,
                    sh.teaching_shift,
                    t.teacher_name,
                    s.schedule_date,
                    r.classroom_name
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
                    teachers t ON c.teacher_id = t.id
                WHERE c.id = ?
                AND c.deleted_at IS NULL;
            `;
    
            db.query(query, [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0]);
            });
        });
    },
    
    updateById: (id, updatedData) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE classes c
                LEFT JOIN schedules s ON c.schedules_id = s.id
                LEFT JOIN classrooms r ON c.classroom_id = r.id
                LEFT JOIN shifts sh ON s.shift_id = sh.id
                LEFT JOIN courses co ON c.course_id = co.id
                LEFT JOIN teachers t ON c.teacher_id = t.id
                SET
                    c.class_name = ?,
                    c.course_id = (SELECT id FROM courses WHERE course_name = ? LIMIT 1),
                    c.start_date = ?,
                    c.end_date = ?,
                    r.capacity = ?,
                    r.type = ?,
                    sh.teaching_shift = ?,
                    t.teacher_name = ?,
                    s.schedule_date = ?,
                    r.classroom_name = ?
                WHERE c.id = ?
                AND c.deleted_at IS NULL;
            `;
    
            const { course_name, class_name, teaching_shift, start_date, end_date, type, schedule_date, capacity, classroom_name,teacher_name } = updatedData;
    
            const values = [class_name, course_name, start_date, end_date, capacity, type, teaching_shift, teacher_name, schedule_date, classroom_name, id];
    
            db.query(query, values, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },
    deleteById: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE classes
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
    forceDeleteById: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM classes WHERE id = ?;
            `;
    
            db.query(query, [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },
    restoreById: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE classes
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
    },
    getDeletedClasses: () => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT
                    c.id,
                    c.class_name,
                    co.course_name,
                    c.start_date,
                    c.end_date,
                    r.capacity,
                    r.type,
                    sh.teaching_shift,
                    t.teacher_name,
                    s.schedule_date,
                    r.classroom_name
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
                    teachers t ON c.teacher_id = t.id
                WHERE c.deleted_at IS NOT NULL;
            `;
    
            db.query(query, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }
    
    
    
    
    
};

module.exports = classroom;
