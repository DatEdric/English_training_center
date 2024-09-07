const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');

const configViewEngine = (app) => {
    app.engine('.hbs', engine({
         layoutsDir:  path.join(__dirname, './src/views/layout'),
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: {
            uploadDir: (image) => {
                const uploadDir = '/uploads/';
                if (image && !image.includes('/')) {
                    return uploadDir + image;
                }
                return image;
            },
        }
}));
    app.set('view engine', '.hbs');
    app.set('views', path.join(__dirname, './src/views'));
    app.use(express.static(path.join('./src', 'public')));
};

module.exports = configViewEngine;
