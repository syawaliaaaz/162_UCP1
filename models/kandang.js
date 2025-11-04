'use strict';

module.exports = (sequelize, DataTypes) => {
  const Kandang = sequelize.define('Kandang', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_hewan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nama_petugas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usia_hewan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    jenis_hewan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tahun_lahir: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});

  Kandang.associate = function(models) {
    // associations can be defined here
  };

  return Kandang;
};
