const { reject } = require('lodash');
const db = require('../models/index');

const handle_check_permision = async(data,action) => {
    try{
        let res
        const check = await db.sequelize.query(`call checkPermision('${action}', ${data.userId})`);
        return res = (check[0].checkAction === 1) ? 1 : 0; 
    }catch(e){
        return(e)
    }
}

const update = async(data) => {
    try{
        let res;
        const CREATE = data.p_create || 0
        const EDIT = data.p_edit || 0
        const DELETE = data.p_delete || 0
        const VIEW = data.p_view || 1
        const SALES = data.p_sales || 0
        const CREATEMEMBER = data.p_createmember || 0
        const DELETEMEMBER = data.p_deletemember || 0
        const EDITPRODUCT = data.p_editproduct || 0
        const EDITSHOP = data.p_editshop || 0
        const EDITCOLLECTION= data.p_editcollection || 0
        const VIEWALL = data.p_viewall || 0
        const CREATESHOP = data.p_createshop || 0
        if(CREATE == 0 & EDIT == 0 && DELETE ==0 && VIEW == 1 && SALES == 0 && CREATEMEMBER == 0 && DELETEMEMBER == 0 && EDITPRODUCT == 0 && EDITSHOP == 0 && EDITCOLLECTION == 0 && VIEWALL==0 && CREATESHOP == 0 ){
            return res = 3
        }else if (CREATE == 1 & EDIT == 0 && DELETE ==0 && VIEW == 1 && SALES == 0 && CREATEMEMBER == 0 && DELETEMEMBER == 0 && EDITPRODUCT == 1 && EDITSHOP == 0 && EDITCOLLECTION == 1 && VIEWALL==0 && CREATESHOP == 0){
            return res = 4
        }else if(CREATE == 1 & EDIT == 1 && DELETE ==1 && VIEW == 1 && SALES == 1 && CREATEMEMBER == 1 && DELETEMEMBER == 1 && EDITPRODUCT == 1 && EDITSHOP == 1 && EDITCOLLECTION == 1 && VIEWALL==0 && CREATESHOP == 0){
            return  res = 2
        }
        return res
    }catch(e){
        return(e)
    }
}

module.exports = {
    handle_check_permision,
    update
}