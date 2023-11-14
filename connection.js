const { Client } = require('pg');
require('dotenv').config({
    path: './.env.local',
});

const client = new Client({
    host: 'localhost',
    user: process.env.DB_USER,
    port: 5432,
    password: process.env.DB_PASSWORD,
    database: 'solo_api',
});

module.exports = client;
