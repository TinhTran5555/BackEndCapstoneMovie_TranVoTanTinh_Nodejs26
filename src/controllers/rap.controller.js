const { AppError } = require('../helpers/error');
const { response } = require('../helpers/response');
const rapService = require('../services/rap.service');



const LayThongTinHeThongRap = () =>{
    return async(req,res,next)=>{
        try {
            const {maHeThongRap} = req.query;
            const dataHeThongRap = await rapService.LayThongTinHeThongRapService(maHeThongRap)
            res.status(200).json(response(dataHeThongRap));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}
const LayThongTinCumRap = () =>{
    return async(req,res,next)=>{
        try {
            const {maHeThongRap} = req.query;
            const dataCumRap = await rapService.LayThongTinCumRapService(maHeThongRap)
            res.status(200).json(response(dataCumRap));
        } catch (error) {
            next(error);
        }
    }
}
const LayThongTinLichChieuTheoHeThongRap = () =>{
    return async(req,res,next)=>{
        try {
            const {maHeThongRap} = req.query;
            const dataLichChieu = await rapService.LayThongTinLichChieuTheoHeThongRapService(maHeThongRap)
            res.status(200).json(response(dataLichChieu));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}
const LayThongTinLichChieu = () =>{
    return async(req,res,next)=>{
        try {
            const {maPhim} = req.query;
            const dataCumRap = await rapService.LayThongTinLichChieuService(maPhim)
            res.status(200).json(response(dataCumRap));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}
module.exports = {
    LayThongTinHeThongRap,
    LayThongTinCumRap,
    LayThongTinLichChieuTheoHeThongRap,
    LayThongTinLichChieu
};