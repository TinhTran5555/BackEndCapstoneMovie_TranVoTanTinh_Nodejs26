const {DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize)=>{
    return sequelize.define(
        "RapPhim",{
            maRap:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                field:'ma_rap'
            },
            tenRap:{
                type:DataTypes.STRING,
                field:'ten_rap'
            },
            maCumRap:{
                type:DataTypes.INTEGER,
                field:'ma_cum_rap',
                allowNull:false
            }
        },{
            tableName:'RapPhim',
            timestamps:false,
        }
    )
}