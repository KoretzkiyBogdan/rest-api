'use strict';

module.exports = {
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  assotiations() {

  },
  options: {
    timestamps: true,
    tableName: 'countries',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};