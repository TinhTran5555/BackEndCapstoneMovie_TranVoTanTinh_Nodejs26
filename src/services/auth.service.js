const { NguoiDung } = require("../models");
const { AppError } = require("../helpers/error");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwt");

const login = async(credentials) =>{
    try {
        const {email,matKhau} = credentials;
        const user = await NguoiDung.findOne({
            where:{
                email
            },
            attributes:{
                include:['matKhau'],
            },
        });
        if(!user){
            throw new AppError(400,'Email or password invalid');
        };
        const isMatched = bcrypt.compareSync(matKhau,user.matKhau);
        if(!isMatched){
            throw new AppError(400,'Email or password invalid');
        };
        return generateToken(user);
        
    } catch (error) {
        console.log(error);
        throw error;
    }
};
const register = async(data)=>{
    try {
        const userFound = await NguoiDung.findOne({
            where:{
                email:data.email,
            }
        })
        if(userFound){
            throw new AppError(401,"Email is existed")
        }
        const createdUser = await NguoiDung.create(data)
        return createdUser;
    } catch (error) {
        throw error
    }
}

module.exports = {
    login,
    register
};