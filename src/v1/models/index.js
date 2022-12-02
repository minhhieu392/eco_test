'use strict';
require('dotenv').config();
const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const op = Sequelize.Op;
var db = {}
const connectDB = {};
if(connectDB){
    db = connectDB;
}else {
    db = {}
}
let sequelize;
const customizeConfig = {
    host: process.env.DB_HOST,
    port :3306,
    dialect: 'mysql',
    logging: true,
    dialectOptions: {
        // ssl : {
        //     require: true,
        //     rejectUnauthorized: false
        // }
    },
    query: {
        "raw": true
    },
    timezone: "+07:00"
}

sequelize = new Sequelize(
    process.env.DB_DATABASE_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    customizeConfig)

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(connectDB).forEach(modelName => {
    if (connectDB[modelName].associate) {
        connectDB[modelName].associate(db);
    }
});
db.sequelize = sequelize;
// db.Sequelize = Sequelize;
module.exports = db;