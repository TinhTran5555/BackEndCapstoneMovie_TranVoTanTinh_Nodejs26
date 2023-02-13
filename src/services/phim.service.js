const { literal, Op } = require('sequelize');
const { AppError } = require('../helpers/error');
const { Banner, Phim, sequelize } = require('../models');

const getBannerService = async () => {
    try {
        const dataBanner = await Banner.findAll();
        return dataBanner;
    } catch (error) {
        throw error;
    }
};
const layDanhSachPhimService = async (tenPhim) => {
    try {
        const filmFound = await Phim.findAll({
            where: {
                tenPhim: {
                    [Op.substring]: tenPhim
                }
            }
        })
        if (!filmFound) {
            throw new AppError(404, 'film not found');
        }
        return filmFound;
    } catch (error) {
        throw error;
    }
};
const LayDanhSachPhimPhanTrangService = async (tenPhim, tuNgay, denNgay, soTrang, soPhanTuTrenTrang) => {

    try {
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
        const filmFound = await Phim.findAndCountAll({
            where: {
                tenPhim: {
                    [Op.substring]: tenPhim
                }
            },
            limit: size,
            offset: page * size
        })
        return filmFound;
    } catch (error) {
        throw error;
    }
};
const LayDanhSachPhimTheoNgayService = async (tenPhim, tuNgay, denNgay, soTrang, soPhanTuTrenTrang) => {

    try {
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
        const filmFound = await Phim.findAndCountAll({
            where: {
                tenPhim: {
                    [Op.substring]: tenPhim
                }
                ,
                ngayKhoiChieu: {
                    [Op.between]: [tuNgay, denNgay]
                }
            },
            limit: size,
            offset: page * size
        })

        if (!filmFound) {
            throw new AppError(404, 'film not found');
        }
        return filmFound;
    } catch (error) {
        throw error;
    }
};
const ThemPhimUploadHinhService = async (file, tenPhim, trailer, moTa, ngayKhoiChieu, danhGia, hot, dangChieu, sapChieu) => {
    try {

        file.path = file.path.replace(/\\/g, '/');
        const url = `http://localhost:4000/${file.path}`;

        const addFilm = await Phim.create({
            tenPhim: tenPhim,
            trailer: trailer,
            moTa: moTa ? moTa : "",
            hinhAnh: url,
            ngayKhoiChieu: ngayKhoiChieu ? ngayKhoiChieu : literal('CURRENT_TIMESTAMP'),
            danhGia: danhGia,
            hot: hot,
            dangChieu: dangChieu,
            sapChieu: sapChieu
        })
        return addFilm
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const CapNhatPhimUploadService = async (file, maPhim, tenPhim, trailer, moTa, ngayKhoiChieu, danhGia, hot, dangChieu, sapChieu) => {
    try {
        file.path = file.path.replace(/\\/g, '/');
        const url = `http://localhost:4000/${file.path}`;
        const datafilm = await Phim.findByPk(maPhim)
        if (!datafilm) {
            throw new AppError(404, 'film not found');
        }
        const updateFilm = await Phim.update({
            tenPhim: tenPhim,
            trailer: trailer,
            moTa: moTa ? moTa : "",
            hinhAnh: url,
            ngayKhoiChieu: ngayKhoiChieu ? ngayKhoiChieu : literal('CURRENT_TIMESTAMP'),
            danhGia: danhGia,
            hot: hot,
            dangChieu: dangChieu,
            sapChieu: sapChieu
        },
            { where: { maPhim: maPhim } }
        )
        return updateFilm
    } catch (error) {
        throw error;
    }
}

const layThongTinPhimService = async (maPhim) => {
    try {

        const datafilm = await Phim.findByPk(maPhim)
        if (!datafilm) {
            throw new AppError(404, 'film not found');
        }
        return datafilm;
    } catch (error) {
        throw error;
    }
}
const xoaPhimService = async (maPhim) => {
    try {

        const filmFound = await Phim.findByPk(maPhim);
        if (!filmFound) {
            throw new AppError(404, 'film not found');
        }
        await Phim.destroy({
            where: {
                maPhim: maPhim
            }
        });
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getBannerService,
    layDanhSachPhimService,
    layThongTinPhimService,
    xoaPhimService,
    ThemPhimUploadHinhService,
    CapNhatPhimUploadService,
    LayDanhSachPhimPhanTrangService,
    LayDanhSachPhimTheoNgayService
};