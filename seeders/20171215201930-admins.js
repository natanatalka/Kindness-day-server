'use strict';

const passwordHash = require('password-hash');

module.exports = {
  up: (queryInterface, Sequelize) => {

    let pass = passwordHash.generate('111');
      return queryInterface.bulkInsert('Admins', [{
          username: 'nata',
          password: pass
      }], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
