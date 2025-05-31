"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Seances", [
      {
        film_id: 4,
        salle_id: 1,
        date: new Date("2025-06-01T00:00:00"),
        heure_debut: new Date("2025-06-01T18:00:00"),
        heure_fin: new Date("2025-06-01T20:00:00"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        film_id: 5,
        salle_id: 1,
        date: new Date("2025-06-01T00:00:00"),
        heure_debut: new Date("2025-06-01T21:00:00"),
        heure_fin: new Date("2025-06-01T23:00:00"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        film_id: 8,
        salle_id: 2,
        date: new Date("2025-06-02T00:00:00"),
        heure_debut: new Date("2025-06-02T14:00:00"),
        heure_fin: new Date("2025-06-02T16:00:00"),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Seances", null, {});
  },
};
