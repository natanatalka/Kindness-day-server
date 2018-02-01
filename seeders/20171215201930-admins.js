'use strict';

const passwordHash = require('password-hash');

module.exports = {
  up: (queryInterface, Sequelize) => {

    let pass = passwordHash.generate('P@ssw0rd');
      return queryInterface.bulkInsert('Admins', [{
          username: 'natalia',
          password: pass
      }], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
