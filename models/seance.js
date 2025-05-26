"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Film, {
        foreignKey: "film_id",
        as: "film",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Salle, {
        foreignKey: "salle_id",
        as: "salle",
        onDelete: "CASCADE",
      });

      this.hasMany(models.Reservation, {
        foreignKey: "seance_id",
        as: "reservations",
        onDelete: "CASCADE",
      });
    }
  }
  Seance.init(
    {
      film_id: { type: DataTypes.INTEGER, allowNull: false },
      salle_id: { type: DataTypes.INTEGER, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      heure_debut: { type: DataTypes.DATE, allowNull: false },
      heure_fin: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "Seance",
      tableName: "Seances",
      underscored: true,
      timestamps: true,
    }
  );
  return Seance;
};
