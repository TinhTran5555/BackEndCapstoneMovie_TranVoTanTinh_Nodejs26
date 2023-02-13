const {DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize)=>{
    return sequelize.define(
        "HeThongRap",{
            maHeThongRap:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                field:'ma_he_thong_rap'
            },
            tenHeThongRap:{
                type:DataTypes.STRING,
                field:'ten_he_thong_rap'
            },
            logo:{
                type:DataTypes.STRING,
                field:'logo'
            }
        },{
            tableName:'HeThongRap',
            timestamps:false,
        }
    )
}