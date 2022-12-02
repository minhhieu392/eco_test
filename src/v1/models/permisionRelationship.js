'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class per_Relationship extends Model {
        static associate(models) {
            // define association here
            per_Relationship.belongsTo(models.User, {
                foreignKey: 'userId' ,
                targetKey : 'id'
            })

            per_Relationship.belongsTo(models.Permision, {
                foreignKey: 'permisionId'
            })

        }
    };
    per_Relationship.init({
        userId: DataTypes.INTEGER,
        permisionId: DataTypes.INTEGER,
        licensed: DataTypes.INTEGER

    }, {
        sequelize,
        modelName: 'per_Relationship',
    });
    return per_Relationship;
};