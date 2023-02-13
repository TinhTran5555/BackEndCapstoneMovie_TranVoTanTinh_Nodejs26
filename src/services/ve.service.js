const { literal, Op } = require('sequelize');
const { AppError } = require('../helpers/error');
const {  NguoiDung, LichChieu, Ghe} = require('../models');


const DatVeService = async (user, maLichChieu, maGhe) => {
    try {
        const userFound = await NguoiDung.findOne({
            where:{
                taiKhoan:user.taiKhoan
            },
        });
        if(!userFound){
            throw new AppError(404,'User not found')
        };

        const lichChieuFound = await LichChieu.findByPk(maLichChieu);
        if (!lichChieuFound) {
          throw new AppError(404, "Showtimes not found");
        }
        const gheFound = await Ghe.findByPk(maGhe);
        if (!gheFound) {
          throw new AppError(404, "chair not found");
        }

    await userFound.addNguoiDungLichChieu(maLichChieu, {
        through: {
            maGhe: maGhe
        }
    })
        return "OK";
    } catch (error) {
        throw error
    }
};
const LayDanhSachPhongVeService = async (maLichChieu) => {
    try {
        
        const lichChieuFound = await LichChieu.findOne({
            where: {
                maLichChieu: maLichChieu
            },
            include: [{
                association: "danhSachGheCuaLichChieu",
                
            },{
                association: "danhSachGheDaDat",
            }]
        });
     return lichChieuFound

    } catch (error) {
        throw error
    }
};
module.exports = {
    DatVeService,
    LayDanhSachPhongVeService
};