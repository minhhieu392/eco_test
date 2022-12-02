'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Collections extends Model {
        static associate(models) {
            // define association here
            Collections.belongsTo(models.User, {
                foreignKey: 'userId',
                targetKey: 'id'
            })

            Collections.hasMany(models.Products, {
                foreignKey: 'collectionId'
            })

        }
    };
    Collections.init({
        shopId: DataTypes.INTEGER,
        nameCollection: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        image: DataTypes.STRING,
        codeCollection: DataTypes.STRING     
    }, {
        sequelize,
        modelName: 'Collections',
    });
    return Collections;
};