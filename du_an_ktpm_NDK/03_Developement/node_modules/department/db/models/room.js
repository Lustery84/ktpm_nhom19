'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      // Define associations here
      Room.belongsTo(models.HoKhau, {
        foreignKey: 'hoKhauId',
        targetKey: 'soHoKhau',
        as: 'hoKhau'
      });
    }
  }
  
  Room.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    soPhong: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: 'Số phòng phải match với số nhà trong hộ khẩu'
    },
    loaiPhong: {
      type: DataTypes.ENUM('APARTMENT', 'COMMERCIAL', 'STORAGE', 'PARKING', 'COMMON'),
      allowNull: false,
      defaultValue: 'APARTMENT'
    },
    dienTich: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    tang: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    trangThai: {
      type: DataTypes.ENUM('AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'RESERVED'),
      allowNull: false,
      defaultValue: 'AVAILABLE'
    },
    hoKhauId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'HoKhau',
        key: 'soHoKhau'
      }
    },
    giaThue: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true
    },
    ngayBatDau: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'ngayBatDauThue' // Map to database column name
    },
    ngayKetThuc: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'ngayKetThucThue' // Map to database column name
    },
    moTa: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Room',
    tableName: 'Rooms'
  });
  
  return Room;
};
