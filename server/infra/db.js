const pgp = require('pg-promise')();

const db = pgp({
    user: 'postgres',
    password: '250101br',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
})

module.exports = db;