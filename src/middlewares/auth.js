const jwt = require('jsonwebtoken');
const { AppError } = require("../helpers/error");
const {NguoiDung} = require('../models');
const configs = require('../config');

const extractTokenfromHeader = (headers) =>{
    const bearerToken = headers.authorization; // Bearer asdascljcoxc210eq
    const parts = bearerToken.split(' '); // [Bearer,asdascljcoxc210eq]
    if(parts.length !== 2 || parts[0]!= "Bearer" || !parts[1].trim()){
        next(new AppError(401,"Invalid Token"));
    };

    return parts[1];
};

const authorization = async (req,res,next)=>{
    try {
        const token = extractTokenfromHeader(req.headers);
        const payload = jwt.verify(token,configs.SECRET_KEY);
        const user = await NguoiDung.findByPk(payload.taiKhoan);
        
        if(!user){
            next(new AppError(401,"Invalid Token"));
        };
        
        res.locals.user = user;
        
        next();
    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
            next(new AppError(401,"Invalid Token"));
        };
        
        next(error) ;
        
    }
};

module.exports = authorization