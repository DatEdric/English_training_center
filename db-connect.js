const mysql = require('mysql');
const _ = require('lodash');
const xlsx = require('xlsx');

const db_name = 'english_tranning_center';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: db_name
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('    Connected to english_tranning_center database');
});


module.exports = db;