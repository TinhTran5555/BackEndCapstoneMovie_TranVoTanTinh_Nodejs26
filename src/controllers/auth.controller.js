const { response } = require("../helpers/response");
const authService = require('../services/auth.service');

const login = () =>{
    return async(req,res,next)=>{
        try {
            const credentials = req.body;
            const user = await authService.login(credentials);
            res.status(200).json(response(user));
        } catch (error) {
            next(error);
        };
    };
};
const register = () =>{
    return async(req,res,next)=>{
        try {
            const data = req.body;
            const createdUser = await authService.register(data)
            res.status(200).json(response(createdUser,"create successfully!"))
        } catch (error) {
            next(error);
        }
    }
}
module.exports = {
    login,
    register,
}