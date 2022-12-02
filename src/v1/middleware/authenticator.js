const jwt = require('jsonwebtoken');
const {v4: uuid} = require('uuid');
const logEvents = require('../helpers/logEvents');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader
    if (!token) return res.sendStatus(401)
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decoded)
        next()
    }catch(error){
        logEvents(`${uuid()}---${req.url}---${req.method}---${error}`)
        console.log(error)
        return res.sendStatus(403)
    }
}
module.exports = verifyToken