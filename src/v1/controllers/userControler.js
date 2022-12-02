const {v4: uuidv4} = require('uuid');
const logEvents = require('../helpers/logEvents');
const userService = require('../services/userService');

const handleSignup = async(req, res) => {
  try {   
    let createUser = await userService.handle_create_user(req.body)
    return res.status(200).json({
      createUser
    })
  }catch(e){
    logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
    return res.status(500).json({
      errCode: -1,
      errMessage: 'server error'
    })
  }
}

const handleLogin = async(req, res) => {
  try {   
    let login = await userService.handleLogin(req.body)
    return res.status(200).json({
      login
    })
  }catch(e){
    logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
    return res.status(500).json({
      errCode: -1,
      errMessage: 'server error'
    })
  }
}

const handle_get_prodcuct = async(req, res) =>{
  try {   
    let productData = await userService.handle_get_prodcuct(req)
    return res.status(200).json({
      productData
    })
  }catch(e){
    console.log(e)
    logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
    return res.status(500).json({
      errCode: -1,
      errMessage: 'server error'
    })
  }
}

const handleCategory = async(req, res) =>{
  try {   
    let categoryData = await userService.handleCategory(req.query.id)
    return res.status(200).json({
      categoryData
    })
  }catch(e){
    console.log(e)
    logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
    return res.status(500).json({
      errCode: -1,
      errMessage: 'server error'
    })
  }
}

const handleCheck = async(req,res) => {
  try {   
    let check = await userService.handleCheck(req.body)
    return res.status(200).json({
      check
    })
  }catch(e){
    logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
    return res.status(500).json({
      errCode: -1,
      errMessage: 'server error'
    })
  }
}

const handle_get_all_shoporcategory =async(req,res) => {
  try {   
    let data = await userService.handle_get_all_shoporcategory(req.query)
    return res.status(200).json({
      data
    })
  }catch(e){
    logEvents(`${uuid()}---${req.url}---${req.method}---${e}`)
    return res.status(500).json({
      errCode: -1,
      errMessage: 'server error'
    })
  }
}

module.exports = {
  handleLogin,
  handleSignup,
  handle_get_prodcuct,
  handleCategory,
  handleCheck,
  handle_get_all_shoporcategory
};