const {DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize)=>{
    return sequelize.define(
        "Banner",{
            maBanner:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                field:'ma_banner'
            },
            hinhAnh:{
                type:DataTypes.STRING,
                field:'hinh_anh'
            },
            maPhim:{
                type:DataTypes.INTEGER,
                field:'ma_phim',
                allowNull:false
            }
        },{
            tableName:'Banner',
            timestamps:false,
        }
    )
}