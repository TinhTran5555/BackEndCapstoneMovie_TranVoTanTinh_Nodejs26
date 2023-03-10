const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        "DatVe", {
        maDatVe: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'ma_dat_ve'
        },
        taiKhoan: {
            type: DataTypes.INTEGER,
            unique:false,
            field: 'tai_khoan'
        },
        maLichChieu: {
            type: DataTypes.INTEGER,
            unique:false,
            field: 'ma_lich_chieu',
        },
        danhSachGhe: {
            type: DataTypes.INTEGER,
            unique:false,
            field: 'danh_sach_ghe'
        }
    }, {
        tableName: 'DatVe',
        timestamps: false,
    }
    )
}