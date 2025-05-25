"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Films", [
      {
        titre: "Inception",
        description:
          "Un film sur les rêves dans les rêves, avec des effets visuels incroyables.",
        post_url: "https://example.com/inception.jpg",
        genre: ["Action", "Science-Fiction"],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        titre: "The Godfather",
        description:
          "Une épopée criminelle sur une famille mafieuse italienne.",
        post_url: "https://example.com/godfather.jpg",
        genre: ["Crime", "Drame"],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        titre: "Interstellar",
        description: "Un voyage interstellaire pour sauver l'humanité.",
        post_url: "https://example.com/interstellar.jpg",
        genre: ["Aventure", "Science-Fiction", "Drame"],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        titre: "Avatar",
        description: "Un ancien marine découvre Pandora...",
        post_url: "https://example.com/avatar.jpg",
        genre: ["Aventure", "Fantasy"],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        titre: "Gladiator",
        description: "Un général romain devient gladiateur pour se venger.",
        post_url: "https://example.com/gladiator.jpg",
        genre: ["Action", "Drame", "Historique"],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Films", null, {});
  },
};
