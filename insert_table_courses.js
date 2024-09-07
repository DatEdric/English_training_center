const _ = require('lodash');
const xlsx = require('xlsx');
const db = require('./db-connect');

function processExcelFile(filePath) {
    const workbook = xlsx.readFile(filePath);    
    const sheet_name_list = workbook.SheetNames;
    const worksheet = workbook.Sheets[sheet_name_list[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);
    const courseArray = [];

    
    data.forEach((row) => {
        const courseName = row['Tên khóa học'];
     courseArray.push(courseName);

    });
    const uniqueCourses = _.uniq(courseArray);

    const cleanedCourses = uniqueCourses.filter((course) => {
        return course !== null && course !== undefined && course.trim().length > 0;
    });
    
    cleanedCourses.forEach((courseName) => {
        const query = 'INSERT INTO courses (name) VALUES (?)';
        db.query(query, [courseName], (err, result) => {
            if (err) throw err;
            console.log(`Added success ${courseName} into database`);
        });
    });
}

processExcelFile('./bao_cao_lich_hoc.xlsx');


db.end((err) => {
    if (err) throw err;
    console.log(`
    Disconected to database`);
});
