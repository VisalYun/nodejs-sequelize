'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      province: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total_case: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '0'
      },
      new_case: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '0'
      },
      recover_case: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '0'
      },
      new_recover_case: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '0'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cases');
  }
};