'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Orders extends Model {
        static associate(models) {
            Orders.belongsTo(models.User, {
                foreignKey: 'userId', 
                targetKey: 'id'
            })

            Orders.hasMany(models.orderDetails, {
                foreignKey: 'orderId'
            })

        }
    };
    Orders.init({
        userId: DataTypes.INTEGER,
        discount: DataTypes.FLOAT,
        orderCode:DataTypes.STRING,
        total: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Orders',
    });
    return Orders;
};