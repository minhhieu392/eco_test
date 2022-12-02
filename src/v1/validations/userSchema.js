const Joi = require("joi");
const userSchemas = { 
    Login: Joi.object().keys({ 
        email: Joi.string().email().required(),
        password: Joi.string().max(10).required(),
    })
}