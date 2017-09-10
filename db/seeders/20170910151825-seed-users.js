'use strict';
var casual = require('casual');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      */
      var users = [];
      for(let i=0; i< 10; i++) {
        users.push({
          first_name: casual.first_name,
          last_name: casual.last_name,
          age: casual.integer(20, 40),
          email : casual.email,
          created_at : new Date(),
          updated_at: new Date()
        })
      } 
      return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      */
      return queryInterface.bulkDelete('Users', null, {});
  }
};
