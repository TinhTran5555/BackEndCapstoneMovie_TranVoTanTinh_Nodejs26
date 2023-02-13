const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    return sequelize.define(
        "NguoiDung", {
        taiKhoan: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'tai_khoan'
        },
        hoTen: {
            type: DataTypes.STRING,
            field: 'ho_ten',
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Require name'
                }
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'email',
            validate: {
                isEmail: {
                    msg: 'Invalid email'
                },
                notNull: {
                    msg: 'Require email'
                }
            }
        },
        soDt: {
            type: DataTypes.STRING,
            field: 'so_dt',
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Require phonenumber'
                }
            },
        },
        matKhau: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'mat_khau',
            validate: {
                notNull: {
                    msg: 'Require password'
                }
            },
            set(value) {
                const saltSync = bcrypt.genSaltSync();
                const hashedPassword = bcrypt.hashSync(value, saltSync);
                this.setDataValue("matKhau", hashedPassword);
            }
        },
        
        role: {
            type: DataTypes.ENUM('admin','user'),
            defaultValue: 'user'
        }
    },
        {
            tableName: "NguoiDung",
            timestamps: false,
            defaultScope: {
                attributes: {
                    exclude: "matKhau",
                },
            },
            hooks: {
                afterSave: (record) => {
                    delete record.dataValues.matKhau;
                },
            },
        }
    )
}
