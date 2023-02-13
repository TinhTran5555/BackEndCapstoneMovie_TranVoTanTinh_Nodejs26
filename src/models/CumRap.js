const {DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize)=>{
    return sequelize.define(
        "CumRap",{
            maCumRap:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                field:'ma_cum_rap'
            },
            tenCumRap:{
                type:DataTypes.STRING,
                field:'ten_cum_rap'
            },
            diaChi:{
                type:DataTypes.STRING,
                field:'dia_chi'
            },
            maHeThongRap:{
                type:DataTypes.INTEGER,
                field:'ma_he_thong_rap',
                allowNull:false
            }
        },{
            tableName:'CumRap',
            timestamps:false,
        }
    )
}