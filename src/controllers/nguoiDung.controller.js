const { AppError } = require('../helpers/error');
const { response } = require('../helpers/response');
const nguoiDungService = require('../services/nguoiDung.service');
const authService = require('../services/auth.service');

const LayDanhSachLoaiNguoiDung = () => {
    return async (req, res, next) => {
        try {
            const dataLoaiNguoiDung = await nguoiDungService.LayThongTinHeThongRapService()
            res.status(200).json(response(dataLoaiNguoiDung));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}
const LayDanhSachNguoiDung = () => {
    return async (req, res, next) => {
        try {
            const { tuKhoa } = req.query
            const dataNguoiDung = await nguoiDungService.LayDanhSachNguoiDungService(tuKhoa)
            res.status(200).json(response(dataNguoiDung));
        } catch (error) {
            next(error);
        }
    }
}
const LayDanhSachNguoiDungPhanTrang = () => {
    return async (req, res, next) => {
        try {
            const { tuKhoa, soTrang, soPhanTuTrenTrang } = req.body
            const dataNguoiDung = await nguoiDungService.LayDanhSachNguoiDungPhanTrangService(tuKhoa, soTrang, soPhanTuTrenTrang)
            res.status(200).json(response(dataNguoiDung));
        } catch (error) {
            next(error);
        }
    }
}
const ThongTinTaiKhoan = () => {
    return async (req, res, next) => {

        try {
            const { user } = res.locals;
            res.status(200).json(response(user));
        } catch (error) {
            next(error);
        }
    }
}
const ThongTinNguoiDung = () => {
    return async (req, res, next) => {
        try {
            const { taiKhoan } = req.query
            const { user } = res.locals;
            const dataNguoiDung = await nguoiDungService.ThongTinNguoiDungService(user, taiKhoan)
            res.status(200).json(response(dataNguoiDung));
        } catch (error) {
            next(error);
        }

    }
}
const ThemNguoiDung = () => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            const createdUser = await authService.register(data)
            res.status(200).json(response(createdUser, "create successfully!"))
        } catch (error) {
            next(error);
        }

    }
}
const CapNhatThongTinNguoiDung = () => {
    return async (req, res, next) => {
        try {
            const { user } = res.locals
            const { taiKhoan } = req.params;

            const data = req.body;
            const updatedUser = await nguoiDungService.CapNhatThongTinNguoiDungService(user, taiKhoan, data);
            res.status(200).json(response(updatedUser));
        } catch (error) {
            next(error);
        }
    };
};
const XoaNguoiDung = () => {
    return async (req, res, next) => {
        try {
            const { taiKhoan } = req.params;
            const { user } = res.locals
            await nguoiDungService.XoaNguoiDungService(user, taiKhoan);
            res.status(200).json(response("delete successfully!"))
        } catch (error) {
            next(error);
        }
    }
}
const DoiMatKhau = () => {
    return async (req, res, next) => {
        try {
            const { user } = res.locals
            const { taiKhoan, matKhauCu, matKhauXacNhan, matKhauMoi } = req.body;
            const updatedUser = await nguoiDungService.DoiMatKhauService(user, taiKhoan, matKhauCu, matKhauXacNhan, matKhauMoi);
            res.status(200).json(response(updatedUser));
        } catch (error) {
            next(error);
        }
    };
};
module.exports = {
    LayDanhSachLoaiNguoiDung,
    LayDanhSachNguoiDung,
    LayDanhSachNguoiDungPhanTrang,
    ThongTinTaiKhoan,
    ThongTinNguoiDung,
    ThemNguoiDung,
    CapNhatThongTinNguoiDung,
    XoaNguoiDung,
    DoiMatKhau
};