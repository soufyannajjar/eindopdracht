const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();
const router = require('./routes/route')


const databaseHelper = require("./helpers/DatabaseHelper");
const initialiseDBHelpers = require('./helpers/InitialiseDBHelpers');
initialiseDBHelpers.initialiseTables(databaseHelper);
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use('/', router);

module.exports = app;