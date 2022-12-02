'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Shop extends Model {
        static associate(models) {
            // define association here
            Shop.hasMany(models.User, {
                foreignKey : 'shopId',
            })

            Shop.hasMany(models.Products, {
                foreignKey: 'shopId'
            })
        }
    };
    Shop.init({
        name : DataTypes.STRING,
        description: DataTypes.STRING,
        address: DataTypes.STRING,
        popularity_id: DataTypes.STRING,
        typeBusiness: DataTypes.STRING,
        belongTo: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Shop',
    });
    return Shop;
};