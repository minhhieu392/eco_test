const {v4: uuid} = require('uuid');
const logEvents = require('../helpers/logEvents');
const db = require('../models/index');
require('dotenv').config();
const nodemailer = require('nodemailer');
const {reject, transform} = require('lodash');

const checkUserEmail = (Useremail) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {email: Useremail}
            })
            if(user) {
                resolve(true)
            }else{
                resolve(false)}
        }catch(err){
            reject(err);
        }
    })
}

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Acira" <minhhieu030920@gmail.com>',
        to: dataSend.email,
        subject: "Thông tin xác nhận thành viên",
        html:getBodyHTMLEmail(dataSend),    
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = 
    `
        <h3> Xin Chao ${dataSend.email}</h3>
        <p>Ban nhan duoc Email này từ Shop ${dataSend.shopId}</p>
        <div><b>Thoi gian:</b></div>
        <p>Neu thong tin tren la dung vui long click vao duong link duoi day de xac thuc viec trở thành thành viên của chúng tôi.</p>
        <div>
            <a href = ${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Xin tran thanh cam on !</div>
        `
    return result;
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    console.log(dataSend)
    let result =  
        `
        <h3>Xin chao ${dataSend.patientName} !</h3>
        <p>Ban nhan duoc email nay vi da dat lich kham benh online tren Booking care</p>
        <p>Thong tin don thuoc/hoa don duoc gui trong file dinh kem</p>
        <div>Xin chan thanh cam on!</div>
        `
    return result;
}

let sendAttachment = async(dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });
            let info = await transporter.sendMail({
                from: '"Acira" <minhhieu030920@gmail.com>',
                to: dataSend.email,
                subject: "Ket qua dat lich kham benh",
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [
                    {
                        filename: `remedy -${dataSend.patientId}-${new Date().getTime()}.jpg`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64'
                    },
                ],
            });
            resolve(true)
        }catch (e){
            reject(e);
        }
    })
}

module.exports = {
    checkUserEmail,
    sendSimpleEmail,
    sendAttachment
};