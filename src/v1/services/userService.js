const {_} = require('lodash');
const {v4: uuidv4} = require('uuid');
const logEvents = require('../helpers/logEvents');
const emailService = require('../services/emailService');
const db = require('../models/index');
const bcrypt = require('bcryptjs');
const { da, tr } = require('date-fns/locale');
const salt = bcrypt.genSaltSync(10);
const { Op,sequelize } = require('sequelize');

let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashPassword =  bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
            reject(e)
        }
    })
}

const handle_create_user = async(data) => {
    return new Promise(async(resolve, reject) => {
        try{
            const checkEmail = await emailService.checkUserEmail(data.email);
            if(checkEmail===true){
                resolve({
                    errCode:1,
                    errMessage: 'Your email is already in user'
                })
            }
            else {
                const hashPassword = await hashUserPassword(data.password);
                await db.User.create({
                    userName:data.userName,
                    email: data.email,
                    password: hashPassword,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    birthday: data.birthday,
                    city_id: data.city_id,
                    description: data.description,
                    region_id: data.region_id,
                    phone: data.phone
                })
                resolve({
                    errCode: 0,
                    message:'OK'   
                })
            }
        }catch(e){
            logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
            reject(e);
        }
    })
}

const handleLogin = async(data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let userData = {};
            let checkEmail = await emailService.checkUserEmail(data.email);
            if(checkEmail) {
                let userInfo = await db.User.findOne({
                    attributes: ['id','email','password', 'firstName', 'lastName'],
                    where: {email: data.email},
                    raw: true                     
                });
                if(userInfo) {
                    let checkPassword =  bcrypt.compareSync(data.password, userInfo.password);
                    if(checkPassword) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        delete userInfo.password;
                        userData.data = userInfo;
                    }
                    else{
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password or username';
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = 'wrong password or username'
                }

            }else{
                userData.errCode = 1;
                userData.errMessage = "your's Email isn't exist in your system. plz try other email!"  
            }
            resolve(userData)
        }
        catch(e){
            console.log(e)
            logEvents(`${uuid()}---${e}`);
            reject(e);
        }
    } )
}

const handle_get_prodcuct = async(req) => {
    return new Promise(async(resolve, reject) => {
        try{
            const sortBy = req.query.sortby || 'id';
            const sort = req.query.sort || 'DESC'
            const page = parseInt(req.query.page) || 0;
            const limit = parseInt(req.query.limit) || 0;
            const search = req.query.search_query || "";
            const where =  _.pick( req.query,['groupproductId','tagId','shopId' ,'madein'])
            const offset = limit * page;
            let otherWhere ={}
            if(search){
                otherWhere = {
                    [Op.or] : [{
                        name:{
                            [Op.like] : '%'+search+'%'
                        }   
                    },{description: {
                        [Op.like]: '%'+search+'%'
                    }}]
                }
            }
            const totalRows = await db.Products.count({
                where:{
                    ...otherWhere,
                    ...where
                }
            });

            const totalPage = Math.ceil(totalRows / limit);
            const result= await db.Products.findAll({
                where:{
                    ...otherWhere,
                    ...where
                },
                offset: offset,
                limit:limit,
                order:[
                    [sortBy, sort]
                ]
            })
            resolve({
                result,
                page,
                limit,
                totalRows,
                totalPage 
            });
        }
        catch(e){
            console.log(e)
            reject(e);
        }    
    })
}

const handleCategory = async(id) => {
    return new Promise(async(resolve, reject) => {
        try{
            if (id=='ALL') {
                const data = await db.groupProduct.findAll({
                    attributes:[
                        'id', 'name'
                    ]
                })
                resolve(data)
            }else{
                const data = await db.groupProduct.findAll({
                    where: {id: id},
                    logging: true,
                    include: [{
                        model: db.Products,
                        as: 'Products',
                        attributes:['id','name','description'],
                    }],
                    raw: true,
                    nest: true
                })
                resolve(data);
            }
        }
        catch(e){
            console.log(e)
            reject(e);
        }    
    })
}

const handleCheck = async(data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let checkItem = data.arrCheck;
            if(checkItem && checkItem.length > 0){
                checkItem = checkItem.map(item => {
                    item.total =(item.price * item.amount) * (1-item.discount);
                    return item;
                })
            }
            const totalBill = function(checkItem){
                var total = 0;
                for(let i = 0; i< checkItem.length ; i++){
                    total = total + checkItem[i].total
                }
                return total
            }

            const taohoadon = await checkAmount(checkItem);
            if(taohoadon.action === true){
                let token = uuidv4();
                const createBill = await db.Orders.create({
                    userId: data.userId,
                    discount : data.discount,
                    orderCode: token,
                    total : totalBill(checkItem)
                })
                if(createBill) {
                    const idBill = await db.Orders.findOne({
                        attributes: ['id'],
                        where: {orderCode: data.orderCode},
                        raw: true
                    })
                    if(idBill) {
                        let crrAmount = taohoadon.crrAmount
                        for(var i = 0 ; i< crrAmount.length;){
                            checkItem[i].crrAmount = crrAmount[i]
                            i++;
                        }
                        checkItem = checkItem.map(item => {
                            item.orderId =idBill.id;
                            return item;
                        })
                        const check = await db.orderDetails.bulkCreate(checkItem);
                        if(check){
                            await handle_update_amount(checkItem);
                        } 
                    }
                }else{
                    resolve({
                        errCode: 1,
                        message:'what wrong!'   
                    })
                }
                resolve({
                    errCode: 0,
                    message: "đặt thành công"
                })
            }else{
                resolve({
                    errCode: 1,
                    message: "Số lượng đã biến động"
                }) 
            }
        }catch(e){
            console.log(e);
            logEvents(`${uuid()}---${e}`)
            reject(e);
        }
    })
}   

const checkAmount = (checkItem) => {
    return new Promise(async(resolve, reject) => {
        try{
            var action = true
            var crrAmount= [];
            for(let  i = 0 ; i< checkItem.length; i++){  
            let checkAmount = await db.sequelize.query(`call checkInventory('${checkItem[i].amount}', '${checkItem[i].productId}')`);
            crrAmount.push(checkAmount[0].amount)
            if(checkAmount[0].IsGeneric == 0){
                resolve(action = false)
            }}
            resolve({action, crrAmount})
        }catch(e){
            reject(e);
        }
    })
}

const handle_update_amount = async(checkItem) => {
    return new Promise(async(resolve, reject) => {
        try{
            for(let i = 0 ; i< checkItem.length ; i++){
                db.Products.update({
                    amount : (checkItem[i].crrAmount - checkItem[i].amount)
                },{
                    where: {id : checkItem[i].productId}
                })
            }
            resolve({
                errCode: 0,
                message: 'ok'
            })
        }catch(e){
            reject(e)
        }
    })
}

const handle_get_all_shoporcategory = async(data) => {
    try{
        let start_id = data.start_id || 0
        let limit = data.limit || 10
        if(data.action == 'SHOP'){
            const listData = await db.Shop.findAll({
                where: {[Op.and]: [{status:1},{id:{[Op.gt]: start_id}}]},
                order:[
                    ['id', 'asc']
                ],
                limit: limit
            })
            return ({
                errCode: 0,
                message: 'get success',
                listData
            })
        }
        else if(data.action == 'CATEGORY'){
            const listData = await db.groupProduct.findAll({
                where: {[Op.and]: [{status:1},{id:{[Op.gt]: start_id}}]},
                order:[
                    ['id', 'asc']
                ],
                limit: limit
            })
            return ({
                errCode: 0,
                message: 'get success',
                listData
            })
        }
        
    }catch(e){
        console.log(e)
        return e
    }
}

module.exports = {
    handle_create_user,
    handleLogin,
    handle_get_prodcuct,
    handleCategory,
    handleCheck,
    hashUserPassword,
    handle_get_all_shoporcategory
};