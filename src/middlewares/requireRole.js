const { AppError } = require("../helpers/error");
const reqRole = (...roles) =>{
    return (req,res,next)=>{
        const {user} = res.locals;
        const isMatched = roles.includes(user.role);
        if(!isMatched){
            next(new AppError(403,"Your role must be admin"));
            return;
        };
        next();
    };
};

module.exports = reqRole;