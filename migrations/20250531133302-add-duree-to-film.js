"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Films", "duree", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 90,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Films", "duree");
  },
};
