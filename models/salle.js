"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Salle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.Seance, {
        foreignKey: "salle_id",
        as: "seances",
        onDelete: "CASCADE",
      });

      this.hasMany(models.Siege, {
        foreignKey: "salle_id",
        as: "sieges",
        onDelete: "CASCADE",
      });
    }
  }
  Salle.init(
    {
      nom: { type: DataTypes.STRING, allowNull: false },
      capacite: { type: DataTypes.INTEGER, allowNull: false },
      rows: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } },
      columns: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 },
      },
    },
    {
      sequelize,
      modelName: "Salle",
      tableName: "Salles",
      underscored: true,
      timestamps: true,
    }
  );
  return Salle;
};
