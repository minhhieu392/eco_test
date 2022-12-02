const { da } = require('date-fns/locale');
const {v4: uuidv4} = require('uuid');
const logEvents = require('../helpers/logEvents');
const db = require('../models/index');
const emailService = require('../services/emailService');
const userService = require('../services/userService');
const checkPermision = require('../middleware/checkPermision');
const { connect } = require('../routes/shop');

const handle_create_shop = async(data) => {
    return new Promise(async(resolve, reject) => {
        try{
            const checkUser = await db.User.findOne({
                attributes: ['id', 'firstName', 'lastName'],
                where : {email: data.email, shopId: null}
            })
            if(checkUser){
                const create = await db.Shop.create({
                    name:data.name,
                    description: data.description,
                    address: data.address,
                    popularity_id: data.popularity_id,
                    typeBusiness: data.typeBusiness,
                    belongTo: checkUser.id
                })
                if(create){
                    const idShop = await db.Shop.findOne({
                        attributes:['id'],
                        where: {belongTo: checkUser.id}
                    })
                    if(idShop){
                        await db.User.update(
                            {shopId: idShop.id},
                            {where: {id: checkUser.id}
                        })
                    }else{resolve({
                        errCode:1,
                        errMessage: 'update lỗi'
                    })
                    }
                }else{resolve({
                    errCode:1,
                    errMessage: 'tạo lỗi'
                })} 
                resolve({
                    errCode:0,
                    errMessage: 'Tạo shop thành công !'
                }) 
            }
            else{
                resolve({
                    errCode:1,
                    errMessage: 'what wrong!'
                })
            }
        }
        catch(e){
            console.log(e)
            reject(e)
        }
    })
}

const handle_check_ownshop=(userId, shopId, collectionId) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(userId && shopId && collectionId){
                await db.sequelize.query(`call checkCollection('${userId}', '${shopId}','${collectionId}')`);
                if(check) {resolve(true)}
                else{resolve(false)}
            }else{
                let check = await db.User.findOne({
                    where: {id: userId,shopId:shopId}
                })
                if(check) {resolve(true)}
                else{resolve(false)}
            }   
        }catch(err){
            reject(err);
        }
    })
}

const handle_create_product = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let arrProduct = data.arrProduct
            let checkOwnShop = await handle_check_ownshop(data.userId, data.shopId, data.collectionId)
            if(checkOwnShop===true){
                await db.Products.bulkCreate(arrProduct)
            }
            resolve({
                errCode: 0,
                message: 'tạo thành công !'
            })
        }catch(e){
            console.log(e)
            reject(e);
        }
    })
}

const handle_update_product = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let checkOwnShop = await handle_check_ownshop(data.userId, data.shopId)
            if(checkOwnShop===true){
                await db.Products.update({
                    groupproductId: data.groupproductId,
                    name: data.name,
                    description:data.description,
                    madein: data.madein,
                    price:data.price,
                    unit:data.unit,
                    image:data.image,
                    tagId:data.tagId,
                    amount:data.amount,
                    collectionId:data.collectionI,
                    userId:data.userId
                },{where: {
                    id: data.productId
                }})
            }
            resolve({
                errCode: 0,
                message: 'update success !'
            })
        }catch(e){
            console.log(e)
            reject(e);
        }
    })
} 

const handle_create_collection = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let checkOwnShop = await handle_check_ownshop(data.userId, data.shopId)
            if(checkOwnShop){
                let checkCollection = await db.Collections.findOne({
                    attributes: ['id','nameCollection'],
                    where:{nameCollection: data.nameCollection }
                })
                if(checkCollection){
                    resolve({
                        errCode: 1,
                        message: 'collection đã tồn tại'
                    })
                }else{
                    await db.Collections.create({
                        shopId:data.shopId,
                        nameCollection:data.nameCollection,
                        userId:data.userId,
                        image:data.image,
                        groupproductId:data.groupproductId,
                        status: 1
                    })
                    resolve({
                        errCode: 0,
                        message: 'tạo thành công !'
                    })
                }
            }else{
                resolve({
                    errCode: 1,
                    message: 'what wrong !'
                })
            }
        }catch(e){
            console.log(e)
            reject(e);
        }
    })
}

const create_member = async (data) => {
    try{
        const checkEmail = await emailService.checkUserEmail(data.email)
        if(checkEmail===true){
            const checkShop = await db.User.findOne({
                where: {
                    email: data.email,
                    shopStatus: 0
                }
            })
            if(checkShop){
                await handel_invite_member(data, checkShop.id)
            }
            else{
                return ({
                    message: " không thể mời user này"
                })
            }
        }else{
            const hashPassword = await userService.hashUserPassword(data.password);
            const createMember = await db.User.create({
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
                phone: data.phone,
                shopId: data.shopId,
                shopStatus: 2
            })
        }
        return ({
            errCode: 0,
            message: "Thêm member thành công"
        })
    }catch(e){
        console.log(e)
        return(e)
    }
}

const buildUrEmail = (userId,shopId, token) => {
    let result = `${process.env.URL}/verify-invite?token=${token}&id=${userId}&shopId=${shopId}`
    return result;
}

const handel_invite_member = (newData, userId) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let token = uuidv4();
            await emailService.sendSimpleEmail({
                shopId: newData.shopId,
                email: newData.email,
                redirectLink: buildUrEmail(userId,newData.shopId,token)
            })
            let user = await db.User.update({
                shopStatus: 1,
                shopToken: token
            },{where:{id: userId}});
            resolve({
                errCode: 0,
                errMessage: 'invite member success'
            })
        }catch(e){
            reject(e);
        }
    })
}

const handle_verify_invite = (token, shopId, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let verifyInvite = await db.User.findOne({
                where: {
                    id: id,
                    shopToken: token
                },
                raw: false
            })
            if (verifyInvite){
                verifyInvite.shopStatus = 2 
                verifyInvite.shopId = shopId
                await verifyInvite.save()
                await db.per_Relationship.create({
                    userId: id,
                    permisionId: 4,
                    licensed: 1
                })
                resolve({
                    errCode: 0,
                    errMessage: "update the appointment succeed!"
                })
            }else {
                resolve({
                    errCode: 2,
                    errMessage: "Appointments has been activated of does not exist"
                })
            }
        }catch (e){
            reject(e);
        }
    })
}

const get_all_member =  (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let action = data.action || ''
            if(action == 'GET'|| action == '' ) {
                const listMember = await db.User.findAll({
                    attributes:{exclude:['password', 're_token', 'shopToken', 'description','city_id', 'region_id', 'shopId']},
                    where: {
                        shopId: data.shopId
                    },
                    include:{model: db.per_Relationship, attributes:['licensed'] ,
                    include: {model: db.Permision, attributes: ['permisionName']}
                },
                raw:true, nest:true
                })
                resolve({
                    listMember,
                    errCode: 0,
                    message: 'get success !'
                })
            }
            else if(action == 'VIEW'){
                const listMember = await db.User.findAll({
                    attributes:{exclude:['password', 're_token', 'shopToken', 'shopId']},
                    where: {
                        shopId: data.shopId,
                        id: data.userId
                    },
                    include:{model: db.per_Relationship, attributes:['licensed'] ,
                        include:{model: db.Permision,attributes:['id'],
                            include: {model: db.permisionDetail, attributes: ['actionCode', 'checkAction'] },
                    }
                },
                raw:false, 
                nest:true
                })
                resolve({
                    listMember,
                    errCode: 0,
                    message: 'get success !'
                })
            }else{
                resolve({
                    errCode: 1,
                    message: 'what wrong !'
                })
            }
        }catch(e){
            console.log(e)
            reject(e);
        }
    })
} 

const handle_edit_member = (data) => {
    return new Promise(async (resolve,reject)=>{
        try{
            await db.User.update({
                shopStatus: data.shopStatus,
                userName: data.userName
            },{
                where:{id: data.userId}
            })
            const permision = await checkPermision.update(data.permision)
            console.log(permision)
            const edit_permision = await db.per_Relationship.update({
                permisionId : permision
            },{where:{userId: data.userId}
            })
            resolve({
                errCode: 0,
                errMessage: 'update success !'
            })
        }catch(e){
            reject(e);
        }
    })
}

module.exports = {
    handle_create_shop,
    handle_create_product,
    handle_create_collection,
    handle_update_product,
    create_member,
    handel_invite_member,
    handle_verify_invite,
    get_all_member,
    handle_edit_member
}