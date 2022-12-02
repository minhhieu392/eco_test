const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); 
const db = require("./src/v1/models/index");
const router = require('./src/v1/routes/index');
const app = express();
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended:true}));
const test = db.Image.findAll({
        attributes:['name']
})
if(test){
    console.log('ok')
}
app.use('/api',router)
// app.use('/api', router);
app.listen(3000, () => console.log('server is running in port 3000'))