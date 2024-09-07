const db = require('../../db-connect');

const Student = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM students', (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },
};

module.exports = Student;
