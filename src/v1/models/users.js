'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class User extends Model {
        static associate(models) {
            // define association here
            User.belongsTo(models.Shop, {
                foreignKey:'shopId', 
                targetKey:'id'
            })

            User.hasMany(models.per_Relationship, {
                foreignKey: 'userId',
            })

            User.hasMany(models.Collections, {
                foreignKey: 'userId'
            })

            User.hasMany(models.Products, {
                foreignKey: 'userId'
            })

            User.hasMany(models.Orders, {
                foreignKey: 'userId'
            })
        }
    };

    User.init({
        userName : DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        address: DataTypes.STRING,
        gender: DataTypes.STRING,
        birthday: DataTypes.DATE,
        shopId: DataTypes.INTEGER,
        city_id: DataTypes.INTEGER,
        image: DataTypes.STRING,
        re_token: DataTypes.STRING,
        status: DataTypes.STRING,
        description: DataTypes.STRING,
        region_id: DataTypes.STRING,
        phone: DataTypes.STRING,
        shopStatus: DataTypes.INTEGER,
        shopToken: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};