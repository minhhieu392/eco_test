const Joi = require('joi'); 
const {v4: uuid} = require('uuid');
const logEvents = require('../helpers/logEvents');

const body = (schema, property) => { 
  return (req, res, next) => { 
    req.body.address
  const { error } = schema.validate(req.body); 
  const valid = error == null; 
  
  if (valid) { 
    next(); 
  } else { 
    const { details } = error; 
    const message = details.map(i => i.message).join(',');
  
    logEvents(`${uuid()}---${req.url}---${req.method}---${message}`)

   res.status(422).json({ errCode: 1 , error: message }) } 
  } 
} 

const query = (schema, property) => { 
  return (req, res, next) => { 
  const { error } = schema.validate(req.query); 
  const valid = error == null; 
  
  if (valid) { 
    next(); 
  } else { 
    const { details } = error; 
    const message = details.map(i => i.message).join(',');
 
    logEvents(`${uuid()}---${req.url}---${req.method}---${message}`) 

   res.status(422).json({ errCode: 1 , error: message }) } 
  } 
} 
module.exports = {body,query};