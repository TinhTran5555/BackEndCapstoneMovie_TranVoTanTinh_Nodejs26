const { AppError } = require('../helpers/error');
const { response } = require('../helpers/response');
const veService = require('../services/ve.service');
const authService = require('../services/auth.service');
const DatVe = () => {
    return async (req, res, next) => {
        try {
            const { user } = res.locals
            const {maLichChieu, maGhe } = req.body;
            const datVe = await veService.DatVeService(user, maLichChieu, maGhe);
            res.status(200).json(response(datVe));
        } catch (error) {
            console.log(error);
            next(error);
        }
    };
};
const LayDanhSachPhongVe = () => {
    return async (req, res, next) => {
        try {
            const {maLichChieu } = req.query;
            const danhSachVe = await veService.LayDanhSachPhongVeService(maLichChieu);
            res.status(200).json(response(danhSachVe));
        } catch (error) {
            console.log(error);
            next(error);
        }
    };
};
module.exports = {
    DatVe,
    LayDanhSachPhongVe
};