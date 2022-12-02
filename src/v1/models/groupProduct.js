'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class groupProduct extends Model {
        static associate(models) {
            // define association here
            groupProduct.hasMany(models.Products, {
                foreignKey: 'groupproductId'
            })
            
        }
    };
    groupProduct.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'groupProduct',
    });
    return groupProduct;
};