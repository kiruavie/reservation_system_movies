"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Film.hasMany(models.Seance, {
        foreignKey: "film_id",
        as: "seances",
        onDelete: "CASCADE",
      });
    }
  }
  Film.init(
    {
      titre: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      post_url: { type: DataTypes.STRING },
      genre: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
      duree: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1, // en minutes
        },
      },
    },
    {
      sequelize,
      modelName: "Film",
      tableName: "Films",
      underscored: true,
      timestamps: true,
    }
  );
  return Film;
};
