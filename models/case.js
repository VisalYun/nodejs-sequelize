'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Case extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Case.init({
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_case: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0'
    },
    new_case: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0'
    },
    recover_case: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0'
    },
    new_recover_case: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0'
    },
  }, {
    sequelize,
    tableName: 'cases',
    modelName: 'Case',
  });
  return Case;
};