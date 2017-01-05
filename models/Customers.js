'use strict';

module.exports = {
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    position: {
      type: Sequelize.STRING,
      allowNull: false     
    }
  },
  assotiations() {

  },
  options: {
    timestamps: true,
    tableName: 'customers',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};