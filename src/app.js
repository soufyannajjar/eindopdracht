const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/route')

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