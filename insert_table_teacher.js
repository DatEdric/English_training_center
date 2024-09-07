const _ = require('lodash');
const xlsx = require('xlsx');
const db = require('./db-connect');

function extractTeacherNames(teacherString) {
    const names = teacherString.split(' - ');
    const cleanNames = names.map(name => name.replace(/[0-9]/g, '').trim());
  return cleanNames ;
}
function processExcelFile(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const worksheet = workbook.Sheets[sheet_name_list[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);
    const teachersArray = [];


    data.forEach((row) => {
        const name = row['CM chính'];

        if (name) {
            const teacherNames = extractTeacherNames(name);
                teacherNames.forEach((teacherName) => {
                    teachersArray.push(teacherName);
            });
        }
    });
    const uniqueTeachers = _.uniq(teachersArray);

    const cleanedTeachers = uniqueTeachers.filter((teacher) => {
        const trimmed = teacher.trim();
        return trimmed.length > 0 && !trimmed.startsWith('-') && !trimmed.endsWith('-');
    });
    cleanedTeachers.forEach((teacherName) => {
        const query = 'INSERT INTO teachers (name) VALUES (?)';
        db.query(query, [teacherName], (err, result) => {
            if (err) throw err;
            console.log(`Added success ${teacherName} into database`);
        });
    });
}

processExcelFile('./bao_cao_lich_hoc.xlsx');


db.end((err) => {
    if (err) throw err;
    console.log(`
    Disconected to database`);
});
