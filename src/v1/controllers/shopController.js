const {v4: uuid} = require('uuid');
const logEvents = require('../helpers/logEvents');
const shopService = require('../services/shopService');
const checkPermision = require('../middleware/checkPermision');
const shop_statistical_service = require('../services/shop_statistical_service');
// const checkPermision = require('../middleware/checkPermision')

const handle_create_shop = async(req, res) => {
  const action = "CREATESHOP"
    try {   
      const checkAction = await checkPermision.handle_check_permision(req.body, action)
      if(checkAction == 1){
      let createShop = await shopService.handle_create_shop(req.body)
        return res.status(200).json({
          createShop
        })
      }else{
        return res.status(200).json({
          errCode: 1,
          message: 'Bạn không có quyền hạn này'
        })
      }
    }catch(e){
      console.log(e)
      logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
      return res.status(500).json({
        errCode: -1,
        errMessage: 'server error'
      })
    }
  }

const handle_create_product = async(req, res) => {
  const action = "CREATE"
  try {
    const checkAction = await checkPermision.handle_check_permision(req.body, action)
    if(checkAction == 1){
      let createProduct = await shopService.handle_create_product(req.body)
      return res.status(200).json({
        createProduct
      })
    }else{
      return res.status(200).json({
        errCode: 1,
        message: 'Bạn không có quyền hạn này'
      })
    }
  }catch(e){
    console.log(e)
    logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
    return res.status(500).json({
      errCode: -1,
      errMessage: 'server error'
    })
  }
}

const handle_update_product = async(req, res) => {
  const action = 'EDITPRODUCT'
  try { 
    const checkAction = await checkPermision.handle_check_permision(req.body, action)
    if(checkAction == 1){
      let createProduct = await shopService.handle_update_product(req.body)
      return res.status(200).json({
        createProduct
      })
    }else{
      return res.status(200).json({
        errCode: 1,
        message: 'Bạn không có quyền hạn này'
      })
    }
  }catch(e){
    console.log(e)
    logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
    return res.status(500).json({
      errCode: -1,
      errMessage: 'server error'
    })
  }
}

const handle_create_collection = async(req,res) => {
  const action = "EDITCOLLECTION"
  try {
    const checkAction = await checkPermision.handle_check_permision(req.body, action)
    if(checkAction == 1){
      let createProduct = await shopService.handle_create_collection(req.body)
      return res.status(200).json({
        createProduct
      })
    }else{
      return res.status(200).json({
        errCode: 1,
        message: 'Bạn không có quyền hạn này'
      })
    }
  }catch(e){
    console.log(e)
    logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
    return res.status(500).json({
      errCode: -1,
      errMessage: 'server error'
    })
  }
}

const handle_create_member = async(req,res) => {
  const action = "CREATEMEMBER"
  try {
    const checkAction = await checkPermision.handle_check_permision(req.body, action)
    if(checkAction == 1){
      let createProduct = await shopService.create_member(req.body)
      return res.status(200).json({
        createProduct
      })
    }else{
      return res.status(200).json({
        errCode: 1,
        message: 'Bạn không có quyền hạn này'
      })
    }
  }catch(e){
    console.log(e)
    logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
    return res.status(500).json({
      errCode: -1,
      errMessage: 'server error'
    })
  }
}

let post_invite_member = async(req, res)=> {
  try{
      let infor = await shopService.handel_invite_member(req.body);
      return res.status(200).json(
          infor
      )
  }catch(e){
      logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
      return res.status(500).json({
          errCode: -1,
          errMessage: 'Error from the server'
      })
  }
}

let post_verify_invite = async (req, res) => {
  try {
      const token = req.query.token
      const shopId = req.query.shopId
      const id = req.query.id
      let data = await shopService.handle_verify_invite(token, shopId, id);
      return res.status(200).json(data)
  }catch (e) {
      console.log(e);
      logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
      return res.status(200).json({
          errCode: -1,
          errMessage: 'Error from the server'
      })
  }
}

const handle_get_sales = async(req, res) =>{
  const action ="SALES"
  try { 
    const checkAction = await checkPermision.handle_check_permision(req.body, action)
    if(checkAction == 1){
      let productData = await shop_statistical_service.statistical_sales(req)
      return res.status(200).json({
        productData
      })
    }else{
      return res.status(200).json({
        errCode: 1,
        message: 'Bạn không có quyền hạn này'
      })
    }
  }catch(e){
    console.log(e)
    logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
    return res.status(500).json({
      errCode: -1,
      errMessage: 'server error'
    })
  }
}

const handle_edit_member = async(req, res) =>{
  const action ="CREATEMEMBER"
  try {   
    const checkAction = await checkPermision.handle_check_permision(req.body, action)
    if(checkAction == 1){
      var data = await shopService.handle_edit_member(req.body)
      return res.status(200).json({
        data
      })
    }else{
      return res.status(200).json({
        errCode: 1,
        message: 'Bạn không có quyền hạn này'
      })
    }
    // const checkPermision = await checkPermision.handle_check_permision()
    // if(checkPermision==1){
      
    // }else{
    //   return ({
    //     errCode: 1,
    //     message: 'Bạn không có quyền này'
    //   })
    // }
    // return res.status(200).json({
    //   data
    // })
  }catch(e){
    console.log(e)
    logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
    return res.status(500).json({
      errCode: -1,
      errMessage: 'server error'
    })
  }
}

const get_top_sale = async(req, res) =>{
  const action ="SALES"
  try {   
    const checkAction = await checkPermision.handle_check_permision(req.body, action)
    if(checkAction == 1){
      let productData = await shop_statistical_service.topSales(req.query)
      return res.status(200).json({
        productData
      })
    }else{
      return res.status(200).json({
        errCode: 1,
        message: 'Bạn không có quyền hạn này'
      })
    }
  }catch(e){
    console.log(e)
    logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
    return res.status(500).json({
      errCode: -1,
      errMessage: 'server error'
    })
  }
}

const get_all_member = async(req, res) =>{
  const action = "VIEW"
  try {   
    const checkAction = await checkPermision.handle_check_permision(req.body, action)
    if(checkAction == 1){
      let listMember = await shopService.get_all_member(req.query)
      return res.status(200).json({
        listMember
      })
    }else{
      return res.status(200).json({
        errCode: 1,
        message: 'Bạn không có quyền hạn này'
      })
    }
  }catch(e){
    console.log(e)
    logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
    return res.status(500).json({
      errCode: -1,
      errMessage: 'server error'
    })
  }
}

module.exports = {
  handle_create_shop,
  handle_create_product,
  handle_create_collection,
  handle_update_product,
  handle_create_member,
  post_invite_member,
  post_verify_invite,
  handle_get_sales,
  handle_edit_member,
  get_top_sale,
  get_all_member

};