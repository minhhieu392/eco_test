"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class orderDetails extends Model {
      static associate(models) {
          orderDetails.belongsTo(models.Products, {
              foreignKey: 'productId',
              as: 'Products',
              targetKey : 'id'
          })

          orderDetails.belongsTo(models.Orders, {
              foreignKey: 'orderId',
              targetKey: 'id'
          })
      }
  };

  orderDetails.init({
    orderId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    total:DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    discount: DataTypes.FLOAT
}, {
    sequelize,
    modelName: 'orderDetails',
});
//   const orderDetail = sequelize.define(
//     "orderDetail",
//     {
//     //   id: {
//     //     type: DataTypes.INTEGER,
//     //     allowNull: false,
//     //     primaryKey: true,
//     //     autoIncrement: true,
//     //     field: "id",
//     //   },

//       orderId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         field: "orderId",
//       },
//       price: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         field: "price",
//       },
//       amount: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         field: "amount",
//       },
//       total: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         field: "total",
//       },
//       productId: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         field: "productId",
//       },
//     },
//     {
//       tableName: "orderDetail",
//       timestamps: false,
//     }
//   );

  return orderDetails;
};
