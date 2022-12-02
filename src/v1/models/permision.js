'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Permision extends Model {
        static associate(models) {
            // define association here
            Permision.hasMany(models.per_Relationship, {
                foreignKey: 'permisionId'
            })

            Permision.hasMany(models.permisionDetail, {
                foreignKey: 'permisionId'
            })
        }
    };
    Permision.init({
        permisionName : DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Permision',
    });
    return Permision;
};