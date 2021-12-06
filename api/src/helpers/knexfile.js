const {POSTGRES_HOST,POSTGRES_NAME, POSTGRES_USER, POSTGRES_PASS, POSTGRES_PORT} = process.env;

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host:'db',
            database: 'werkstuk_dev',
            user: 'postgres',
            password: 'postgres',
            port:'5432'
        },
        pool: {
            min: 2,
            max: 10
        }
    }
};