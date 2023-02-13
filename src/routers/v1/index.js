const express = require('express');
const authorization = require('../../middlewares/auth');
const reqRole = require("../../middlewares/requireRole");
const upload = require('../../middlewares/upload');

const authController = require('../../controllers/auth.controller');
const phimController = require('../../controllers/phim.controller');
const rapController = require('../../controllers/rap.controller');
const nguoiDungController = require('../../controllers/nguoiDung.controller');
const veController = require('../../controllers/ve.controller');


const v1 = express.Router();
// Đăng nhập, đăng ký
v1.post('/login',authController.login());
v1.post("/register",authController.register());
// Người dùng
v1.get("/user/LayDanhSachLoaiNguoiDung",nguoiDungController.LayDanhSachLoaiNguoiDung());
v1.get("/user/LayDanhSachNguoiDung",nguoiDungController.LayDanhSachNguoiDung());
v1.get("/user/LayDanhSachNguoiDungPhanTrang",nguoiDungController.LayDanhSachNguoiDungPhanTrang());
v1.get("/user/ThongTinTaiKhoan",authorization,nguoiDungController.ThongTinTaiKhoan());
v1.get("/user/ThongTinNguoiDung",authorization,nguoiDungController.ThongTinNguoiDung());
v1.post("/user/ThemNguoiDung",authorization,reqRole("admin"),authController.register());
v1.put("/user/CapNhatThongTinNguoiDung/:taiKhoan",authorization,nguoiDungController.CapNhatThongTinNguoiDung());
v1.delete("/user/XoaNguoiDung/:taiKhoan",authorization,nguoiDungController.XoaNguoiDung());
v1.put("/user/DoiMatKhau",authorization,nguoiDungController.DoiMatKhau());
// Phim
v1.get("/banner", phimController.getBanner()) // LayDanhSachBanner
v1.get('/film',phimController.layDanhSachPhim()); // LayDanhSachPhim
v1.get('/film/LayDanhSachPhimPhanTrang',phimController.LayDanhSachPhimPhanTrang()); // LayDanhSachPhimPhanTrang
v1.get('/film/LayDanhSachPhimTheoNgay',phimController.LayDanhSachPhimTheoNgay()); // LayDanhSachPhimTheoNgay
v1.post('/film/add',authorization,reqRole("admin"),upload.single('file'),phimController.ThemPhimUploadHinh()); //ThemPhim
v1.post('/film/update',authorization,reqRole("admin"),upload.single('file'),phimController.CapNhatPhimUpload()); //ThemPhim
v1.delete('/film/delete/:maPhim',authorization,reqRole("admin"),phimController.xoaPhim()); //XoaPhim
v1.get('/film/:maPhim',phimController.layThongTinPhim()) //LayThongTinPhim
//Rap 
v1.get('/rap',rapController.LayThongTinHeThongRap());
v1.get('/rap/layThongTinCumRapTheoHeThong',rapController.LayThongTinCumRap());
v1.get('/rap/layThongTinLichChieuTheoHeThong',rapController.LayThongTinLichChieuTheoHeThongRap());
v1.get('/rap/LayThongTinLichChieuPhim',rapController.LayThongTinLichChieu());
//Ve
v1.post('/ve/DatVe',authorization, veController.DatVe())
v1.get('/ve/LayDanhSachPhongVe', veController.LayDanhSachPhongVe())

module.exports = v1;
