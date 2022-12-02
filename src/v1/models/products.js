'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Products extends Model {
        static associate(models) {
            // define association here
            Products.belongsTo(models.User, {
                foreignKey: 'userId',
                targetKey: 'id'
            })

            Products.belongsTo(models.Shop, {
                foreignKey: 'shopId',
                targetKey : 'id'
            })

            Products.belongsTo(models.groupProduct , {
                foreignKey: 'groupproductId',
                targetKey: 'id'
            })

            Products.hasMany(models.orderDetails, {
                as: 'Products',
                foreignKey : 'productId'
            })

            Products.belongsTo(models.Collections, {
                foreignKey: 'collectionId',
                targetKey: 'id'
            })
        }
    };
    Products.init({
        shopId: DataTypes.INTEGER,
        groupproductId : DataTypes.INTEGER,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        madein: DataTypes.STRING,
        price: DataTypes.INTEGER,
        unit: DataTypes.STRING,
        image: DataTypes.STRING,
        tagId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        amount: DataTypes.INTEGER,
        collectionId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Products',
    });
    return Products;
};