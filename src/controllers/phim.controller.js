const { AppError } = require('../helpers/error');
const { response } = require('../helpers/response');
const phimService = require('../services/phim.service');

const getBanner = () =>{
    return async(req,res,next)=>{
        try {
            const dataBanner = await phimService.getBannerService();
            res.status(200).json(response(dataBanner));
        } catch (error) {
            next(error);
        }
    }
}
const layDanhSachPhim = () =>{
    return async(req,res,next)=>{
        try {
            const {tenPhim} = req.body
           
            const datafilm = await phimService.layDanhSachPhimService(tenPhim)
            res.status(200).json(response(datafilm));
        } catch (error) {
            next(error);
        }
    }
}
const LayDanhSachPhimPhanTrang = () =>{
    return async(req,res,next)=>{
        try {
            const {tenPhim,soTrang,soPhanTuTrenTrang} = req.body  
            const datafilm = await phimService.LayDanhSachPhimPhanTrangService(tenPhim,soTrang,soPhanTuTrenTrang)
            res.status(200).json(response(datafilm));
        } catch (error) {
            next(error);
        }
    }
}

const LayDanhSachPhimTheoNgay = () =>{
    return async(req,res,next)=>{
        try {

            const {tenPhim,tuNgay,denNgay,soTrang,soPhanTuTrenTrang} = req.body
           
            const datafilm = await phimService.LayDanhSachPhimTheoNgayService(tenPhim,tuNgay,denNgay,soTrang,soPhanTuTrenTrang)
            res.status(200).json(response(datafilm));
        } catch (error) {
            next(error);
        }
    }
}

const ThemPhimUploadHinh = () => {
    return async (req,res,next)=>{
        try {
        const file = req.file;
        const {tenPhim,trailer,moTa,ngayKhoiChieu,danhGia,hot,dangChieu,sapChieu} = req.body;
        if(!file){
            next(new AppError(400,'Missing file'));
        };
        const filmAdd = await phimService.ThemPhimUploadHinhService(file,tenPhim,trailer,moTa,ngayKhoiChieu,danhGia,hot,dangChieu,sapChieu)
        res.status(200).json(response(filmAdd));
        } catch (error) {
            console.log(error);
            next(error);
        }
     
    };
};
const CapNhatPhimUpload = () => {
    return async (req,res,next)=>{
        try {
        const file = req.file;
        const {maPhim,tenPhim,trailer,moTa,ngayKhoiChieu,danhGia,hot,dangChieu,sapChieu} = req.body;
        if(!file){
            next(new AppError(400,'Missing file'));
        };
        const filmUpdate = await phimService.CapNhatPhimUploadService(file,maPhim,tenPhim,trailer,moTa,ngayKhoiChieu,danhGia,hot,dangChieu,sapChieu)
        res.status(200).json(response("update film successfully"));
        } catch (error) {
            next(error);
        }  
    };
};

const xoaPhim = ()=>{
    return async(req,res,next)=>{
        try {
            const {maPhim} = req.params;  
            await phimService.xoaPhimService(maPhim);
            res.status(200).json(response("delete film successfully"))
        } catch (error) {         
            next(error);
        }
    }
  }
const layThongTinPhim = () =>{
    return async(req,res,next)=>{
        try {
            const {maPhim} = req.params;
            const datafilm = await phimService.layThongTinPhimService(maPhim)
            res.status(200).json(response(datafilm));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = {
    getBanner,
    layDanhSachPhim,
    ThemPhimUploadHinh,
    CapNhatPhimUpload,
    layThongTinPhim,
    xoaPhim,
    LayDanhSachPhimPhanTrang,
    LayDanhSachPhimTheoNgay
}