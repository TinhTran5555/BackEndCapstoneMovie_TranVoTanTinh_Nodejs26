const { literal, Op } = require('sequelize');
const { AppError } = require('../helpers/error');
const {  NguoiDung } = require('../models');
const bcrypt = require("bcrypt");

const LayThongTinHeThongRapService = async () => {
    try {
        const loaiNguoiDung = NguoiDung.rawAttributes.role.values
        return loaiNguoiDung
    } catch (error) {
        throw error;
    }
}
const LayDanhSachNguoiDungService = async (tuKhoa) => {
    try {
        const userFound = await NguoiDung.findAll({
            where: {
                hoTen: {
                    [Op.substring]: tuKhoa
                }
            }
        })
        return userFound;
    } catch (error) {
        throw error;
    }
}
const LayDanhSachNguoiDungPhanTrangService = async (tuKhoa, soTrang, soPhanTuTrenTrang) => {
    try {
        console.log(soTrang);
        console.log(soPhanTuTrenTrang);

        const pageAsNumber = Number.parseInt(soTrang);
        const sizeAsNumber = Number.parseInt(soPhanTuTrenTrang)
        let page = 0;
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber
        }
        let size = 10;
        if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
            size = sizeAsNumber
        }
        const userFound = await NguoiDung.findAndCountAll({
            where: {
                hoTen: {
                    [Op.substring]: tuKhoa
                }
            },
            limit: size,
            offset: page * size
        })
        return userFound;
    } catch (error) {
        throw error;
    }
}
const ThongTinNguoiDungService = async (user, taiKhoan) => {
    try {
        const userFound = await NguoiDung.findByPk(taiKhoan)
        if (!userFound) {
            throw new AppError(404, 'User not found')
        };
        const requesterFound = await NguoiDung.findByPk(user.taiKhoan)
        if (!requesterFound) {
            throw new AppError(404, 'Requester not found')
        };
        if (user.taiKhoan !== Number(taiKhoan)) {
            throw new AppError(403, "No permission")
        }
        console.log(user.matKhau);
        const dataNguoiDung = await NguoiDung.findByPk(user.taiKhoan)
        return dataNguoiDung;
    } catch (error) {
        throw error;
    }
}
const CapNhatThongTinNguoiDungService = async (user, taiKhoan, data) => {
    try {
        const userFound = await NguoiDung.findOne({
            where: {
                taiKhoan: taiKhoan,
            },
        });

        if (!userFound) {
            throw new AppError(404, "User not found");
        }
        const requesterFound = await NguoiDung.findByPk(user.taiKhoan)
        if (!requesterFound) {
            throw new AppError(404, 'Requester not found')
        };
        if (user.role !== "admin") {
            if (userFound.taiKhoan !== user.taiKhoan) {
                throw new AppError(403, 'No permission');
            }
        }


        userFound.set(data);
        await userFound.save();

        return userFound;
    } catch (error) {
        throw error;
    }
};


const XoaNguoiDungService = async (user, taiKhoan) => {
    try {
        const userFound = await NguoiDung.findByPk(taiKhoan);
        if (!userFound) {
            throw new AppError(404, 'User not found');
        }
        const requesterFound = await NguoiDung.findByPk(user.taiKhoan)
        if (!requesterFound) {
            throw new AppError(404, 'Requester not found')
        };
        if (user.role !== "admin") {
            if (userFound.taiKhoan !== user.taiKhoan) {
                throw new AppError(403, 'No permission');
            }
        }

        await NguoiDung.destroy({
            where: {
                taiKhoan: taiKhoan
            }
        });
    } catch (error) {
        throw error;
    }
}
const DoiMatKhauService = async (user, taiKhoan, matKhauCu, matKhauXacNhan, matKhauMoi) => {
    try {
        const userFound = await NguoiDung.findOne({
            where: {
                taiKhoan: taiKhoan,
            },
            attributes:{
                include:['matKhau'],
            },
        });

        if (!userFound) {
            throw new AppError(404, "User not found");
        }
        const requesterFound = await NguoiDung.findByPk(user.taiKhoan)
        if (!requesterFound) {
            throw new AppError(404, 'Requester not found')
        };
        if (user.role !== "admin") {
            if (userFound.taiKhoan !== user.taiKhoan) {
                throw new AppError(403, 'No permission');
            }
        }
        const isMatched = bcrypt.compareSync(matKhauCu,userFound.matKhau);
        if(!isMatched){
            throw new AppError(400,'Email or password invalid');
        };
        if (matKhauCu === matKhauMoi) {
            throw new AppError(400, 'Old password and new password are the same');
        }
        if (matKhauMoi !== matKhauXacNhan) {
            throw new AppError(400, 'Password and confirmation password do not match');
        }
        userFound.set({
            matKhau: matKhauMoi
        });
        await userFound.save();

        return userFound;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    LayThongTinHeThongRapService,
    LayDanhSachNguoiDungService,
    LayDanhSachNguoiDungPhanTrangService,
    ThongTinNguoiDungService,
    CapNhatThongTinNguoiDungService,
    XoaNguoiDungService,
    DoiMatKhauService
};