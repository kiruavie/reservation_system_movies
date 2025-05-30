"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Tableau de salles à créer
    const salles = [
      {
        nom: "Salle Alpha",
        capacite: 100,
        rows: 10,
        columns: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nom: "Salle Sigma",
        capacite: 80,
        rows: 8,
        columns: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nom: "Zeus",
        capacite: 70,
        rows: 7,
        columns: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Insérer les salles
    await queryInterface.bulkInsert("Salles", salles, {});

    // Récupérer les IDs des salles insérées
    const insertedSalles = await queryInterface.sequelize.query(
      `SELECT id, rows, columns FROM "Salles";`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Générer les sièges pour chaque salle
    const sieges = [];

    insertedSalles.forEach((salle) => {
      for (let row = 1; row <= salle.rows; row++) {
        for (let col = 1; col <= salle.columns; col++) {
          sieges.push({
            salle_id: salle.id,
            row,
            col,
            created_at: new Date(),
            updated_at: new Date(),
          });
        }
      }
    });

    // Insérer tous les sièges
    await queryInterface.bulkInsert("Sieges", sieges, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Sieges", null, {});
    await queryInterface.bulkDelete("Salles", null, {});
  },
};
