const {DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize)=>{
    return sequelize.define(
        "Ghe",{
            maGhe:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                field:'ma_ghe'
            },
            tenGhe:{
                type:DataTypes.STRING,
                field:'ten_ghe'
            },
            loaiGhe:{
                type:DataTypes.STRING,
                field:'loai_ghe'
            },
            maRap:{
                type:DataTypes.INTEGER,
                field:'ma_rap',
                allowNull:false
            },
            giaVe:{
                type:DataTypes.INTEGER,
                field:'gia_ve'
            }
        },{
            tableName:'Ghe',
            timestamps:false,
        }
    )
}