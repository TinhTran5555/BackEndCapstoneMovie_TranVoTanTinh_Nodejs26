const { Sequelize } = require("sequelize");
const configs = require('../config');




const sequelize = new Sequelize(configs.DB_NAME, configs.DB_USER, configs.DB_PASSWORD, {
    dialect: configs.DB_DIALECT,
    host: configs.DB_HOST,
    port: configs.DB_PORT,
});
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Sequelize Connected");
    } catch (error) {
        console.log("Sequelize Error", error);
    }
})();


const DatVe = require("./DatVe")(sequelize);
const LichChieu = require("./LichChieu")(sequelize);
const NguoiDung = require("./NguoiDung")(sequelize);
const Phim = require("./Phim")(sequelize);
const RapPhim = require("./RapPhim")(sequelize);
const Ghe = require("./Ghe")(sequelize);
const CumRap = require("./CumRap")(sequelize);
const HeThongRap = require("./HeThongRap")(sequelize);
const Banner = require("./Banner")(sequelize);

NguoiDung.belongsToMany(LichChieu,{ as: "NguoiDungLichChieu", through: DatVe, foreignKey:"taiKhoan"})
LichChieu.belongsToMany(NguoiDung,{ as: "LichChieuNguoiDung", through: DatVe, foreignKey:"maLichChieu"})

Phim.belongsToMany(RapPhim,{ as: "PhimTheoRap", through: LichChieu, foreignKey:"maPhim"})
RapPhim.belongsToMany(Phim,{ as: "PhimCuaRap", through: LichChieu, foreignKey:"maRap"})


// Ghe.belongsToMany(LichChieu,{as:"gheCuaLichChieu",through: RapPhim, foreignKey:"maRap"});
// LichChieu.belongsToMany(Ghe,{as:"danhSachGheCuaLichChieu",through: RapPhim,foreignKey:"maRap"});


// DatVe.belongsTo(LichChieu,{as:"gheDaDat",foreignKey:"maLichChieu"});
// LichChieu.hasMany(DatVe,{as:"danhSachGheDaDat",foreignKey:"maLichChieu"});


RapPhim.belongsTo(CumRap,{as:"rapPhim",foreignKey:"maCumRap"});
CumRap.hasMany(RapPhim,{as:"danhSachRapPhim",foreignKey:"maCumRap"});


CumRap.belongsTo(HeThongRap,{as: "cumRap" , foreignKey:"maHeThongRap"})
HeThongRap.hasMany(CumRap,{as:"danhSachCumRap",foreignKey:"maHeThongRap"});


Banner.belongsTo(Phim,{as: "banner" , foreignKey:"maPhim"})
Phim.hasMany(Banner,{as:"bannerCuaPhim",foreignKey:"maPhim"});




module.exports = {
    sequelize,
    NguoiDung,
    LichChieu,
    Banner,
    Phim,
    HeThongRap,
    Ghe
    
}

