'use strict';

module.exports = function() {
  return sequelize.getQueryInterface().dropAllTables()
};