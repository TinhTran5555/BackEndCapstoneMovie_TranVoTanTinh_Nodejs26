const { literal, Op } = require('sequelize');
const { AppError } = require('../helpers/error');
const { Banner, Phim, sequelize, HeThongRap } = require('../models');

const LayThongTinHeThongRapService = async (maHeThongRap) => {
    try {
        if (!maHeThongRap) {
            const heThongRapFound = await HeThongRap.findAll()
            return heThongRapFound
        } else {
            const heThongRapFound = await HeThongRap.findByPk(maHeThongRap)
            return heThongRapFound;
        }
    } catch (error) {
        throw error;
    }
}
const LayThongTinCumRapService = async (maHeThongRap) => {
    try {
        if (!maHeThongRap) {
            const cumRapFound = await HeThongRap.findAll({
                include: [{
                    association: "danhSachCumRap",
                    include: "danhSachRapPhim"
                }]
            })
            return cumRapFound
        } else {
            const cumRapFound = await HeThongRap.findOne({
                where: {
                    maHeThongRap: maHeThongRap
                },
                include: [{
                    association: "danhSachCumRap",
                    include: "danhSachRapPhim"
                }]
            })
            return cumRapFound;
        }
    } catch (error) {
        throw error;
    }
}
const LayThongTinLichChieuService = async (maPhim) => {
    try {
        const filmFound = await Phim.findByPk(maPhim);
        
        if(!filmFound){
            throw new AppError(404,'Film not found')
        };
        const dataFilm = await filmFound.getPhimTheoRap()
        return dataFilm
    } catch (error) {
        throw error;
    }
}
const LayThongTinLichChieuTheoHeThongRapService = async (maHeThongRap) => {
    try {
        if (!maHeThongRap) {
            const cumRapFound = await HeThongRap.findAll({
                include: [{
                    association: "danhSachCumRap",
                    include: [{
                        association: "danhSachRapPhim",
                        include: "PhimCuaRap"
                    }]
                }]
            })
            return cumRapFound
        } else {
            const cumRapFound = await HeThongRap.findOne({
                where: {
                    maHeThongRap: maHeThongRap
                },
                include: [{
                    association: "danhSachCumRap",
                    include: [{
                        association: "danhSachRapPhim",
                        include: "PhimCuaRap"
                    }]
                }]
            })
            return cumRapFound;
        }
    } catch (error) {
        throw error;
    }
}
module.exports = {
    LayThongTinHeThongRapService,
    LayThongTinCumRapService,
    LayThongTinLichChieuTheoHeThongRapService,
    LayThongTinLichChieuService
};