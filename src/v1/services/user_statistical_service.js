const {v4: uuid} = require('uuid');
const logEvents = require('../helpers/logEvents');
const {_} = require('lodash');
const { da, tr } = require('date-fns/locale');
const { Op,sequelize } = require('sequelize');
// const shopService = require('../services/shopService');

// const statistical_sales = async(data) => {
//     try{
//         const 
//     }catch(e){
//         console.log(e)
//         return e
//     }
// }

// module.exports= {
//     statistical_sales
// }