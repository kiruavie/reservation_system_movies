"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReservationSiege extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Reservation, {
        foreignKey: "reservation_id",
        as: "reservation",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Siege, {
        foreignKey: "siege_id",
        as: "siege",
        onDelete: "CASCADE",
      });
    }
  }
  ReservationSiege.init(
    {
      reservation_id: { type: DataTypes.INTEGER, allowNull: false },
      siege_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "ReservationSiege",
      tableName: "ReservationSieges",
      underscored: true,
      timestamps: true,
    }
  );
  return ReservationSiege;
};
