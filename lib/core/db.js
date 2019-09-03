'use strict';

const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const db = new Sequelize('node', 'postgres', 'postgres', {
    host: 'localhost',
    port: 32768,
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const modelsDir = path.resolve(__dirname, '../models');

fs.readdirSync(modelsDir)
    .filter(file => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        let model = db.import(path.join(modelsDir, file));
        db[model.name] = model;
    });

module.exports = db;