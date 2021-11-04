const {POSTGRES_HOST,POSTGRES_NAME, POSTGRES_USER, POSTGRES_PASS, POSTGRES_PORT} = process.env;
const db = require('knex')({
    client: 'pg',
    connection: {
        host:POSTGRES_HOST,
        database: POSTGRES_NAME,
        user: POSTGRES_USER,
        password: POSTGRES_PASS,
        port:POSTGRES_PORT
    },
    pool: {
        min: 2,
        max: 10
    }
});

module.exports = db;