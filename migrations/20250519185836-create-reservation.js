"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reservations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      seance_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Seances",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      date_reservation: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      statut: {
        type: Sequelize.ENUM("en attente", "confirmée", "annulée"),
        defaultValue: "en attente",
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reservations");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Reservations_statut";'
    );
  },
};
