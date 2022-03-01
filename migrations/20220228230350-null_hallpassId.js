'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    //created this snippet when debugging with jason 2/28 3:00pm
    // await queryInterface.changeColumn('classrooms','hallpassId',{
    //   type: Sequelize.INTEGER,
    //   allowNull: true
    // })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
