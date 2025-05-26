"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Siege extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Salle, {
        foreignKey: "salle_id",
        as: "salle",
        onDelete: "CASCADE",
      });
    }
  }
  Siege.init(
    {
      salle_id: { type: DataTypes.INTEGER, allowNull: false },
      row: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } },
      col: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } },
    },
    {
      sequelize,
      modelName: "Siege",
      tableName: "Sieges",
      underscored: true,
      timestamps: true,
    }
  );
  return Siege;
};
