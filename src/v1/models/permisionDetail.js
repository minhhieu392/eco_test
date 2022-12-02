'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class permisionDetail extends Model {
        static associate(models) {
            // define association here
            permisionDetail.belongsTo(models.per_Relationship, {
                foreignKey: 'permisionId',
                targetKey : 'id'
            })
        }
    };
    permisionDetail.init({
        permisionId: DataTypes.INTEGER,
        actionCode: DataTypes.STRING,
        checkAction: DataTypes.INTEGER

    }, {
        sequelize,
        modelName: 'permisionDetail',
    });
    return permisionDetail;
};