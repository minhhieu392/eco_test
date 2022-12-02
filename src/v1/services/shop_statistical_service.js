const {v4: uuid} = require('uuid');
const logEvents = require('../helpers/logEvents');
const {_} = require('lodash');
const { da, tr } = require('date-fns/locale');
const { Op,sequelize, Sequelize } = require('sequelize');
const db = require('../models/index');
const shopService = require('../services/shopService');
const { resolveContent } = require('nodemailer/lib/shared');
const users = require('../models/users');

const statistical_sales = async(req) => {
    try{
        const sortBy = req.query.sortby || 'id';
        const sort = req.query.sort || 'DESC'
        const page = parseInt(req.query.page) || 0
        const limit = parseInt(req.query.limit) || 0
        const offset = limit * page
        const search = req.query.search || "";
        const where = _.pick(req.query, ['shopId', 'id'])
        const where_collection = _.pick(req.query, ['nameCollection'])
        const where_user = _.pick(req.query, ['userId'])
        if(search){
            var otherWhere = {
                [Op.or] : [{
                    name:{
                        [Op.like] : '%'+search+'%'
                    }   
                },{description: {
                    [Op.like]: '%'+search+'%'
                }}]
            }
        }
        const where_time = {
            createdAt: {
                [Op.gt]: req.query.startAt || '2000-11-16 09:00:03',
                [Op.lt]: req.query.endAt || '2030-11-16 09:00:03'
            }
        }
        const totalRows = await db.orderDetails.count({
            attributes: ['total'],
            where:{
                ...where_time
            },
            include: [{model: db.Orders,attributes:['userId', 'discount'], where: {...where_user}},{model:db.Products,as : 'Products',
                attributes: ['userId'],
                where: {
                    ...otherWhere,
                    ...where   
                },
                include: {model:db.Collections, attributes:['id', 'nameCollection'], where: {...where_collection}},
                required:true,
            }],
            offset: offset,
            limit:limit,
            order:[
                [sortBy, sort]
            ],
            raw:true, 
            nest:true
        })

        const totalPage = Math.ceil(totalRows / limit);
        const sales = await db.orderDetails.findAll({
            attributes: ['total', 'id', 'amount','discount'],
            where:{
                ...where_time
            },
            include: [
                {model: db.Orders,attributes:['userId', 'discount', 'status'], where: {...where_user}},
                {model:db.Products,as : 'Products',
                attributes: ['id','name','userId', 'madein','amount', 'price' ],
                where: {
                    ...otherWhere,
                    ...where   
                },
                include: {model:db.Collections, attributes:['id', 'nameCollection'], where: {...where_collection}},
                required:true,
                offset: offset,
                limit:limit,
                order:[
                    [sortBy, sort]
                ]
            }],
            raw:true, nest:true
        })
        const total_purchases = _.sumBy(sales, 'amount')
        const total = _.sumBy(sales, 'total')
        return ({
            sales,
            total,
            page,
            limit,
            total_purchases,
            totalRows,
            totalPage
        });
    }catch(e){
        console.log(e)
        return e
    }
}

const topSales = async(data) => {
    try{
        const type = data.type || 0
        const userId = data.userId || 0
        const shopId = data.shopId || 5
        const limit = data.limit || 5
        const startAt = data.startAt || ''
        const endAt = data.endAt || ''
        const page = data.page || 0
        const sortBy = data.sortBy || ''
        const sort = data.sort || ''
        const attributes = data.attributes || ''
        const collectionId = data.collectionId || 0
        const categoryId = data.categoryId || 0
        let topUser = await db.sequelize.query(`call TopSale(${type},${userId},'${sortBy}','${sort}','${attributes}',${page},${limit},'${startAt}','${endAt}',${collectionId},${shopId}, ${categoryId})`);
        return topUser
    }catch(e){
        console.log(e)
        return e
    }
}

module.exports= {
    statistical_sales,
    topSales
}