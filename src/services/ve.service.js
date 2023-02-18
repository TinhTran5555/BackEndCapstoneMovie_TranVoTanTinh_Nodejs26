const { literal, Op } = require('sequelize');
const { AppError } = require('../helpers/error');
const {  NguoiDung, LichChieu, Ghe,DatVe, Phim,RapPhim} = require('../models');


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
        const veFound = await DatVe.findOne({
            where: {
                maLichChieu: maLichChieu,
                danhSachGhe: maGhe
            }
        });
 
        if (veFound) {
            throw new AppError(404, "ticket has been purchased");
          }
          const Check = await DatVe.findOne({
            where: {
                maLichChieu: maLichChieu,
                taiKhoan: user.taiKhoan
            }
        });
        if (Check) {
            throw new AppError(404, "user has booked tickets at this theater");
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
                association: "DanhSachVeDaDat",
                
            },{
                association: "LichTheoRap",
                include: "danhSachGhe"
            }]
        });
     return lichChieuFound

    } catch (error) {
        throw error
    }
};
const TaoLichChieuService = async(data)=>{
    try {
        console.log(data);
        const phimFound = await Phim.findByPk(data.maPhim)
        if(!phimFound){
            throw new AppError(401,"Film not found")
        }
        const rapFound = await RapPhim.findByPk(data.maRap)
        if(!rapFound){
            throw new AppError(401,"theater not found")
        } 
        if(!rapFound){
            throw new AppError(401,"theater not found")
        }
        const lichChieuFound = await LichChieu.findOne({
            where: {
                maPhim:data.maPhim,
            maRap:data.maRap,
            }
        })
        if(lichChieuFound){
            throw new AppError(401,"The showtime of the movie in this theater has been created")
        }
       
        
        const TaoLichChieu = await LichChieu.create({
            maPhim:data.maPhim,
            maRap:data.maRap,
            ngayGioChieu:data.ngayGioChieu ? data.ngayGioChieu : literal('CURRENT_TIMESTAMP'),
        })
        return TaoLichChieu;
    } catch (error) {
        throw error
    }
}

module.exports = {
    DatVeService,
    LayDanhSachPhongVeService,
    TaoLichChieuService
};