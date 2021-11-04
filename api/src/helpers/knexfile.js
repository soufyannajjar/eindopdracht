const {POSTGRES_HOST,POSTGRES_NAME, POSTGRES_USER, POSTGRES_PASS} = process.env;

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host:POSTGRES_HOST,
            database: POSTGRES_NAME,
            user: POSTGRES_USER,
            password: POSTGRES_PASS
        },
        pool: {
            min: 2,
            max: 10
        }
    }
};