const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const db = require('./db-connect');
const configViewEngine = require('./viewEngine');
const route = require('./src/routes')
const morgan = require('morgan');
const bodyParser = require('body-parser');


app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configViewEngine(app);
route(app);

app.listen(port, () => {
  console.log(`
    Server is running on http://localhost:${port}`);
});