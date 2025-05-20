"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Seances", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      film_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Films",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      salle_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Salles",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      heure_debut: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      heure_fin: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Seances");
  },
};
