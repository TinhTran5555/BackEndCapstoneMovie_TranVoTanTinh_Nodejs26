const {DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize)=>{
    return sequelize.define(
        "LichChieu",{
            maLichChieu:{
                type:DataTypes.INTEGER,
                field:'ma_lich_chieu',
                primaryKey:true,
                autoIncrement:true,
            },
            maRap:{
                type:DataTypes.INTEGER,
                field:'ma_rap'
            }
            ,
            maPhim:{
                type:DataTypes.INTEGER,
                field:'ma_phim'
            },
            ngayGioChieu:{
                type:DataTypes.DATE,
                field:'ngay_gio_chieu',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            }
        },{
            tableName:'LichChieu',
            timestamps:false,
        }
    )
}